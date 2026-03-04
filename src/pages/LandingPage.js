import { Navbar } from '../components/Navbar.js';

export const LandingPage = () => `
${Navbar()}
<section class="hero container">
  <h1>Land More Interviews with AI-Powered ATS Optimization</h1>
  <p>Upload your resume, compare it with any job description, and get an ATS score, skill gap insights, and an AI-optimized resume rewrite.</p>
  <div class="actions" style="justify-content:center">
    <a class="btn btn-primary" href="/signup" data-link>Get Started Free</a>
    <a class="btn btn-secondary" href="#enterprise">Enterprise Demo</a>
  </div>
</section>
<section class="container grid grid-3">
  <div class="card feature"><h3>ATS Compatibility Score</h3><p>Transparent scoring based on keyword alignment and role fit.</p></div>
  <div class="card feature"><h3>Skill Gap Analysis</h3><p>Identify missing qualifications and high-priority improvements.</p></div>
  <div class="card feature"><h3>AI Resume Rewrite</h3><p>Rewrite phrasing for ATS readability without fabricating experience.</p></div>
</section>
<section id="enterprise" class="container" style="margin-top:24px">
  <div class="card pad"><h2>Enterprise</h2><p>Team workspaces, governance, ATS reporting, and centralized candidate optimization workflows.</p><a class="btn btn-primary" href="/login" data-link>Request Demo</a></div>
</section>
<section class="container" style="margin-top:24px">
  <div class="card pad"><h2>Pricing</h2><p>Starter, Pro, and Enterprise plans coming soon.</p></div>
</section>
<footer class="footer"><div class="container">© ${new Date().getFullYear()} AIP — ATS Intelligence Platform</div></footer>
`;
