# Content still needed from the client

Everything below is already built into the site and stays hidden until it is filled in.

| What | File | Notes |
|---|---|---|
| Starting price and timeframe per service | `src/config/services/categories.ts` (`priceFrom`, `duration`) | Typical case in Sofia, e.g. `"от 250 лв."` and `"2–3 работни дни"`. Priority: заснемане за проектиране, екзекутивно заснемане, трасиране на имотни граници, трасиране на сграда, нанасяне на сграда в кадастъра, скица/схема, ПУП, консултация. |
| Permission to quote the 3 client reviews | `src/config/content/testimonials.ts` (`consentConfirmed`) | A written OK (e.g. Viber message) from each client. |
| Company and licence details | `src/config/content/company.ts` | After the firm migration: legal name, ЕИК, VAT number, address, АГКК licence, КИИП registration. |
| Google Business Profile link | `src/config/content/company.ts` (`googleBusinessUrl`) | Create the profile first; the link is added to the structured data. |
| Verified sender email | Vercel env `CONTACT_FROM_EMAIL` | Verify geoaxis.bg in Resend, then e.g. `GeoAxis <noreply@geoaxis.bg>`. |
| Review by a licensed surveyor | Article `udostoverenie-po-chl-54a`, services `ekzekutivno-zasnemane`, `na-imotni-granici` | Check the legal and procedural wording. |
| Review by a lawyer | `/politika-za-poveritelnost`, section 8 | Transfers outside the EU (Vercel, Resend, Google). |
| New photos | `public/images/services/*` + `src/config/services/categories.ts` | 12 services reuse a photo that is already on their category page, so the site shows a pattern panel there instead: заснемане на фасади; скица, проект за изменение, схема, удостоверение за идентичност (кадастър); координация на проекти; изменение на ПУП, РУП, план за регулация, смяна на предназначение; първоначална консултация, анализ и насоки. Add each new photo as its own file and point the service's `thumbnail` and `heroImage` to it; the panel is replaced automatically. Also wanted: team portraits and equipment. |
