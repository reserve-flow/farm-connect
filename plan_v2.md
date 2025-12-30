Plan to implement V2 (see docs/v2/* for requirements and copy)

1) Orientation and guardrails
- Read docs/v2/v2.md (structure), v2_copy.md (exact copy + tone), v2_visuals.md (colors), v2_typography.md (type/spacing), next.md (principles), faq.md (if exists) to internalize “Curator + Judge / registry, not marketplace”.
- Set default language to Farsi; ensure all UI has EN equivalents; no marketing language, no payment verbs.
- Enforce critical rules: failures more visible than success; commitments/history immutable; platform never handles money.

2) Data and domain model (align API, DB, and UI types)
- Entities: Farmer (id, name, region, years_farming, product_type, invited:boolean, biography copy, status: active/suspended), Commitment (id, farmerId, quantity, unit, deliveryWindowStart/End, createdAt, status: open/delivered/failed/pending, public link slug), Reservation (id, commitmentId, buyerContact?, status: reserved/delivered/not_delivered, markedByBuyerAt, note), SuspensionFlag (id, farmerId, reason, createdAt).
- Immutability: prevent edits to commitments after confirmation; status updates only append events; keep audit timestamps.
- Derive visible “track record” from commitments + reservations outcomes; keep failures undeletable.

3) Routing and IA
- Pages: / (Homepage narrative), /harvests (list of live commitments), /farmers/[id] (seller profile with history + current listings), /how-trust-works, /story, /terms, /onboarding (stepper screens), /api routes or server actions for data.
- URL language toggle via `?lang=fa|en`, default fa; persist selection (cookie/local storage) without aggressive redirects.

4) Layout + global frame
- Implement sticky header (logo left; center tagline “Curated farmers. Public commitments.”; right: View harvests / How trust works / Story; quiet language switcher).
- Footer with Story, Trust Manifesto, Terms & Responsibility, Contact; keep legal text here only.
- Max width 1100–1200px; base spacing 8px grid; neutral background (#FAFAF8); borders 1px gray; radii 4–6px; no shadows unless necessary.

5) Theming and typography
- Add font stack Inter + Vazirmatn with fallbacks as per v2_typography.md; set weights 400/500/600; hero 28–32px calm.
- Apply color tokens from v2_visuals.md: text #111, secondary #6B7280, trust blue #1F3A5F, success #2F6F4E, failure #8B2E2E, warning #9A6B1E; background off-white #FAFAF8.
- Provide optional dark mode only if time permits: charcoal bg #0F1115, text #E5E7EB, borders #2A2E35; keep failure highly visible.
- Status badges use outlined/solid with these colors; ensure non-color cues (text, icons).

6) Copy and language system
- Wire UI to exact copy blocks in v2_copy.md (hero, steps, manifesto, onboarding screens, error/failure messages, labels). Keep Farsi default; ensure English parallel text exists.
- Implement translation structure (e.g., JSON or dictionary) with keys per section; avoid word-for-word mirroring per rules.
- Buttons: verbs only (View harvests, Reserve, View history); no “Buy”/“Secure”.

7) Homepage build (single-scroll)
- Sections in order: Hero (primary CTA “View active harvests”, secondary “How trust works”), How Trust Works (3 icon/steps), Live Commitments (cards list with status badge, farmer + region, quantity, delivery window), Trust Manifesto block with CTA to story, Footer.
- Cards click through to farmer profile or commitment detail. Ensure failure badges are red and readable.

8) Seller profile page
- Header: name, region (map dot), “Selected farmer” badge, years farming.
- Commitment history table/timeline: columns date, quantity, delivery window, outcome; failures in red; permanent display.
- Current listings cards: quantity, delivery window, status, Reserve + View history buttons.
- “Why this farmer is here” section (2–3 sentences).
- Suspension state: show suspension banner using failure copy.

9) Harvests list page
- Table/grid of active commitments; filter/sort by region, delivery window, status; link to profile/detail.
- Include status badges (open/delivered/failed/pending) with color + text; no payment language.

10) Onboarding flow (first-time)
- Multi-step screens per v2_copy: positioning, how it works, responsibility, entry. Persist acknowledgement (local storage/cookie) to avoid re-show; include “Terms & responsibility” link.

11) Interaction flows and rules
- Reserve flow: create Reservation with status reserved; no payment steps; show confirmation with copy clarifying platform role.
- Buyer can mark delivery outcome (delivered/not delivered); update reservation and propagate to commitment history; add failure flag logic (auto-suspend if threshold? configurable).
- Commitment detail linkable, immutable; show timestamps and outcomes.
- Error/failure messaging uses v2_copy wording; avoid apologetic tone.

12) Language/RTL handling
- Detect `lang` param; set direction (fa = rtl, en = ltr); mirror layout while keeping number alignment/readability; ensure tables don’t break.
- Persist language choice quietly; no flags.

13) Accessibility and trust cues
- High contrast text; focus states on links/buttons; keyboard nav for tables/cards; aria labels for status badges (include text).
- No auto-animations; if any, keep minimal and purposeful.

14) Testing and validation
- Unit test translation lookups and status badge rendering (colors + labels).
- Integration tests for reservation flow and failure visibility (cannot delete failed record; badge color); snapshot key pages (home, profile).
- Manual QA: RTL rendering, lang switch, sticky header behavior, links/CTA paths, suspension banner visibility, dark mode if implemented.

15) Delivery checklist
- All copy sourced from v2_copy.md; no stray marketing text.
- Colors/type per v2_visuals.md and v2_typography.md.
- Homepage sections and IA match v2.md mapping.
- Default Farsi; English accessible; failures loud; payments absent.
- Document any config flags (e.g., auto-suspend thresholds) in README/notes.
