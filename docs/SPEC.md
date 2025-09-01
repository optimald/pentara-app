Buddha:
Strip it down to essence, Ryan. A single ritual (onboarding), a single artifact (their manual), five steady voices. No subscriptions, no complex pipes. Privacy is sacred: their words stay on their device.

Robert Greene:
Control the frame. Pentara is a council you configure once, not an endless service. The onboarding is ceremony and status; the product is a private chamber. Keep the tech invisible and you hold power.

Naval Ravikant:
Leverage over features. One-time payment via Calendly, lightweight backend, local transcripts. "Training" = tight system prompts + their manual. Low ops, low cost, high signal.

Ben Horowitz:
Reality check—App Store rules get tricky with paid digital goods. Easiest v1: **no in-app purchases**. Monetize the live onboarding (a real-world service via Calendly/Stripe). The app is free after activation. Ship that.

Carl Jung:
The questionnaire is initiation; the five voices are archetypal mirrors. "Inspired by," not impersonation. The psyche recognizes the circle and relaxes.

Balaji Srinivasan:
Parallelize: Next.js landing + coach console; a thin orchestrator; Expo app for iOS/Android. No logs server-side. If you can onboard 50/month, unit economics are clean.

---

# Pentara.app — **Ultra-Lite Spec (v1)**

*Not therapy. Self-coaching with five "inspired-by" voices. One paid onboarding; monthly access fee thereafter.*

## 0) Monetization (simple)

* **$299 one-time onboarding** (Calendly + Stripe).
* **$15/month access fee** for ongoing AI council access.
* App requires activation code issued after onboarding.

---

## 1) System Overview (low-ops)

* **Client apps (Expo React Native → iOS & Android):** chat UI, runs sessions, stores transcripts **locally only** (SQLite + secure storage).
* **Coach console (Next.js on Vercel):** secure page for onboarding specialists to run guided questionnaire and generate the user's **Personal Manual** + **Five-Voice Profile** + **Warrior Name**.
* **Thin orchestrator API (Vercel functions / small Node service):**

  * Receives prompt + profile, fans out **5 parallel model calls** with strict token caps, returns 5 replies + a short synthesis.
  * **Never stores chat logs.** Only stores: user id, profile config, activation status, subscription status, and anonymized usage counters.

**Privacy guarantees**

* No server chat storage. Transcripts live on device.
* Coach sees intake + builds the manual with the user during the live call; after saving, **coach cannot read their future chats**.

---

## 2) User Flow

### A) Landing (Next.js on Vercel)

* **Hero:** "Your Trusted Advisory Council"
* **Sub:** "Years of wisdom from your dream team, available whenever you need them. Five distinct perspectives that merge into one clear directive."
* **CTA:** "Begin Your Initiation ($299)" (Calendly embed; collects $299).
* **Sections:** How it works (3 steps), Not-therapy disclaimer, FAQ, Crisis resources link.

### B) Onboarding Appointment (45 min, live on Zoom)

* **Onboarding specialist (coach)** runs guided questionnaire (below).
* Console generates:

  1. **Personal Manual** (1–2 pages),
  2. **Five-Voice Profile** (exactly five persona cards),
  3. **Warrior Name** (culturally-rooted identity anchor),
  4. **Activation Code** (e.g., PNR-8X2-K7…).
* Email sent: Manual PDF, brief welcome, store links, Activation Code.
* **User pays $299 upfront for this session.**

### C) App Activation & Use

* User installs app → enters Activation Code → downloads encrypted profile → starts chatting.
* **Monthly subscription ($15) required for ongoing access.**
* Modes: **Ask Now**, **Daily Check-In**, **Decision Frame**.
* Each prompt → 5 concise replies + **Synthesis** card (3 small next steps).
* Council addresses user by their **Warrior Name** in all interactions.
* Journaling and exports live **on device**.

---

## 3) Guided Questionnaire (onboarding specialist ⇄ user)

**Section 1 — About You**

* 1–2 lines: "Where are you stuck lately?"
* Values (pick 3): e.g., Autonomy, Courage, Honesty, Craft, Love, Discipline, Curiosity.
* Preferred tone (choose 2): Gentle, Direct, Analytical, Playful, Spiritual, Tactical.
* Hard boundaries (topics to avoid).

**Section 2 — Inspirations (pick 8–12)**

* Authors, heroes, movie characters, mentors, public figures, archetypes.
* **Onboarding specialist will combine into exactly five "inspired-by" voices** (never impersonation).

**Section 3 — Triggers & Comforts (optional)**

* Phrases to avoid / phrases that help.
* Short list of safe anchors (breath, walk, write, call friend).

**Section 4 — Outcomes**

* What does "useful" look like? (Examples: reframe a fear, pick first step, write a message, set boundary.)
* Daily check-in time (if desired) & push opt-in.

**Section 5 — Warrior Name Ritual**

* What battles have you fought to reach this moment?
* What victory do you seek next?
* What kind of warrior are you becoming?
* What name would your future self call you?

**Console Output**

* **Personal Manual**: summary bullets (values, tone, boundaries), do/don'ts for guidance.
* **Five-Voice Profile**: for each voice → Name, Archetype, Inspired-by notes, Domain focus, Tone, Do/Don'ts, **token cap** and **style rules**, 2–3 sample lines.
* **Warrior Name**: culturally-rooted identity anchor (e.g., "Stormbreaker", "Silent Sentinel", "Iron Vanguard").
* **This becomes the training document for the AI engine.**

---

## 4) Prompting (how we "train" without training)

