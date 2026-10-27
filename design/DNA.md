# Design DNA (measured 2026-10-21)

Primary reference: **docebo.com** (Marco's stated favourite). Screenshots are in `design/references/docebo-home-*`, 14 frames at 1440 and 17 at 390. They are internal study material only: we borrow traits, never assets, copy or their purple.

## Docebo, measured at 1440
| Trait | Measurement |
|---|---|
| Grid | 1280 content (x 80→1360); colour panels run edge to edge of the content box. The grid breaks for full-bleed photo/video and the CTA atmosphere |
| Type | Expanded heavy grotesk for display. Section H2 ≈ 40–44 px, panel H2 ≈ 46 px, giant stats ≈ 120 px (2M). Body ≈ 16–18 px; mono uppercase for labels and buttons. Display:body ≈ 2.5–3× on H2 and 7× on stats |
| Space | Sections ≈ 120–160 px apart; tight inside groups (16–24 px); tiles gap ≈ 24 px |
| Colour | **Stone bg ≈ 55 %**, **saturated brand panels ≈ 30 %** (pillars, AI band, results tiles), navy text ≈ 10 %, a second accent (lime) ≈ 3 % on one stat tile. The large share of colour fields is what makes it feel rich |
| Shape | Panels 16 px radius; tiles 8–12 px; **folder tabs** on the pillar panel; **diagonal notch** cut into the top edge of a full-width colour band |
| Imagery | Real people photography (rounded 16 px) with floating product-UI chips on top; product UI inside colour panels on translucent white cards; a horizontal collage of many product screens; video testimonial cards (tall, photo, logo top-left, play button) |
| Motion | Headline fill grey→ink on scroll; pinned pillar tabs; collage marquee; subtle floating 3D props |
| The one thing | **Big saturated colour fields holding real product UI**, alternating with calm stone sections. |

## Gap: our v3 vs Docebo
| Docebo has | We had | Fix |
|---|---|---|
| ≈ 30 % saturated colour fields | ≈ 5 % blue, the rest stone/ink | Colour fields in our blue family (no new hues): pillar panel, results tiles, CTA atmosphere |
| Folder-tab pillar panel in colour, UI on translucent cards | Explorer: ink frame + white panel | Explorer becomes a full blue gradient panel with folder tabs; product cards translucent on blue |
| "Results" bento: giant numbers, quote with mini stats, coloured tiles | Testimonial card grid | Impact bento (placeholders until real numbers) |
| Product collage marquee | — | Two rows of product crops drifting in opposite directions, with pause |
| Atmospheric full-bleed CTA | Small ink card | Full-bleed blue atmosphere with wave motif, centred headline |
| Varied section openings | Same eyebrow + H2-left everywhere | Mix: centred statement, panel-led, number-led, collage-led |

## Direction "Bento-demo" (kept, now with Docebo colour density)
```
CONCEPT:  The hero is a working product; below it, big blue colour fields hold the product, alternating with calm stone.
TYPE:     Schibsted Grotesk 800 (Marco's choice B); stats up to ~128 px; hero ≈ 4.4× body.
PALETTE:  stone 55 % · blue fields (oklch 0.40–0.58 0.17–0.20 266) 30 % · ink 12 % · status tints 3 %. Blue *buttons* stay the one action colour; fields use deeper/darker blues so buttons still pop (white buttons on fields).
IS NOT:   purple, lime, stock photos of people, glassmorphism for its own sake, fake numbers.
```
