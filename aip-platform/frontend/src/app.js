const apiBase = 'http://localhost:4000/api';

const el = (id) => document.getElementById(id);

let resumeText = '';
let analysis = null;

const setError = (message = '') => {
  el('error').innerHTML = message ? `<div class="err">${message}</div>` : '';
};

el('resumeFile').addEventListener('change', async (event) => {
  setError('');
  const file = event.target.files?.[0];
  if (!file) return;
  if (file.type !== 'application/pdf') {
    setError('Invalid file type. Please upload a PDF.');
    return;
  }

  el('resumeStatus').textContent = 'Uploading and extracting resume text...';
  const formData = new FormData();
  formData.append('resume', file);

  try {
    const resp = await fetch(`${apiBase}/resume/upload`, { method: 'POST', body: formData });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Upload failed');
    resumeText = data.resumeText;
    el('resumeStatus').textContent = 'Resume successfully parsed.';
  } catch (err) {
    el('resumeStatus').textContent = '';
    setError(err.message || 'Upload failed');
  }
});

el('analyzeBtn').addEventListener('click', async () => {
  setError('');
  const jobDescription = el('jobDescription').value.trim();
  if (!resumeText) return setError('Please upload a resume before analyzing.');
  if (!jobDescription) return setError('Please paste a job description.');

  el('loading').textContent = 'Analyzing...';
  try {
    const resp = await fetch(`${apiBase}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Analyze failed');
    analysis = data;

    el('score').textContent = `${data.score}%`;
    el('matched').innerHTML = data.matchedKeywords.map((k) => `<span class="chip">${k}</span>`).join('') || 'None';
    el('missing').innerHTML = data.missingKeywords.map((k) => `<span class="chip">${k}</span>`).join('') || 'None';
    el('results').style.display = 'block';
  } catch (err) {
    setError(err.message || 'Analyze failed');
  } finally {
    el('loading').textContent = '';
  }
});

el('optimizeBtn').addEventListener('click', async () => {
  setError('');
  const jobDescription = el('jobDescription').value.trim();
  if (!resumeText || !analysis) return setError('Run analysis first.');

  el('loading').textContent = 'Optimizing...';
  try {
    const resp = await fetch(`${apiBase}/rewrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Optimize failed');
    el('optimizedText').textContent = data.optimizedResume;
    el('optimizedWrap').style.display = 'block';
  } catch (err) {
    setError(err.message || 'Optimize failed');
  } finally {
    el('loading').textContent = '';
  }
});

el('downloadBtn').addEventListener('click', () => {
  const text = el('optimizedText').textContent || '';
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'optimized-resume.txt';
  a.click();
  URL.revokeObjectURL(url);
});
