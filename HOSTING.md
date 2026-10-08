# Hosting & Security Guide

This site is a **static one-page site**: after `npm run build`, the `dist/` folder is a handful of HTML/CSS/JS/font files. There is no database, no server code, no user input, and no login — which already makes it very hard to attack. The instructions below deploy it anywhere and add the standard protective layer (HTTPS + security headers).

---

## 0. What you will need

| Item | What it is | Cost |
|---|---|---|
| The `dist/` folder | The built site (produced by `npm run build`) | — |
| A hosting provider | One of the options below | free to ~€5/mo |
| A domain (optional but recommended) | e.g. `stavrosantoniou.gr` or `.com` | ~€10–15/yr |

You can start free without a domain (you get a provider subdomain) and attach your own domain later.

---

## 1. Build the site

```bat
npm install
npm run build
```

The complete, deployable site is now in `dist/`.

To preview the production build locally:

```bat
npx vite preview
```

---

## 2. Deploy (choose one)

### Option A — GitHub Pages (free, good to start)

1. Create a GitHub repository (e.g. `portfolio`) and push this project:
   ```bat
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
2. The included workflow (`.github/workflows/deploy.yml`) builds and publishes automatically on every push.
3. In the repo: **Settings → Pages → Source → GitHub Actions**.
4. Your site goes live at `https://<your-username>.github.io/portfolio/`.
5. Custom domain: **Settings → Pages → Custom domain** → enter your domain, then add a `CNAME` DNS record at your registrar pointing at `<your-username>.github.io`. Wait for the DNS check, then tick **Enforce HTTPS**.

**Limitation:** GitHub Pages does not support custom security headers. The site is still fully static and safe, but for the header set below use Option B/C, or put Cloudflare (free) in front of Pages.

### Option B — Netlify (free, headers included — recommended)

1. Go to [netlify.com](https://www.netlify.com) → sign up (free).
2. Either drag & drop the `dist/` folder onto the dashboard, or connect the Git repo with:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. The security headers ship automatically — the file `public/_headers` is copied into `dist/` and Netlify applies it.
4. Custom domain: **Domain settings → Add a domain** → follow the DNS instructions (an `A` record to Netlify's load balancer or `CNAME` to your site name). HTTPS is automatic (Let's Encrypt).

### Option C — Vercel (free, headers included)

1. Go to [vercel.com](https://vercel.com) → sign up (free).
2. Import the Git repo. Vercel reads `vite.config.js` automatically; the included `vercel.json` sets the security headers.
3. Custom domain: **Project → Settings → Domains → Add** → point DNS as instructed. HTTPS is automatic.

### Option D — Traditional shared hosting (cPanel / FTP)

1. Run `npm run build`.
2. In cPanel, open **File Manager** (or connect with FTP, e.g. FileZilla).
3. Upload **everything inside `dist/`** (not the folder itself) into `public_html/`.
   - The `.htaccess` file is included — it carries the security headers and caching rules. Enable "show hidden files" in your FTP client to see it.
4. In cPanel: **SSL/TLS Status → Run AutoSSL** (Let's Encrypt) to get free HTTPS.
5. Once HTTPS works, open `.htaccess` and **uncomment the Force HTTPS block** (remove the `#` from the 4 lines).
6. Optional domain-based hosting update: nothing else needed — the site has no backend.

To update the site later: rebuild and re-upload `dist/`. Netlify/Vercel/GitHub Pages re-deploy automatically on push.

---

## 3. Security measures (what's in place and why)

Because the site is static, the classic attack surfaces (SQL injection, compromised admin panels, server vulnerabilities, phishing forms) simply do not exist. The protective layer in this repo:

### Built into the deploy configs

| Measure | Purpose |
|---|---|
| **HTTPS enforced** (HSTS header + platform SSL) | All traffic encrypted; downgrade attacks blocked |
| **Content-Security-Policy (CSP)** | Browser may only load scripts/styles/fonts/images from this site. Even if someone injected HTML, no external payload could load |
| **X-Frame-Options: DENY** | The site cannot be embedded in an iframe (clickjacking) |
| **X-Content-Type-Options: nosniff** | Files cannot be reinterpreted as a different type |
| **Referrer-Policy** | Doesn't leak visitor URLs to third parties (none are used anyway) |
| **Permissions-Policy** | Camera/mic/location APIs explicitly disabled |
| **`Options -Indexes`** (.htaccess) | Directory listing disabled on shared hosting |

### Site choices that reduce risk

- **No contact form** — LinkedIn is the only contact channel; nothing for bots to spam or exploit.
- **No personal data beyond public professional facts** — no email, phone, or address anywhere (also good for GDPR).
- **Fonts self-hosted** — no third-party font CDN requests (privacy + fewer supply-chain dependencies + faster).
- **Zero third-party scripts** — no analytics, no trackers; the only outbound link is LinkedIn.

### Keep it secure over time

1. **Enable 2FA** on your GitHub/Netlify/Vercel accounts and your **domain registrar** — account takeover is the realistic threat for a static site, not the site itself.
2. **Keep dependencies updated** occasionally:
   ```bat
   npm audit
   npm outdated
   npm update
   ```
   (or upgrade with `npm install <pkg>@latest`), then rebuild and redeploy.
3. **Registrar lock**: keep domain transfer lock ON at your registrar.
4. **Backups**: the git repo is the backup of the source; `dist/` is reproducible at any time.
5. If you add anything interactive later (a form, a newsletter), it becomes a server-side concern — treat it as a new project with its own validation, rate limiting, and spam protection.

---

## 4. Local development

- `start-dev.bat` — starts the dev server and opens the browser (localhost:5173)
- `stop-dev.bat` — stops the dev server
