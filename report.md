# shreegauli.com — Comprehensive Site Report

**Date:** June 2025  
**Domain:** https://www.shreegauli.com  
**Stack:** Next.js 16 · React 19 · Tailwind CSS 4 · Prisma · Supabase · Vercel

---

## 1. What Is Working Correctly

### Pages (All return HTTP 200)
| Route | Status |
|---|---|
| `/` (Homepage) | ✅ OK |
| `/about` | ✅ OK |
| `/contact` | ✅ OK |
| `/services` | ✅ OK |
| `/services/seo-local-search` | ✅ OK |
| `/services/paid-media` | ✅ OK |
| `/services/social-media` | ✅ OK |
| `/services/automation` | ✅ OK |
| `/services/web-design` | ✅ OK |
| `/services/reputation-management` | ✅ OK |
| `/work` | ✅ OK |
| `/writing` | ✅ OK |
| `/seo-tools` | ✅ OK |
| `/login` | ✅ OK |
| `/signup` | ✅ OK |
| `/dashboard/admin` | ✅ OK |
| `/dashboard/client` | ✅ OK |
| `/robots.txt` | ✅ OK |
| `/sitemap.xml` | ✅ OK |

### APIs
| Endpoint | Status | Notes |
|---|---|---|
| `POST /api/contact-lead` | ✅ 201 | Lead saved to DB; email sends locally |
| `POST /api/newsletter` | ✅ 201 | Subscriber saved to DB |
| `POST /api/auth/login` | ✅ 200 | Auth working with `shree@focusyourfinance.com` |
| `GET /api/posts` | ✅ 200 | Blog posts returned |
| `GET /api/news` | ✅ 200 | Case studies/news returned |
| `GET /api/health` | ✅ 200 | Health check passing |

### Features
- **Unified Navbar** across all pages (homepage, public pages, dashboard) with animated SG logo, auth-aware user menu, and "Book a Demo" CTA
- **Unified Footer** across all pages with animated SG logo
- **Auth state** shown in header when logged in (avatar + name + dropdown)
- **Login button** shown in header when logged out
- **Dark/Light theme** toggle working across site
- **Language switcher** (EN/ES/NP) working
- **Blog management** — create, edit, publish, unpublish, AI auto-generate
- **Case Studies management** — create, edit, publish, unpublish, AI auto-generate  
- **Contact form** — submissions saved to database
- **Newsletter subscriptions** — saved to database
- **Case studies page** (`/work`) — featured work + testimonials rendering
- **SEO tools** — free audit tool working
- **Cookie consent** banner present
- **Schema.org** structured data (LocalBusiness) in place
- **Sitemap & robots.txt** generated correctly

---

## 2. What Was Broken — And Fixed

### 2.1 Broken Internal Links (28 instances fixed)
| Broken Route | Fixed To | Files Affected |
|---|---|---|
| `/blog` | `/writing` | Footer.tsx, BlogInsights.tsx, old Navbar.tsx |
| `/case-studies` | `/work` | Footer.tsx, ServicePageTemplate.tsx, HeroNew.tsx, old Navbar.tsx |
| `/news` | `/work` | Footer.tsx, NewsArticleContent.tsx, NewsInsights.tsx, old Navbar.tsx |
| `/pricing` | `/contact` (or dashboard if logged in) | Footer.tsx (conditional logic kept) |
| `/industries` | `/services` | landing/Footer.tsx |
| `/industries/healthcare` | `/services/seo-local-search` | landing/Footer.tsx |
| `/book-a-demo` | `/contact` | old Navbar.tsx |
| `/automation` | `/services` | old Navbar.tsx |

### 2.2 Duplicate Navbar/Footer Systems
- **Problem:** Two separate Navbar and Footer components — `@/components/Navbar` (dashboard) and `@/components/layout/Navbar` (public pages) — with inconsistent design and broken links
- **Fix:** Rewrote `layout/Navbar` with animated SG logo + auth state + all features. Switched all dashboard pages to use it. Updated `EditPostLayout.tsx` to import from `layout/` instead of old components.

