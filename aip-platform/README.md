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
