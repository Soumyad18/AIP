# ATS Intelligence Platform (AIP)

AIP helps job seekers optimize resumes for ATS with score, keyword gaps, and AI rewrite.

## Run locally

### Backend
```bash
cd aip-platform/backend
npm install
npm run dev
```

### Frontend
```bash
cd aip-platform/frontend
npm install
npm run dev
```

Open: `http://localhost:5173`

## Deploy on Vercel (single project)

This repository is configured so Vercel serves a root static app (`/index.html` + `/app.js`) and serverless APIs together.

### 1) Import project in Vercel
- Git repo: `Soumyad18/AIP`
- Framework preset: **Other**
- Root directory: `./` (repo root)

### 2) Environment variables (Project Settings → Environment Variables)
- `OPENAI_API_KEY` = your OpenAI key (optional but recommended)
- `OPENAI_MODEL` = `gpt-4o-mini` (optional)
- `MAX_UPLOAD_MB` = `5` (optional)

### 3) Deploy
Click **Deploy**.

### 4) Test deployed flow
- Open your deployed URL.
- Use homepage auth entry buttons (login/signup/enterprise).
- Scroll to Resume Analyzer.
- Upload PDF, paste JD, click **Analyze Resume**.
- Click **Optimize Resume** and **Download**.

### 5) Quick API checks
Replace `<your-vercel-url>`:

```bash
curl https://<your-vercel-url>/api/health
curl -X POST https://<your-vercel-url>/api/analyze \
  -H 'Content-Type: application/json' \
  -d '{"resumeText":"React TypeScript Node","jobDescription":"Need React TypeScript Node and Docker"}'
```

## Notes
- If `OPENAI_API_KEY` is not set, rewrite uses local fallback text generation.
- Frontend uses `http://localhost:4000/api` on localhost and `/api` when deployed.


## SaaS App Routes

- `/` public marketing landing page
- `/login` authentication page
- `/signup` registration page
- `/dashboard` protected product dashboard
- `/analyzer` protected resume analyzer tool

Protected routes redirect unauthenticated users to `/login`.


## Deployment Refresh Troubleshooting

If production still shows an old UI after merge:

1. In Vercel Deployments, confirm **Source commit** is your latest merged commit.
2. Click **Redeploy** on the latest deployment.
3. Hard refresh browser (`Ctrl/Cmd + Shift + R`).
4. Open in incognito to bypass local cache.

This repo now sends `no-store` cache headers for `index.html`, `app.js`, and `/src/*` on Vercel.


## Vercel Root Directory Note

This repo now supports both frontend entry locations:
- root app (`/index.html` + `/app.js`)
- `aip-platform/frontend/index.html` + `aip-platform/frontend/src/app.js`

If your Vercel project Root Directory is set to `aip-platform/frontend`, you should still get the latest SaaS UI.
Use page source to verify marker: `meta name="aip-ui-version" content="saas-v2-20260304b"`.
