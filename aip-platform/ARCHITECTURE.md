# ARCHITECTURE.md

## Overview
AIP uses a two-tier architecture:

- **Frontend**: React + TypeScript SPA (Vite) with Tailwind styling and React Query for async state.
- **Backend**: Express + TypeScript API responsible for file ingestion, parsing, scoring, and AI rewriting.

## Flow

1. Client uploads PDF to `POST /api/resume/upload`.
2. Backend parses PDF text via `pdf-parse`.
3. Client submits resume text + job description to `POST /api/analyze`.
4. Backend scoring service extracts normalized keywords and computes ATS score.
5. Client requests rewrite via `POST /api/rewrite`.
6. Backend calls OpenAI and returns optimized resume text.

## Backend Modules

- `parsing/resumeParser.ts`: PDF parsing and extraction.
- `scoring/atsScoring.ts`: Keyword extraction + score calculation.
- `ai/rewriteEngine.ts`: OpenAI integration and prompt handling.
- `services/resume.service.ts`: Business orchestration layer.
- `controllers/resume.controller.ts`: HTTP controller logic.
- `routes/resume.routes.ts`: API route definitions.
- `middleware/errorHandler.ts`: Centralized error response logic.

## Frontend Modules

- `pages/*`: Route screens for landing, analysis, and results.
- `components/*`: Reusable UI components for upload, score cards, and rewrite viewer.
- `hooks/useAnalyzeResume.ts`: React Query mutation wrappers.
- `services/api.ts`: Shared HTTP client.
- `services/resumeService.ts`: Endpoint-specific API calls.

## Extensibility

- Replace simple ATS keyword scorer with semantic embeddings.
- Add persistent storage for user sessions and resumes.
- Add auth + multi-tenant data model.
