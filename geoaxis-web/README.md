# GeoAxis website

Marketing site for GeoAxis (geodetic services, Sofia). Next.js App Router + Tailwind CSS v4, deployed on Vercel.

## Development

```bash
npm install
cp env.example .env.local   # fill in the values
npm run dev                 # http://localhost:3000
npm run lint
npm run build
```

## Where things live

| What | Where |
|---|---|
| Page copy (hero, about, stats, reviews…) | `src/config/content/*` |
| Services, prices, timeframes | `src/config/services/categories.ts` |
| Company / licence details (footer, privacy, schema) | `src/config/content/company.ts` |
| Articles, FAQ, glossary | `src/config/polezno/*` |
| Design tokens and typography | `src/app/globals.css` |
| Contact form rules (limits, services) | `src/lib/contact.ts` |

Fields marked `TODO(client)` stay hidden on the site until they are filled in.

## Social preview images

Open Graph images must be 1200×630 JPGs. After changing a source listed in
`src/lib/og-sources.json`, run:

```bash
node scripts/generate-og-images.mjs
```

## Environment variables

See `env.example`. `CONTACT_FROM_EMAIL` should use a domain verified in Resend;
without it, emails are sent from Resend's test sender.
