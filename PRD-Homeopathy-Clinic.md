# Product Requirements Document (PRD)
## হোমিও চিকিৎসা খানা (Homeopathy Clinic) — Lead-Gen & CMS Website

**Document Owner:** Product Management
**Status:** Draft v1.0
**Last Updated:** August 2026

---

## 1. Project Overview

### 1.1 Project Name
হোমিও চিকিৎসা খানা (Homeopathy Clinic)

### 1.2 Objective
Build a highly SEO-optimized, local lead-generation website for a homeopathy clinic. The site's primary conversion goal is to drive users toward booking appointments via WhatsApp, minimizing friction between discovery and contact.

### 1.3 Success Metrics
- Organic search ranking for local homeopathy-related keywords (city/area-specific)
- WhatsApp CTA click-through rate from Treatment and Home pages
- Page load speed (Core Web Vitals — LCP < 2.5s, CLS < 0.1)
- Bounce rate reduction on mobile traffic

### 1.4 Vibe / Aesthetic
- Premium, trustworthy, medical-grade credibility
- Ultra-clean layout — explicitly **no clutter ("no gij-bij")**
- Generous whitespace, calm color palette, confident typography
- Every screen should feel intentional; no decorative elements without functional purpose

### 1.5 Target Audience
- Local patients (city/neighborhood-level) searching for homeopathy treatment for chronic and common ailments
- Mobile-first users (majority of local health searches originate on mobile)
- Users with low tolerance for friction — expect one-tap contact via WhatsApp

---

## 2. Tech Stack & Architecture

### 2.1 Core Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend Framework | **Next.js (App Router)** | SSR/SSG for top-tier SEO, fast initial paint |
| Styling | **Tailwind CSS** | Utility-first, consistent design tokens, fast iteration |
| Backend / Auth / DB | **Supabase** (Postgres + Auth + Storage) | Managed backend, row-level security, instant REST/GraphQL |
| Hosting | Vercel (recommended for Next.js SSR) | Native Next.js integration, edge caching |
| Image Handling | Supabase Storage + `next/image` | Optimized delivery, authentic photo hosting |

### 2.2 Architecture Flow — Route Groups

Use Next.js **Route Groups** to cleanly separate public marketing pages from the admin CMS, without affecting the URL structure.

```
/app
 ├── (public)/
 │    ├── layout.tsx          # Public header/footer, SEO metadata
 │    ├── page.tsx            # Home
 │    ├── about/page.tsx
 │    ├── doctors/page.tsx
 │    ├── treatments/
 │    │    ├── page.tsx       # Grid of all treatments
 │    │    └── [slug]/page.tsx # Dynamic SEO landing page per disease
 |    ├── Testimonial/.tsx
 │    └── contact/page.tsx
 │
 ├── (admin)/
 │    ├── layout.tsx          # Auth-guarded admin shell
 │    ├── login/page.tsx
 │    └── dashboard/page.tsx  # CMS editor for site_settings
 │
 ├── api/
 │    └── ... (route handlers if needed for form/webhook logic)
 │
 └── layout.tsx                # Root layout (fonts, providers)
```

**Key Architectural Rules:**
- `(public)` and `(admin)` share no navigation chrome — each has its own `layout.tsx`.
- Admin routes are protected via Supabase Auth middleware (`middleware.ts`) checking session before rendering `(admin)` segment.
- All public pages should default to **Server Components** for SEO; interactivity (forms, WhatsApp CTA) isolated into small **Client Components**.
- Treatment pages (`/treatments/[slug]`) use `generateStaticParams` + ISR (Incremental Static Regeneration) so new diseases added via CMS/DB are automatically built without full redeploys.

---

## 3. Design System & UI/UX Rules

### 3.1 Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary-dark-green` | `#0F6B5B` | Headers, trust elements, primary text accents, icons |
| `clean-white` | `#FFFFFF` | Base background, whitespace, cards |
| `accent-gold` | *(to be finalized, e.g. `#C9A227`)* | CTA buttons only (WhatsApp/Book Now) — used sparingly for maximum contrast and urgency |
| `neutral-gray` | `#4B5563` | Body text, secondary information |

**Rule:** Gold is reserved exclusively for conversion actions (CTA buttons). It must never be used for decorative or non-actionable elements — this preserves its visual "pull" toward booking.

### 3.2 Typography
- Clean, highly legible sans-serif for body text
- Slightly more editorial/serif-adjacent weight acceptable for headings to convey "premium clinic" feel
- Strict type scale (no ad-hoc font sizes) — define in `tailwind.config.ts`

