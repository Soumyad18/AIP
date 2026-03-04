const {
  OPENAI_API_KEY,
  sendJson,
  handleOptions,
  parseJsonBody,
  sanitizeInput,
  analyzeResume,
  rewriteWithOpenAI,
  fallbackRewrite
} = require('./_lib');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const body = await parseJsonBody(req);
    const resumeText = sanitizeInput(body.resumeText);
    const jobDescription = sanitizeInput(body.jobDescription);

    if (!resumeText) return sendJson(res, 400, { error: 'Resume text cannot be empty.' });
    if (!jobDescription) return sendJson(res, 400, { error: 'Job description cannot be empty.' });

    const analysis = analyzeResume(resumeText, jobDescription);

    if (OPENAI_API_KEY) {
      const optimizedResume = await rewriteWithOpenAI(resumeText, jobDescription);
      return sendJson(res, 200, { optimizedResume });
    }

    const optimizedResume = fallbackRewrite(resumeText, analysis.matchedKeywords, analysis.missingKeywords);
    return sendJson(res, 200, { optimizedResume });
  } catch (error) {
    const message = error.message || 'AI API failure';
    const status = /AI API failure/.test(message) ? 500 : 400;
    return sendJson(res, status, { error: message });
  }
};
