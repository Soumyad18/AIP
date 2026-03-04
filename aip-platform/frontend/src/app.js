const apiBase = 'http://localhost:4000/api';

const el = (id) => document.getElementById(id);

let resumeText = '';
let analysis = null;
let optimizedResume = '';
let currentAuthMode = 'login';

const setError = (message = '') => {
  el('error').innerHTML = message ? `<div class="error">${message}</div>` : '';
};

const setLoading = (message = '') => {
  el('loading').textContent = message;
};

const renderAuthModal = (mode) => {
  currentAuthMode = mode;
  const config = {
    login: {
      title: 'Log in to AIP',
      subtitle: 'Access your saved analyses and optimized resume history.',
      cta: 'Log in'
    },
    signup: {
      title: 'Create your AIP account',
      subtitle: 'Start free and optimize your first resume in minutes.',
      cta: 'Create account'
    },
    enterprise: {
      title: 'Enterprise SSO Access',
      subtitle: 'Sign in with your company domain and continue to SSO.',
      cta: 'Continue to SSO'
    }
  }[mode];

  el('modalTitle').textContent = config.title;
  el('modalSubtitle').textContent = config.subtitle;
  el('authSubmit').textContent = config.cta;
  el('authNotice').textContent = '';
  el('authEmail').value = '';
  el('authOrg').value = '';
  el('authPassword').value = '';
  el('authModal').style.display = 'flex';
};

const closeAuthModal = () => {
  el('authModal').style.display = 'none';
};

for (const button of document.querySelectorAll('[data-open]')) {
  button.addEventListener('click', () => renderAuthModal(button.dataset.open));
}

el('authCancel').addEventListener('click', closeAuthModal);
el('authModal').addEventListener('click', (event) => {
  if (event.target.id === 'authModal') closeAuthModal();
});

el('authSubmit').addEventListener('click', () => {
  const email = el('authEmail').value.trim();
  const org = el('authOrg').value.trim();
  const password = el('authPassword').value.trim();

  if (!email || !password) {
    el('authNotice').textContent = 'Please provide your email and password/token.';
    return;
  }

  const modeLabel = currentAuthMode === 'enterprise' ? 'Enterprise SSO request' : 'Authentication';
  el('authNotice').textContent = `${modeLabel} accepted for ${email}${org ? ` at ${org}` : ''}. (Demo mode)`;
  setTimeout(closeAuthModal, 900);
});

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
    el('resumeStatus').textContent = 'Resume successfully parsed and ready for analysis.';
    el('resumeStatus').className = 'ok';
  } catch (err) {
    el('resumeStatus').textContent = '';
    setError(err.message || 'Upload failed');
  }
});

el('analyzeBtn').addEventListener('click', async () => {
  setError('');
  optimizedResume = '';
  const jobDescription = el('jobDescription').value.trim();

  if (!resumeText) return setError('Please upload a resume before analyzing.');
  if (!jobDescription) return setError('Please paste a job description.');

  setLoading('Analyzing resume...');

  try {
    const resp = await fetch(`${apiBase}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Analyze failed');

    analysis = data;
    el('score').textContent = `${analysis.score}%`;
    el('matched').innerHTML = analysis.matchedKeywords.map((k) => `<span class="chip">${k}</span>`).join('') || 'None';
    el('missing').innerHTML = analysis.missingKeywords.map((k) => `<span class="chip">${k}</span>`).join('') || 'None';
    el('results').style.display = 'block';
    el('optimizedWrap').style.display = 'none';
  } catch (err) {
    setError(err.message || 'Analyze failed');
  } finally {
    setLoading('');
  }
});

el('optimizeBtn').addEventListener('click', async () => {
  setError('');
  const jobDescription = el('jobDescription').value.trim();

  if (!resumeText || !analysis) return setError('Run analysis first.');

  setLoading('Generating optimized resume...');

  try {
    const resp = await fetch(`${apiBase}/rewrite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobDescription })
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Optimize failed');

    optimizedResume = data.optimizedResume;
    el('optimizedText').textContent = optimizedResume;
    el('optimizedWrap').style.display = 'block';
  } catch (err) {
    setError(err.message || 'Optimize failed');
  } finally {
    setLoading('');
  }
});

el('downloadBtn').addEventListener('click', () => {
  if (!optimizedResume) {
    setError('Nothing to download yet. Optimize the resume first.');
    return;
  }

  const blob = new Blob([optimizedResume], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'optimized-resume.txt';
  a.click();
  URL.revokeObjectURL(url);
});