### 3.3 Mobile-First Navigation Rule (Critical UX Requirement)

This is a **non-negotiable UX rule** for the mobile experience:

- **Home Page:** Standard header (logo, minimal nav links, WhatsApp CTA button) is acceptable.
- **All Sub-Pages** (About, Doctors, Treatments, Treatment Detail, Contact):
  - Standard navigation/header is **replaced** with a clean **top-left Back Arrow (←)**.
  - Tapping the back arrow returns the user to the **Home page**.
  - This mimics native app navigation patterns (iOS/Android push-navigation feel).
- **Strictly Prohibited:** Hamburger menus, nested dropdowns, or multi-level mobile nav on sub-pages. The mobile experience should feel like a linear, app-like stack, not a traditional multi-tab website.

**Rationale:** Reduces cognitive load, reinforces the "clean, no gij-bij" aesthetic, and keeps user focus on page content and the CTA rather than navigation chrome.

### 3.4 Imagery Guidelines
- Only high-quality, authentic photographs of the actual clinic, interiors, and doctors
- **No stock cartoon illustrations, generic medical vector icons, or clip-art**
- Photos should be optimized (WebP/AVIF via `next/image`) and stored in Supabase Storage, referenced via URLs in `site_settings` / `doctors` tables

### 3.5 Layout Principles
- Consistent max-width container across pages (e.g. `max-w-6xl mx-auto`)
- Section spacing driven by a fixed vertical rhythm scale (e.g. multiples of 8px/16px)
- Every page must have exactly **one primary CTA** visible above the fold on mobile

---

## 4. Database Schema (Supabase)

### 4.1 Design Philosophy — Single-Row CMS

Rather than building a complex, over-engineered CMS, the site settings are managed through a **Single-Row CMS pattern**:

- A single table, `site_settings`, contains **exactly one row** (`id = 1`), enforced via a `CHECK` constraint.
- The admin dashboard performs only `UPDATE` operations on this row — never `INSERT`/`DELETE` for this table.
- This allows the clinic owner to edit hero text, contact numbers, and images **without any code deployment**.

### 4.2 Table: `site_settings`

```sql
CREATE TABLE site_settings (
  id                  INT PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Enforces single row
  clinic_name         TEXT NOT NULL DEFAULT 'হোমিও চিকিৎসা খানা',
  tagline             TEXT,                         -- Short hero subtext
  hero_heading        TEXT,                         -- Main hero H1 text
  hero_image_url      TEXT,                         -- Supabase Storage URL
  about_text          TEXT,                         -- Rich text / markdown for About page
  whatsapp_number      TEXT NOT NULL,                -- E.164 format, e.g. +8801XXXXXXXXX
  emergency_contact    TEXT,                         -- Alternate phone number
  clinic_address       TEXT,
  clinic_lat           NUMERIC,                      -- For LocalBusiness schema / map
  clinic_lng           NUMERIC,
  opening_hours        TEXT,                         -- e.g. "Mon-Sat: 10am - 8pm"
  facebook_url          TEXT,
  instagram_url         TEXT,
  meta_title            TEXT,                         -- Default/global SEO title
  meta_description      TEXT,                         -- Default/global SEO description
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- Seed the single row
INSERT INTO site_settings (id, whatsapp_number)
VALUES (1, '+8801XXXXXXXXX')
ON CONFLICT (id) DO NOTHING;
```

### 4.3 Table: `doctors`

```sql
CREATE TABLE doctors (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name         TEXT NOT NULL,
  qualification     TEXT NOT NULL,      -- e.g. "BHMS, DBMS"
  designation       TEXT,               -- e.g. "Chief Physician"
  bio               TEXT,
  photo_url         TEXT,
  years_experience  INT,
  display_order     INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT now()
);
```

### 4.4 Table: `treatments`

```sql
CREATE TABLE treatments (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug              TEXT UNIQUE NOT NULL,   -- e.g. "joint-pain", used in /treatments/[slug]
  title             TEXT NOT NULL,          -- e.g. "Joint Pain Treatment"
  short_description TEXT,                  -- Used on grid/listing card
  full_content      TEXT,                  -- Long-form SEO content (markdown/rich text)
  icon_or_image_url TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  faq_json          JSONB,                 -- [{ "question": "...", "answer": "..." }, ...]
  display_order     INT DEFAULT 0,
  is_published      BOOLEAN DEFAULT true,
  created_at        TIMESTAMPTZ DEFAULT now(),
  updated_at        TIMESTAMPTZ DEFAULT now()
);
```

