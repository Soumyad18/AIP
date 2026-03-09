export const TeamResumeBankPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Shared Resume Bank</h1>
                    <p className="subtitle">Repository of successful, highly-optimized resumes</p>
                </div>
                <button className="btn btn-primary">
                    + Upload to Bank
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-6">
                {/* Search & Filter Bar */}
                <div className="flex-1 card p-2 flex items-center gap-2">
                    <span className="pl-3 text-[var(--body)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search by keyword, role, or skill..."
                        className="flex-1 outline-none text-sm bg-transparent"
                    />
                    <div className="w-px h-6 bg-[#e2e8f0]"></div>
                    <select className="outline-none text-sm font-medium bg-transparent border-none text-[var(--heading)] cursor-pointer pl-2">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-[var(--body)]">Sort by:</span>
                    <select className="px-3 py-2 border border-[#cbd5e1] rounded-md text-sm outline-none bg-white">
                        <option>Highest ATS Score</option>
                        <option>Most Recently Added</option>
                    </select>
                </div>
            </div>

            {/* Resume Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { role: 'Senior Frontend Engineer', dept: 'Engineering', author: 'David Chen', date: 'Mar 08, 2026', score: 94, tags: ['React', 'TypeScript', 'System Design'] },
                    { role: 'Product Manager', dept: 'Product', author: 'Sarah Jenks', date: 'Feb 24, 2026', score: 92, tags: ['Agile', 'GTM', 'B2B SaaS'] },
                    { role: 'Growth Marketing Lead', dept: 'Marketing', author: 'Marcus Wright', date: 'Feb 15, 2026', score: 88, tags: ['SEO', 'Performance Marketing'] },
                    { role: 'Account Executive', dept: 'Sales', author: 'Elena Rodriguez', date: 'Jan 30, 2026', score: 91, tags: ['Enterprise Sales', 'Salesforce'] },
                    { role: 'UX Designer', dept: 'Product', author: 'Alex Thompson', date: 'Jan 12, 2026', score: 85, tags: ['Figma', 'User Research', 'Prototyping'] },
                    { role: 'Backend Engineer', dept: 'Engineering', author: 'David Chen', date: 'Dec 05, 2025', score: 96, tags: ['Node.js', 'PostgreSQL', 'AWS'] },
                ].map((resume, i) => (
                    <div key={i} className="card p-0 overflow-hidden flex flex-col group transition-shadow hover:shadow-lg">
                        {/* Upper Half: "Document" preview area */}
                        <div className="h-32 bg-[#f8fafc] border-b border-[#e2e8f0] relative p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-white border border-[#e2e8f0] text-[var(--body)]">
                                    {resume.dept}
                                </span>
                                <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] bg-white flex items-center justify-center font-bold text-xs text-[var(--primary)] shadow-sm">
                                    {resume.score}
                                </div>
                            </div>

                            {/* Document lines graphic */}
                            <div className="space-y-2 opacity-40">
                                <div className="h-2 bg-[#cbd5e1] rounded w-3/4"></div>
                                <div className="h-1 bg-[#cbd5e1] rounded w-full"></div>
                                <div className="h-1 bg-[#cbd5e1] rounded w-5/6"></div>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-[var(--heading)]/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button className="btn btn-primary text-sm shadow-md">View Complete Resume</button>
                            </div>
                        </div>

                        {/* Lower Half: Info */}
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-[var(--heading)] text-lg mb-1 leading-tight">{resume.role}</h3>
                            <p className="text-xs text-[var(--body)] mb-4">Added by {resume.author} • {resume.date}</p>

                            <div className="flex flex-wrap gap-1.5 mt-auto">
                                {resume.tags.map((tag, j) => (
                                    <span key={j} className="px-2 py-1 bg-[#e8f5f1] text-[var(--primary)] text-[10px] font-semibold rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <button className="text-[var(--primary)] font-medium text-sm hover:underline">Load More Resumes</button>
            </div>
        </div>
    );
};
