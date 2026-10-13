# Hariom Verma — Portfolio

Personal developer portfolio built with React 18 + Vite, plain CSS variables, Framer Motion, and react-icons.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploy

**Vercel** (recommended):
1. Push this repo to GitHub.
2. Import the repo on [vercel.com](https://vercel.com).
3. Framework preset: **Vite**. Build command: `npm run build`. Output dir: `dist`.
4. Click Deploy.

**Netlify**:
1. Push to GitHub, connect on [netlify.com](https://netlify.com).
2. Build command: `npm run build`. Publish directory: `dist`.
3. The `public/_redirects` file is already included for SPA routing.

## Fill in your links before deploying

| File | Field | What to add |
|---|---|---|
| `src/data/links.js` | `github` | Your GitHub profile URL |
| `src/data/links.js` | `linkedin` | Your LinkedIn profile URL |
| `src/data/projects.js` | `githubUrl` × 4 | Each project's GitHub repo URL |
| `src/data/projects.js` | `liveUrl` × 4 | Live demo URL (leave `""` to hide button) |
| `src/data/certificates.js` | `link` × 9 | Each certificate's validation URL (leave `""` to hide View button) |
| `index.html` | canonical + og:url + og:image + twitter:image | Replace `hariomverma.dev` with your actual deployed domain |

## Connecting to Spring Boot later

All data access is isolated in `src/api/`. To swap static data for your REST API:

1. Set `VITE_API_BASE_URL=http://localhost:8080` in a `.env.local` file.
2. Open `src/api/projects.js` and uncomment the `fetch` implementation (the TODO block is already there).
3. Create matching files `src/api/experience.js`, `src/api/certificates.js`, etc., following the same pattern.
4. Your Spring Boot endpoints should match: `GET /api/projects`, `GET /api/experience`, `POST /api/contact`, etc.
5. For the contact form, open `src/components/Contact/Contact.jsx` and replace the `sendMessage` function with the `fetch POST` call shown in the TODO comment block already in that file.
