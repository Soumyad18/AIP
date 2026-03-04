export const ResumeAnalyzer = () => `
  <div class="card pad">
    <h3>Resume Analyzer</h3>
    <p>Upload your resume and compare against a target job description.</p>
    <div class="row2">
      <div>
        <label>Resume Upload (PDF)</label>
        <input class="input" type="file" id="resumeFile" accept="application/pdf" />
        <p id="resumeStatus"></p>
      </div>
      <div>
        <label>Job Description</label>
        <textarea class="input" id="jobDescription" placeholder="Paste full JD..."></textarea>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-primary" id="analyzeBtn">Analyze Resume</button>
      <button class="btn btn-secondary" id="optimizeBtn">Optimize Resume</button>
      <button class="btn btn-secondary" id="downloadBtn">Download</button>
    </div>
    <p id="loading"></p>
    <div id="error"></div>
    <div id="results" style="display:none">
      <div class="row2">
        <div class="card pad"><h4>ATS Score</h4><p id="score" style="font-size:40px;font-weight:800"></p></div>
        <div class="card pad"><h4>Matched Keywords</h4><div id="matched" class="chips"></div></div>
      </div>
      <div class="card pad" style="margin-top:12px"><h4>Missing Skills</h4><div id="missing" class="chips"></div></div>
      <div class="card pad" id="optimizedWrap" style="display:none;margin-top:12px"><h4>Optimized Resume</h4><pre id="optimizedText"></pre></div>
    </div>
  </div>
`;

export const bindResumeAnalyzer = () => {
  const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:4000/api' : '/api';
  const el = (id) => document.getElementById(id);
  let resumeText = '';
  let analysis = null;
  let optimizedResume = '';
  const setError = (message = '') => (el('error').innerHTML = message ? `<div class="error">${message}</div>` : '');
  const setLoading = (message = '') => (el('loading').textContent = message);

  el('resumeFile')?.addEventListener('change', async (event) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') return setError('Invalid file type. Please upload a PDF.');
    el('resumeStatus').textContent = 'Uploading and extracting resume text...';
    const formData = new FormData();
    formData.append('resume', file);
    try {
      const resp = await fetch(`${apiBase}/resume/upload`, { method: 'POST', body: formData });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Upload failed');
      resumeText = data.resumeText;
      el('resumeStatus').textContent = 'Resume successfully parsed and ready for analysis.';
    } catch (err) {
      el('resumeStatus').textContent = '';
      setError(err.message || 'Upload failed');
    }
  });

  el('analyzeBtn')?.addEventListener('click', async () => {
    setError(''); optimizedResume='';
    const jobDescription = el('jobDescription').value.trim();
    if (!resumeText) return setError('Please upload a resume before analyzing.');
    if (!jobDescription) return setError('Please paste a job description.');
    setLoading('Analyzing...');
    try {
      const resp = await fetch(`${apiBase}/analyze`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({resumeText,jobDescription})});
      const data = await resp.json(); if(!resp.ok) throw new Error(data.error||'Analyze failed');
      analysis = data;
      el('score').textContent = `${analysis.score}%`;
      el('matched').innerHTML = analysis.matchedKeywords.map((k)=>`<span class="chip">${k}</span>`).join('') || 'None';
      el('missing').innerHTML = analysis.missingKeywords.map((k)=>`<span class="chip">${k}</span>`).join('') || 'None';
      el('results').style.display='block'; el('optimizedWrap').style.display='none';
    } catch (err) { setError(err.message || 'Analyze failed'); }
    finally { setLoading(''); }
  });

  el('optimizeBtn')?.addEventListener('click', async () => {
    setError('');
    const jobDescription = el('jobDescription').value.trim();
    if (!resumeText || !analysis) return setError('Run analysis first.');
    setLoading('Optimizing...');
    try {
      const resp = await fetch(`${apiBase}/rewrite`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({resumeText,jobDescription})});
      const data = await resp.json(); if(!resp.ok) throw new Error(data.error||'Optimize failed');
      optimizedResume = data.optimizedResume;
      el('optimizedText').textContent = optimizedResume;
      el('optimizedWrap').style.display='block';
    } catch (err) { setError(err.message || 'Optimize failed'); }
    finally { setLoading(''); }
  });

  el('downloadBtn')?.addEventListener('click', () => {
    if (!optimizedResume) return setError('Nothing to download yet. Optimize first.');
    const blob = new Blob([optimizedResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download='optimized-resume.txt'; a.click(); URL.revokeObjectURL(url);
  });
};
