const { sendJson, handleOptions, parseJsonBody, sanitizeInput, analyzeResume } = require('./_lib');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const body = await parseJsonBody(req);
    const resumeText = sanitizeInput(body.resumeText);
    const jobDescription = sanitizeInput(body.jobDescription);

    if (!resumeText) return sendJson(res, 400, { error: 'Resume text cannot be empty.' });
    if (!jobDescription) return sendJson(res, 400, { error: 'Job description cannot be empty.' });

    return sendJson(res, 200, analyzeResume(resumeText, jobDescription));
  } catch (error) {
    return sendJson(res, 400, { error: error.message || 'Invalid request' });
  }
};