### 2.3 Auth Not Available on Public Pages  
- **Problem:** `AuthProvider` was only in dashboard layout, so public pages had no login state
- **Fix:** Created `src/components/Providers.tsx` wrapping `AuthProvider` + `SitePreferencesProvider`, added to root `layout.tsx`

### 2.4 "News" Renamed to "Case Studies"
- **Renamed in:** Dashboard sidebar, section headers, Content Overview, Platform Health stats, edit/new article pages, NewsInsights landing component, NewsArticleContent, Footer quick links
- **API routes** (`/api/news/`, `/api/admin/news/`) kept as-is (backend implementation detail)
- **Database model** (`NewsArticle`) kept as-is (no migration needed)

### 2.5 Debug Code Removed
- Removed `emailDebug` diagnostic output from `/api/contact-lead` response (was leaking SMTP config info)

---

## 3. Known Issues — Remaining

### 3.1 🔴 SMTP Email Fails on Vercel Production
- **Symptom:** `emailStatus: "failed"` on production; `getaddrinfo EBUSY smtp.gmail.com`
- **Root Cause:** Vercel serverless functions block outbound SMTP connections (port 587/465). Even hardcoded IPs and DNS pre-resolve don't work.
- **Impact:** Contact form submissions and newsletter notifications are saved to DB but email confirmations are NOT sent in production.
- **Fix Required:** Switch from SMTP (nodemailer) to an HTTP-based email API:
  - **Option A:** [Resend](https://resend.com) — free tier: 3,000 emails/month, simple REST API
  - **Option B:** [SendGrid](https://sendgrid.com) — free tier: 100 emails/day
  - **Option C:** [Postmark](https://postmarkapp.com) — excellent deliverability
- **Effort:** ~30 minutes. Replace `nodemailer` transport in `src/lib/contact-mailer.ts` with `fetch()` calls to the chosen API.

### 3.2 🟡 No Public Listing Page for Case Studies (News Articles)
- **Current State:** Case study articles from the DB (`NewsArticle` model) have no dedicated public listing page. The landing `NewsInsights` component shows 3 articles, and individual article pages exist at `/news/[slug]`, but there's no `/news` or `/case-studies` index.
- **The `/work` page** shows hardcoded featured work from `FeaturedWorkSection`, NOT database case studies.
- **Fix Needed:** Either:
  - Create a `/case-studies` page that queries `NewsArticle` from DB (like `/writing` does for `Post`)
  - OR merge DB case studies into the `/work` page alongside the hardcoded featured work

### 3.3 🟡 Old Navbar/Footer Components Still Exist
- `src/components/Navbar.tsx` and `src/components/Footer.tsx` are no longer imported by any page, but still exist in the codebase. Safe to delete when ready.

### 3.4 🟡 Backup Files in Codebase
- `src/components/ClientAnalyticsView.backup.tsx`
- `src/components/ClientAnalyticsView.tsx.backup`
- `prisma/schema.prisma.bak`
- These can be cleaned up.

### 3.5 🟡 Test Script in Root
- `test-site.js` was created for testing and should be removed or added to `.gitignore`.

---

## 4. Architecture Summary

```
Root Layout (layout.tsx)
└── <Providers>  ← AuthProvider + SitePreferencesProvider
    ├── Public Pages
    │   └── <PageShell>  ← layout/Navbar + layout/Footer
    │       ├── / (Homepage)
    │       ├── /about
    │       ├── /contact
    │       ├── /services/*
    │       ├── /work
    │       ├── /writing + /writing/[slug]
    │       └── /seo-tools
    ├── Dashboard Pages
    │   ├── /dashboard/admin  ← layout/Navbar + layout/Footer
    │   ├── /dashboard/admin/news/new
    │   ├── /dashboard/admin/news/edit/[id]
    │   └── /dashboard/client  ← layout/Navbar + layout/Footer
    └── Auth Pages
        ├── /login
        └── /signup
```

### Navbar Features (unified across all pages)
- Animated SG Logo (hover effect)
- Navigation: Work · Services · About · Writing · SEO Tools · Contact
- Auth-aware: Shows user avatar + name when logged in, Login button when not
- "Book a Demo" CTA → /contact
- Mobile-responsive hamburger menu
- Dark/Light theme toggle

---

## 5. Environment Variables (Vercel)

| Variable | Status |
|---|---|
| `DATABASE_URL` | ✅ Set (Supabase pooler) |
| `DIRECT_URL` | ✅ Set (Supabase direct) |
| `JWT_SECRET` | ✅ Set |
| `CONTACT_SMTP_HOST` | ✅ Set (`smtp.gmail.com`) |
| `CONTACT_SMTP_PORT` | ✅ Set (`587`) |
| `CONTACT_SMTP_USER` | ✅ Set |
| `CONTACT_SMTP_PASSWORD` | ✅ Set |
| `CONTACT_EMAIL_FROM` | ✅ Set |
| `CONTACT_REPLY_TO` | ✅ Set |

> **Note:** SMTP vars are configured but non-functional on Vercel due to SMTP blocking. Switch to HTTP email API.

---

## 6. Recommended Next Steps

1. **Switch to Resend/SendGrid** for production email delivery (highest priority)
2. **Create `/case-studies` page** that lists `NewsArticle` entries from DB
3. **Delete old components:** `src/components/Navbar.tsx`, `src/components/Footer.tsx`, backup files
4. **Remove `test-site.js`** from the repository
5. **Set up Vercel Cron** for daily case study auto-generation (already configured in `vercel.json`)

---

## 7. Admin Invoices QA Report (April 5, 2026)

### Scope tested

- Admin authentication flow using seeded admin account
- Admin invoice interface route and navigation links
- Invoice dashboard tabs: Invoices, Clients, Create New
- Add client flow
- Create invoice flow
- Send invoice flow
- Mark invoice as paid flow
- Auth protection behavior on invoice APIs vs dashboard pages
- Hover/text visibility and form readability by class-level inspection and functional smoke checks

### What was tested (execution details)

1. Logged in as admin using:
   - Email: shree@focusyourfinance.com
   - Password: Hello@123
2. Verified protected invoice APIs with authenticated session cookie.
3. Created a real QA client through [src/app/api/invoices/clients/route.ts](src/app/api/invoices/clients/route.ts).
4. Created a real invoice through [src/app/api/invoices/route.ts](src/app/api/invoices/route.ts).
5. Sent invoice email through [src/app/api/invoices/[id]/send/route.ts](src/app/api/invoices/[id]/send/route.ts).
6. Marked invoice paid through [src/app/api/invoices/[id]/route.ts](src/app/api/invoices/[id]/route.ts).
7. Retrieved invoice and verified status transitions, payment link, sent timestamps, transaction ID, and generated invoice HTML.
8. Smoke-tested admin link routes:
   - /dashboard/admin
   - /dashboard/admin/invoices
   - /dashboard/admin/ai-creator
   - /dashboard/admin/chat-reports
   - /dashboard/admin/leads
   - /dashboard/admin/subscribers

### What is working

- Admin login works and sets a usable auth cookie.
- Invoice APIs are protected from anonymous access (401).
- Full invoice lifecycle works end-to-end after schema sync:
  - Create client
  - Create draft invoice
  - Send invoice
  - Mark paid
  - Fetch invoice details + rendered HTML
- Admin sidebar includes Invoices link in [src/app/dashboard/admin/page.tsx](src/app/dashboard/admin/page.tsx).
- Invoices page renders via [src/app/dashboard/admin/invoices/page.tsx](src/app/dashboard/admin/invoices/page.tsx).

### What is broken

1. **Admin page routes are publicly reachable (HTTP 200) without auth**
   - Impact: anonymous users can load dashboard shells/pages directly.
   - Affected routes include /dashboard/admin and /dashboard/admin/invoices.
   - Affected files:
     - [src/app/dashboard/admin/layout.tsx](src/app/dashboard/admin/layout.tsx)
     - [src/app/dashboard/admin/invoices/page.tsx](src/app/dashboard/admin/invoices/page.tsx)

2. **Invoice dashboard can show misleading empty states when API auth fails**
   - Impact: users may see “No clients yet” / “No invoices yet” instead of auth/session error messaging.
   - Root cause: non-OK fetch responses are not surfaced to UI.
   - Affected file:
     - [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)

3. **Initial 500 errors occur if DB schema not synced with Prisma models**
   - Impact: all invoice APIs fail until schema is pushed/migrated.
   - Context: this was reproduced and resolved locally via prisma db push.
   - Affected files:
     - [prisma/schema.prisma](prisma/schema.prisma)
     - [src/app/api/invoices/route.ts](src/app/api/invoices/route.ts)
     - [src/app/api/invoices/clients/route.ts](src/app/api/invoices/clients/route.ts)

### Text visibility failures

1. **Light-mode incompatibility in InvoiceDashboard (hardcoded dark-theme text tokens)**
   - Symptoms:
     - Body/table text uses text-white and text-gray-* even when page/theme can be light.
     - Input text and labels can become low-contrast/invisible depending on background.
   - Affected file:
     - [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
   - Exact areas:
     - Header/title and stat badges
     - Table cell text (client, amount, date)
     - Form labels, inputs, textarea, select

2. **Form placeholder/readability is too low in several fields**
   - Symptoms:
     - placeholder text-gray-500 on semi-transparent input backgrounds has weak contrast.
   - Affected file:
     - [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)

### Hover effects broken or unclear

1. **Invoice tab hover feedback is weak/unclear**
   - Symptoms:
     - inactive tabs only change text color on hover; hover hit area does not clearly stand out.
   - Affected file:
     - [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)

2. **Potentially unclear sidebar hover affordance consistency**
   - Symptoms:
     - sidebar links rely on subtle hover background and text shifts; perceived hover state can be weak on some displays.
   - Affected file:
     - [src/app/dashboard/admin/page.tsx](src/app/dashboard/admin/page.tsx)

### Where form text is not visible or at risk

- Create Client form in [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
  - name, email, company, phone, address, city, state, zip, monthly rate, payoneer email, notes
- Create Invoice form in [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
  - client select, description, rate, qty, tax rate, due days, client notes

Primary cause: hardcoded text colors and translucent backgrounds without theme-aware tokens.

### Exact areas needing fixes + recommended fix per issue

1. **Protect admin pages server-side**
   - Area: [src/app/dashboard/admin/layout.tsx](src/app/dashboard/admin/layout.tsx)
   - Fix:
     - Convert to server layout guard or add middleware-based route protection for /dashboard/admin/**.
     - Redirect unauthenticated users to /login.

2. **Add fetch error handling and auth error UI in InvoiceDashboard**
   - Area: [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
   - Fix:
     - For every fetch, if status is 401/403, show explicit “Session expired / Unauthorized” feedback and CTA to login.
     - For non-OK responses, surface server error message in toast and avoid fake empty state.

3. **Make InvoiceDashboard theme-aware**
   - Area: [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
   - Fix:
     - Replace hardcoded text-white/text-gray-* + bg-white/5 usage with dashboard token classes or dark/light variants.
     - Follow existing dashboard design primitives from [src/app/globals.css](src/app/globals.css) (dashboard-input, dashboard-panel, etc.).

4. **Improve hover state clarity**
   - Areas:
     - [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx) (tab buttons, action buttons)
     - [src/app/dashboard/admin/page.tsx](src/app/dashboard/admin/page.tsx) (sidebar links)
   - Fix:
     - Add clear hover background + border contrast change (not text-only).
     - Ensure hover state remains readable in both theme modes.

5. **Improve form readability/accessibility**
   - Area: [src/components/InvoiceDashboard.tsx](src/components/InvoiceDashboard.tsx)
   - Fix:
     - Increase placeholder contrast and label contrast.
     - Add visible focus ring and consistent input border contrast in both themes.

6. **Formalize Prisma migration baseline for invoicing models**
   - Area: [prisma/schema.prisma](prisma/schema.prisma)
   - Fix:
     - Create and commit a baseline migration for existing DB state, then manage future invoice/client schema updates through Prisma Migrate.
     - Prevent recurrence of 500 errors on fresh environments.

### QA conclusion

- Functional invoice flow is working end-to-end after DB schema sync.
- The highest-priority product issues are:
  1) missing server-side admin route protection,
  2) poor error-state handling in invoice UI,
  3) theme/contrast problems causing visibility issues for text and forms.

- These issues should be fixed before considering the invoice admin interface production-ready.
