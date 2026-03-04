# ATS Intelligence Platform (AIP)

AIP is a working prototype that helps job seekers optimize resumes for Applicant Tracking Systems (ATS).

## What you can do

- Upload a resume PDF.
- Paste a job description.
- Generate ATS compatibility score.
- See matched and missing keywords.
- Optimize the resume with AI rewrite.
- Download optimized resume as text.

## Run the application (no dependency install required)

This version is built to run in restricted environments.

### 1) Start backend (port 4000)

```bash
cd aip-platform/backend
npm run dev
```

### 2) Start frontend (port 5173)

```bash
cd aip-platform/frontend
npm run dev
```

### 3) Open app

- `http://localhost:5173`

## OpenAI (optional)

If `OPENAI_API_KEY` is set for backend, `/api/rewrite` uses OpenAI.
If not set, backend uses a local ATS-friendly fallback rewrite so demo still works.

Environment variables for backend:

- `PORT=4000`
- `OPENAI_API_KEY=`
- `OPENAI_MODEL=gpt-4o-mini`
- `MAX_UPLOAD_MB=5`

## API

- `POST /api/resume/upload`
- `POST /api/analyze`
- `POST /api/rewrite`
