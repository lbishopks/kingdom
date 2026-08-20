# UKnighted Kingdom

A rebuilt, SEO-optimized website for UKnighted Kingdom, built with Next.js (App Router) and Tailwind CSS.

## What's included

- **Pages:** Home, Our Story, Our Mission, Watch, Contact
- **SEO:** per-page metadata, Open Graph + Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, JSON-LD Organization schema
- **Performance:** fully static-generated pages (no server rendering needed), system-font stack (no external font requests), semantic HTML, accessible nav with skip link
- **Placeholder brand system:** royal purple + gold palette, easy to swap for real brand colors/logo in `src/app/globals.css`

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Before you launch

1. **Content:** Replace placeholder copy in `src/lib/site.ts` and each page under `src/app/*/page.tsx` with your real, up-to-date content.
2. **Images:** Add real photos/logo to `public/` and reference them with `next/image` for automatic optimization. The current favicon and OG image are simple placeholder SVGs — swap in your real logo/branding.
3. **Forms:** The newsletter and contact forms (`src/components/NewsletterForm.tsx`, `src/app/contact/ContactForm.tsx`) are currently front-end only. Connect them to a service like Formspree, Resend, ConvertKit, or a custom Vercel API route (`src/app/api/.../route.ts`) so submissions actually go somewhere.
4. **Domain & metadata:** Confirm `site.url` in `src/lib/site.ts` matches your production domain — this feeds the sitemap, canonical URLs, and Open Graph tags.
5. **Analytics/SEO tools:** After deploying, submit your sitemap (`/sitemap.xml`) to Google Search Console and Bing Webmaster Tools, and consider adding Vercel Analytics or Google Analytics.

## Deploy to GitHub + Vercel

```bash
# from this project folder
git init            # if not already a repo
git add -A
git commit -m "Initial UKnighted Kingdom site"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Then in [Vercel](https://vercel.com/new):

1. Click **Add New → Project**
2. Import the GitHub repo you just pushed
3. Framework preset will auto-detect as **Next.js** — leave defaults as-is
4. Click **Deploy**

Vercel will build and host the site automatically, and give you a live URL. Once ready, add your custom domain (`uknightedkingdom.com`) under **Project → Settings → Domains**.
