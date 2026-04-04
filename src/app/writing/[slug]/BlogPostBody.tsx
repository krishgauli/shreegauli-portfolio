"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface Post {
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

export function BlogPostBody({ post }: { post: Post }) {
  return (
    <article className="relative z-10 section-pad px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>

        {/* Cover image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F8FAFC] leading-tight tracking-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-[#94A3B8] leading-relaxed font-medium border-l-4 border-[#7C3AED] pl-5">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-[#64748B]">
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author.name}
              </span>
            )}
            {post.publishedAt && (
              <time className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            )}
          </div>

          {/* Categories & tags */}
          {(post.categories.length > 0 || post.tags.length > 0) && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {post.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/15 px-3 py-1 text-xs font-medium text-[#C4B5FD]"
                >
                  {cat.name}
                </span>
              ))}
              {post.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-xs text-[#94A3B8]"
                >
                  <Tag className="h-3 w-3" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article body (HTML from CMS) */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-[#F8FAFC] prose-headings:font-bold
            prose-p:text-[#CBD5E1] prose-p:leading-relaxed
            prose-a:text-[#7C3AED] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#F8FAFC]
            prose-code:text-[#22D3EE] prose-code:bg-[#0F172A] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-[#0F172A] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
            prose-blockquote:border-[#7C3AED] prose-blockquote:text-[#94A3B8]
            prose-img:rounded-2xl prose-img:border prose-img:border-white/10
            prose-li:text-[#CBD5E1]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer CTA */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-xl">
          <p className="text-sm text-[#94A3B8] mb-4">
            Want to chat about this topic or work together?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#7C3AED] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B5CF6]"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </article>
  );
}
