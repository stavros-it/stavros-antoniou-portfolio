import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/*
  Global smoothed-parallax engine.
  Any element with data-parallax="<k>" is translated by k * smoothedScrollY
  while it is on screen. One rAF loop for the whole page; a shared registry
  keeps per-frame cost flat. No-op under reduced motion or when JS never ran.
*/
export function useParallaxEngine(reducedMotion) {
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    let current = window.scrollY;
    let last = -1;

    const step = () => {
      current += (window.scrollY - current) * 0.12;
      if (Math.abs(current - window.scrollY) < 0.05) current = window.scrollY;
      const c = Math.round(current * 100) / 100;
      if (c !== last) {
        last = c;
        const els = document.querySelectorAll("[data-parallax]");
        const vh = window.innerHeight;
        for (const el of els) {
          const rect = el.parentElement.getBoundingClientRect();
          if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) continue;
          const k = parseFloat(el.dataset.parallax) || 0;
          el.style.transform = `translate3d(0, ${(c * k).toFixed(1)}px, 0)`;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);
}

/*
  Reveal-on-scroll: adds .is-in to [data-reveal] elements when they enter
  the viewport. Elements are visible by default; only .js pages pre-hide them.
*/
export function useReveals() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) el.classList.add("is-in");
      else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

export function useSectionActive() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["about", "experience", "skills", "education", "projects", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5], rootMargin: "-20% 0px -35% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

export function useSmoothPointer(ref) {
  const target = useRef({ x: 0.5, y: 0.5, active: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => {
      target.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
  return target;
}
