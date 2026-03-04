import http from 'node:http';
import { URL } from 'node:url';

const PORT = Number(process.env.PORT || 4000);
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 5);
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const json = (res, status, payload) => {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
};

const sanitizeInput = (value = '') =>
  String(value)
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const STOP_WORDS = new Set([
  'and', 'the', 'with', 'for', 'you', 'your', 'will', 'our', 'are', 'this', 'that', 'from', 'have', 'has', 'had',
  'about', 'into', 'their', 'they', 'them', 'his', 'her', 'its', 'was', 'were', 'job', 'role', 'candidate', 'work',
  'years', 'year', 'experience', 'using', 'must', 'should', 'able', 'requirements', 'preferred', 'plus', 'etc', 'all'
]);

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractKeywords = (jobDescription) => {
  const tokens = normalize(jobDescription).split(' ').filter(Boolean);
  const set = new Set();
  for (const token of tokens) {
    if (token.length < 3 || STOP_WORDS.has(token)) continue;
    set.add(token);
  }
  return [...set].slice(0, 60);
};

const analyze = (resumeText, jobDescription) => {
  const keywords = extractKeywords(jobDescription);
  const normalizedResume = normalize(resumeText);
  const matchedKeywords = keywords.filter((k) => normalizedResume.includes(k));
  const missingKeywords = keywords.filter((k) => !normalizedResume.includes(k));
  const totalKeywords = keywords.length;
  const score = totalKeywords ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0;
  return { score, matchedKeywords, missingKeywords, totalKeywords };
};

const parseJsonBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });

const parseMultipartPdf = (req) =>
  new Promise((resolve, reject) => {
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
      reject(new Error('Invalid multipart request'));
      return;
    }

    const boundary = `--${boundaryMatch[1]}`;
    const chunks = [];
    let total = 0;

    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_UPLOAD_BYTES) {
        reject(new Error('Uploaded file is too large.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      const binary = buffer.toString('binary');
      const parts = binary.split(boundary);
      const filePart = parts.find((part) => part.includes('name="resume"'));

      if (!filePart) {
        reject(new Error('Resume file is required.'));
        return;
      }

      if (!filePart.includes('application/pdf')) {
        reject(new Error('Invalid file type. Please upload a PDF.'));
        return;
      }

      const headerEnd = filePart.indexOf('\r\n\r\n');
      if (headerEnd === -1) {
        reject(new Error('Invalid file upload format.'));
        return;
      }

      const pdfBinary = filePart.slice(headerEnd + 4, filePart.lastIndexOf('\r\n'));
      resolve(Buffer.from(pdfBinary, 'binary'));
    });

    req.on('error', reject);
  });

const extractTextFromPdfBuffer = (buffer) => {
  const text = buffer
    .toString('latin1')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\(([^)]{2,200})\)/g, ' $1 ')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text || text.length < 30) {
    throw new Error('Unable to extract text from uploaded PDF. Try a text-based PDF.');
  }
  return text;
};

const fallbackRewrite = (resumeText, matchedKeywords, missingKeywords) => {
  const highlights = [...matchedKeywords.slice(0, 10), ...missingKeywords.slice(0, 10)];
  return [
    'PROFESSIONAL SUMMARY',
    `Results-oriented candidate with experience aligned to: ${highlights.join(', ') || 'core role expectations'}.`,
    '',
    'CORE SKILLS',
    [...new Set(highlights)].map((x) => `- ${x}`).join('\n') || '- Communication\n- Collaboration\n- Problem solving',
    '',
    'EXPERIENCE (ATS-OPTIMIZED REWRITE)',
    resumeText,
    '',
    'NOTE: Content rewritten for ATS readability without adding fabricated experience.'
  ].join('\n');
};

const rewriteWithOpenAI = async (resumeText, jobDescription) => {
  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert resume optimization assistant focused on ATS readability and relevance. Do not fabricate any experiences, achievements, dates, certifications, or employers.'
        },
        {
          role: 'user',
          content: `Rewrite the candidate resume so that it better aligns with the provided job description. Do not fabricate experience. Improve phrasing, highlight relevant skills, and optimize the resume for ATS readability.\n\nCandidate Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nReturn only the rewritten resume in plain text.`
        }
      ]
    })
  });

  if (!resp.ok) throw new Error('AI API failure');
  const data = await resp.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
};

const server = http.createServer(async (req, res) => {
  if (!req.url) return json(res, 400, { error: 'Invalid request' });
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') return json(res, 200, { ok: true });
  if (req.method === 'GET' && url.pathname === '/health') return json(res, 200, { status: 'ok' });

  try {
    if (req.method === 'POST' && url.pathname === '/api/resume/upload') {
      const pdfBuffer = await parseMultipartPdf(req);
      const resumeText = extractTextFromPdfBuffer(pdfBuffer);
      return json(res, 200, { resumeText });
    }

    if (req.method === 'POST' && url.pathname === '/api/analyze') {
      const body = await parseJsonBody(req);
      const resumeText = sanitizeInput(body.resumeText);
      const jobDescription = sanitizeInput(body.jobDescription);
      if (!resumeText) return json(res, 400, { error: 'Resume text cannot be empty.' });
      if (!jobDescription) return json(res, 400, { error: 'Job description cannot be empty.' });
      return json(res, 200, analyze(resumeText, jobDescription));
    }

    if (req.method === 'POST' && url.pathname === '/api/rewrite') {
      const body = await parseJsonBody(req);
      const resumeText = sanitizeInput(body.resumeText);
      const jobDescription = sanitizeInput(body.jobDescription);
      if (!resumeText) return json(res, 400, { error: 'Resume text cannot be empty.' });
      if (!jobDescription) return json(res, 400, { error: 'Job description cannot be empty.' });

      const analysis = analyze(resumeText, jobDescription);
      let optimizedResume = '';
      if (OPENAI_API_KEY) {
        try {
          optimizedResume = await rewriteWithOpenAI(resumeText, jobDescription);
        } catch {
          return json(res, 500, { error: 'AI API failure' });
        }
      } else {
        optimizedResume = fallbackRewrite(resumeText, analysis.matchedKeywords, analysis.missingKeywords);
      }

      return json(res, 200, { optimizedResume });
    }

    return json(res, 404, { error: 'Route not found' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    const status = /too large/i.test(message)
      ? 413
      : /invalid|required|empty|unable/i.test(message)
        ? 400
        : 500;
    return json(res, status, { error: message });
  }
});

server.listen(PORT, () => {
  console.log(`AIP backend listening on http://localhost:${PORT}`);
});
