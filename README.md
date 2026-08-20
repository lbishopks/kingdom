# UKnighted Kingdom

A rebuilt, SEO-optimized website for UKnighted Kingdom, built with Next.js (App Router) and Tailwind CSS — with a built-in admin dashboard for managing photos and video links.

## What's included

- **Pages:** Home, Our Story, Our Mission, Watch, Contact
- **SEO:** per-page metadata, Open Graph + Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, JSON-LD Organization schema
- **Performance:** semantic HTML, accessible nav with skip link, system-font stack (no external font requests)
- **Admin dashboard (`/admin`):** password-protected page to upload/replace the homepage hero photo, About photo, and Mission photo, plus edit the YouTube video link for each content series (The Light, Grace Under Glitter, It's a Sexy World, Sexy Church). Changes save instantly and appear live on the site — no code changes or redeploys needed.
- **Placeholder brand system:** royal purple + gold palette, easy to swap for real brand colors/logo in `src/app/globals.css`

## How the admin dashboard works

- Go to `/admin` (you'll be redirected to `/admin/login` if not signed in).
- Sign in with the password you set in `ADMIN_PASSWORD` (see setup below).
- Upload a photo for any section, or paste a YouTube link for any series, then click **Save Changes**.
- Photos are stored in **Vercel Blob** storage; the page content (which photo/video goes where) is stored as a small JSON file, also in Blob storage — no separate database needed.

## Required setup before this works

### 1. Connect Vercel Blob storage

In your Vercel project: **Storage → Create Database → Blob**. Once created and connected to the project, Vercel automatically sets the `BLOB_READ_WRITE_TOKEN` environment variable — you don't need to copy/paste it yourself.

### 2. Set admin login environment variables

In **Project → Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `ADMIN_PASSWORD` | The password she'll use to log into `/admin`. Pick something strong. |
| `ADMIN_SECRET` | A long random string used to sign login sessions (e.g. generate one with `openssl rand -hex 32`). Never share this. |

Redeploy after adding these so they take effect.

### For local development

Create a `.env.local` file in the project root:

```
ADMIN_PASSWORD=choose-a-password
ADMIN_SECRET=a-long-random-string
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token   # from Vercel Storage tab, or `vercel env pull`
```

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000 — and http://localhost:3000/admin for the dashboard.

## Before you launch

1. **Content:** Replace placeholder copy in `src/lib/site.ts` and each page under `src/app/*/page.tsx` with your real, up-to-date content.
2. **Photos & videos:** Use the `/admin` dashboard to upload real photos and paste real YouTube links — no code editing required.
3. **Contact form:** The contact form (`src/app/contact/ContactForm.tsx`) is currently front-end only. Connect it to a service like Formspree, Resend, or a custom Vercel API route so submissions actually go somewhere.
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
4. Before your first deploy (or right after), add the environment variables from the setup section above, and connect Vercel Blob storage
5. Click **Deploy**

Once ready, add your custom domain (`uknightedkingdom.com`) under **Project → Settings → Domains**, then log into `/admin` on the live site to start uploading real photos and video links.

## Security notes

- The admin dashboard uses a single shared password (no separate user accounts). Treat `ADMIN_PASSWORD` like any other sensitive credential — don't share it publicly, and change it if you ever suspect it's been exposed.
- Sessions last 12 hours and are stored in a secure, HTTP-only cookie — they can't be read by JavaScript or accessed from other sites.
- Uploaded images are limited to 8MB and common image formats (JPG, PNG, WebP, GIF, SVG).
