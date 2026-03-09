import { Link } from 'react-router-dom';

const templates = [
    { id: 't1', name: 'The Executive', category: 'Classic', color: '#333F70', desc: 'A clean, traditional single-column format favored by ATS systems and corporate recruiters.' },
    { id: 't2', name: 'Tech Innovator', category: 'Modern', color: '#26A688', desc: 'Distinct sections with a subtle accent color. Perfect for software engineers and digital roles.' },
    { id: 't3', name: 'Creative Portfolio', category: 'Creative', color: '#f43f5e', desc: 'Two-column design that highlights your skills and portfolio links right at the top.' },
    { id: 't4', name: 'Data Pro', category: 'Minimalist', color: '#0ea5e9', desc: 'Hyper-focused on metrics and achievements. Removes all fluff for a data-driven impression.' },
    { id: 't5', name: 'Entry Level', category: 'Education-First', color: '#8b5cf6', desc: 'Brings education and projects to the forefront for recent graduates or career switchers.' },
    { id: 't6', name: 'The Startup', category: 'Modern', color: '#f59e0b', desc: 'High-contrast headers and a bold sans-serif design that stands out in a pile.' }
];

export const ResumeTemplatesPage = () => {
    return (
        <div className="mx-auto max-w-6xl p-6 md:p-10">
            <div className="mb-10 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                    ATS-Verified Templates
                </h1>
                <p className="text-slate-500 text-lg">
                    Start with a structure proven to pass Applicant Tracking Systems. Download a template and fill in your optimized content.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((tpl) => (
                    <div key={tpl.id} className="card group overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
                        {/* Template Preview Mockup Area */}
                        <div className="h-56 bg-slate-100 border-b border-slate-200 relative overflow-hidden p-6 flex justify-center">
                            <div className="w-full max-w-[200px] h-full bg-white shadow-sm border border-slate-200 rounded-sm p-4 flex flex-col gap-2 relative z-10 transition-transform group-hover:scale-105">
                                <div className="w-1/2 h-3 rounded-full mb-2" style={{ backgroundColor: tpl.color }}></div>
                                <div className="w-3/4 h-1.5 bg-slate-200 rounded-full"></div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full mb-3"></div>

                                <div className="w-1/3 h-2 rounded-full mb-1" style={{ backgroundColor: tpl.color, opacity: 0.7 }}></div>
                                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                                <div className="w-4/5 h-1 bg-slate-200 rounded-full mb-3"></div>

                                <div className="w-1/3 h-2 rounded-full mb-1" style={{ backgroundColor: tpl.color, opacity: 0.7 }}></div>
                                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                                <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                                <div className="w-2/3 h-1 bg-slate-200 rounded-full"></div>
                            </div>

                            {/* Abstract background shapes per template */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: tpl.color }}></div>
                        </div>

                        {/* Template Info */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-bold" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                                    {tpl.name}
                                </h3>
                                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                                    {tpl.category}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mb-6 flex-1">
                                {tpl.desc}
                            </p>

                            <button className="btn btn-secondary w-full group-hover:bg-[var(--primary)] group-hover:text-white group-hover:border-[var(--primary)] flex items-center justify-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                Download (.docx)
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center p-6 bg-[var(--secondary-1)] rounded-2xl border border-[var(--primary)] border-opacity-20 max-w-3xl mx-auto">
                <h3 className="font-bold text-[var(--heading)] mb-2">Want to use the Analyzer?</h3>
                <p className="text-sm text-[var(--body)] mb-4">You can upload any of these formats (once exported to PDF) directly into our analyzer tool.</p>
                <Link to="/analyzer" className="btn btn-primary">Go to Analyzer</Link>
            </div>
        </div>
    );
};