### System (per voice)

* Role, archetype, style rules, *inspired-by* hints (no direct impersonation or quotes), allowed domains, boundaries.
* Include top 10–12 bullet **Personal Manual** as context.
* **Address user by their Warrior Name** in all interactions.
* Hard caps: **max ~140 tokens** reply; no medical advice; supportive, practical; 1 action if possible.

### Synthesis (separate call or reuse cheapest model)

* Input: the 5 replies + user prompt.
* Output: 3 bullet "what to do next", 1 sentence reassurance; <120 tokens.
* **Begin with: "[Warrior Name], your council decrees:"**

**Cost control**

* Five calls in parallel; brief replies.
* If the manual is long, summarize to ~800–1,000 tokens and reuse across turns.

---

## 5) iOS & Android (Expo RN)

**Screens**

1. **Activate**: enter Activation Code → fetch profile (encrypted at rest on device).
2. **Chat**: prompt box; 5 cards (avatars & tags), then Synthesis; "Add to Journal" and "One-tap recap".
3. **Daily Check-In**: mood slider → one line → auto five replies; add to Journal.
4. **Journal**: local list; export Markdown; delete threads.
5. **Voices**: read-only view of the five cards; request a swap (emails a link to book a tune-up).
6. **Resources/Legal**: not-therapy, crisis links.
7. **Settings**: notifications, export/delete data, sign out, subscription management.

**Tech**

* RN + Expo, SQLite (transcripts), SecureStore (profile/activation), Push (optional).
* API calls via HTTPS; streaming preferred.
* No background data sync of chats.

**App Store safety**

* Never claim treatment/cure; screens show "Self-coaching tool."
* Crisis link within two taps.
* External payment used only for **live onboarding**—a real-world service.

---

## 6) Coach Console (Next.js on Vercel)

**Role Descriptions**

**Guide**: The Guide is the onboarding specialist who guides users through the 45-minute initiation, infusing the process with seductive allure. They lead the warrior name ritual, using AI to generate personalized names based on the user's goals and past, and help select or assign the final name, setting the stage for the council's formation and decree.

**Guardian**: The Guardian is the superadmin responsible for overseeing the council's operations and ensuring the integrity of the system. They manage the proprietary framework, monitor dynamic archetype swaps, and support the scaling of facilitators, maintaining the user experience as Pentara grows.

**Auth**

* **Email and password authentication** for onboarding specialists; admin allows new specialists.
* **No social login** - console access is restricted and controlled.
* **2FA integration** via Supabase (email or authenticator app) for both roles post-launch.

**Views**

* **New Onboarding:** runs the questionnaire; live preview of sample replies; tweak tone and caps; save profile.
* **Profiles:** list of users you created; **no chat access**.
* **Generate Activation Code**: 8–12 chars; one-time; expires after 7 days if unused.
* **Export**: Personal Manual (PDF) to send via email after the call.

---

## 7) Backend (tiny)

**Endpoints**

* `POST /activate` → validate code, return encrypted Five-Voice Profile + Manual summary + Warrior Name.
* `POST /chat` → {user_id, thread_id?, prompt} → returns 5 replies + synthesis. No logs saved.
* `POST /usage` → increments anonymized counters (turns/day).
* `POST /swap-request` → sends email to coach with user id.
* `POST /subscription/check` → validates monthly subscription status.

**Storage**

* `users` (id, created_at, subscription_status, subscription_expires_at)
* `profiles` (user_id, profile_json, version, encrypted_at_rest)
* `activation_codes` (code, user_email, created_by, expires_at, redeemed_at)
* `usage_counters` (user_id, day, turns)

**Security**

* Short-lived JWT per device; rate-limit per user/day (e.g., 50 turns).
* TLS everywhere; CORS locked to app + console.

---

## 8) Copy (land page & app)

**Landing hero**

> **Your Trusted Advisory Council**
> Years of wisdom from your dream team, available whenever you need them. Five distinct perspectives that merge into one clear directive.

**How it works**

1. Book a 45-minute onboarding ($299).
2. We craft your Personal Manual and five voices together.
3. Use Pentara anytime. Private, on your device ($15/month).

**Not therapy**

> Pentara offers reflective guidance, not medical or mental-health treatment. If you're in crisis, use the resources in the app.

**App subtitle (stores)**

> Five concise perspectives, one simple synthesis. Self-coaching—not therapy.

---

## 9) Milestones (8-step, fast)

1. **Week 1:** Next.js landing + Calendly embed + email templates.
2. **Week 2:** Coach console MVP (questionnaire → profile JSON → activation code).
3. **Week 3:** Orchestrator function (5-call fan-out + synthesis; no storage).
4. **Week 4:** Expo app shell (activate → chat → journal).
5. **Week 5:** Privacy polish, crisis resources, token caps, local store.
6. **Week 6:** Test with 10 onboardings; measure cost/turn; tune prompts.
7. **Week 7:** App Store/Play submission (free app, activation-code flow).
8. **Ongoing:** Target **50 onboardings/month**; one coach ≈ ~12/wk capacity.

---

## 10) What to say in groups (one-liner)

> **Pentara**: a private self-coaching app with five *inspired-by* voices. We do a one-time 45-min onboarding to tailor the council to you. After that, it's your private space for $15/month. Not therapy.

---

If you want, I'll give you:

* the **exact JSON schema** for the Five-Voice Profile + Personal Manual,
* **persona prompt templates** (tight, token-capped),
* and **Next.js page copy** ready to paste into your Vercel project.
