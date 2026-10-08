---
name: Stavros Antoniou Portfolio
description: Dark topographic-survey one-pager — Crete's terrain rendered as live network infrastructure.
colors:
  ink: "#EAF0F9"
  ink-2: "#ADBED6"
  ink-3: "#8498B3"
  bg: "#070B14"
  accent: "#53E5DC"
  accent-ink: "#06322E"
  line: "rgba(132,152,179,0.22)"
  line-soft: "rgba(132,152,179,0.12)"
  contour-blue: "#78A4C8"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.2rem, 11vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.96
    letterSpacing: "-0.02em"
    fontVariation: "font-stretch 115%, uppercase"
  section-title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.9rem, 4.5vw, 2.7rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "font-stretch 108%"
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
  data:
    fontFamily: "'Martian Mono', monospace"
    fontSize: "0.72rem–0.85rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em–0.22em"
    fontVariation: "tabular-nums, uppercase for labels"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    padding: "1rem 2rem"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    padding: "0.5rem 1.05rem"
---

# Design System: Stavros Antoniou Portfolio

## Overview

**Creative North Star: "The Network Is the Terrain"**

A personal portfolio built as a night survey of Crete: the hero is a living topographic contour field drawn as network infrastructure, and every section below reads like the measured plates of an engineering report — coordinates, dates, credentials set in a mono data voice. The interface recedes; the terrain and the record lead.

The system is dark and quiet so that two things can be loud: the teal signal accent and the facts. Depth comes from layered linework and staggered motion, never from shadows or glass. All text is tinted from the page's blue hue — pure gray never appears.

**Key Characteristics:**
- Deep ink-navy ground with one electric teal accent reserved for signals
- Crisp geometric SVG/canvas linework as the only "imagery"
- Archivo semi-expanded caps for display; Martian Mono only for real data
- Motion is parallax and reveal choreography with exponential ease-out; reduced-motion collapses to static
- Square corners everywhere; the system owns zero border radii

## Colors

A single-hue dark palette with one signal accent; every neutral is tinted from the terrain blue.

