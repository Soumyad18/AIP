const { sendJson, handleOptions } = require('./_lib');

module.exports = (req, res) => {
  if (handleOptions(req, res)) return;
  if (req.method !== 'GET') return sendJson(res, 405, { error: 'Method not allowed' });
  return sendJson(res, 200, { status: 'ok' });
};
