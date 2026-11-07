# EGARWORKS

Personal portfolio of Egar Dharmawangsa, built with Next.js App Router, React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Local development

Use Node.js 22.18+ or Node.js 24 LTS with npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open the Local URL printed by Next.js, normally `http://localhost:3000`. If that port is occupied, Next.js selects another port. Only run one development server for this checkout.

To build and run the production version:

```bash
npm run build
npm start
```

## Checks

```bash
npm test
npm run lint
npm run format:check
npm run build
```

`npm test` exercises the contact handler with a fake mail sender; it never sends real email. Run `npm run format` to format the source.

## Contact email

Set `EMAIL_USER` and `EMAIL_PASS` in `.env.local` for development and in your hosting provider's environment settings for production. Use a Gmail App Password. Do not commit real credentials.

The authenticated account is both sender and recipient. The visitor's address is assigned to `replyTo`, so replying reaches the visitor. The form remains visible regardless of mail configuration. Missing credentials produce HTTP 503 with a direct-email suggestion; the contact email link remains available. SMTP errors produce HTTP 502 with a generic message. No internal SMTP errors or form contents are returned or logged. Verify actual delivery with your own message after configuring the production credentials.

The handler validates fields on the server, limits request bodies to 24 KB, rejects cross-origin browser submissions, and includes a honeypot. It limits each normalized email address to three attempts and all addresses combined to twenty attempts per fifteen-minute window. Failed SMTP attempts also count. Limits are held in bounded process memory, with email addresses hashed. They reset when the process restarts and are independent across server instances. For reliable protection across multiple instances or serverless workers, configure rate limiting at your hosting provider's firewall or replace the limiter with a shared store. This lightweight limiter is not a distributed anti-abuse system.

## Editing content

- `src/data/projects/projectsData.json`: each project includes its title, description, image, link, icon, category, tags, and color. Metadata stays with the project when reordered or added. Leave `image` or `link` empty when unavailable; no empty navigation link is rendered. Unknown icon/color values fall back to a generic code icon and blue preview.
- `src/data/skills/skillsData.json`: each skill includes its icon name, label, and category (`frontend`, `styling`, `backend`, or `database`). Entries appear automatically in the corresponding group.
- `src/components/`: page sections and shared UI components.
- `src/app/globals.css`: theme tokens, layout, responsive styles, and reduced-motion preferences.
- `public/`: profile image, project screenshots, and downloadable CV.

AOS adds subtle, once-only scroll reveals. Content remains visible before initialization, without JavaScript, and when reduced motion is requested. Animations refresh after client-side navigation. The mobile navigation supports Escape and closes after selecting a section. The contact form provides associated labels, native validation, pending states, and live feedback.

## Visual style

The interface uses solid dark surfaces and a blue accent, without gradients. Glass is limited to the navbar (64% background opacity, 12px blur), About details (60%, 8px), and contact form (78%, 8px). Project cards, skill cards, the portrait badge, and mobile menu use solid backgrounds to keep their content clear. Browsers without backdrop filtering and devices requesting reduced transparency receive opaque surfaces.

Small text and controls have larger readable sizes. Mobile form inputs use 16px text and primary icon controls provide 44px touch targets. The existing Dot Pattern remains interactive, with no movement on touch screens or when reduced motion is requested.

## Project structure and release checks

- `src/app/`: routes, metadata, branded icon, social share image, sitemap, and the 404 page.
- `src/assets/fonts/`: bundled Inter variable font and its OFL license; builds do not download Google Fonts.
- `src/config/site.ts`: public identity, navigation, social links, email, and CV location. Update these here instead of editing multiple sections.
- `src/components/ui/`: reusable brand, button, and Dot Pattern components.
- `src/lib/`: shared contact validation and the server-side contact handler.
- `tests/`: contact behavior plus content, icon, and asset checks.
- `.github/workflows/ci.yml`: runs the checks on pushes to `main` and pull requests.

Run `npm run check` before a release. It runs lint, formatting checks, tests, and the production build. For a final smoke test, start the production build with `npm start` and check the homepage, mobile menu, CV download, project links, `/icon.svg`, `/opengraph-image`, `/robots.txt`, `/sitemap.xml`, and a missing page. Test actual email delivery only with your own intentional submission; automated tests never send messages.

The default public URL is the verified repository homepage, `https://egarworks.vercel.app`. Set `NEXT_PUBLIC_SITE_URL` at build time if the public domain changes; this updates canonical, sitemap, and social metadata. Never put email passwords in public environment variables.

Dependency note: the scoped `minimatch` override applies only to the TypeScript ESLint parser and closes GHSA-g3hv-75wg-m249. Remove it when the upstream parser accepts the patched major version. Next.js and its ESLint config stay on the same version; Nodemailer uses its own bundled TypeScript types. The shadcn CLI is not a runtime dependency: UI components live in this repository.
