# Catalyst Chambers — Website

Official website for **Catalyst Chambers – Advocates & Consultants**, a New Delhi-based law practice led by Adv. Rohit Ghosh.

It is one Node.js app: an Express server that serves the API **and** the built React website. A small admin panel at `/admin` lets the owner edit the website's text, images, team, FAQs and blog without touching code. There is **no database**: content is stored in JSON files on the server.

## Tech stack

- **Frontend:** React 19 (Vite), React Router, Framer Motion, Lucide icons
- **Backend:** Node.js 20+, Express 5, Nodemailer (contact and careers emails)
- **Admin:** login with a bcrypt-hashed password and a JWT in an httpOnly cookie, TipTap rich-text editor for blog posts
- **Security:** helmet, rate limiting, zod validation, HTML sanitizing for blog posts

## Folder structure

```
.
├── client/                    React website + admin panel (Vite)
│   ├── public/                favicons, robots.txt, images/{brand,gallery,team}
│   └── src/
│       ├── components/        layout/, common/, icons/, admin/
│       ├── context/           ContentContext (site content), AuthContext, UnsavedContext
│       ├── pages/public/      the public pages (each with its .css)
│       ├── pages/admin/       login, dashboard, section editors, blog editor
│       └── services/          API helpers
├── server/
│   ├── server.js              entry file
│   ├── routes/ controllers/ middleware/ schemas/ services/
│   ├── content-defaults/      the website's starting content (committed JSON files)
│   └── scripts/hash-password.js
├── storage/                   LOCAL ONLY (gitignored): live content + uploaded images
├── .env.example               every environment variable, with comments
└── package.json               all backend dependencies and scripts
```

## Run it locally

1. Install dependencies (root, then the client):

   ```bash
   npm install
   npm install --prefix client
   ```

2. Create your environment file: copy `.env.example` to `.env` (same folder) and fill in the values.

3. Create the admin password hash and secret:

   ```bash
   npm run hash-password
   ```

   It asks for a password and prints `ADMIN_PASSWORD_HASH` and `JWT_SECRET` lines. Paste both into `.env` (keep the single quotes around the hash) and set `ADMIN_EMAIL` to the email you will log in with.

4. Start the website and the server together:

   ```bash
   npm run dev
   ```

   - Website: <http://localhost:5173> (Vite, reloads as you edit code)
   - API server: <http://localhost:5000>
   - Admin: <http://localhost:5173/admin>

### Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the website into `client/dist` |
| `npm start` | Runs the server (serves `client/dist` and the API) — what Hostinger runs |
| `npm run hash-password` | Creates the admin password hash and a JWT secret |

To try the production setup locally: `npm run build`, then `npm start`, then open <http://localhost:5000>.

## How content works

The website text, team, FAQs, blog and so on live in JSON files, one per section: `site`, `home`, `about`, `services`, `team`, `gallery`, `faqs`, `blog`.

- **Defaults** — `server/content-defaults/*.json` is committed to git. It is the starting content.
- **Live content** — on startup the server copies any missing file from the defaults into `CONTENT_DIR` (locally `storage/content`). The admin panel edits **these** files. The website reads them.
- **Uploaded images** — saved in `UPLOAD_DIR` (locally `storage/uploads`) and served at `/uploads/…`.
- Both folders are **outside git**, so deploying new code never overwrites what you edited in the admin.
- Every save is checked (zod), written to a temporary file and then renamed, so a crash cannot leave a half-written file.
- Draft blog posts are stored but never sent to the public website.

Because live files win over defaults, **changing `server/content-defaults/` later does not change a site that already has live content**. To reset a section to the defaults, delete its file in `CONTENT_DIR` and restart the server.

**Backups:** there is no automatic backup. Copy the `CONTENT_DIR` and `UPLOAD_DIR` folders now and then (for example with the Hostinger File Manager). Restoring means copying them back.

## Using the admin panel

Open `/admin` and log in with `ADMIN_EMAIL` and the password you chose. The admin is not linked from the public site and is hidden from search engines.

| Section | What you can change |
| --- | --- |
| Site Settings | Firm name, phone, WhatsApp, emails, address, office hours, LinkedIn, footer text, disclaimer pop-up, Google Maps, default SEO title and description |
| Home | Top section text and photo, counters, "why choose us", practice-area cards, office photos |
| About | Introduction, founder profile, career timeline, education, memberships, publications |
| Services | Practice areas, additional areas and the Track Record (notable matters) |
| Team | Team members: name, designation, photo, bio, LinkedIn, specializations |
| Gallery | Photos and captions (upload, reorder, delete) |
| FAQs | Questions and answers |
| Blog | Create, edit, publish/hide, reorder and delete posts |

