# luanshixia.github.io

Personal portfolio and blog site for Yang Wang, hosted on GitHub Pages.

## Blog Post Workflow

When asked to create a new blog post (e.g. "create a blog post called my-new-post"), do the following:

1. **Copy `blog-template/index.html`** into a new folder at the repo root named after the post slug (e.g. `my-new-post/`).
2. **Create `my-new-post/index.html`** — a fully self-contained, rendered HTML page with the blog content. Do not use markdown files; write the final HTML directly.
3. **Place all assets** (images, scripts, stylesheets) inside the same folder. Use relative paths.
4. The post will be live at `https://luanshixia.github.io/my-new-post/` automatically via GitHub Pages.

### index.html conventions

- Match the site's dark aesthetic (`bg-[#0a0a0f]`, Inter font, violet accent palette) by referencing the same CDN resources used in the root `index.html` (Tailwind CDN, Inter via Google Fonts).
- Include a nav bar with a back link to `https://luanshixia.github.io/`.
- Include standard SEO tags: `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags.
- Include the Google Analytics snippet (Measurement ID: `G-XH6HR9TMBN`).

### Example structure

```
my-new-post/
  index.html       # rendered blog post
  hero.png         # any images
  diagram.svg      # any other assets
```

## Site Overview

- **Root `index.html`** — single-page React app (Babel standalone + ESM imports). Serves as portfolio homepage with sections: Hero, About, Experience, Projects.
- **`blogs/`** — legacy markdown files from the pre-AI era. No longer the primary blog format; new posts use the folder-per-post approach above.
- **`archive/`** — old demos and templates. Not actively maintained.
- **`robots.txt`** — allows all crawlers; references sitemap.
- **`favicon.svg`** — YW monogram SVG favicon.

## SEO

Root `index.html` has: meta description, canonical URL, Open Graph tags, Twitter Card tags, JSON-LD `Person` schema.
New blog post pages should include their own per-post SEO tags.
