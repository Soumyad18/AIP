import { Link } from 'react-router-dom';

export const LandingPage = () => (
  <>
    <nav className="nav">
      <div className="container nav-inner">
        <div className="logo">AIP</div>
        <div className="actions">
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <a href="#enterprise" className="btn btn-secondary">Enterprise</a>
          <Link to="/signup" className="btn btn-primary">Sign up free</Link>
        </div>
      </div>
    </nav>
    <main>
      <section className="hero container">
        <h1>Land More Interviews with AI-Powered ATS Optimization</h1>
        <p>Upload your resume, compare it with any job description, and get an ATS score, skill gap insights, and an AI-optimized resume rewrite.</p>
        <div className="actions" style={{ justifyContent: 'center' }}>
          <Link to="/analyzer" className="btn btn-primary">Get Started Free</Link>
          <a href="#enterprise" className="btn btn-secondary">Enterprise Demo</a>
        </div>
      </section>
      <section className="container grid-layout grid-layout-3">
        <div className="card feature">
          <h3>ATS Compatibility Score</h3>
          <p>Transparent scoring based on keyword alignment and role fit.</p>
        </div>
        <div className="card feature">
          <h3>Skill Gap Analysis</h3>
          <p>Identify missing qualifications and high-priority improvements.</p>
        </div>
        <div className="card feature">
          <h3>AI Resume Rewrite</h3>
          <p>Rewrite phrasing for ATS readability without fabricating experience.</p>
        </div>
      </section>
      <section id="enterprise" className="container" style={{ marginTop: 24 }}>
        <div className="card pad">
          <h2>Enterprise</h2>
          <p>Team workspaces, governance, ATS reporting, and centralized candidate optimization workflows.</p>
          <Link to="/login" className="btn btn-primary">Request Demo</Link>
        </div>
      </section>
      <section className="container" style={{ marginTop: 24 }}>
        <div className="card pad">
          <h2>Pricing</h2>
          <p>Starter, Pro, and Enterprise plans coming soon.</p>
        </div>
      </section>
    </main>
    <footer className="footer">
      <div className="container">© {new Date().getFullYear()} AIP — ATS Intelligence Platform</div>
    </footer>
  </>
);
