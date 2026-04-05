/**
 * Loads the Top-100 keywords from the SEO keyword blueprint and provides
 * helpers for keyword-driven blog topic selection with deduplication.
 *
 * At build/runtime the markdown file is parsed once and cached. Each keyword
 * row is extracted as { rank, keyword, cluster, intent, priority }.
 */

import fs from 'fs';
import path from 'path';

export interface SeoKeyword {
  rank: number;
  keyword: string;
  cluster: string;
  intent: string;
  priority: 'Top' | 'Medium' | 'Long-term';
}

let _cache: SeoKeyword[] | null = null;

/**
 * Parse the top-100-keywords.md markdown table rows into structured objects.
 */
function parseKeywordsFile(): SeoKeyword[] {
  // Try both known paths (seo-blog-system and seo-keyword-blueprint)
  const possiblePaths = [
    path.join(process.cwd(), 'seo-blog-system', 'main', 'top-100-keywords.md'),
    path.join(process.cwd(), 'seo-keyword-blueprint', 'main', 'top-50-keywords.md'),
  ];

  let raw = '';
  for (const p of possiblePaths) {
    try {
      raw = fs.readFileSync(p, 'utf-8');
      if (raw) break;
    } catch {
      continue;
    }
  }

  if (!raw) {
    console.warn('[keywords] Could not find keywords file — returning empty list');
    return [];
  }

  const keywords: SeoKeyword[] = [];

  // Match markdown table rows: | # | Keyword | Cluster | Search Intent | ... | Priority | ...
  // Each table group (Top, Medium, Long-term) is preceded by a section header.
  let currentPriority: 'Top' | 'Medium' | 'Long-term' = 'Top';

  for (const line of raw.split('\n')) {
    // Detect priority section headers
    if (/TOP PRIORITY/i.test(line)) currentPriority = 'Top';
    else if (/MEDIUM PRIORITY/i.test(line)) currentPriority = 'Medium';
    else if (/LONG.?TERM/i.test(line)) currentPriority = 'Long-term';

    // Parse table rows (skip header/separator rows)
    const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cells.length < 4) continue;

    const rank = parseInt(cells[0], 10);
    if (isNaN(rank) || rank < 1) continue;

    keywords.push({
      rank,
      keyword: cells[1],
      cluster: cells[2] || '',
      intent: cells[3] || '',
      priority: currentPriority,
    });
  }

  return keywords;
}

/**
 * Get all 100 keywords (cached after first call).
 */
export function getAllKeywords(): SeoKeyword[] {
  if (!_cache) {
    _cache = parseKeywordsFile();
  }
  return _cache;
}

/**
 * Pick the next unused keyword — prioritising Top > Medium > Long-term,
 * and preferring keywords whose exact phrase hasn't been used in any
 * existing post title, slug, or description.
 *
 * @param usedKeywords - Set of focus keywords already used by existing posts
 * @returns The best unused keyword, or null if all 100 have been used
 */
export function pickNextKeyword(usedKeywords: Set<string>): SeoKeyword | null {
  const all = getAllKeywords();

  // Normalise for comparison
  const normUsed = new Set([...usedKeywords].map((k) => k.toLowerCase().trim()));

  // First pass: exact matches against used keywords
  const unused = all.filter((kw) => !normUsed.has(kw.keyword.toLowerCase().trim()));

  if (unused.length === 0) return null;

  // Priority order: Top → Medium → Long-term
  const priorityOrder: Record<string, number> = { Top: 0, Medium: 1, 'Long-term': 2 };
  unused.sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9) || a.rank - b.rank);

  // Add a small randomisation within the same priority tier so we don't
  // always pick keyword #1 first (keeps topics varied).
  const topPriority = unused[0].priority;
  const sameTier = unused.filter((kw) => kw.priority === topPriority);
  const pick = sameTier[Math.floor(Math.random() * Math.min(sameTier.length, 5))];

  return pick;
}
