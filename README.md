# neclco.com

Website for NeCL — AI Engineering Studio.

**Live:** https://neclco.com

## Structure

```
index.html          Main landing page (hero, services, products,
                    open-source cards, cases, process, FAQ, lead form)
blog/
  index.html        Blog listing
  *.html            Individual posts
privacy.html        Privacy policy
terms.html          Terms of use
sitemap.xml         For Google indexing
robots.txt          Crawler rules
assets/images/      Images (incl. blog/ hero images)
CNAME               Custom domain config
```

## Lead form (contact)

The bottom CTA on `index.html` (`#contact`) is a **Web3Forms**-backed lead form
— name + email + required consent checkbox. Static-site friendly: no backend.

- Submissions land in the inbox configured on [web3forms.com](https://web3forms.com) (neclcompany@gmail.com).
- The `access_key` lives in `index.html` — it's a **public** routing key (safe to expose, can only send mail to our inbox, can't read anything). To rotate it, create a new key in the Web3Forms dashboard and swap the `value` on the `access_key` hidden input.
- Domain is locked to `neclco.com` in the Web3Forms dashboard — the key won't work from other sites or `localhost`. **Test on production, not locally.**
- Anti-spam: hidden `botcheck` honeypot + required consent checkbox. Add hCaptcha in the dashboard if spam ever appears.
- Submission is sent via `fetch` (no page redirect); success/error shows inline. GA4 fires a `lead_submit` event on success.
- Nav and hero CTAs scroll to `#contact`. There is **no Calendly** on the homepage.

## Adding a blog post

Drafts are written in Markdown first (in the marketing workspace), reviewed,
then converted to HTML and committed here. Manual steps for a single post:

1. Create `blog/your-post-slug.html` — copy an existing post as template (recommended: `cream-typer-...html`, it has every block we use)
2. Update `<title>`, `<meta description>`, `<link rel="canonical">`, OG/Twitter tags
3. Write content inside `<article>`:
   - Lead paragraph (1–2 sentences, hook)
   - **TL;DR box** with 4–5 concrete bullets including real numbers
   - Body (H2/H3 sections, code blocks, tables as needed)
   - **FAQ section** (5–8 Q&A) — short, autonomous answers (1–2 sentences each)
   - "See also" internal links to 2–3 related posts
   - CTA box
4. Add **FAQPage JSON-LD** in `<head>` — content MUST match visible FAQ text exactly
5. Add link to `blog/index.html`
6. Add URL to `sitemap.xml`
7. Push:

```bash
git add -A && git commit -m "New post: your title" && git push origin main
```

Post goes live in ~2 minutes after push.

After push: open [Google Search Console](https://search.google.com/search-console) → URL Inspection → paste the new URL → **Request Indexing**.

## SEO checklist for each post

**Head:**
- [ ] Unique `<title>` — intent keywords first, brand at end via `|` (under 70 chars)
- [ ] `<meta name="description">` — 145–160 chars, contains primary keyword
- [ ] `<link rel="canonical">` with full https://neclco.com/... URL
- [ ] OG tags: `og:type=article`, `og:url`, `og:title`, `og:description`, `og:image`
- [ ] `twitter:card=summary_large_image`
- [ ] FAQPage JSON-LD (`<script type="application/ld+json">`) matching visible FAQ
- [ ] **NO** `<meta name="keywords">` (ignored by Google since 2009)

**Body:**
- [ ] One `<h1>` per page
- [ ] Heading hierarchy: h1 > h2 > h3
- [ ] Lead paragraph after H1
- [ ] TL;DR box (`.tldr-box`) with concrete numbers — AI Overviews extract from this
- [ ] FAQ section with 5–8 short Q&A
- [ ] Internal links: 2–3 "See also" links to related posts
- [ ] CTA box at the end

**Distribution:**
- [ ] Added to `sitemap.xml`
- [ ] Added to `blog/index.html`
- [ ] Submitted to GSC for indexing after push

## Title formula

`{intent keywords} — {differentiator} | {product/brand}`

Examples:
- `How to Reduce OpenAI Costs 60% with Semantic Routing | NeCL`
- `Open-Source Whisper Voice Dictation for macOS — Offline, 18 Languages | Cream Typer`
- `White-Label AI Image Editor for Real Estate, Interior Design & Brands | Pickachu`

Avoid: product name first, generic "AI Assistant" without context, "Stop using X" / clever hooks that don't match search intent.

## Writing for AI Overviews (Google AI Mode)

Google extracts answers from pages with:
- **Concrete numbers** in TL;DR and body ("60% cost cut", "0.3s latency", "$1,500")
- **First-person experience** ("we built", "we tested", "our production result")
- **Short, autonomous Q&A** in FAQ (each answer makes sense without context above)
- **Unique data** nobody else publishes (our internal metrics, our pricing, our pipeline)

Do NOT bother with: `llms.txt`, "AI-friendly" chunking, artificial brand mentions. [Source: Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Tech

Static HTML + CSS + JS. Hosted on GitHub Pages. No build step, no framework.
Lead form via Web3Forms (no backend). Live GitHub star counts on the
open-source cards via the public GitHub API (fails silently if rate-limited).

## Contact

neclcompany@gmail.com
