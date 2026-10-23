# GeoAxis design system

One brand, one set of rules. Every page is built from the tokens and components below;
if something new is needed, add it here first instead of styling it ad hoc.

Source of truth: `src/app/globals.css` (tokens, type scale, patterns) and
`src/components/ui/*` (shared components).

## Brand

- **Olive** (`--brand-olive-*`) – the dark, calm base: header, footer, dark sections.
- **Ochre / gold** (`--brand-ochre-*`) – the accent: primary buttons, highlights, small details.
  Use it sparingly; one gold call to action per view.
- **Montserrat** (`font-mont`) for everything. Weights: 400 body, 500 UI, 600 headings and buttons.
- **Contour lines** (`/patterns/contours.svg`) – the topographic pattern. Add `pattern-contours`
  to a dark section or a hero; never on top of photos or body text.
- **Logo** – always the `Logo` / `LogoMark` component (`components/ui/Logo.tsx`), never an `<img>`.

## Colour tokens

Components only use the semantic tokens; the raw `--brand-*` and `--neutral-*` values stay in `:root`.

| Token | Use |
|---|---|
| `bg-page` / `bg-subtle` | Default and alternating light sections, cards |
| `bg-inverse` / `bg-deep` | Dark sections (`inverse`), header, footer and final CTA (`deep`) |
| `bg-brand` | Hover state of dark buttons |
| `tx-primary` | Headings, important text |
| `tx-secondary` | Body text |
| `tx-muted` | Meta text, captions, placeholders |
| `tx-inverse` / `tx-inverse-muted` | Headings / body text on dark surfaces |
| `accent` / `accent-hover` | Gold fills (primary button, step numbers, list bullets) |
| `accent-text` | Gold **text** on light backgrounds (AA contrast: #805f1c) |
| `accent-on-dark` | Gold **text** on dark backgrounds (AA contrast: #dfbd55) |
| `accent-soft` | Pale gold panels and icon badges |
| `tx-on-accent` | Text on gold fills (dark olive, never white) |
| `br-light` / `br-default` / `br-strong` | Dividers / inputs and outlines / emphasis |
| `br-on-dark` / `br-accent` | Borders on dark surfaces / gold-tinted borders |
| `danger` | Form errors and required-field markers only |

On dark surfaces, overlays and hovers use white alpha (`bg-white/5` … `bg-white/12`).

**Never** put `accent` (fill gold) behind white text or use it as text colour on white –
it fails contrast. Use `accent-text` or `accent-on-dark`.

## Typography

One class per role; no ad-hoc `text-*` sizes in components. Sizes are fluid (`clamp`).

| Class | Role |
|---|---|
| `typo-display` | Home hero headline only |
| `typo-h1` | Page title (exactly one `h1` per page) |
| `typo-h2` | Section title |
| `typo-h3` / `typo-h4` | Card and sub-section titles |
| `typo-lead` | Intro paragraph under a page or section title |
| `typo-body` | Body copy (the default `body` style; use only to reset) |
| `typo-small` | Secondary text, card descriptions, form help |
| `typo-ui` | Navigation and interface labels |
| `typo-caption` | Meta lines, tags, footnotes |
| `typo-label` | Small uppercase labels |
| `typo-eyebrow` | Section kicker with the gold line, above a title |
| `prose-geo` | Long-form text: articles, legal pages, service descriptions |

Headings follow the document outline (`h1` → `h2` → `h3`) – choose the tag for structure and
the `typo-*` class for size. Inside `.on-dark` headings turn white automatically.

## Layout and spacing

- Width: `container-page` (max 80rem, 20/24/32 px side padding). Long text: `max-w-3xl`.
- Sections: `Section` component – `py-16 md:py-24` by default, `compact` for secondary blocks.
  Alternate `page` and `subtle` tones; dark tones (`inverse`, `deep`) at most twice per page.
- Grids: `gap-6` for cards, `gap-10`–`gap-16` between columns of text and media.
- The fixed header height is `--header-h` (64 px mobile, 76 px desktop); heroes offset by it.

## Shape and elevation

| Radius | Use |
|---|---|
| `rounded-full` | Chips, pills, badges, round icon buttons |
| `rounded-lg` | Small rows and links inside cards and menus |
| `rounded-xl` | Buttons, inputs, menu items, icon badges |
| `rounded-2xl` | Cards and panels |
| `rounded-3xl` | Large media and feature blocks |

Shadows: `shadow-card` (resting cards), `shadow-lift` (hover / featured media),
`shadow-cta` (primary button only).

## Icons

Lucide only (`react-icons/lu`), 16–20 px inline, 20–24 px in an `IconBadge`. Brand logos
(Viber, WhatsApp) come from `react-icons/fa6`. Decorative icons get `aria-hidden="true"`.
Service icons are mapped once in `src/config/services/icons.ts`.

## Components (`src/components/ui`)

| Component | Use |
|---|---|
| `Button` | Every button and button-like link. Variants: `primary` (gold, one per view), `dark`, `outline`, `outline-light` (on dark), `link`, `link-light`. Sizes `md` / `lg`. `track` adds an analytics event. |
| `Section` | Page section with tone, spacing and optional contour pattern |
| `SectionHeader` | Eyebrow + title + description (+ action) for a section |
| `PageHero` | The header of every inner page: breadcrumbs, eyebrow, `h1`, intro, actions, optional media |
| `HeroMedia` | Photo next to a `PageHero` |
| `Breadcrumbs` | Visible trail + `BreadcrumbList` structured data |
| `CtaBand` | Final call to action at the bottom of a page (quote + phone + channels) |
| `InquiryCard` | Sticky sidebar call to action on long pages |
| `ContactChannels` | Phone, Viber, WhatsApp, e-mail, hours – always from `config/content/contacts` |
| `TrustBar` | The four trust points (experience, equipment, area, response time) |
| `StatGrid` | Company numbers |
| `IconBadge` | Icon in a soft square |
| `CheckList` | List with gold check marks |
| `FaqAccordion` + `faqSchema` | FAQ with `FAQPage` structured data |
| `JsonLd` | Safe structured-data script tag |

Feature components live next to their area: `components/home`, `components/services`,
`components/projects`, `components/polezno`, `components/forms`, `components/layout`.

## Page recipe

1. `PageHero` (home uses `HomeHero`).
2. Content sections – alternate tones, one `h2` each.
3. Long pages add a sticky `InquiryCard` in the sidebar on desktop.
4. `CtaBand` last, pre-filled with the service when the page is about one.

## Conversion rules

- One primary (gold) action per view: **„Поискайте оферта“** → `/contacts`, with `?service=<slug>`
  when the page is about a service so the form opens on the right step.
- The phone number is the secondary action everywhere; on mobile the bottom bar keeps
  call, Viber and quote one tap away.
- Track every contact action with `track` / `data-track`: `quote_click`, `call_click`,
  `viber_click`, `whatsapp_click`, `email_click`, `hero_quickstart`.
- Claims must be true and checkable. Prices, reviews and company details stay hidden until
  the client confirms them (`TODO(client)` fields, see `CLIENT-TODO.md`).

## Accessibility

- Contrast AA everywhere (see the colour notes above).
- Visible focus: the global gold `:focus-visible` ring – never remove outlines.
- One `main`, one `h1`, logical heading order, skip link to `#main-content`.
- Every image has a meaningful `alt` (or `alt=""` if decorative); icons are `aria-hidden`.
- Buttons and inputs are at least 44 px tall (`h-11`), chips at least 40 px. Form errors are
  announced (`aria-live`) and linked to their field with `aria-describedby`.
- Motion is subtle and respects `prefers-reduced-motion`.
