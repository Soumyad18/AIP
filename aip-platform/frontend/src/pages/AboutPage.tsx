export const AboutPage = () => {
    const skills = [
        { name: 'Java / Spring Boot', level: 98 },
        { name: 'Microservices & System Design', level: 95 },
        { name: 'PostgreSQL / MongoDB', level: 90 },
        { name: 'React / TypeScript', level: 85 },
        { name: 'Docker / CI-CD', level: 82 },
        { name: 'AWS / Cloud Infrastructure', level: 80 },
    ];

    const stats = [
        { label: 'Years of Experience', value: '3+' },
        { label: 'Microservices Built', value: '20+' },
        { label: 'Technologies Mastered', value: '15+' },
        { label: 'Cups of Coffee', value: '∞' },
    ];

    return (
        <div className="page-container" style={{ maxWidth: 850 }}>
            {/* Standard Page Header */}
            <div className="page-header">
                <div>
                    <h1>About the Developer</h1>
                    <p className="subtitle">The backend engineer behind the AIP architecture</p>
                </div>
            </div>

            {/* ── Hero: Developer Identity ── */}
            <div className="card pad p-8 mb-6 mt-4 flex flex-col md:flex-row items-center md:items-start gap-8" style={{ borderTop: '4px solid var(--primary)' }}>
                {/* Avatar */}
                <div style={{
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'var(--secondary-1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 42, fontFamily: "'Unbounded', sans-serif", fontWeight: 800,
                    color: 'var(--primary)', flexShrink: 0,
                    boxShadow: '0 8px 24px rgba(38,166,136,0.15)',
                }}>
                    SD
                </div>

                {/* Identity Text */}
                <div style={{ flex: 1, textAlign: 'center' }} className="md:text-left">
                    <p style={{ color: 'var(--primary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6, fontFamily: "'Unbounded', sans-serif" }}>
                        Backend Engineer & Creator
                    </p>
                    <h2 style={{ color: 'var(--heading)', fontSize: '2.2rem', fontFamily: "'Unbounded', sans-serif", fontWeight: 900, margin: '0 0 12px', lineHeight: 1.2 }}>
                        Soumyadeep Das
                    </h2>
                    <p style={{ color: 'var(--body)', fontSize: 15, lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
                        A backend-focused software engineer specializing in Java, Spring Boot, and Microservices architecture. While my core expertise lies in building robust, scalable server-side systems, I stepped into the frontend world to design, architect, and build every pixel of AIP from scratch.
                    </p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }} className="md:justify-start">
                        <a href="https://linkedin.com/in/soumyad18" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', fontSize: 14, textDecoration: 'none' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            LinkedIn
                        </a>
                        <a href="mailto:soumyad.dev@gmail.com" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 20px', fontSize: 14, textDecoration: 'none' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            Email
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Quick Stats ── */}
            <div className="grid-layout grid-layout-4 mb-6">
                {stats.map(stat => (
                    <div key={stat.label} className="card pad p-5 text-center">
                        <div className="text-3xl font-black font-heading text-[var(--primary)] mb-1">{stat.value}</div>
                        <div className="text-xs text-[var(--body)] font-semibold uppercase tracking-wider opacity-70">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* ── The Vision Behind AIP ── */}
            <div className="card pad mb-6 p-6 md:p-8" style={{ borderLeft: '4px solid var(--secondary-2)' }}>
                <h3 className="text-xl font-bold font-heading text-[var(--heading)] mb-4">The Vision Behind AIP</h3>
                <p className="text-[var(--body)] leading-relaxed mb-4">
                    The idea for the ATS Intelligence Platform (AIP) was born out of a stark realization: the modern recruitment process is fundamentally broken for both sides. Candidates send thousands of resumes into the "black box" of Applicant Tracking Systems without ever knowing why they were rejected, while recruiters are overwhelmed by misaligned applications.
                </p>
                <p className="text-[var(--body)] leading-relaxed">
                    As a backend engineer, I saw this as a systemic data-matching problem. AIP is my systematic solution. It's designed to democratize ATS algorithms, giving job seekers the exact mathematical insights and AI-driven optimizations they need to bridge the gap between their raw talent and the rigid keyword parsers guarding their dream jobs.
                </p>
            </div>

            {/* ── Core Competencies ── */}
            <div className="card pad mb-6 p-6 md:p-8">
                <h3 className="text-xl font-bold font-heading text-[var(--heading)] mb-6">Core Backend Competencies & Skills</h3>
                <div style={{ display: 'grid', gap: 20 }}>
                    {skills.map(skill => (
                        <div key={skill.name}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--heading)' }}>{skill.name}</span>
                                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)' }}>{skill.level}%</span>
                            </div>
                            <div style={{
                                height: 10, borderRadius: 99, background: 'var(--secondary-1)', overflow: 'hidden',
                            }}>
                                <div style={{
                                    height: '100%', borderRadius: 99,
                                    width: `${skill.level}%`,
                                    background: 'var(--primary)',
                                    transition: 'width 1s ease',
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Built With ── */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="card pad p-6">
                    <h3 className="font-bold text-[var(--heading)] mb-4 font-heading text-lg text-center md:text-left">Backend Foundation</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {['Java 21', 'Spring Boot 3', 'Microservices', 'PostgreSQL', 'REST APIs', 'JWT Auth'].map(t => (
                            <span key={t} style={{
                                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                                background: 'var(--primary)', color: '#fff', border: '1px solid var(--primary)',
                            }}>{t}</span>
                        ))}
                    </div>
                </div>
                <div className="card pad p-6">
                    <h3 className="font-bold text-[var(--heading)] mb-4 font-heading text-lg text-center md:text-left">Frontend Interface</h3>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router'].map(t => (
                            <span key={t} style={{
                                padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                                background: 'var(--secondary-1)', color: 'var(--primary)', border: '1px solid var(--secondary-2)',
                            }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GitHub Star CTA (Unchanged) ── */}
            <div style={{
                background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
                border: '2px solid #fde68a',
                borderRadius: 16,
                padding: '2.5rem 2rem',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(253, 230, 138, 0.4)'
            }}>
                <div style={{ fontSize: 42, marginBottom: 12 }}>⭐</div>
                <h2 className="text-2xl font-bold font-heading text-[var(--heading)] mb-3">Enjoying AIP?</h2>
                <p style={{ color: '#92400e', fontSize: 15, maxWidth: 450, margin: '0 auto 24px', lineHeight: 1.6, fontWeight: 500 }}>
                    If you appreciate the craftsmanship behind this project, drop a star on the repo. It means the world and helps this project grow!
                </p>
                <a
                    href="https://github.com/Soumyad18/AIP"
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    style={{
                        background: '#1a2744', color: '#fff', border: 'none',
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '14px 32px', fontWeight: 800, fontSize: 15,
                        letterSpacing: '0.03em',
                        boxShadow: '0 6px 18px rgba(26, 39, 68, 0.35)',
                        transition: 'all 0.2s ease',
                        textDecoration: 'none'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 24px rgba(26,39,68,0.45)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 18px rgba(26, 39, 68, 0.35)'; }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                    ★ Star on GitHub
                </a>
            </div>

        </div>
    );
};