### 4.5 Table: `appointment_leads` (Optional — Analytics/Backup Log)

Even though the primary flow redirects to WhatsApp, logging the lead server-side (before redirect) is recommended for analytics and follow-up.

```sql
CREATE TABLE appointment_leads (
  id                INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  patient_name      TEXT NOT NULL,
  disease_concern   TEXT,
  preferred_date    DATE,
  phone_number      TEXT,
  source_page       TEXT,               -- e.g. slug of treatment page
  created_at        TIMESTAMPTZ DEFAULT now()
);
```

### 4.6 Row-Level Security (RLS) Notes
- `site_settings`, `doctors`, `treatments`: **Public read access** (anon role), **write access restricted** to authenticated admin role only.
- `appointment_leads`: **Insert-only** for public (anon), no public read/update/delete.
- Admin authentication handled via Supabase Auth (email/password for the clinic owner/admin).

---

## 5. Sitemap & Page Structure

### 5.1 Public Pages `(public)`

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, trust indicators, treatment highlights, doctor preview, CTA |
| About | `/about` | Clinic story, philosophy, pulled from `site_settings.about_text` |
| Doctors | `/doctors` | Profile cards for the 3 BHMS/DBMS doctors, pulled from `doctors` table |
| Treatments (Listing) | `/treatments` | Grid of all diseases (Joint Pain, Diabetes, Gastric, etc.) |
| Treatment Detail | `/treatments/[slug]` | Dynamic, SEO-optimized page per disease with FAQ schema |
| Contact | `/contact` | Address, map, WhatsApp CTA, appointment form |

### 5.2 Admin Pages `(admin)`

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Supabase Auth email/password login |
| CMS Dashboard | `/dashboard` | Form-based editor to `UPDATE` the `site_settings` row, manage `doctors` and `treatments` entries |

---

## 6. Key Features

### 6.1 Dynamic WhatsApp CTA
- Appointment forms (on Home, Treatment Detail, and Contact pages) capture: **Name, Disease/Concern, Preferred Date**.
- On submit:
  1. (Optional) Insert record into `appointment_leads` for tracking.
  2. Construct a pre-filled message string, e.g.:
     ```
     Hello, I would like to book an appointment.
     Name: {name}
     Concern: {disease}
     Preferred Date: {date}
     ```
  3. URL-encode the message and redirect to:
     ```
     https://wa.me/{whatsapp_number}?text={encoded_message}
     ```
  4. `whatsapp_number` is pulled dynamically from `site_settings` — never hardcoded.

### 6.2 SEO Requirements

**LocalBusiness Schema (JSON-LD)** — injected in root/public layout, populated from `site_settings`:

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "হোমিও চিকিৎসা খানা",
  "image": "{hero_image_url}",
  "telephone": "{whatsapp_number}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{clinic_address}"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{clinic_lat}",
    "longitude": "{clinic_lng}"
  },
  "openingHours": "{opening_hours}"
}
```

**FAQ Schema (JSON-LD)** — injected per treatment page, sourced from `treatments.faq_json`:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question}",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "{answer}"
      }
    }
  ]
}
```

**Additional SEO Requirements:**
- Server-rendered metadata (`generateMetadata`) per page using `meta_title` / `meta_description` from DB.
- Semantic HTML (`<h1>` per page, proper heading hierarchy).
- `sitemap.xml` and `robots.txt` auto-generated via Next.js conventions (`app/sitemap.ts`, `app/robots.ts`).
- Canonical URLs on all pages, especially dynamic treatment pages.

### 6.3 Admin CMS Capabilities
- Single-form editor for `site_settings` (text fields + image upload to Supabase Storage).
- CRUD interface for `doctors` (add/edit/reorder/remove).
- CRUD interface for `treatments` (add/edit disease pages, manage FAQ entries, publish/unpublish toggle).

---

## 7. Non-Functional Requirements

- **Performance:** Target Lighthouse Performance score ≥ 90 on mobile.
- **Accessibility:** WCAG AA color contrast compliance, especially for gold-on-white CTA buttons.
- **Security:** Supabase RLS enforced on all tables; admin routes protected via middleware session checks.
- **Localization:** Primary content in Bengali (বাংলা), with clean typography support for Bengali script throughout.
- **Responsiveness:** Mobile-first design; desktop is a progressive enhancement, not the primary design target.

---

## 8. Out of Scope (v1.0)

- Blog/CMS beyond the Treatments content type

