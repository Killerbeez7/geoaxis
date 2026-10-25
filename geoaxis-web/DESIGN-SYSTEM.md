# GeoAxis design system

One brand, one set of rules. Every page is built from the tokens and components below;
if something new is needed, add it here first instead of styling it ad hoc.

Source of truth: `src/app/globals.css` (tokens, type scale, patterns) and
`src/components/ui/*` (shared components).

## Brand

- **Olive** (`--brand-olive-*`) – the dark, calm base: header, footer, dark sections.
- **Ochre / gold** (`--brand-ochre-*`) – the accent: primary buttons, highlights, small details.
  Use it sparingly; one gold call to action per view.
- **Montserrat** (`font-mont`) for everything. Weights: 400 text, 500 navigation and chips, 600 headings, labels and buttons.
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
| `tx-inverse` / `tx-inverse-muted` / `tx-inverse-subtle` | Headings / body text / meta text on dark surfaces |
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

One scale for the whole site; every class sets size, line height, weight and tracking.
No raw `text-sm`/`text-lg` or one-off sizes in components (buttons and the logo excepted).

| Class | Desktop / phone | Role |
|---|---|---|
| `typo-display` | 60 / 38 px | Home hero headline only |
| `typo-h1` | 48 / 34 | Page title – exactly one per page |
| `typo-h2` | 36 / 28 | Section title |
| `typo-h3` | 24 / 21 | Sub-section title, title of a large card (photo cards, service rows) |
| `typo-h4` | 20 / 18 | Title of a regular card, sidebar card, menu panel |
| `typo-h5` | 16 | Small title: list item, FAQ question, form label, contact value |
| `typo-lead` | 18 / 17 | Intro paragraph under a page or section title |
| `typo-body` | 16 | Body text – the default; card descriptions in 2–3 column grids |
| `typo-small` | 14 | Descriptions in dense UI (4-column cards, sidebars, menus), meta, help text |
| `typo-ui` | 15 | Navigation and footer links |
| `typo-label` | 12, uppercase | Card meta, sidebar titles, step counters |
| `typo-eyebrow` | 12, uppercase | Section kicker: the label with the short gold line |
| `typo-badge` | 12 | Text inside badges and the mobile bar |
| `typo-stat` | 40 / 32 | Big numbers |
| `prose-geo` | 16, line height 1.8 | Long-form text; caps the line length at 42rem |

**Colour of text.** Headings take the heading colour automatically. Body text is `tx-secondary`.
Use `tone-muted` only for meta (dates, counts, hints) – never for descriptions people need to read.
`tone-strong`, `tone-muted` and `tone-accent` follow the surface: inside `.on-dark` they turn
white, soft white and light gold, so one component works on light and dark backgrounds.
`.on-light` resets a light card that sits on a dark section.

**Headings follow the outline** (`h1` → `h2` → `h3`): pick the tag for structure and `size` for
looks. A title outside the outline (a promo card in a hero, a sidebar card) is a `p` with a heading size.

**Line length.** Reading columns are 42rem wide (`prose-geo`, service and article pages);
leads stop at `max-w-2xl`.

**Small rules.** Separate tags and meta with a middle dot ` · `. Keep numbers with their unit
(`2008&nbsp;г.`, phone numbers) and use `tabular-nums` for numbers that line up.

### Text components (`src/components/ui/Text.tsx`, `Chip.tsx`)

| Component | Use |
|---|---|
| `Heading` | Any title. `as` sets the tag, `size` the look (`display`, `h1`…`h5`). |
| `Text` | Paragraphs and short text. `size`: `lead` / `body` / `small`; `tone`: `default` / `strong` / `muted` / `accent`; `weight`. |
| `Eyebrow` | Uppercase kicker; `rule={false}` gives the plain label (card meta, sidebar titles). |
| `Badge` | Static pill: time frame, count, category on a photo. Tones `accent`, `neutral`, `on-dark`, `on-image`. |
| `Chip` | Pill link or toggle: quick choices, filters, jump links, related topics. Tones `light` / `dark`, sizes `sm` / `md`. |

## Layout and spacing

- Width: `container-page` (max 80rem, 20/24/32 px side padding). Reading columns: 42rem.
- Pages with a sidebar: content + a 21rem sidebar (`InquiryCard`, related links).
- Sections: `Section` component – `py-16 md:py-24` by default, `compact` for secondary blocks.
  Alternate `page` and `subtle` tones; dark tones (`inverse`, `deep`) at most twice per page.
- Grids: `gap-6` for cards, `gap-10`–`gap-16` between columns of text and media.
- The fixed header height is `--header-h` (64 px mobile, 76 px desktop); heroes offset by it.

## Cards

- One anatomy: optional photo or icon, optional label (`Eyebrow rule={false}`), title, description,
  footer (link or actions). Padding `p-6` (`sm:p-7`/`sm:p-8` for wide cards), `rounded-2xl`,
  `border-br-light`, `shadow-card`; clickable cards lift on hover.
- Titles: large photo cards and service rows `typo-h3`; regular cards `typo-h4`; narrow cards `typo-h4`/`typo-h5`.
- Descriptions use the default text colour: `typo-body` in 2–3 column grids, `typo-small` in narrow cards.
- In grid lists, cards line up row by row with subgrid (`row-span-N grid grid-rows-subgrid`):
  photos, text blocks, lists and footers start at the same height across a row. A card shown on its
  own (e.g. in a hero) turns this off (`ArticleCard aligned={false}`).
- In a list of services, the quote button is `dark` and "Научете повече" is a text link; gold stays
  for the main action of the view.
- A page never shows the same photo twice: category pages compare photos by content
  (`src/lib/photos.ts`) and show a contour panel with the category icon instead of a repeat.

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
| `PageHero` | The header of every inner page: breadcrumbs, `h1`, intro, actions (an eyebrow only when it adds something the breadcrumb doesn't, e.g. a category's scope), and an aside (photo, category index, featured article) so the right side is never empty on wide screens; `compact` for list and utility pages |
| `HeroMedia` | Photo next to a `PageHero` |
| `Breadcrumbs` | Visible trail + `BreadcrumbList` structured data |
| `CtaBand` | Final call to action at the bottom of a page (quote + phone + channels) |
| `InquiryCard` | Sticky sidebar call to action on long pages |
| `ContactChannels` | Phone, Viber, WhatsApp, e-mail, hours – always from `config/content/contacts` |
| `TrustBar` | The four trust points (experience, equipment, area, response time) |
| `StatGrid` | Company numbers |
| `IconBadge` | Icon in a soft square |
| `Heading`, `Text`, `Eyebrow`, `Badge`, `Chip` | Text building blocks – see Typography |
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
- Buttons and inputs are at least 44 px tall (`h-11`), chips at least 36 px. Form errors are
  announced (`aria-live`) and linked to their field with `aria-describedby`.
- Motion is subtle and respects `prefers-reduced-motion`.
