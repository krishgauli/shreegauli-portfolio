"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  Calendar,
  Check,
  Clock3,
  Link2,
  Linkedin,
  ArrowUpRight,
  Share2,
  Tag,
  User,
} from "lucide-react";
import type { Article } from "@/types";
import { SITE_URL } from "@/lib/site";

interface Post {
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  coverImageAlt: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
  author: { name: string; avatar: string | null } | null;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface ResourceLink {
  href: string;
  text: string;
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function appendClass(attrs: string, className: string) {
  if (/class=(['"])(.*?)\1/i.test(attrs)) {
    return attrs.replace(
      /class=(['"])(.*?)\1/i,
      (_match, quote: string, existing: string) =>
        `class=${quote}${existing} ${className}${quote}`,
    );
  }

  return `${attrs} class="${className}"`;
}

function createHeadingId(text: string, counts: Map<string, number>) {
  const base = text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";

  const currentCount = counts.get(base) || 0;
  counts.set(base, currentCount + 1);

  return currentCount === 0 ? base : `${base}-${currentCount + 1}`;
}

function enhanceBlogHtml(content: string) {
  const headingCounts = new Map<string, number>();
  const toc: TocItem[] = [];
  const sanitizedContent = content.replace(
    /<ul[^>]*class=(['"])(?=[^'"]*\btoc\b)[^'"]*\1[^>]*>[\s\S]*?<\/ul>/gi,
    "",
  );

  let html = sanitizedContent.replace(
    /<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelRaw, attrs, inner) => {
      const level = Number(levelRaw);
      const text = stripHtml(inner);

      if (!text) return match;

      const existingId = attrs.match(/\sid=(['"])(.*?)\1/i)?.[2];
      const id = existingId || createHeadingId(text, headingCounts);
      const hasId = /\sid=(['"]).*?\1/i.test(attrs);
      const attrsWithId = hasId ? attrs : `${attrs} id="${id}"`;
      const nextAttrs = appendClass(
        attrsWithId,
        level === 2
          ? "sg-blog-h2"
          : level === 3
            ? "sg-blog-h3"
            : level === 4
              ? "sg-blog-h4"
              : level === 5
                ? "sg-blog-h5"
                : "sg-blog-h6",
      );

      toc.push({ id, text, level });
      return `<h${level}${nextAttrs}>${inner}</h${level}>`;
    },
  );

  html = html
    .replace(/<p([^>]*)>/gi, (_match, attrs) => `<p${appendClass(attrs, "sg-blog-p")}>`)
    .replace(/<ul([^>]*)>/gi, (_match, attrs) => `<ul${appendClass(attrs, "sg-blog-ul")}>`)
    .replace(/<ol([^>]*)>/gi, (_match, attrs) => `<ol${appendClass(attrs, "sg-blog-ol")}>`)
    .replace(/<li([^>]*)>/gi, (_match, attrs) => `<li${appendClass(attrs, "sg-blog-li")}>`)
    .replace(/<blockquote([^>]*)>/gi, (_match, attrs) => `<blockquote${appendClass(attrs, "sg-blog-blockquote")}>`)
    .replace(/<strong([^>]*)>/gi, (_match, attrs) => `<strong${appendClass(attrs, "sg-blog-strong")}>`)
    .replace(/<em([^>]*)>/gi, (_match, attrs) => `<em${appendClass(attrs, "sg-blog-em")}>`)
    .replace(/<code([^>]*)>/gi, (_match, attrs) => `<code${appendClass(attrs, "sg-blog-code")}>`)
    .replace(/<pre([^>]*)>/gi, (_match, attrs) => `<pre${appendClass(attrs, "sg-blog-pre")}>`)
    .replace(/<table([^>]*)>/gi, (_match, attrs) => `<table${appendClass(attrs, "sg-blog-table")}>`)
    .replace(/<th([^>]*)>/gi, (_match, attrs) => `<th${appendClass(attrs, "sg-blog-th")}>`)
    .replace(/<td([^>]*)>/gi, (_match, attrs) => `<td${appendClass(attrs, "sg-blog-td")}>`)
    .replace(/<img([^>]*)>/gi, (_match, attrs) => `<img${appendClass(attrs, "sg-blog-img")}>`)
    .replace(/<a([^>]*)>/gi, (_match, attrs) => `<a${appendClass(attrs, "sg-blog-link")}>`);

  return { html, toc };
}

function extractResourceLinks(content: string): ResourceLink[] {
  const links: ResourceLink[] = [];
  const seen = new Set<string>();

  for (const match of content.matchAll(/<a[^>]*href=(['"])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi)) {
    const rawHref = match[2]?.trim();
    const text = stripHtml(match[3] || "");

    if (!rawHref || !text) continue;

    const normalizedHref = rawHref.startsWith("http")
      ? rawHref.replace(/^https?:\/\/(?:www\.)?shreegauli\.com/i, "")
      : rawHref;

    if (!normalizedHref.startsWith("/")) continue;
    if (seen.has(normalizedHref)) continue;

    seen.add(normalizedHref);
    links.push({ href: normalizedHref, text });
  }

  return links.slice(0, 6);
}

function buildShareUrl(platform: "linkedin" | "copy", url: string, title: string) {
  if (platform === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  }

  return `${url}#copy-${encodeURIComponent(title)}`;
}

const ctaPanelStyle = {
  background:
    "radial-gradient(circle at top left, rgba(124,58,237,0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(34,211,238,0.14), transparent 30%), #0f172a",
};

export function BlogPostBody({
  post,
  relatedPosts,
}: {
  post: Post;
  relatedPosts: Article[];
}) {
  const { html: articleHtml, toc } = useMemo(
    () => enhanceBlogHtml(post.content),
    [post.content],
  );
  const [activeHeading, setActiveHeading] = useState("");
  const [copied, setCopied] = useState(false);

  const canonicalUrl = `${SITE_URL}/blogs/${post.slug}`;
  const shareUrl = typeof window === "undefined" ? canonicalUrl : window.location.href;
  const wordCount = stripHtml(articleHtml).split(/\s+/).filter(Boolean).length;
  const readTime = `${Math.max(4, Math.ceil(wordCount / 220))} min read`;
  const primaryCategory = post.categories[0]?.name || "Blog";
  const resolvedActiveHeading = activeHeading || toc[0]?.id || "";
  const resourceLinks = useMemo(() => {
    const links = extractResourceLinks(articleHtml);

    if (links.length > 0) return links;

    return [
      { href: "/services", text: "Explore services" },
      { href: "/seo-tools", text: "Run the free SEO audit" },
      { href: "/lp/book-a-call", text: "Book a strategy call" },
    ];
  }, [articleHtml]);

  useEffect(() => {
    if (!toc.length) return;

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              first.boundingClientRect.top - second.boundingClientRect.top,
          );

        if (visible[0]?.target.id) {
          setActiveHeading(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -60% 0px",
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [toc]);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="relative overflow-hidden bg-[#eef2f7] text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#070B14] pb-24">
        <div className="absolute inset-0">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              fill
              sizes="100vw"
              className="object-cover opacity-35"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,58,237,0.45),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.24),transparent_22%),linear-gradient(180deg,rgba(7,11,20,0.2),rgba(7,11,20,0.88))]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,20,0.08)_0%,rgba(7,11,20,0.58)_38%,#0b1220_100%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-md transition hover:border-white/30 hover:bg-white/12 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          <div className="max-w-4xl py-14 sm:py-20 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#7C3AED]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-[#ddd6fe]">
              {primaryCategory}
            </span>

            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {post.excerpt ? (
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {post.excerpt}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative -mt-12 px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-[28px] border border-white/80 bg-white/95 px-5 py-4 shadow-[0_22px_70px_-36px_rgba(15,23,42,0.4)] backdrop-blur-xl sm:px-7 sm:py-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-600">
              {post.author ? (
                <span className="inline-flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] text-xs font-bold text-white">
                    {post.author.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4 text-[#7C3AED]" />
                    {post.author.name}
                  </span>
                </span>
              ) : null}

              {post.publishedAt ? (
                <time className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#7C3AED]" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              ) : null}

              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#7C3AED]" />
                {readTime}
              </span>

              {post.tags.length > 0 ? (
                <span className="inline-flex items-center gap-2 text-slate-500">
                  <Tag className="h-4 w-4 text-[#7C3AED]" />
                  {post.tags.slice(0, 3).map((tag) => tag.name).join(" • ")}
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid items-start gap-8 xl:grid-cols-[250px_minmax(0,1fr)_72px]">
            <aside className="hidden xl:block">
              {toc.length > 0 ? (
                <div className="sticky top-28 rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.35)] backdrop-blur-sm">
                  <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(124,58,237,0.16),rgba(34,211,238,0.18))] text-[#7C3AED]">
                      <BookOpenText className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        In this article
                      </p>
                      <p className="text-xs text-slate-400">Jump to each section quickly</p>
                    </div>
                  </div>

                  <nav className="mt-4 space-y-1.5">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block rounded-2xl px-3 py-2 text-sm leading-5 transition ${
                          resolvedActiveHeading === item.id
                            ? "bg-[linear-gradient(135deg,rgba(124,58,237,0.16),rgba(34,211,238,0.14))] font-semibold text-slate-900"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                        } ${item.level >= 3 ? "ml-3" : ""} ${item.level >= 4 ? "ml-6 text-[13px]" : ""} ${item.level >= 5 ? "ml-8 text-[12px]" : ""}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              ) : null}

              <div className="mt-5 rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.35)] backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Quick details
                </p>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {post.publishedAt ? (
                    <p>
                      <span className="font-semibold text-slate-900">Published:</span>{" "}
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  ) : null}
                  <p>
                    <span className="font-semibold text-slate-900">Read time:</span> {readTime}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Category:</span>{" "}
                    {primaryCategory}
                  </p>
                </div>
              </div>

              {resourceLinks.length > 0 ? (
                <div className="mt-5 rounded-[28px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.35)] backdrop-blur-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Resources
                  </p>
                  <nav className="mt-4 space-y-2.5">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-2xl px-3 py-2 text-sm leading-6 text-slate-600 transition hover:bg-slate-50 hover:text-[#7C3AED]"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </div>
              ) : null}

              <div
                className="mt-5 rounded-[28px] border border-[#7C3AED]/10 p-5 text-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
                style={ctaPanelStyle}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                  Need help with this?
                </p>
                <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] text-white">
                  Turn this into an action plan
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  If you want help fixing the right pages first, we can turn the audit
                  findings into a practical next step.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    href="/seo-tools"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(124,58,237,0.8)] transition hover:opacity-95"
                  >
                    Run the free SEO audit
                  </Link>
                  <Link
                    href="/lp/book-a-call"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Book a strategy call
                  </Link>
                </div>
              </div>
            </aside>

            <div className="min-w-0">
              {toc.length > 0 ? (
                <details className="mb-5 rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_46px_-32px_rgba(15,23,42,0.3)] xl:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-slate-800">
                    <span className="inline-flex items-center gap-2">
                      <BookOpenText className="h-4 w-4 text-[#7C3AED]" />
                      In this article
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Tap to open
                    </span>
                  </summary>
                  <nav className="mt-4 space-y-1.5 border-t border-slate-200 pt-4">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block rounded-2xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 ${item.level >= 3 ? "ml-3" : ""} ${item.level >= 4 ? "ml-6 text-[13px]" : ""} ${item.level >= 5 ? "ml-8 text-[12px]" : ""}`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </details>
              ) : null}

              <div className="mb-5 grid gap-5 xl:hidden md:grid-cols-2">
                <div className="rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_46px_-32px_rgba(15,23,42,0.3)]">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Quick details
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                    {post.publishedAt ? (
                      <p>
                        <span className="font-semibold text-slate-900">Published:</span>{" "}
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    ) : null}
                    <p>
                      <span className="font-semibold text-slate-900">Read time:</span> {readTime}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Category:</span>{" "}
                      {primaryCategory}
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-[24px] border border-[#7C3AED]/10 px-5 py-4 text-white shadow-[0_20px_60px_-40px_rgba(15,23,42,0.45)]"
                  style={ctaPanelStyle}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/85">
                    Need help with this?
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Run the audit or book a call if you want help prioritizing the fixes.
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      href="/seo-tools"
                      className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(124,58,237,0.8)] transition hover:opacity-95"
                    >
                      Run the free SEO audit
                    </Link>
                    <Link
                      href="/lp/book-a-call"
                      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                      Book a strategy call
                    </Link>
                  </div>
                </div>
              </div>

              {resourceLinks.length > 0 ? (
                <div className="mb-5 rounded-[24px] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_46px_-32px_rgba(15,23,42,0.3)] xl:hidden">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Resources
                  </p>
                  <nav className="mt-4 grid gap-2 md:grid-cols-2">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-2xl px-3 py-2 text-sm leading-6 text-slate-600 transition hover:bg-slate-50 hover:text-[#7C3AED]"
                      >
                        {link.text}
                      </Link>
                    ))}
                  </nav>
                </div>
              ) : null}

              <div className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_24px_80px_-40px_rgba(15,23,42,0.38)]">
                <div className="px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
                  <div
                    className="blog-rich-content"
                    dangerouslySetInnerHTML={{ __html: articleHtml }}
                  />

                  {/* Author byline */}
                  <div className="mt-10 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] text-sm font-bold text-white">
                      SG
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Written by {post.author?.name || "Shree Krishna Gauli"}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Dallas-based digital marketing consultant specializing in SEO, paid media, and marketing automation for healthcare and service businesses.
                      </p>
                    </div>
                  </div>

                  {/* Last updated */}
                  {post.updatedAt && (
                    <p className="mt-4 text-xs text-slate-400">
                      Last updated: {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                  )}

                  <div
                    className="mt-14 rounded-[28px] border border-[#7C3AED]/10 p-6 text-white sm:p-8"
                    style={ctaPanelStyle}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                      Need help with this?
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                      Turn blog insight into real marketing action
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                      If you want this kind of structure applied to your SEO, paid
                      media, or automation work, we can map the highest-leverage
                      next step together.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        href="/lp/book-a-call"
                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#7C3AED,#22D3EE)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(124,58,237,0.8)] transition hover:opacity-95"
                      >
                        Book a strategy call
                      </Link>
                      <Link
                        href="/seo-tools"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        Run a free SEO audit
                      </Link>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        Share article
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Send this to someone working through the same problem.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildShareUrl("linkedin", shareUrl, post.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/5 hover:text-[#7C3AED]"
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#7C3AED]/30 hover:bg-[#7C3AED]/5 hover:text-[#7C3AED]"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Link2 className="h-4 w-4" />
                        )}
                        {copied ? "Copied" : "Copy link"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="hidden xl:block">
              <div className="sticky top-28 flex flex-col items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400 [writing-mode:vertical-rl]">
                  Share
                </span>

                <a
                  href={buildShareUrl("linkedin", shareUrl, post.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)] transition hover:border-[#7C3AED]/30 hover:text-[#7C3AED]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-[0_12px_30px_-20px_rgba(15,23,42,0.35)] transition hover:border-[#7C3AED]/30 hover:text-[#7C3AED]"
                  aria-label="Copy article link"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                </button>
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="mt-16">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                    More from the blog
                  </p>
                  <h2 className="mt-2 font-heading text-3xl font-bold tracking-[-0.04em] text-slate-900">
                    Keep reading
                  </h2>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#7C3AED] transition hover:text-[#5b21b6]"
                >
                  Browse all articles
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                {relatedPosts.map((article) => (
                  <Link
                    key={article.href}
                    href={article.href}
                    className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_-38px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(15,23,42,0.38)]"
                  >
                    {article.image ? (
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.imageAlt || article.title}
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/30 to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <span className="rounded-full bg-[#070B14]/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                            {article.category}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`flex h-32 items-end bg-gradient-to-br p-5 ${article.gradient}`}
                      >
                        <span className="rounded-full bg-[#070B14]/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                          {article.category}
                        </span>
                      </div>
                    )}
                    <div className="p-5">
                      <h3 className="font-heading text-xl font-bold leading-snug tracking-[-0.03em] text-slate-900 transition group-hover:text-[#7C3AED]">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-500">
                        {article.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-xs text-slate-400">
                        <span>{article.date}</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          {article.readTime}
                          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </article>
  );
}
