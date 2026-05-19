# AthleteHub — Product Redesign Spec
**Date:** 2026-05-19
**Author:** Mahdi Abdelmalek
**Status:** Approved

---

## 1. Problem

Athletes miss local sports events because information is scattered across WhatsApp groups, Instagram pages, and club websites. By the time they find out, the registration deadline has already passed. There is no single place in Germany — especially in smaller cities like Passau — where athletes can discover local events early, get reminded before deadlines, and see who from their community is going.

---

## 2. Solution

AthleteHub is a hyperlocal sports event discovery platform. Running-first, starting in Passau. The core promise: **never miss a local race again.**

Athletes discover upcoming events, save them, get email reminders before deadlines close, and see how many people from their city are going. Every action in the app creates a shareable moment (Instagram Stories, TikTok) — turning users into the growth channel.

---

## 3. Target Users

**Primary:** Students and young athletes in Passau (especially international students who are excluded from local WhatsApp/Instagram circles).
**Secondary:** Local running club members who want a central place to find events.
**Event side:** Local clubs and individual organizers who want more visibility for their events.

---

## 4. Core Concept

### North Star
Pull athletes away from Instagram. Show them events **before** deadlines, not after. Make it social enough that they bring their friends.

### What Instagram can't do that AthleteHub does
- Surfaces all local events in one place
- Shows "X days left to register" prominently
- Sends email reminders before deadlines
- Shows how many people from your city are going
- Generates a shareable card when you register

---

## 5. Features

### 5.1 Keep (redesigned)

**Events Page (homepage)**
- All upcoming events near the user's city, sorted by deadline
- Each card shows: event name, sport, date, location, difficulty
- Deadline counter: "14 days left" (orange under 14 days, red under 3 days)
- "X people from Passau going" — social proof counter
- Eco badge if equipment sharing is available at the event
- Save button (triggers email reminder flow)

**Event Detail Page**
- Full event info
- Deadline countdown front and center
- "Who's going" list (avatars + count)
- Share button → generates shareable card + WhatsApp share link
- Eco badge with short explanation if applicable
- External registration link (we don't handle payments in v1)
- Simple comments/Q&A section

**Groups Page**
- Training groups organized around a specific event
- Shows: group name, target event, members, upcoming session, level
- Join button
- No complex chat — just a simple group feed

**Dashboard**
- Saved events with countdown
- Registered events
- Basic activity log (manual entry for now)
- Achievements (simple milestones)

**Host an Event**
- Simple form: name, sport, date, location, registration link, deadline, description, eco option yes/no
- Submitted events go to a simple admin review (you manually approve via Supabase dashboard)
- No complex checklist workflow

### 5.2 Cut Completely
- Hotel booking
- Sponsors and discount codes
- Charity events section
- Health metrics (HRV, VO2max, body fat, sleep tracking)
- Equipment rental logistics
- Event approval checklist workflow
- Merch store

### 5.3 Add (new features)

**Shareable Card Generator**
- Triggered when a user saves or registers for an event
- Auto-generates a branded PNG: event name, date, city, user name, AthleteHub logo
- Download button + direct Instagram Stories share
- Built with HTML Canvas — no external service

**Email Notification System**
- User saves event → email confirmation
- 7 days before registration deadline → reminder email
- 1 day before registration deadline → urgent reminder
- Built with Resend (free tier: 3,000 emails/month)

**"Who's Going" Counter**
- Real-time count of users who saved or registered for each event
- Shown on event card and event detail page
- Creates social proof and FOMO

**Community Challenges**
- Monthly city-level challenges: "Passau 100km June Challenge"
- Users opt in, log km toward the goal
- Progress visible to all participants
- Shareable milestone cards ("I hit 50km this month 🔥")

---

## 6. Eco Identity

AthleteHub is not a rental logistics platform. The eco angle is a **brand value**, not a feature to build.

- Events can be tagged as "Eco-Friendly" if equipment sharing is available
- A small green badge appears on the event card and detail page
- Short explanation: "Equipment sharing available at this event — reduce waste, save money"
- No rental system, no inventory management — that comes much later if at all

---

## 7. Social Sharing Strategy

Every touchpoint in the user journey has a built-in share moment:

| Moment | Shareable content |
|---|---|
| Save an event | "I'm training for [Event] — [X] days to go 🏃" |
| Register for an event | "I'm in — [Event Name], [Date] 🏅 #AthleteHub" |
| Training milestone | "Week [X] of training — [X]km logged 💪" |
| Post-event | "I finished [Event] — [time/result] 🎉" |
| Challenge milestone | "50km down, 50 to go — Passau 100km Challenge 🔥" |

All cards are branded with the AthleteHub logo. Every share is organic distribution in the city.

---

## 8. Technical Architecture

### Frontend
- React 19 + Vite (existing)
- React Router (existing)
- Tailwind CSS (existing)
- Recharts for basic activity charts (existing)
- HTML Canvas for shareable card generation (new)

### Backend
- **Supabase** (free tier)
  - PostgreSQL database
  - Auth (email + Google OAuth)
  - Real-time subscriptions for "who's going" counter
  - Tables: `users`, `events`, `saves`, `registrations`, `groups`, `group_members`, `activities`, `challenges`, `challenge_participants`

### Email
- **Resend** (free tier: 3,000 emails/month)
  - Triggered on event save
  - Scheduled reminders 7 days and 1 day before deadline
  - Simple React Email templates

### Hosting
- **Vercel** (free tier) — deploy directly from GitHub

---

## 9. Build Order

1. **Clean up** — remove cut features from codebase
2. **Supabase setup** — schema, auth, connect to React
3. **Event card redesign** — deadline counter, social proof counter, save button
4. **Email notification flow** — Resend integration, reminder triggers
5. **Shareable card generator** — HTML Canvas, download + share
6. **Host an event form** — connect to Supabase, manual admin approval
7. **Deploy to Vercel** — live URL to share in Passau

---

## 10. Go-To-Market

### Phase 1: Passau (now → 6 months)
- Manually curate 15-20 local running events before launch
- Soft launch: personal outreach to 30 people in the Uni Passau community
- Contact local running clubs (LAC Passau, DJK, TSV) — free listings
- Partner with Unisport Passau — they list events, we give them visibility
- Post in Uni Passau Facebook groups and WhatsApp study groups
- Weekly Instagram content: "3 runs in Passau this month — deadline soon"
- Show up physically at local running events

**Success after 3 months:** 200 registered users, 20 events listed, 5 shareable cards posted organically on Instagram.

### Phase 2: Munich + Nürnberg (month 6-12)
- Replicate Passau model in both cities
- Add self-serve event submission (organizers post without manual curation)
- Target university sports offices (LMU, TU München)
- 10x audience of Passau

### Phase 3: Berlin + Hamburg (month 12-18)
- Organizers are self-serving
- Community layer is active
- Berlin Marathon as anchor event for German-wide awareness

### Phase 4: Germany → Austria/Switzerland → EU
- Full self-serve platform
- Introduce monetization: organizer premium listings, brand sponsorships
- Expand to French, Dutch, and Belgian markets

---

## 11. What We Are Not Building (v1)

- Mobile app (web first, app later)
- Payment processing (external registration links only)
- Hotel booking
- Equipment rental logistics
- Sponsor/affiliate system
- In-app chat (groups have a simple feed, not a full chat)
- AI features
- Multi-language support (German + English only)
