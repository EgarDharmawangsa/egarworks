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

The authenticated account is both sender and recipient. The visitor's address is assigned to `replyTo`, so replying reaches the visitor. Missing credentials produce HTTP 503; SMTP errors produce HTTP 502 with a generic message. No internal SMTP errors or form contents are returned or logged. Verify actual delivery with your own message after configuring the production credentials.

The handler validates fields on the server, limits request bodies to 24 KB, rejects cross-origin browser submissions, and includes a honeypot. It limits each normalized email address to three attempts and all addresses combined to twenty attempts per fifteen-minute window. Failed SMTP attempts also count. Limits are held in bounded process memory, with email addresses hashed. They reset when the process restarts and are independent across server instances. For reliable protection across multiple instances or serverless workers, configure rate limiting at your hosting provider's firewall or replace the limiter with a shared store. This lightweight limiter is not a distributed anti-abuse system.

## Editing content

- `src/data/projects/projectsData.json`: each project includes its title, description, image, link, icon, category, tags, and color. Metadata stays with the project when reordered or added. Leave `image` or `link` empty when unavailable; no empty navigation link is rendered. Unknown icon/color values fall back to a generic code icon and blue preview.
- `src/data/skills/skillsData.json`: each skill includes its icon name, label, and category (`frontend`, `styling`, `backend`, or `database`). Entries appear automatically in the corresponding group.
- `src/components/`: page sections and shared UI components.
- `src/app/globals.css`: theme tokens, layout, responsive styles, and reduced-motion preferences.
- `public/`: profile image, project screenshots, and downloadable CV.

The page content remains visible without animation libraries. The mobile navigation supports Escape and closes after selecting a section. The contact form provides associated labels, native validation, pending states, and live feedback.
