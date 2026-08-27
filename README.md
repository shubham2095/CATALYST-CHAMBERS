# Catalyst Chambers — Website

Official website for **Catalyst Chambers – Advocates & Consultants**, a New Delhi-based law practice led by Adv. Rohit Ghosh.

## Tech Stack

- **Frontend:** React (Vite), React Router, Framer Motion, Lucide Icons
- **Backend:** Node.js + Express, Nodemailer (contact form emails)
- **Hosting:** Hostinger (Node.js hosting)

## Project Structure

```
CATALYST CHAMBERS/
├── client/    # React (Vite) frontend
└── server/    # Express backend (API + serves built frontend in production)
```

## Getting Started

### 1. Install dependencies

```bash
cd client && npm install
cd ../server && npm install
```

### 2. Configure environment variables

Create `server/.env` (see `server/.env` for the required keys):

```
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_TO=recipient1@example.com,recipient2@example.com
```

`EMAIL_PASS` must be a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password (requires 2-Step Verification enabled).

### 3. Run in development

```bash
# Terminal 1 — backend
cd server
npm run dev

# Terminal 2 — frontend
cd client
npm run dev
```

The frontend dev server proxies `/api` requests to the backend (see `client/vite.config.js`).

## Deployment

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Copy the generated `client/dist` folder into `server/`.
3. Deploy the `server` folder to Hostinger — Express serves both the API and the built frontend from a single Node.js process.

## Pages

Home, About, Services, Team, Gallery, Contact, FAQ, Privacy Policy, Terms of Service.

## Features

- Fully responsive, animated UI (Framer Motion scroll-reveals, page transitions)
- Contact form with email delivery via Nodemailer
- Floating WhatsApp / Call button
- SEO: meta tags, Open Graph, JSON-LD structured data, sitemap, robots.txt
