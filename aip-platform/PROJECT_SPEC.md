# PROJECT_SPEC.md

## Product
ATS Intelligence Platform (AIP)

## Goal
Provide a working prototype where users can upload a resume, compare it against a job description, receive ATS scoring insights, and generate an AI-optimized rewrite.

## Functional Requirements

1. Upload resume PDF.
2. Extract plain text from resume.
3. Accept pasted job description text.
4. Analyze keyword alignment.
5. Compute ATS score:
   - `score = (matchedKeywords / totalKeywords) * 100`
6. Return:
   - score
   - matched keywords
   - missing keywords
7. Rewrite resume using OpenAI with anti-fabrication prompt.
8. Display results and allow optimized resume download.

## Non-functional Requirements

- TypeScript across frontend and backend.
- Input validation and error handling.
- File size/type restrictions for uploads.
- Clean modular structure for future scalability.
