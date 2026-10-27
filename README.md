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

## Backend (Spring Boot + MySQL)

The repo is two apps in one: this Vite frontend at the root, and a Spring Boot API in `backend/` (also published standalone at [Portfolio-backend](https://github.com/hariomvermas/Portfolio-backend)).

- Java 22, Spring Boot 4.1.2, Maven wrapper (`mvnw`) — no global Maven install needed
- MySQL via Docker (`backend/docker-compose.yml`, port **3308** so it never fights a local MySQL on 3306)
- Hibernate creates/updates the `contact_messages` table from the `@Entity` annotations (`ddl-auto=update`)

```bash
# 1. start MySQL (once)
docker compose -f backend/docker-compose.yml up -d

# 2. run the API  →  http://localhost:8080
cd backend
.\mvnw.cmd spring-boot:run

# 3. run the frontend  →  http://localhost:5173  (separate terminal, at the root)
npm run dev
```

First run downloads Maven dependencies; tests run DB-free with `cd backend; .\mvnw.cmd test`.

DB credentials live in `backend/src/main/resources/application.properties` — put your MySQL password in `spring.datasource.password` (or leave them and run the Docker compose above on 3306/3308).

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
| `index.html` | canonical + og:url + og:image + twitter:image | Currently set to the Vercel URL. Update all four if you move to a custom domain |

## Contact form — how it works now

`src/components/Contact/Contact.jsx` POSTs to `/api/contact`:

- **Dev:** the Vite proxy (`vite.config.js`) forwards `/api/*` to `localhost:8080`, so no CORS is involved. `VITE_API_BASE_URL` can stay empty (see `.env.example`).
- **Prod:** `vercel.json` rewrites `/api/*` to the deployed backend host — replace `YOUR-BACKEND-HOST` there after deploying the backend.
- **Validation:** client-side first, then Spring re-checks (`@NotBlank`, `@Email`, `@Size`) — a 400 renders each field's message under the matching input.
- **Honest fallback:** if the API is unreachable and no `VITE_API_BASE_URL` is set, the form opens the visitor's mail app (mailto) and says exactly that — it never shows a fake success.

## Not yet backend-backed

Everything except contact still loads from `src/data/*.js`. Serving projects, experience and certificates from MySQL (e.g. `GET /api/projects`) is the natural next step — follow the pattern in `src/api/projects.js` and the `contact` package in `backend/src/main/java/com/hariom/portfoliobackend/contact/`.
