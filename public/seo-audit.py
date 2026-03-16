#!/usr/bin/env python3
"""
seo-audit.py — Free SEO Audit Script
From: https://shreegauli.com/seo-tools

USAGE:
  python seo-audit.py https://example.com
  python seo-audit.py https://example.com --sitemap
  python seo-audit.py urls.txt --csv report.csv
  python seo-audit.py https://example.com --sitemap --delay 1.5 --csv out.csv

REQUIREMENTS:
  pip install requests beautifulsoup4 colorama
"""

import sys
import re
import csv
import time
import argparse
from urllib.parse import urljoin, urlparse
from datetime import datetime

try:
    import requests
    from bs4 import BeautifulSoup
    from colorama import init, Fore, Style
    init(autoreset=True)
except ImportError:
    print(
        "\n  Missing packages. Run:\n"
        "  pip install requests beautifulsoup4 colorama\n"
    )
    sys.exit(1)

# ── Colour helpers ────────────────────────────────────────────────────────────
OK   = Fore.GREEN  + "✓" + Style.RESET_ALL
WARN = Fore.YELLOW + "⚠" + Style.RESET_ALL
FAIL = Fore.RED    + "✗" + Style.RESET_ALL
INFO = Fore.CYAN   + "→" + Style.RESET_ALL

IMPACT_COLOR = {
    "critical": Fore.RED,
    "high":     Fore.YELLOW,
    "medium":   Fore.WHITE,
    "low":      Fore.CYAN,
}

HEADERS = {
    "User-Agent": (
        "SEOAuditBot/1.0 (+https://shreegauli.com/seo-tools)"
    )
}


# ── Fetch ─────────────────────────────────────────────────────────────────────
def fetch(url: str, timeout: int = 15):
    try:
        t0 = time.time()
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        ttfb = int((time.time() - t0) * 1000)
        return r, ttfb
    except requests.RequestException as e:
        return None, 0


