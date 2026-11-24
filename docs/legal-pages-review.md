# Legal pages: before publishing

Branch `legal-pages-draft` adds `/privacy`, `/terms` and `/impressum`. They are
**drafts written by an AI from the app's code (updated 2026-11-24)**, not legal
advice. Nothing here is live until this branch is merged and deployed.

The terms text is shared with the app: `src/pages/legal/termsContent.js` here
and `src/content/terms.js` in sporvy-mobile are word for word the same. Change
both together.

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

1. Set `DRAFT = false` and `LAST_UPDATED` in `legalConfig.js`.
2. Merge to `main` and deploy as usual (needs Mahdi's go).
3. Check `https://www.sporvy.de/privacy`, `/terms` and `/impressum` load
   directly, and so does a refresh on `/groups` (`vercel.json` adds the SPA
   rewrite; if Vercel deploys from `dist/`, copy it there).
4. Put `https://www.sporvy.de/privacy` in App Store Connect and Google Play.
