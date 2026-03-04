const {
  sendJson,
  handleOptions,
  parseMultipartPdf,
  extractTextFromPdfBuffer
} = require('../_lib');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const pdfBuffer = await parseMultipartPdf(req);
    const resumeText = extractTextFromPdfBuffer(pdfBuffer);
    return sendJson(res, 200, { resumeText });
  } catch (error) {
    const message = error.message || 'Upload failed';
    const status = /too large/i.test(message) ? 413 : 400;
    return sendJson(res, status, { error: message });
  }
};
