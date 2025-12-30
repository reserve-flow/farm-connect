# V2 Migration Progress (based on plan_v2.md)

## Reorganized work plan
- [x] Orientation & guardrails (read v2 docs, copy, visuals, typography, principles, FAQ)
- [ ] Foundation: language defaults, translation structure, Farsi first with EN parity, no payment language
- [ ] Data & domain model: Farmer/Commitment/Reservation/SuspensionFlag types, immutability + audit timestamps
- [ ] Routing & IA: pages `/`, `/harvests`, `/farmers/[id]`, `/how-trust-works`, `/story`, `/terms`, `/onboarding`, server actions/api
- [ ] Layout & theming: sticky header/footer, max width 1100–1200px, spacing grid, color tokens, typography (Inter + Vazirmatn), optional dark mode
- [ ] Copy system: wire exact copy blocks from v2_copy.md, status labels, buttons, failure/error language
- [ ] Homepage build: hero, how trust works, live commitments, trust manifesto block, footer
- [ ] Harvests list page: table/grid with filters/sort, status badges, links
- [ ] Farmer profile page: identity header, commitment history timeline/table, current listings, suspension banner, “why here”
- [ ] Onboarding flow: multi-step copy, persistence of acknowledgement, terms/responsibility link
- [ ] Interaction flows: reservation creation, delivery outcome reporting, immutable commitment detail, failure visibility, suspension logic hooks
- [ ] Language/RTL handling: lang param detection/persistence, dir switching, mirrored layout without breaking tables, no flags
- [ ] Accessibility & trust cues: focus states, aria on status badges, keyboard nav for tables/cards, high contrast, minimal motion
- [ ] Testing & validation: unit tests (translations, badges), integration (reservation/failure visibility), snapshots (home/profile), manual QA list
- [ ] Delivery checklist: ensure copy/colors/type, IA match, default FA with EN available, failures loud, payment-free, document config flags

## Notes
- Default language set to Farsi with English available; tone must stay registry-like (no marketing, no payment verbs).
- Failures must remain more visible than successes; commitments/history immutable; platform never handles money.

## Current state snapshot (v1)
- App Router shell with `src/app/layout.tsx` (Inter + Vazirmatn, lang=fa dir=rtl) rendering `BottomNav`; metadata and hero copy are marketplace/marketing oriented.
- `src/app/page.tsx` delegates to `src/pages/Home.tsx`, which is a marketing-style listing page (pricing badges, “تحویل مطمئن”, payment language) with mock lot data/reservation modal; not aligned with v2 IA or copy.
- Theme tokens in `src/styles/globals.css` use bright blue/green/orange palette and large radius; not matching v2 visuals (off-white, deep blue, failure red, small radius, 8px spacing).
- Next i18n config sets default locale to fa with locales [fa,en], but there is no translation system or lang param handling; copy is hardcoded and partially English.
- Data model limited to Lot/Farmer/Reservation mock types; no commitment/reservation outcome immutability or audit fields; mock data in `src/data/mockLots.ts`.

## Work done
- Aligned base theme tokens to v2 visuals/typography palette (off-white background, deep trust blue, muted gray, failure red, trust green, warning amber, smaller radius 6px) in `src/styles/globals.css`; dark mode tokens updated to charcoal background with high-contrast text/borders.
- Added minimal i18n scaffolding (`src/constants/i18n.ts`) with lang helpers and shared nav/footer copy blocks; switched `Header` and `Footer` to use shared labels (default lang still FA, pending URL/cookie wiring).
- Updated app metadata in `src/app/layout.tsx` to remove marketing/payment language and align with v2 stance (“public commitments, no platform payments”).
- Added client-side language resolver (`src/hooks/useLang.ts`) using `?lang=` + cookie fallback; wired Header/Footer to respect it and propagate links with lang param.
- Swapped App shell to use sticky `Header` and footer (`src/app/layout.tsx`), removing BottomNav; prep for v2 IA frame.
- Scaffolded v2 IA routes with placeholders: `/harvests`, `/farmers/[id]`, `/how-trust-works`, `/story`, `/terms`, `/onboarding` (all lean sections ready for detailed content).
- Replaced v1 marketing homepage with v2-aligned skeleton sections (hero with correct copy/CTAs, “How trust works” 3 steps, manifesto block, placeholder for live commitments) in `src/app/page.tsx`.
- Added shared translation copy from `v2_copy.md` into `src/constants/copy.ts` (FA default, EN parallel) and wired homepage sections to use it via `useLang`.
- Hooked `useLang` into `Providers` to update `<html>` `lang`/`dir` dynamically so EN renders LTR, FA stays RTL.
- Refactored domain types to Farmer/Commitment/Reservation/SuspensionFlag with immutable/audit fields; kept legacy Lot types isolated. Added mock data for farmers, commitments, reservations, suspensions in `src/data/mockCommitments.ts`.
- Added shared `StatusBadge` component (dual-language labels, color-coded per v2 palette).
- Implemented real layouts for `/harvests` (commitments table with status) and `/farmers/[id]` (identity, suspension banner, history table, current listings with badges) using mock data.
- Harvest table farmer names now link to their profile (`/farmers/[id]`) with lang preserved.
- Applied translation helper to harvests/farmer pages; live commitments title comes from shared copy.
- Expanded reservations mock data; removed legacy lots API service and added commitments/farmers/reservations mock API (`src/services/api/commitments.ts`).
- Restored a legacy `lots` API shim for compatibility while migration continues; added commitments export to API index.
- Added react-query hooks for commitments/farmers (`useCommitments`, `useFarmerCommitments`, `useFarmers`, `useFarmerById`) and switched harvest/farmer pages to use them instead of direct mock imports.
- Enriched mock commitments/reservations with pending/open/not-delivered cases for outcome visibility.
- Migrated `/lot/[id]` to show commitment details via commitments API; removed legacy `LotDetail` page. Added extra suspension mock for repeated failures.
- Rebuilt `/search` to use commitments/farmers data with status badges and lang-aware labels; removed legacy `src/pages/Search.tsx` dependency.

## How trust works copy (ready to wire)
- EN: “We log every commitment publicly, so anyone can see when a farmer promises a delivery and when it is fulfilled or missed.”
- EN: “Reservations are simple requests — no payments on the platform — and each outcome is recorded with time and reporter.”
- EN: “Repeated failures surface as suspension flags; they stay visible so buyers know the history before reserving.”
- FA: «ما هر تعهد را به‌صورت عمومی ثبت می‌کنیم تا همه ببینند کشاورز چه زمانی قول تحویل می‌دهد و تحویل یا عدم تحویل چه زمانی رخ می‌دهد.»
- FA: «رزرو فقط درخواست ساده است و هیچ پرداختی روی پلتفرم انجام نمی‌شود؛ هر نتیجه با زمان و گزارش‌کننده ثبت می‌شود.»
- FA: «شکست‌های تکراری به شکل پرچم تعلیق نمایش داده می‌شود و در دید می‌ماند تا خریدار قبل از رزرو تاریخچه را ببیند.»