# ── Audit a single URL ────────────────────────────────────────────────────────
def audit(url: str) -> dict:
    print(f"\n{INFO} {Fore.CYAN}{url}{Style.RESET_ALL}")

    r, ttfb = fetch(url)
    if r is None:
        print(f"  {FAIL} Could not fetch URL")
        return {"url": url, "score": 0, "error": "fetch_failed", "audited_at": datetime.now().isoformat()}

    soup = BeautifulSoup(r.text, "html.parser")
    hostname = urlparse(url).hostname or ""
    issues, passes = [], []
    deductions = 0

    # ── HTTPS ─────────────────────────────────────────────────────────────────
    if urlparse(url).scheme != "https":
        issues.append(("fail", "critical", "HTTPS",
            "Not using HTTPS — browsers flag HTTP as insecure",
            "Migrate to HTTPS; it's a confirmed Google ranking signal"))
        deductions += 25
    else:
        passes.append("HTTPS ✓")

    # ── Title ─────────────────────────────────────────────────────────────────
    t = soup.find("title")
    title = t.get_text(strip=True) if t else ""
    if not title:
        issues.append(("fail", "critical", "Title tag",
            "No <title> found",
            "Add a unique, keyword-rich title (50–60 chars)"))
        deductions += 20
    elif len(title) < 30:
        issues.append(("warn", "high", "Title tag",
            f"Title too short ({len(title)} chars): \"{title}\"",
            "Expand to 50–60 characters with primary keyword near the start"))
        deductions += 8
    elif len(title) > 60:
        issues.append(("warn", "medium", "Title tag",
            f"Title may truncate in SERPs ({len(title)} chars)",
            "Keep under 60 characters"))
        deductions += 4
    else:
        passes.append(f"Title OK ({len(title)} chars)")

    # ── Meta Description ──────────────────────────────────────────────────────
    dm = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    desc = dm.get("content", "").strip() if dm else ""
    if not desc:
        issues.append(("fail", "critical", "Meta description",
            "Missing meta description",
            "Write a 120–160 char description with your primary keyword"))
        deductions += 15
    elif len(desc) < 80:
        issues.append(("warn", "high", "Meta description",
            f"Description too short ({len(desc)} chars)",
            "Aim for 120–160 characters to maximise SERP click-through"))
        deductions += 6
    elif len(desc) > 160:
        issues.append(("warn", "medium", "Meta description",
            f"Description may truncate ({len(desc)} chars)",
            "Trim to under 160 characters"))
        deductions += 3
    else:
        passes.append(f"Meta description OK ({len(desc)} chars)")

    # ── H1 ────────────────────────────────────────────────────────────────────
    h1s = soup.find_all("h1")
    if not h1s:
        issues.append(("fail", "critical", "H1 heading",
            "No H1 tag found",
            "Add exactly one H1 containing your primary keyword"))
        deductions += 15
    elif len(h1s) > 1:
        issues.append(("warn", "high", "H1 heading",
            f"{len(h1s)} H1 tags — only one recommended",
            "Consolidate to a single H1 as the main page heading"))
        deductions += 6
    else:
        h1_text = h1s[0].get_text(strip=True)
        passes.append(f"H1: \"{h1_text[:60]}{'…' if len(h1_text) > 60 else ''}\"")

    # ── Canonical ─────────────────────────────────────────────────────────────
    canonical = soup.find("link", rel=re.compile("canonical", re.I))
    if not canonical:
        issues.append(("warn", "high", "Canonical tag",
            "No canonical link element found",
            "Add <link rel='canonical' href='…'> to avoid duplicate content penalties"))
        deductions += 6
    else:
        passes.append(f"Canonical: {canonical.get('href', '')[:60]}")

    # ── Viewport ──────────────────────────────────────────────────────────────
    viewport = soup.find("meta", attrs={"name": re.compile("^viewport$", re.I)})
    if not viewport:
        issues.append(("fail", "critical", "Mobile viewport",
            "No viewport meta tag — page is not mobile-friendly",
            "Add <meta name='viewport' content='width=device-width, initial-scale=1'>"))
        deductions += 15
    else:
        passes.append("Mobile viewport ✓")

    # ── Robots noindex ────────────────────────────────────────────────────────
    rm = soup.find("meta", attrs={"name": re.compile("^robots$", re.I)})
    robots_val = rm.get("content", "").lower() if rm else ""
    if "noindex" in robots_val:
        issues.append(("fail", "critical", "Robots meta",
            "noindex directive — Google will NOT index this page",
            "Remove 'noindex' unless you intentionally want the page excluded"))
        deductions += 25
    else:
        passes.append(f"Robots: {robots_val or 'index, follow (default)'}")

    # ── Images alt ────────────────────────────────────────────────────────────
    imgs = soup.find_all("img")
    missing_alt = [i for i in imgs if not i.get("alt")]
    if missing_alt:
        ratio = len(missing_alt) / len(imgs) if imgs else 0
        sev = "fail" if ratio > 0.5 else "warn"
        issues.append((sev, "high", "Image alt text",
            f"{len(missing_alt)}/{len(imgs)} images missing alt attribute",
            "Add descriptive alt text to every image for accessibility and Google Image Search"))
        deductions += 10 if ratio > 0.5 else 4
    elif imgs:
        passes.append(f"All {len(imgs)} images have alt text ✓")

    # ── Open Graph ────────────────────────────────────────────────────────────
    og_title = soup.find("meta", property="og:title")
    og_desc  = soup.find("meta", property="og:description")
    og_image = soup.find("meta", property="og:image")
    missing_og = [p for p, v in [("og:title", og_title), ("og:description", og_desc), ("og:image", og_image)] if not v]
    if missing_og:
        issues.append(("warn", "medium", "Open Graph",
            f"Missing OG tags: {', '.join(missing_og)}",
            "Add all OG tags for rich social media previews on LinkedIn, Facebook, Twitter/X"))
        deductions += 5
    else:
        passes.append("Open Graph complete ✓")

    # ── Schema markup ─────────────────────────────────────────────────────────
    schema = soup.find("script", type="application/ld+json")
    if not schema:
        issues.append(("warn", "medium", "Schema markup",
            "No JSON-LD structured data found",
            "Add schema.org markup (Person, Article, LocalBusiness) to earn Google rich results"))
        deductions += 5
    else:
        passes.append("JSON-LD schema ✓")

    # ── TTFB ──────────────────────────────────────────────────────────────────
    if ttfb > 800:
        issues.append(("fail", "high", "TTFB",
            f"{ttfb}ms — Google threshold is 800ms",
            "Add CDN, enable caching headers, optimise server response time"))
        deductions += 10
    elif ttfb > 400:
        issues.append(("warn", "medium", "TTFB",
            f"{ttfb}ms — acceptable but can improve",
            "CDN + server-side caching can bring this below 200ms"))
        deductions += 4
    else:
        passes.append(f"TTFB: {ttfb}ms ✓")

    # ── Page size ─────────────────────────────────────────────────────────────
    size_kb = len(r.content) // 1024
    if size_kb > 500:
        issues.append(("warn", "medium", "Page size",
            f"{size_kb} KB HTML — heavy initial payload",
            "Defer non-critical JS/CSS; enable Gzip or Brotli on the server"))
        deductions += 5
    else:
        passes.append(f"Page size: {size_kb} KB ✓")

    # ── Internal links ────────────────────────────────────────────────────────
    all_links = soup.find_all("a", href=True)
    internal = [l for l in all_links if not l["href"].startswith("http") or hostname in l["href"]]
    external = [l for l in all_links if l["href"].startswith("http") and hostname not in l["href"]]
    if len(internal) < 3:
        issues.append(("warn", "medium", "Internal links",
            f"Only {len(internal)} internal link(s) found",
            "Add more internal links to improve crawlability and distribute PageRank"))
        deductions += 4
    else:
        passes.append(f"Links: {len(internal)} internal, {len(external)} external ✓")

    # ── Keyword density (simple) ──────────────────────────────────────────────
    body_text = soup.get_text(separator=" ").lower()
    words = re.findall(r"\b[a-z]{3,}\b", body_text)
    word_count = len(words)
    h2s = [h.get_text(strip=True) for h in soup.find_all("h2")]
    h3s = [h.get_text(strip=True) for h in soup.find_all("h3")]

    # ── Score ─────────────────────────────────────────────────────────────────
    score = max(0, min(100, 100 - deductions))

    # ── Print results ─────────────────────────────────────────────────────────
    score_col = Fore.GREEN if score >= 80 else (Fore.YELLOW if score >= 60 else Fore.RED)
    grade = "Good" if score >= 80 else ("Needs work" if score >= 60 else "Poor")
    print(f"\n  Score: {score_col}{score}/100 — {grade}{Style.RESET_ALL}")

    sorted_issues = sorted(issues, key=lambda i: ["fail", "warn", "pass"].index(i[0]))
    for typ, impact, label, msg, fix in sorted_issues:
        icon  = FAIL if typ == "fail" else WARN
        col   = IMPACT_COLOR.get(impact, "")
        print(f"  {icon} [{col}{impact.upper()}{Style.RESET_ALL}] {label}: {msg}")
        print(f"      {INFO} {Fore.CYAN}{fix}{Style.RESET_ALL}")

    for p in passes:
        print(f"  {OK} {p}")

    return {
        "url":                 url,
        "score":               score,
        "title":               title,
        "title_length":        len(title),
        "description":         desc,
        "description_length":  len(desc),
        "h1":                  h1s[0].get_text(strip=True) if h1s else "",
        "h1_count":            len(h1s),
        "h2_count":            len(h2s),
        "h3_count":            len(h3s),
        "word_count":          word_count,
        "canonical":           canonical.get("href", "") if canonical else "",
        "has_viewport":        bool(viewport),
        "has_schema":          bool(schema),
        "has_og":              len(missing_og) == 0,
        "images_total":        len(imgs),
        "images_missing_alt":  len(missing_alt),
        "internal_links":      len(internal),
        "external_links":      len(external),
        "ttfb_ms":             ttfb,
        "size_kb":             size_kb,
        "https":               urlparse(url).scheme == "https",
        "fail_count":          sum(1 for i in issues if i[0] == "fail"),
        "warn_count":          sum(1 for i in issues if i[0] == "warn"),
        "pass_count":          len(passes),
        "audited_at":          datetime.now().isoformat(),
    }


