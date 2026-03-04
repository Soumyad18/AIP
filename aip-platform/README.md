# ATS Intelligence Platform (AIP)

AIP is an AI-powered prototype that helps job seekers optimize resumes for Applicant Tracking Systems (ATS).

## Features

- Upload resume PDFs and extract text.
- Analyze resume alignment with a job description.
- Generate ATS compatibility score.
- Show matched and missing keywords.
- Rewrite resume content using OpenAI for ATS optimization.
- Download optimized resume as a text file.

## Monorepo Structure

```
aip-platform/
  frontend/   # React + Vite + Tailwind client
  backend/    # Express + TypeScript API
  shared/     # Shared artifacts (placeholder for future use)
  docs/       # Additional project docs
```

## Prerequisites

- Node.js 18+
- npm 9+
- OpenAI API key (for rewrite endpoint)

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
# set OPENAI_API_KEY in .env
npm run dev
```

Backend runs on `http://localhost:4000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## Environment Variables

Backend `.env`:

- `PORT=4000`
- `OPENAI_API_KEY=your_key`
- `OPENAI_MODEL=gpt-4o-mini` (optional)
- `MAX_UPLOAD_MB=5` (optional)
- `CORS_ORIGIN=http://localhost:5173` (optional)

## Core API

- `POST /api/resume/upload` - Upload PDF and extract resume text.
- `POST /api/analyze` - Compute ATS score + keyword alignment.
- `POST /api/rewrite` - Generate optimized resume rewrite.

For full details, see `API_SPEC.md`.
