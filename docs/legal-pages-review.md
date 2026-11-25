# Legal pages: before publishing

Branch `legal-pages-draft` adds `/privacy`, `/terms` and `/impressum`. They are
**drafts written by an AI from the app's code (checked against sporvy-mobile
and its migrations on 2026-11-26)**, not legal advice. Nothing here is live
until it is deployed to production.

Status 2026-11-26: `DRAFT = false` and `LAST_UPDATED = '2026-11-26'` in
`legalConfig.js` (no draft banner, no noindex). A preview was deployed to the
`sporvy-app` Vercel project; production is untouched.

The terms text is shared with the app: `src/pages/legal/termsContent.js` here
and `src/content/terms.js` in sporvy-mobile are word for word the same
(checked 2026-11-26). Change both together.

## 0. Still marked [Fill] on the pages

These render as yellow `[...]` marks on the live page until fixed:

- [ ] **Privacy §4, Heart rate:** "The app must ask for this consent before
      the first heart rate is saved". The app does not ask yet (sporvy-mobile
      has no consent step). Either build the consent step or remove the heart
      rate field, then delete the `<Fill>` in `PrivacyPage.jsx`.

Everything else in `legalConfig.js` is filled in (operator, phone, database
region, email provider, backup retention). `vatId` is empty on purpose and is
simply not shown.

## 1. Must do before publishing (the pages are false until these are done)

- [ ] **`support@sporvy.de` must receive mail.** Every page and the app point
      there. Set up forwarding at checkdomain, then send yourself a test.
- [ ] **Supabase DPA:** dashboard → Organization → Legal documents → request
      and sign the DPA. Vercel's and Resend's DPAs are part of their terms
      (check the plan you're on). Privacy §8 relies on these.
- [ ] **Heart rate consent** (privacy §4, highlighted). Average heart rate in
      My training can be health data (Art. 9 GDPR). Either the app asks once
      ("I agree that Sporvy stores my heart rate and shows it to partners I
      share with") before the first one is saved, or the field is removed.
      Then delete the highlighted sentence.
- [ ] **Reports older than 12 months** must be deleted (privacy §9). Needs a
      small cron job (an additive migration) or a calendar reminder to delete
      them by hand.
- [ ] **Telling people when you act on a report** (terms §6, privacy §4,
      DSA Art. 17): when you remove someone's content or account, email them
      what you did and why. Keep a short note of each decision.

## 2. Worth deciding

- **Your home address is public** in the Impressum. That is the law for a
  German service. If you'd rather not, an Impressum/c-o address service
  (~€10–20/month) gives you an address where post is received for you.
- **German version** of the privacy policy: advisable once you have German
  users who don't read English. The Impressum is already in German.
- **Unsplash photos on www.sporvy.de** are now disclosed (privacy §8).
  Self-hosting them would let you delete that paragraph.
- If you register a business (Gewerbe) or get a VAT ID, add it to
  `legalConfig.js`.

## 3. Free checks instead of a lawyer

- Compare with a generator: datenschutz-generator.de (Dr. Schwenke) or
  eRecht24's free Impressum generator.
- Uni Passau: ask the law faculty's student legal advice / founder support
  (Gründungsberatung) for a quick read.
- IHK Niederbayern offers free first consultations for founders.

## 4. Publish

1. Fix the items in section 0 and section 1 first.
2. Build and deploy (Mahdi's go only). `vite build` empties `dist/`, so the
   deploy files must be put back after every build:
   ```sh
   npm run build
   cp vercel.json dist/vercel.json   # then add the static-site keys below
   cd dist && npx vercel link --project sporvy-app --scope sporvy --yes
   rm -f .env.local .gitignore        # the link writes a token file; don't upload it
   cd .. && npx vercel deploy dist --prod --yes --scope sporvy
   ```
   `dist/vercel.json` must be:
   ```json
   {
     "framework": null,
     "buildCommand": "",
     "installCommand": "",
     "outputDirectory": ".",
     "rewrites": [{ "source": "/:path*", "destination": "/index.html" }]
   }
   ```
   Without the link, `vercel deploy dist` creates or uses the project named
   `dist`, which serves **app.sporvy.de**, not www.sporvy.de.
   Alternatively promote the checked preview:
   `npx vercel promote <preview-url> --scope sporvy`.
3. Check `https://www.sporvy.de/privacy`, `/terms` and `/impressum` load
   directly, and so does a refresh on `/groups`.
4. Merge `legal-pages-draft` into `main` so the source matches what is live.
5. Put `https://www.sporvy.de/privacy` in App Store Connect and Google Play.
