#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

// Override DATABASE_URL with DIRECT_URL to bypass the flaky pgbouncer pooler
const direct = process.env.DIRECT_URL;
if (direct) {
  process.env.DATABASE_URL = direct;
}

// Forward to the main publish script
const { createRequire } = await import('module');
const { default: publishScript } = await import('./publish-markdown-blog.mjs');
