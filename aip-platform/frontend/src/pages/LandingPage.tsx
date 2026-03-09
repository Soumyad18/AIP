import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#26A688" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export const LandingPage = () => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  // Auto-redirect logged-in users to the dashboard
  useEffect(() => {
    if (session) {
      navigate('/analyzer', { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="landing">
      {/* ───── Navbar ───── */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/aip-logo.svg" alt="AIP" style={{ width: 42, height: 42 }} />
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.2 }}>
              <span style={{ color: '#333F70' }}>ATS</span>{' '}
              <span style={{ color: '#26A688' }}>Intelligence Platform</span>
            </span>
          </Link>
          <div className="actions">
            {session ? (
              <>
                <Link to="/analyzer" className="btn btn-primary">Go to Dashboard</Link>
                <button onClick={signOut} className="btn btn-secondary">Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">Log in</Link>
                <Link to="/signup" className="btn btn-primary">Get Started Free</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>
        {/* ───── Hero ───── */}
        <section className="landing-hero">
          <div className="container">
            <div className="landing-hero-badge">
              <CheckCircle />
              Trusted by 1,000+ job seekers
            </div>
            <h1 className="landing-hero-title">
              Land More Interviews with<br />
              <span className="landing-hero-accent">AI-Powered ATS Optimization</span>
            </h1>
            <p className="landing-hero-sub">
              Upload your resume, compare it against any job description, and get an ATS compatibility score,
              skill gap insights, and an AI-optimized resume rewrite — in seconds.
            </p>
            <div className="landing-hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Free Analysis
                <ArrowRight />
              </Link>
              <a href="#features" className="btn btn-secondary btn-lg">See How It Works</a>
            </div>
            <p className="landing-hero-note">No credit card required · Free forever on Starter plan</p>
          </div>
        </section>

        {/* ───── Stats Bar ───── */}
        <section className="landing-stats">
          <div className="container">
            <div className="landing-stats-grid">
              <div className="landing-stat">
                <span className="landing-stat-num">95%</span>
                <span className="landing-stat-label">ATS Pass Rate</span>
              </div>
              <div className="landing-stat">
                <span className="landing-stat-num">3x</span>
                <span className="landing-stat-label">More Interviews</span>
              </div>
              <div className="landing-stat">
                <span className="landing-stat-num">30s</span>
                <span className="landing-stat-label">Analysis Time</span>
              </div>
              <div className="landing-stat">
                <span className="landing-stat-num">10K+</span>
                <span className="landing-stat-label">Resumes Optimized</span>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Features ───── */}
        <section id="features" className="landing-section">
          <div className="container">
            <h2 className="landing-section-title">Everything You Need to Beat the ATS</h2>
            <p className="landing-section-sub">Our AI analyzes your resume against real ATS algorithms to give you actionable improvements.</p>

            <div className="landing-features-grid">
              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8f5f1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#26A688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3>ATS Compatibility Score</h3>
                <p>Get a real-time compatibility score showing how well your resume matches the job requirements and ATS parsing rules.</p>
              </div>

              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8edf5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>Skill Gap Analysis</h3>
                <p>Identify missing keywords, qualifications, and skills that the job description requires but your resume lacks.</p>
              </div>

              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8f5f1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#26A688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <h3>AI Resume Rewrite</h3>
                <p>Automatically rewrite bullet points for ATS readability while preserving your authentic experience.</p>
              </div>

              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8edf5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h3>ATS-Verified Templates</h3>
                <p>Download professionally designed resume templates that are proven to pass ATS parsing systems.</p>
              </div>

              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8f5f1' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#26A688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
                <h3>Progress Tracking</h3>
                <p>Save every analysis, track your improvement over time, and compare resume versions side by side.</p>
              </div>

              <div className="card landing-feature-card">
                <div className="landing-feature-icon" style={{ background: '#e8edf5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333F70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3>Enterprise Security</h3>
                <p>Your data is encrypted and never shared. SOC 2 compliant infrastructure with SSO authentication.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── How It Works ───── */}
        <section className="landing-section landing-section--alt">
          <div className="container">
            <h2 className="landing-section-title">How It Works</h2>
            <p className="landing-section-sub">Three simple steps to an ATS-optimized resume.</p>

            <div className="landing-steps">
              <div className="landing-step">
                <div className="landing-step-num">1</div>
                <h3>Upload Your Resume</h3>
                <p>Drop your PDF resume and paste the job description you're targeting.</p>
              </div>
              <div className="landing-step-arrow">
                <ArrowRight />
              </div>
              <div className="landing-step">
                <div className="landing-step-num">2</div>
                <h3>Get AI Analysis</h3>
                <p>Our AI scans for keyword gaps, formatting issues, and ATS compatibility.</p>
              </div>
              <div className="landing-step-arrow">
                <ArrowRight />
              </div>
              <div className="landing-step">
                <div className="landing-step-num">3</div>
                <h3>Download & Apply</h3>
                <p>Apply the AI suggestions or download a fully rewritten, optimized resume.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Enterprise ───── */}
        <section id="enterprise" className="landing-section">
          <div className="container">
            <div className="card landing-enterprise">
              <div className="landing-enterprise-content">
                <h2>Built for Teams & Enterprise</h2>
                <p>Centralized resume optimization for recruiting teams, career services, and workforce development programs.</p>
                <ul className="landing-enterprise-list">
                  <li><CheckCircle /> Team workspaces & collaboration</li>
                  <li><CheckCircle /> ATS analytics & reporting dashboard</li>
                  <li><CheckCircle /> SSO / SAML authentication</li>
                  <li><CheckCircle /> API access & custom integrations</li>
                  <li><CheckCircle /> Dedicated account manager</li>
                </ul>
                <Link to="/login" className="btn btn-primary btn-lg" style={{ marginTop: 8 }}>Request a Demo</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Pricing CTA ───── */}
        <section className="landing-section landing-section--alt">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 className="landing-section-title">Simple, Transparent Pricing</h2>
            <p className="landing-section-sub">Start free. Upgrade when you need more power.</p>
            <div className="landing-pricing-cards">
              <div className="card landing-pricing-mini">
                <h3>Starter</h3>
                <div className="landing-pricing-mini-price">Free</div>
                <p>3 analyses/month</p>
              </div>
              <div className="card landing-pricing-mini landing-pricing-mini--pop">
                <div className="pricing-badge" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>Most Popular</div>
                <h3>Pro</h3>
                <div className="landing-pricing-mini-price">$19<span>/mo</span></div>
                <p>Unlimited analyses + AI rewrite</p>
              </div>
              <div className="card landing-pricing-mini">
                <h3>Enterprise</h3>
                <div className="landing-pricing-mini-price">Custom</div>
                <p>Teams, API, SSO</p>
              </div>
            </div>
            <Link to="/subscription" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>
              View Full Pricing
              <ArrowRight />
            </Link>
          </div>
        </section>

        {/* ───── Final CTA ───── */}
        <section className="landing-final-cta">
          <div className="container" style={{ textAlign: 'center' }}>
            <h2>Ready to Land More Interviews?</h2>
            <p>Join thousands of job seekers who've improved their ATS scores with AIP.</p>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started Free
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      {/* ───── Footer ───── */}
      <footer className="landing-footer">
        <div className="container landing-footer-inner">
          <div className="landing-footer-brand">
            <img src="/aip-logo.svg" alt="AIP" style={{ width: 32, height: 32 }} />
            <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 12, color: '#fff' }}>
              ATS Intelligence Platform
            </span>
          </div>
          <p className="landing-footer-copy">© {new Date().getFullYear()} AIP — All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
