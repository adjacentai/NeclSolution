# neclco.com

Website for NeCL — AI Engineering Studio.

**Live:** https://neclco.com

## Structure

```
index.html          Main landing page
blog/
  index.html        Blog listing
  *.html            Individual posts
privacy.html        Privacy policy
sitemap.xml         For Google indexing
robots.txt          Crawler rules
assets/images/      Images
CNAME               Custom domain config
```

## Adding a blog post

1. Create `blog/your-post-slug.html` — copy an existing post as template
2. Update `<title>`, `<meta description>`, `<link rel="canonical">`
3. Write content inside `<article>`
4. Add link to `blog/index.html`
5. Add URL to `sitemap.xml`
6. Push:

```bash
git add -A && git commit -m "New post: your title" && git push origin main
```

Post goes live in ~2 minutes after push.

## SEO checklist for each post

- [ ] Unique `<title>` with keyword (under 60 chars)
- [ ] `<meta name="description">` (under 155 chars)
- [ ] `<link rel="canonical">` with full URL
- [ ] One `<h1>` per page
- [ ] Heading hierarchy: h1 > h2 > h3
- [ ] Internal links to other posts / main page
- [ ] CTA box at the end
- [ ] Added to `sitemap.xml`
- [ ] Added to `blog/index.html`

## Tech

Static HTML + CSS + JS. Hosted on GitHub Pages. No build step, no framework.

## Contact

neclcompany@gmail.com