Tips:

- Click **Save changes** on each page. The site shows the change as soon as you refresh it. A warning appears if you try to leave with unsaved changes.
- In lists, use the arrows to reorder and the bin to delete. Deleting only takes effect after you save.
- **Blog:** "New post" creates a draft. Set Status to *Published* and save to show it. The web address (slug) is created from the title. Changing the slug of a published post breaks old links to it.
- Posts with special formatting (like numbered headings) open in **HTML mode**. Editing them in the visual editor can remove that formatting.
- To show a LinkedIn or YouTube post, paste its *embed* link under "More options".
- Images: JPG, PNG or WebP, up to 5MB.

The Careers page, the Privacy Policy / Terms text, headings and the Contact form's options are still written in the code, not editable in the admin.

## Deploy on Hostinger (Node.js Web App from GitHub)

Hostinger runs the app from your GitHub repository. Every push to `main` redeploys it.

### 1. Create the folders for live content and uploads (once)

These must be **outside** the deployed app folder, otherwise a redeploy can remove your edits.

1. Open the Hostinger **SSH Access** (or the File Manager) for your hosting plan.
2. In SSH, go to your home folder and print its full path:

   ```bash
   cd ~ && pwd
   ```

   You will see something like `/home/u123456789`.
3. Create the two folders:

   ```bash
   mkdir -p ~/catalyst-data/content ~/catalyst-data/uploads
   ```

   Their absolute paths are `/home/u123456789/catalyst-data/content` and `/home/u123456789/catalyst-data/uploads` (use your own number).

### 2. Create the Node.js Web App

1. In hPanel go to **Websites → Add website → Node.js Apps** and choose **Import Git Repository**. Connect GitHub and pick this repository, branch `main`.
2. Use these settings:
   - **Node.js version:** 20 or newer
   - **Build command:** `npm run build`
   - **Entry file / start file:** `server/server.js`
3. Turn on auto-deploy so a push to `main` redeploys.

### 3. Add the environment variables

In the app's **Environment variables** section add every variable below. Do not commit them to git.

| Variable | Value |
| --- | --- |
| `NODE_ENV` | `production` |
| `SITE_URL` | `https://your-domain.com` (no trailing slash) |
| `EMAIL_USER` | Gmail address that sends the enquiry emails |
| `EMAIL_PASS` | Gmail **App Password** (not the normal password) |
| `EMAIL_TO` | Where enquiries are delivered (comma-separate several) |
| `ADMIN_EMAIL` | Your admin login email |
| `ADMIN_PASSWORD_HASH` | Output of `npm run hash-password`, pasted **without** the single quotes |
| `JWT_SECRET` | The long random value from `npm run hash-password` |
| `JWT_EXPIRES_IN` | `8h` |
| `COOKIE_SECURE` | `true` (the live site uses https) |
| `CONTENT_DIR` | `/home/<your-number>/catalyst-data/content` |
| `UPLOAD_DIR` | `/home/<your-number>/catalyst-data/uploads` |

`PORT` is set by Hostinger — do not set it yourself.

### 4. First deploy and domain

1. Deploy. Hostinger installs the dependencies, runs `npm run build`, then starts `server/server.js`.
2. Open the site and check the pages, the contact form and `/admin`.
3. Connect your domain and turn on **SSL** (free) in hPanel. Keep `COOKIE_SECURE=true`; the admin login only works over https when it is on.
4. After the domain works, in Google Search Console submit `https://your-domain.com/sitemap.xml`.

The first start fills `CONTENT_DIR` with the default content, so the site looks exactly like the code's starting content. After that, edit it from the admin.

### Updating the site later

- **Code changes:** push to `main`. Admin edits and uploads are untouched.
- **If the app does not start:** open the app's logs in hPanel. A warning about missing `ADMIN_*` / `JWT_SECRET` / `EMAIL_*` variables means they are not set.

## Notes

- Form submissions (contact and careers) are only emailed, never stored.
- `GET /api/health` returns `{ "status": "ok" }`.
- `/sitemap.xml` is generated from the live content, so published blog posts appear in it automatically (drafts never do).
