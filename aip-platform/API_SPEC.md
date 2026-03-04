# API_SPEC.md

Base URL: `http://localhost:4000`

## Health

### `GET /health`
Returns server status.

## Resume Upload

### `POST /api/resume/upload`
Upload a PDF resume as `multipart/form-data` field `resume`.

#### Response
```json
{
  "resumeText": "Extracted text ..."
}
```

#### Errors
- `400` Invalid file type
- `400` Missing file
- `413` File too large

## Analyze

### `POST /api/analyze`

#### Request Body
```json
{
  "resumeText": "...",
  "jobDescription": "..."
}
```

#### Response
```json
{
  "score": 72,
  "matchedKeywords": ["typescript", "react"],
  "missingKeywords": ["docker", "kubernetes"],
  "totalKeywords": 10
}
```

#### Errors
- `400` Empty resume or job description

## Rewrite

### `POST /api/rewrite`

#### Request Body
```json
{
  "resumeText": "...",
  "jobDescription": "..."
}
```

#### Response
```json
{
  "optimizedResume": "Rewritten resume text ..."
}
```

#### Errors
- `400` Empty inputs
- `500` OpenAI failure
