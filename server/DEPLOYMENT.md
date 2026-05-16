# Deploy Team Task Manager API to Railway

This guide deploys the **Express + Prisma + PostgreSQL** backend from the `server/` directory.

## Prerequisites

- [Railway](https://railway.com) account
- Git repository pushed to GitHub (or connect via Railway)
- Node.js **20+** locally (for testing builds)

## 1. Create a Railway project

1. Open [Railway Dashboard](https://railway.com/dashboard) → **New Project**.
2. Choose **Deploy from GitHub repo** and select this repository.
3. When prompted for the service, set **Root Directory** to:
   ```
   server
   ```
   Railway must build from `server/`, not the monorepo root.

## 2. Add PostgreSQL

1. In the project, click **+ New** → **Database** → **PostgreSQL**.
2. After it provisions, open the Postgres service → **Variables** (or **Connect**).
3. Copy `DATABASE_URL` (Railway provides this automatically).

## 3. Link database to the API service

1. Open your **API service** (the `server` deploy).
2. Go to **Variables**.
3. Add a **reference** to the Postgres `DATABASE_URL`:
   - Click **New Variable** → **Add reference** → select Postgres → `DATABASE_URL`
   
   Or paste the connection string manually as `DATABASE_URL`.

> Railway Postgres URLs usually work as-is with Prisma. If SSL errors occur, ensure the URL includes `?sslmode=require`.

## 4. Required environment variables

Set these on the **API service** (Variables tab):

| Variable        | Required | Example / notes |
|-----------------|----------|-----------------|
| `DATABASE_URL`  | Yes      | From Postgres plugin (reference) |
| `JWT_SECRET`    | Yes      | 32+ random characters in production |
| `CLIENT_URL`    | Yes      | `https://your-frontend.vercel.app` or Railway frontend URL |
| `NODE_ENV`      | Yes      | `production` |
| `JWT_EXPIRES_IN`| No       | Default `7d` |
| `ALLOWED_ORIGINS` | No     | Comma-separated extra origins (preview URLs, etc.) |
| `PORT`          | No       | **Do not set** — Railway sets `PORT` automatically |

Example production values:

```env
NODE_ENV=production
JWT_SECRET=your-64-character-random-secret-here-replace-this-in-production
CLIENT_URL=https://your-frontend.up.railway.app
ALLOWED_ORIGINS=https://your-app.vercel.app
```

`railway.json` in this folder configures:

- **Build:** `npm ci && npm run build` (runs `prisma generate` + `tsc`)
- **Pre-deploy:** `npx prisma migrate deploy`
- **Start:** `npm run start`
- **Health check:** `GET /api/v1/health`

## 5. Deploy

1. Push to your default branch or click **Deploy** in Railway.
2. Watch **Build logs** — you should see `prisma generate` and `tsc` succeed.
3. Watch **Deploy logs** — `prisma migrate deploy` should apply migrations, then the server starts.

## 6. Get your backend URL

1. Open the API service → **Settings** → **Networking** → **Generate Domain**.
2. Your public API base URL will be like:
   ```
   https://your-service.up.railway.app
   ```
3. API routes are under `/api/v1`, for example:
   ```
   https://your-service.up.railway.app/api/v1/health
   https://your-service.up.railway.app/api/v1/auth/login
   ```

## 7. Connect the frontend

In the Next.js client (`client/.env.local` or hosting provider env):

```env
NEXT_PUBLIC_API_URL=https://your-service.up.railway.app/api/v1
```

Redeploy the frontend after changing this variable.

## 8. Verify deployment

```bash
curl https://your-service.up.railway.app/api/v1/health
```

Expected response:

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "database": "connected",
    ...
  }
}
```

## Local production build test

Before deploying:

```bash
cd server
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npm ci
npm run build
npm run start
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Prisma client / `role` type errors on build | Ensure build runs `prisma generate` (`npm run build` does this) |
| `Invalid environment variables` on boot | Set all required vars; `JWT_SECRET` ≥ 32 chars when `NODE_ENV=production` |
| CORS errors from browser | Set `CLIENT_URL` to exact frontend origin (scheme + host, no trailing slash). Add previews via `ALLOWED_ORIGINS` |
| `P1001` / DB connection | Check `DATABASE_URL` reference; Postgres service running |
| Migrations failed | Check deploy logs for `prisma migrate deploy`; fix SQL conflicts locally with `prisma migrate dev` |
| Port / health check failed | Do not set `PORT` manually; ensure `/api/v1/health` returns 200 |
| Build uses wrong folder | Set Railway **Root Directory** to `server` |

## Scripts reference

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local development with hot reload |
| `npm run build` | `prisma generate` + TypeScript compile → `dist/` |
| `npm run start` | Run compiled `dist/index.js` |
| `npm run prisma:migrate` | Create migrations locally |
| `npm run prisma:migrate:deploy` | Apply migrations (same as Railway pre-deploy) |
| `npm run prisma:generate` | Regenerate Prisma client |
