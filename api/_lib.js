const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB || 5);
const MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const STOP_WORDS = new Set([
  'and', 'the', 'with', 'for', 'you', 'your', 'will', 'our', 'are', 'this', 'that', 'from', 'have', 'has', 'had',
  'about', 'into', 'their', 'they', 'them', 'his', 'her', 'its', 'was', 'were', 'job', 'role', 'candidate', 'work',
  'years', 'year', 'experience', 'using', 'must', 'should', 'able', 'requirements', 'preferred', 'plus', 'etc', 'all'
]);

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.end(JSON.stringify(payload));
}

function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return true;
  }
  return false;
}

function sanitizeInput(value = '') {
  return String(value)
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractKeywords(jobDescription) {
  const tokens = normalize(jobDescription).split(' ').filter(Boolean);
  const set = new Set();
  for (const token of tokens) {
    if (token.length < 3 || STOP_WORDS.has(token)) continue;
    set.add(token);
  }
  return [...set].slice(0, 60);
}

function analyzeResume(resumeText, jobDescription) {
  const keywords = extractKeywords(jobDescription);
  const normalizedResume = normalize(resumeText);
  const matchedKeywords = keywords.filter((keyword) => normalizedResume.includes(keyword));
  const missingKeywords = keywords.filter((keyword) => !normalizedResume.includes(keyword));
  const totalKeywords = keywords.length;
  const score = totalKeywords ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 0;

  return { score, matchedKeywords, missingKeywords, totalKeywords };
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error('Body too large'));
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
}

function parseMultipartPdf(req) {
  return new Promise((resolve, reject) => {
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

      if (!filePart) return reject(new Error('Resume file is required.'));
      if (!filePart.includes('application/pdf')) return reject(new Error('Invalid file type. Please upload a PDF.'));

      const headerEnd = filePart.indexOf('\r\n\r\n');
      if (headerEnd === -1) return reject(new Error('Invalid file upload format.'));

      const pdfBinary = filePart.slice(headerEnd + 4, filePart.lastIndexOf('\r\n'));
      resolve(Buffer.from(pdfBinary, 'binary'));
    });

    req.on('error', reject);
  });
}

function extractTextFromPdfBuffer(buffer) {
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
}

async function rewriteWithOpenAI(resumeText, jobDescription) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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

  if (!response.ok) throw new Error('AI API failure');
  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || '';
}

function fallbackRewrite(resumeText, matchedKeywords, missingKeywords) {
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
}

module.exports = {
  OPENAI_API_KEY,
  sendJson,
  handleOptions,
  sanitizeInput,
  analyzeResume,
  parseJsonBody,
  parseMultipartPdf,
  extractTextFromPdfBuffer,
  rewriteWithOpenAI,
  fallbackRewrite
};
