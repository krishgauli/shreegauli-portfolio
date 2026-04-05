# Route & Wiring Fixes

## What Was Done

Every reference to `/writing` and `/blog` (singular) across the entire codebase has been updated to `/blogs`. This was more involved than it sounds — the old routes were scattered across navigation components, blog cards, sitemap generation, API endpoints, analytics filters, and even database seed files. Here's the full accounting.

---

## Files That Were Modified

I've organized these by area so it's easier to verify each group independently.

### Navigation & Layout
| File | Change |
|------|--------|
| src/lib/data.ts | navLinks: `"Writing"` → `"Blog"`, href `/writing` → `/blogs`; article hrefs updated |
| src/components/layout/Footer.tsx | Resources nav: `"Writing"` → `"Blog"`, href `/writing` → `/blogs` |
| src/components/Navbar.tsx (legacy) | `/blog` → `/blogs` in 3 locations (solid nav check, desktop link, mobile link) |
| src/components/Footer.tsx (legacy) | `/writing` → `/blogs` for Blog link |

### Blog Components
| File | Change |
|------|--------|
| src/components/RelatedPosts.tsx | `/blog/${slug}` → `/blogs/${slug}` |
| src/components/BlogGrid.tsx | `/writing/${slug}` → `/blogs/${slug}` (2 places) |
| src/components/landing/BlogInsights.tsx | `/blog` → `/blogs` and `/writing` → `/blogs` |
| src/components/sections/Insights/InsightsSection.tsx | Import from `@/lib/blogs`, hrefs, section id="blogs", eyebrow="Blog" |

### Blog Pages (Renamed Directory)
| File | Change |
|------|--------|
| src/lib/writing.ts → src/lib/blogs.ts | File renamed; href paths `/writing/` → `/blogs/` |
| src/app/writing/ → src/app/blogs/ | Directory renamed |
| src/app/blogs/page.tsx | Import from `@/lib/blogs`, metadata, function name BlogPage, eyebrow, source |
| src/app/blogs/[slug]/page.tsx | Import from `@/lib/blogs`, all URLs `/blogs/`, function name BlogPostPage |
| src/app/blogs/[slug]/BlogPostBody.tsx | Back link href `/writing` → `/blogs` |

### Sitemap & Revalidation
| File | Change |
|------|--------|
| src/app/sitemap.ts | Import from `@/lib/blogs`, route `/blogs`, URLs `/blogs/{slug}` |
| src/lib/revalidate-sitemap.ts | `revalidatePath('/blogs')` |
| src/app/api/revalidate-sitemap/route.ts | `revalidatePath('/blogs')` |

### AI Blog Generation APIs
| File | Change |
|------|--------|
| src/app/api/ai/generate-blog-oneshot/route.ts | Internal links array `/blogs`, revalidatePath `/blogs` |
| src/app/api/ai/generate-blog/route.ts | Internal links array `/blogs`, revalidatePath `/blogs` |
| src/app/api/ai/generate-news-oneshot/route.ts | Internal links array `/blogs` |
| src/app/api/ai/generate-news/route.ts | Internal links array `/blogs` |

### Analytics & Admin
| File | Change |
|------|--------|
| src/components/SearchConsoleTab.tsx | Filter `/blog` → `/blogs` |
| src/components/GoogleAnalyticsView.tsx | Filter `/blog` → `/blogs` |
| src/app/api/admin/crawl-site/route.ts | Path `/blogs`, section 'blogs', title 'Blog' |

### Database Seeds
| File | Change |
|------|--------|
| prisma/seed-blogs.ts | Canonical URLs `/writing/` → `/blogs/` |

---

## What's Left to Do

The code changes above are done, but there are a few things that need attention before this is fully buttoned up.

### 1. Add 301 Redirects (This Is Critical)

**Why it matters:** Anyone who bookmarked an old `/writing/` URL — or any external site linking to one — will hit a 404. Google likely still has the old URLs indexed too. Without redirects, you're losing both traffic and link equity.

**Where:** `next.config.ts`

```typescript
// Add to next.config.ts
const nextConfig = {
  // ...existing config
  async redirects() {
    return [
      {
        source: '/writing',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/writing/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/blogs/:slug',
        permanent: true,
      },
    ];
  },
};
```

### 2. Fix the Legacy Navbar (High Priority)

**The problem:** The homepage uses an older Navbar component (`src/components/Navbar.tsx`) that still points to pages that simply don't exist. This means real users are clicking links that lead nowhere.

**Broken links found in legacy Navbar:**
| Link | Status |
|------|--------|
| /automation | ❌ Does not exist (should be /services/automation) |
| /industries | ❌ Does not exist |
| /case-studies | ❌ Does not exist (should be /work) |
| /news | ❌ Does not exist |
| /book-a-demo | ❌ Does not exist (should be /lp/book-a-call) |
| /hipaa | ❌ Does not exist |

**The fix:** Either update the legacy Navbar to match the layout Navbar's links, or — and this is the better long-term move — migrate the homepage to use the PageShell layout Navbar entirely. One source of truth for navigation is always better than two.

### 3. Fix the Dead Service Link (Medium Priority)

**The problem:** `src/components/Services.tsx` links to `/services/content-copywriting`, which has never existed on this site.

**The fix:** Redirect to `/services/seo` or just remove the link. Don't leave dead links on your own site — it looks sloppy and confuses crawlers.

### 4. Update Google Search Console (After Deploy)

Once the redirects and fixes are live:
- Submit the updated sitemap at `https://shreegauli.com/sitemap.xml`
- Request indexing for `/blogs` specifically
- Keep an eye on crawl errors for the old `/writing/*` URLs over the next few weeks
- Make sure the 301 redirects are actually being followed (check the Coverage report)

### 5. Check for External Backlinks (Nice to Have)

- Search for any external sites linking to `shreegauli.com/writing/*`
- If you can reach the site owner, ask them to update the link to `/blogs/*`
- The 301 redirects handle this from a technical standpoint, but direct links are always better for SEO — they pass more authority

---

## Verification Commands

```bash
# Verify no remaining references to /writing in source code
grep -rn "/writing" src/ --include="*.tsx" --include="*.ts" | grep -v node_modules

# Verify no remaining references to /blog/ (singular, not plural) in navigation
grep -rn '"/blog"' src/ --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v "/blogs"

# Check that the new directory exists
ls -la src/app/blogs/
ls -la src/lib/blogs.ts
```
