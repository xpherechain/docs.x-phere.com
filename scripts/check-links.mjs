#!/usr/bin/env node
/**
 * Link check over the built site.
 *
 * Docusaurus's own `onBrokenLinks` only sees links it generates from Markdown
 * and `<Link>`. A raw `<a href="references/public-en/">` in a React component is
 * invisible to it — that one shipped, and where it landed depended on the URL
 * the reader happened to be on. This catches both that and ordinary dead
 * internal links, from the artifact that actually gets deployed.
 *
 * Run after `npm run build`.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative, posix } from "node:path";

const BUILD = "build";

/** Paths served by the host rather than rendered as pages. */
const NON_PAGE_PREFIXES = [
  "/img/",
  "/assets/",
  "/downloads/",
  "/manifest",
  "/favicon",
  "/sitemap",
  "/robots",
  "/search-index",
  "/opensearch",
];

function htmlFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Does this site-absolute route resolve to a generated page? */
function routeExists(route) {
  const clean = route.split("#")[0].split("?")[0].replace(/\/$/, "") || "/index";
  const rel = clean.replace(/^\//, "");
  return (
    existsSync(join(BUILD, `${rel}.html`)) ||
    existsSync(join(BUILD, rel, "index.html"))
  );
}

const relativeLinks = [];
const brokenLinks = new Map();
let checked = 0;

for (const file of htmlFiles(BUILD)) {
  if (file.includes(`${BUILD}/assets/`)) continue;
  const page = relative(BUILD, file);
  const html = readFileSync(file, "utf8");

  for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|#|javascript:|data:)/.test(href)) continue;

    if (!href.startsWith("/")) {
      // Resolves against whatever URL the reader is on, so it is correct on one
      // page and wrong on the next. Always a defect, never intentional here.
      relativeLinks.push({ page, href });
      continue;
    }

    if (NON_PAGE_PREFIXES.some((p) => href.startsWith(p))) continue;

    checked += 1;
    if (!routeExists(href)) {
      if (!brokenLinks.has(href)) brokenLinks.set(href, new Set());
      brokenLinks.get(href).add(page);
    }
  }
}

console.log(`Checked ${checked} site-absolute links across ${htmlFiles(BUILD).length} pages.`);

let failed = false;

if (relativeLinks.length > 0) {
  failed = true;
  console.error(`\n${relativeLinks.length} relative link(s) — use an absolute path:`);
  for (const { page, href } of relativeLinks) {
    console.error(`  ${href}   in ${page}`);
  }
}

if (brokenLinks.size > 0) {
  failed = true;
  console.error(`\n${brokenLinks.size} broken link target(s):`);
  for (const [href, pages] of brokenLinks) {
    console.error(`  ${href}`);
    for (const p of [...pages].slice(0, 5)) console.error(`      from ${p}`);
  }
}

if (failed) process.exit(1);
console.log("No relative or broken internal links.");