---
## 🏠 Home Page
1. **Header** — Logo + minimal nav (Home/About/Doctors/Treatments/tESTIMONIAL/Contact) + Gold WhatsApp CTA button (desktop only)
2. **Hero Section** — Bada heading (Bengali), short tagline, doctor/clinic ka authentic photo, primary CTA "Book Appointment" (gold button)
3. **Trust Strip** — Small row: "20+ Years Experience", "3 BHMS Doctors", "1000+ Patients" (icons + numbers)
4. **Treatments Preview** — 6-8 disease cards in grid (icon + name), "View All" link → Treatments page
5. **Doctors Preview** — 3 doctor cards (photo, name, qualification) — teaser, full profile on Doctors page
6. **Why Choose Us** — 3-4 USP points (clean icons, dark green accents)
7. **Testimonials (optional)** — Simple text quotes, no fancy carousel
8. **Sticky WhatsApp CTA** — Floating button bottom-right (mobile) — always visible
9. **Footer** — Address, hours, social links, phone

## ℹ️ About Page
1. **Back Arrow header** (mobile) — replaces nav
2. **Clinic Story** — `about_text` from CMS, warm narrative tone
3. **Philosophy/Values** — 3 icon+text blocks
4. **Clinic Photos** — Small gallery of interior/exterior authentic shots
5. **CTA band** — "Book your consultation" strip before footer

## 👨‍⚕️ Doctors Page
1. **Back Arrow header**
2. **Doctor Cards (3)** — Photo, Name, Qualification (BHMS/DBMS), Designation, short bio, years of experience — vertical stack on mobile, 3-col grid on desktop
3. **CTA per card** — "Consult Dr. X on WhatsApp" (personalizes the pre-filled message)

## 💊 Treatments Page (Listing)
1. **Back Arrow header**
2. **Intro line** — 1-liner about treatment philosophy
3. **Disease Grid** — Cards: icon/image + disease name (Joint Pain, Diabetes, Gastric, etc.) → tap opens `/treatments/[slug]`
4. **No filters/search clutter** — simple scrollable grid only (matches "no gij-bij" rule)

## 💊 Treatment Detail Page (Dynamic)
1. **Back Arrow header** (returns to Treatments grid, not Home — better UX)
2. **Disease Heading + short intro**
3. **Full content** — symptoms, homeopathy approach (SEO-rich long text)
4. **FAQ Accordion** — clean expand/collapse, matches `faq_json`
5. **Sticky bottom CTA** — "Book appointment for [Disease Name]" → WhatsApp prefilled

Testimonial page/section ka design bana raha hoon — patient trust build karne ke liye important page hai. Structure aur visual mockup dono deta hoon:

## Testimonial Page — Sections

1. **Back Arrow Header** — mobile nav rule ke hisaab se (← Home)
2. **Page Heading** — "রোগীদের অভিজ্ঞতা" / "What Our Patients Say" — short trust-building subtext
3. **Testimonial Cards Grid** — har card me:
   - Patient initials/Photo (koi generic stock photo nahi, privacy-safe)
   - Name + treated condition (e.g. "Joint Pain — 6 months treatment")
   - Star rating (gold accent, subtle)
   - Short quote text (2-3 lines max — long paragraphs "gij-bij" lagenge)
4. **Trust Strip (optional, bottom)** — total patients treated, average rating
5. **CTA Band** — "Apna experience share karna hai?" ya seedha "Book Appointment" gold button

Design principles: dark green (#0F6B5B) headings, white cards with subtle border (no shadows), gold sirf CTA/stars ke liye — koi carousel nahi (auto-scroll clutter lagta hai), simple stacked/grid layout.Ye raha mockup — dark green headings, white cards with hairline borders (koi shadow/clutter nahi), gold sirf stars aur CTA button ke liye. Trust strip (patients treated + rating) card ke bich me daal diya taaki social proof turant dikhe.


## 📞 Contact Page
1. **Back Arrow header**
2. **Appointment Form** — Name, Disease dropdown, Preferred Date → WhatsApp redirect button
3. **Clinic Info Card** — Address, map embed, opening hours, phone
4. **Emergency Contact** — highlighted separately (small red/gold accent)

## 🔐 Admin Dashboard
1. **Login** — simple centered card, email+password
2. **Dashboard** — Tabbed/sectioned form: Site Settings | Doctors | Treatments — each section is a plain form with Save button, no complex CMS UI

---

Chaho toh main is section-breakdown ko **visual mockup (Home page ka wireframe)** bana ke dikha sakta hoon taaki layout ka feel aaye, ya phir isko PRD `.md` file me ek naya "Section 5.1 — Page-wise UI Blueprint" ke roop me add kar doon. Kya karna chahoge?

*End of Document*
