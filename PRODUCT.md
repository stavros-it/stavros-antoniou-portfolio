# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite (user decision). Static export — a one-page personal portfolio that builds to plain static files deployable to any host. Graphics and animation are hand-rolled: generative canvas topography (marching squares over a value-noise field), rAF-lerped scroll parallax, pointer-reactive hero layers, IntersectionObserver reveals. No animation libraries. Fonts self-hosted via @font-face.

## Users

1. Recruiters and hiring managers evaluating Stavros Antoniou for IT/networking roles — they skim for role, seniority, stack, and proof within seconds.
2. Peers and potential collaborators in IT, networking, and electrical engineering.
3. Stavros himself — the site is his professional home on the web and must make him proud to share the URL.

## Product Purpose

A one-page personal portfolio that presents Stavros Antoniou — IT Specialist, Electrical/Networking & Data Communications Engineer (MSc), based in Heraklion, Crete, Greece — and his 14+ year career managing and securing complex platforms. Success: a visitor understands who he is, what he has built and operated, and reaches his LinkedIn profile to connect.

## Positioning

A networking and electrical engineer's portfolio that looks like his actual world: the terrain of Crete rendered as live network infrastructure. Not a template portfolio with icon cards — the map *is* the mechanic.

## Operating Context

Visitors arrive mostly from LinkedIn, business cards, and referrals, on desktop and mobile, often in office/daylight conditions. The site must load fast, work without JS for content reading, and stay legible on small screens.

## Capabilities and Constraints

- One page, full story: Hero, About, Experience timeline (2010 → today), Skills by domain, Education, Certifications, Projects, Contact.
- Contact is LinkedIn-only. No email, no phone, no street address anywhere — only "Heraklion, Crete, Greece" as location.
- Real content only: facts sourced from Stavros's LinkedIn profile (extracted 2026-10-08). No invented claims, clients, metrics, or testimonials.
- Parallax is a pinned requirement; must respect prefers-reduced-motion.
- Static hosting target undecided; build must deploy anywhere (GitHub Pages, Netlify, Vercel, shared hosting).

## Brand Commitments

- Name: Stavros Antoniou.
- Headline (verbatim from profile): "IT Specialist — Electrical, Networking & Data Communications Engineer (MSc)".
- Location statement: "Based in Heraklion, Crete, Greece."
- Voice: plain, confident, first-person, technical without jargon theater.

## Evidence on Hand

- LinkedIn profile content: headline, about text, 10 experience entries, 3 education entries, 4 certifications, 3 projects, skills list (extracted to temp files 2026-10-08; curated into site content).
- Heraklion coordinates: 35.3387° N, 25.1442° E (real, used as design data).
- No professional photo available — hero is typographic + generative topography by explicit user choice.

## Product Principles

1. The terrain is the network: every visual decision derives from Crete's topography drawn as living infrastructure.
2. Real data only — dates, coordinates, credentials are facts, presented in a data voice, never decorative.
3. Quiet confidence: the site demonstrates depth through curation, not volume.
4. Everywhere-hostable: no server, no runtime dependency, nothing that breaks on shared hosting.
5. Content survives without JavaScript; motion is enhancement, never a gate.

## Accessibility & Inclusion

WCAG AA contrast on dark ground; keyboard navigation with visible focus; prefers-reduced-motion honored with a static, fully readable page.