### Primary
- **Signal Teal** (#53E5DC): the accent. Links, nav active state, focus rings, timeline diamonds, the "signal contour" in the canvas, key results. Never used as a background wash.

### Neutral
- **Survey Ink** (#EAF0F9): primary text — near-white tinted blue.
- **Dusk Ink** (#ADBED6): secondary text — summaries, details.
- **Haze Ink** (#8498B3): meta text — places, tags, footer. All three pass AA on the ground.
- **Night Ground** (#070B14): page background.
- **Survey Hairline** (rgba(132,152,179,0.22)): rules, timeline spine, list dividers.
- **Faint Hairline** (rgba(132,152,179,0.12)): secondary dividers, scrolled nav border.

### Named Rules
**The One Signal Rule.** Teal appears only where something is true, actionable, or measured: a link, a focus ring, a coordinate, one contour band. If teal decorates, it is wrong.

**The No-Pure-Gray Rule.** Every text and line color is tinted toward the terrain blue. A pure gray on this page is a bug.

## Typography

**Display Font:** Archivo (self-hosted variable, 62–125% width axis), fallback sans-serif
**Body Font:** Archivo
**Data Font:** Martian Mono (self-hosted variable)

**Character:** One engineered grotesque voice at two widths — expanded black caps announce, regular text reports. Martian Mono never sets prose; it only sets facts.

### Hierarchy
- **Display** (800, clamp(3.2rem→6rem), LH 0.96, stretch 115%, uppercase): the hero name. Second line is stroke-only.
- **Section Title** (700, clamp(1.9rem→2.7rem), stretch 108%): each section's single heading. No eyebrows, no numbers.
- **Body** (400/500, 1.05rem, LH 1.65, measure ≤68ch): copy.
- **Data** (400, 0.72–0.85rem, tabular): dates, periods, coordinates, tags, footers. Letter-spacing up to 0.22em on uppercase labels.

### Named Rules
**The Data-Only Mono Rule.** Martian Mono is earned by content: a number, a date, an ID, a coordinate. Mono used for "technical vibe" is a costume and gets replaced.

**The Verbatim Headline Rule.** The hero headline and role titles are the professional truth from the owner's record; rewording them is a content decision, not a styling one.

## Layout

One page, no router. Sections stack full-width with a shared inner container (max 74rem, centered), page gutter clamp(1.25rem→4rem). Section padding clamp(4.5rem→8.5rem) with more air above a heading than below it.

- Hero: full viewport (100svh) with canvas behind, content bottom-left mass.
- About: asymmetric 1.6fr / 0.9fr grid — prose left, fact table right.
- Experience: vertical timeline with a period column (150–200px) and body column; hairline spine with teal diamond markers.
- Skills: 2×2 typographic zones separated by top hairlines — never boxed cards.
- Education: two-column rows (period / record); certifications as a year + name ledger.
- Projects: full-width stacked articles under top hairlines.
- Contact: single column, centered mass, one primary action.
- Breakpoints: 900px collapses grids to single column; 720px hides nav section links (name + Connect remain).

## Elevation & Depth

**No shadows at rest.** Depth is conveyed by the canvas contour field, hairline layering, and motion. The only shadow in the system is the primary button's hover lift (offset 4px, 24px blur, teal at 0.18 alpha) — a response to state, not a resting property.

### Named Rules
**The Linework-Over-Glow Rule.** Depth comes from drawn lines and layered parallax. Glows, halos, and blur panels do not exist here.

## Shapes

Square everything. Corners are 0px by conviction: the nav CTA, the primary button, timeline diamonds (rotated squares), the canvas edges — all sharp. The only rounded primitives are browser-drawn focus outlines (1px radius) and the favicon's rounded tile.

## Components

### Buttons
- **Shape:** fully square (0px radius)
- **Primary (Connect CTA):** Signal Teal background, Accent-Ink text (#06322E), 1rem × 2rem padding, 700 weight, arrow glyph leading right
- **Hover / Focus:** translateY(-2px) + teal soft shadow; focus-visible 2px teal outline offset 3px
- **Outline (Nav Connect):** 1px teal border, teal text, transparent ground; hover inverts to filled

### Navigation
- Fixed top bar; transparent at top, rgba(7,11,20,0.92) + faint hairline once scrolled
- Left: contour-rings monogram + name. Right: section links (Dusk Ink, teal when active) + outline Connect button
- 720px and below: links hidden, name + Connect persist

### Timeline Entry
- Period column in Data type; role (title weight) with teal company name; place in mono; summary, detail, and middot-separated tag line
- Wipe reveal on scroll (clip-path on children, staggered)

### Signature Component — Contour Field
- Canvas rendering marching-squares iso-lines of a 3D value-noise heightfield; 12 elevation bands; the 0.505 band drawn in Signal Teal as the "signal contour"
- Pointer raises a smooth hill under the cursor; field drifts over time; pauses off-screen and under reduced motion

## Do's and Don'ts

### Do:
- **Do** keep every neutral tinted toward the terrain blue; check against #070B14 for ≥4.5:1 body text.
- **Do** use Martian Mono only for real data — dates, coordinates, IDs, tags.
- **Do** let the canvas rest: fewer, brighter contour bands beat many faint ones.
- **Do** gate hidden pre-states behind the `.js` class so the page is fully readable without JavaScript.

### Don't:
- **Don't** add eyebrows/kickers above headings, section numbers, or icon-in-box card grids — banned by the floor.
- **Don't** introduce gradients on text, glass blur, glow halos, or side-stripe borders.
- **Don't** load any third-party font, script, or tracker; everything ships from the site's own origin (also a security stance).
- **Don't** place contact information other than location and the LinkedIn link; no email, phone, or address.
