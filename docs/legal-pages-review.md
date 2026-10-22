# Legal pages: before publishing

Branch `legal-pages-draft` adds `/privacy`, `/terms` and `/impressum`. They are
**drafts written by an AI from the app's code**, not legal advice. Nothing here
is live until this branch is merged and deployed.

## 1. Blockers (the pages are false or unlawful until these are done)

- [ ] **`support@sporvy.de` cannot receive mail.** `sporvy.de` has no MX record
      (checked 2026-10-23). Every page, and the app's own delete-account error
      message, points users there. Set up forwarding at checkdomain, then send a
      test email to it.
- [ ] **Fill every highlighted gap** in `src/pages/legal/legalConfig.js`: name,
      postal address, phone or contact form, Supabase region, email provider,
      backup retention. The Impressum needs an address where post is actually
      received. If you don't want your home address public, look at an
      Impressum/c/o address service.
- [ ] **Sign the data processing agreements.** Supabase: dashboard → Legal
      documents (DPA). Vercel: part of its terms, but check the plan you're on.
      Then fill the transfer-mechanism gap in section 8 of the privacy policy
      (DPF certification and/or SCCs, per provider).
- [ ] **Log retention** (privacy section 9): check Supabase and Vercel for your plan.

## 2. Decisions for you

- **Gender, birth year and fitness level are mandatory in onboarding**
  (`OnboardingScreen.js:91`), but nothing in the app uses them yet. GDPR's data
  minimisation principle makes "required, for a feature we haven't built" hard
  to defend. Simplest fix: make gender optional in the app.
- **Age 16+ is stated but not enforced.** Onboarding accepts any birth year. A
  check against the birth year already collected would make it true.
- **The website loads 19 photos from images.unsplash.com**, which sends each
  visitor's IP address to Unsplash (USA). Either self-host them (their licence
  allows it) or add Unsplash to section 8. The fonts were already moved off
  Google for this reason.
- **Language.** The drafts are in English, like the app. A German version of
  the privacy policy is advisable for German users.
- **Profiles RLS.** The policy says the app does not show your profile to
  others. Confirm in the SQL editor who can `SELECT` from `profiles`. If every
  signed-in user can, the sentence is true of the UI but not of the API.

## 3. Have it checked

Give the three pages to someone competent: the Uni Passau law clinic, IHK
Niederbayern's founder advice, or a Datenschutz generator (e.g. eRecht24)
for comparison. Things worth asking about specifically:

- Whether self-reported fitness level counts as health data (Art. 9 GDPR).
  The draft assumes it doesn't.
- The liability clause (Terms §6) and the change clause (Terms §8).

## 4. Publish

1. Set `DRAFT = false` and `LAST_UPDATED` in `legalConfig.js`.
2. Merge to `main` and deploy as usual.
3. Check `https://www.sporvy.de/privacy`, `/terms` and `/impressum` load
   directly, and so does a refresh on `/groups`. Before this branch every deep
   link 404'd; `vercel.json` adds the SPA rewrite (`/:path*`, not `/(.*)`).
   If the Vercel project deploys from `dist/` rather than building the repo,
   `vercel.json` must be copied into `dist/` instead.
