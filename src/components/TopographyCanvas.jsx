import { useEffect, useRef } from "react";
import { useReducedMotion, useSmoothPointer } from "../hooks.js";

/* ------------------------------------------------------------------ */
/*  Value noise (3D: x, y, time) — small, seeded, no dependencies.      */
/* ------------------------------------------------------------------ */

function hash3(ix, iy, iz) {
  let h = Math.imul(ix, 0x27d4eb2d) ^ Math.imul(iy, 0x165667b1) ^ Math.imul(iz, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}

const smooth = (t) => t * t * (3 - 2 * t);
const lerp = (a, b, t) => a + (b - a) * t;

function noise3(x, y, z) {
  const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
  const fx = smooth(x - ix), fy = smooth(y - iy), fz = smooth(z - iz);
  const c000 = hash3(ix, iy, iz), c100 = hash3(ix + 1, iy, iz);
  const c010 = hash3(ix, iy + 1, iz), c110 = hash3(ix + 1, iy + 1, iz);
  const c001 = hash3(ix, iy, iz + 1), c101 = hash3(ix + 1, iy, iz + 1);
  const c011 = hash3(ix, iy + 1, iz + 1), c111 = hash3(ix + 1, iy + 1, iz + 1);
  return lerp(
    lerp(lerp(c000, c100, fx), lerp(c010, c110, fx), fy),
    lerp(lerp(c001, c101, fx), lerp(c011, c111, fx), fy),
    fz
  );
}

function fbm(x, y, z) {
  let v = 0, amp = 0.62, freq = 1;
  for (let o = 0; o < 3; o++) {
    v += amp * noise3(x * freq, y * freq, z * freq);
    amp *= 0.45;
    freq *= 2.15;
  }
  return v;
}

/* ------------------------------------------------------------------ */
/*  Marching squares — traces iso-lines of the heightfield.            */
/* ------------------------------------------------------------------ */

function marchSegments(field, cols, rows, step, threshold, out) {
  // field: (cols+1) x (rows+1) corner heights. Emits line segments in px.
  for (let y = 0; y < rows; y++) {
    const rowOff = y * (cols + 1);
    for (let x = 0; x < cols; x++) {
      const tl = field[rowOff + x];
      const tr = field[rowOff + x + 1];
      const bl = field[rowOff + (cols + 1) + x];
      const br = field[rowOff + (cols + 1) + x + 1];
      let code = 0;
      if (tl >= threshold) code |= 8;
      if (tr >= threshold) code |= 4;
      if (br >= threshold) code |= 2;
      if (bl >= threshold) code |= 1;
      if (code === 0 || code === 15) continue;

      const px = x * step;
      const py = y * step;
      // interpolation factors along cell edges
      const topX = px + step * ((threshold - tl) / (tr - tl || 1e-6));
      const botX = px + step * ((threshold - bl) / (br - bl || 1e-6));
      const leftY = py + step * ((threshold - tl) / (bl - tl || 1e-6));
      const rightY = py + step * ((threshold - tr) / (br - tr || 1e-6));

      const T = [topX, py], B = [botX, py + step], L = [px, leftY], R = [px + step, rightY];

      const push = (a, b) => {
        out.push(a[0], a[1], b[0], b[1]);
      };

      switch (code) {
        case 1: case 14: push(L, B); break;
        case 2: case 13: push(B, R); break;
        case 3: case 12: push(L, R); break;
        case 4: case 11: push(T, R); break;
        case 5: push(L, T); push(B, R); break; // saddle: pick a pairing
        case 6: case 9: push(T, B); break;
        case 7: case 8: push(L, T); break;
        case 10: push(L, B); push(T, R); break; // saddle
        default: break;
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Contour palette — survey-map logic: index contours every 4th.     */
/* ------------------------------------------------------------------ */

const LEVELS = [0.36, 0.41, 0.46, 0.51, 0.56, 0.61, 0.66, 0.71];
const LEVEL_COLORS = [
  [70, 120, 160], // 0.36 farthest
  [80, 133, 172],
  [92, 148, 184],
  [104, 162, 195], // index
  [92, 148, 184],
  [80, 133, 172],
  [70, 120, 160],
  [60, 108, 148], // 0.71
];

export default function TopographyCanvas() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();
  const pointer = useSmoothPointer(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0, height = 0, cols = 0, rows = 0, step = 18;
    let field = null;
    let running = false;
    let raf = 0;
    let time = 0;
    let visible = true;
    const smoothPtr = { x: 0.5, y: 0.5, amp: 0 };

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = Math.max(320, rect.width);
      height = Math.max(360, rect.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      step = Math.max(13, Math.min(22, width / 76));
      cols = Math.ceil(width / step) + 1;
      rows = Math.ceil(height / step) + 1;
      field = new Float32Array((cols + 1) * (rows + 1));
    };

    const buildField = () => {
      const ns = 0.0042 * (18 / step); // world scale tied to cell size
      const bx = smoothPtr.x * cols * 0.9;
      const by = smoothPtr.y * rows * 0.9;
      const sigma = 5.2;
      const target = pointer.current;
      for (let y = 0; y <= rows; y++) {
        const rowOff = y * (cols + 1);
        for (let x = 0; x <= cols; x++) {
          let h = fbm(x * ns, y * ns, time);
          // gentle ridge along the diagonal so the field reads as terrain, not noise
          h += 0.10 * (1 - Math.abs((x / cols + y / rows) - 0.9));
          if (smoothPtr.amp > 0.003) {
            const dx = x - bx;
            const dy = y - by;
            const d2 = (dx * dx + dy * dy) / (2 * sigma * sigma);
            h += 0.34 * smoothPtr.amp * Math.exp(-d2);
          }
          field[rowOff + x] = h;
        }
      }
      void target;
    };

    const draw = () => {
      buildField();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const segs = [];
      for (let i = 0; i < LEVELS.length; i++) {
        segs.length = 0;
        marchSegments(field, cols, rows, step, LEVELS[i], segs);
        const [r, g, b] = LEVEL_COLORS[i];
        const isIndex = i % 4 === 3;
        ctx.strokeStyle = `rgba(${r},${g},${b},${isIndex ? 0.5 : 0.22})`;
        ctx.lineWidth = isIndex ? 1.4 : 1;
        ctx.beginPath();
        for (let s = 0; s < segs.length; s += 4) {
          ctx.moveTo(segs[s], segs[s + 1]);
          ctx.lineTo(segs[s + 2], segs[s + 3]);
        }
        ctx.stroke();
      }
    };

    const loop = () => {
      if (!running) return;
      const target = pointer.current;
      smoothPtr.x += (target.x - smoothPtr.x) * 0.055;
      smoothPtr.y += (target.y - smoothPtr.y) * 0.055;
      const targetAmp = target.active ? 1 : 0;
      smoothPtr.amp += (targetAmp - smoothPtr.amp) * 0.04;
      time += 0.0045;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw(); // first paint is synchronous — the hero is never blank

    if (!reduced) {
      // honor battery/tab visibility: animate only while hero is on screen
      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          if (visible && !document.hidden) start();
          else stop();
        },
        { threshold: 0.02 }
      );
      io.observe(canvas);
      const onVis = () => (document.hidden ? stop() : visible && start());
      document.addEventListener("visibilitychange", onVis);
      const onResize = () => {
        resize();
        draw();
      };
      window.addEventListener("resize", onResize);
      return () => {
        stop();
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", onResize);
      };
    }
    // reduced motion: the synchronous first paint above is the whole render
  }, [reduced, pointer]);

  return <canvas ref={canvasRef} className="topography" aria-hidden="true" />;
}