# ── Sitemap crawler ────────────────────────────────────────────────────────────
def crawl_sitemap(base_url: str) -> list:
    sitemap = urljoin(base_url.rstrip("/"), "/sitemap.xml")
    print(f"{INFO} Fetching sitemap: {sitemap}")
    r, _ = fetch(sitemap)
    if not r or r.status_code != 200:
        print(f"  {WARN} Could not fetch sitemap.xml")
        return [base_url]
    soup = BeautifulSoup(r.text, "xml")
    urls = [loc.get_text(strip=True) for loc in soup.find_all("loc")]
    print(f"  {OK} {len(urls)} URLs found in sitemap")
    return urls if urls else [base_url]


# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(
        description="SEO Audit Script — https://shreegauli.com/seo-tools",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument(
        "target",
        help="URL to audit, sitemap root, or path to a .txt file of URLs",
    )
    parser.add_argument(
        "--sitemap",
        action="store_true",
        help="Discover URLs via sitemap.xml of the given domain",
    )
    parser.add_argument("--csv",   metavar="FILE", help="Export results to CSV")
    parser.add_argument("--delay", type=float, default=1.0,
                        help="Seconds to wait between requests (default: 1.0)")
    parser.add_argument("--limit", type=int, default=0,
                        help="Max number of URLs to audit (0 = no limit)")
    args = parser.parse_args()

    urls: list[str] = []
    if args.sitemap:
        urls = crawl_sitemap(args.target)
    elif args.target.endswith(".txt"):
        with open(args.target, encoding="utf-8") as f:
            urls = [l.strip() for l in f if l.strip()]
    else:
        urls = [args.target]

    if args.limit:
        urls = urls[: args.limit]

    if not urls:
        print(f"{FAIL} No URLs to audit.")
        sys.exit(1)

    line = "─" * 62
    print(f"\n{line}")
    print(f"  SEO Audit  ·  {len(urls)} URL(s)  ·  {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(line)

    results = []
    for i, url in enumerate(urls):
        if i > 0:
            time.sleep(args.delay)
        results.append(audit(url))

    # ── Summary table ─────────────────────────────────────────────────────────
    print(f"\n{line}")
    print("  SUMMARY")
    print(line)
    for res in results:
        s = res.get("score", 0)
        col = Fore.GREEN if s >= 80 else (Fore.YELLOW if s >= 60 else Fore.RED)
        f = res.get("fail_count", 0)
        w = res.get("warn_count", 0)
        truncated = res["url"][:55] + "…" if len(res["url"]) > 55 else res["url"]
        print(
            f"  {col}{s:3d}/100{Style.RESET_ALL}  {truncated:<56}  "
            f"{Fore.RED}{f}F{Style.RESET_ALL} {Fore.YELLOW}{w}W{Style.RESET_ALL}"
        )

    avg = sum(r.get("score", 0) for r in results) / len(results) if results else 0
    avg_col = Fore.GREEN if avg >= 80 else (Fore.YELLOW if avg >= 60 else Fore.RED)
    print(f"\n  Average score: {avg_col}{avg:.0f}/100{Style.RESET_ALL} across {len(results)} page(s)")

    # ── Top issues ────────────────────────────────────────────────────────────
    total_fails = sum(r.get("fail_count", 0) for r in results)
    if total_fails:
        print(f"\n  {Fore.RED}{total_fails} critical failure(s) across all pages — fix these first.{Style.RESET_ALL}")

    # ── CSV export ────────────────────────────────────────────────────────────
    if args.csv:
        fields = [
            "url", "score", "title", "title_length", "description",
            "description_length", "h1", "h1_count", "h2_count", "h3_count",
            "word_count", "canonical", "has_viewport", "has_schema", "has_og",
            "images_total", "images_missing_alt", "internal_links",
            "external_links", "ttfb_ms", "size_kb", "https",
            "fail_count", "warn_count", "pass_count", "audited_at",
        ]
        with open(args.csv, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
            w.writeheader()
            w.writerows(results)
        print(f"\n  {OK} CSV saved → {args.csv}")

    print(f"\n{line}")
    print(f"  Tool by Shree Krishna Gauli · shreegauli.com/seo-tools")
    print(line)


if __name__ == "__main__":
    main()
