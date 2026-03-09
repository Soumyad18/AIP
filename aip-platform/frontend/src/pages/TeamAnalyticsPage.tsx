export const TeamAnalyticsPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Team Analytics</h1>
                    <p className="subtitle">Usage, performance, and ATS optimization metrics</p>
                </div>
                <select className="px-3 py-2 border border-[#cbd5e1] rounded-md text-sm font-medium outline-none focus:border-[var(--primary)] bg-white">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>This Year</option>
                    <option>All Time</option>
                </select>
            </div>

            {/* Top Stat Cards */}
            <div className="grid-layout grid-layout-4 mb-6">
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Total Resumes Analyzed</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">1,248</div>
                    <p className="text-xs text-[var(--primary)] mt-2">↑ 24% vs previous period</p>
                </div>
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Avg. Initial ATS Score</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">42%</div>
                    <p className="text-xs text-[var(--body)] mt-2">Before AIP optimization</p>
                </div>
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Avg. Final ATS Score</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--primary)]">86%</div>
                    <p className="text-xs text-[var(--primary)] mt-2">↑ +44% improvement</p>
                </div>
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Active Team Members</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">8 / 12</div>
                    <p className="text-xs text-[var(--body)] mt-2">Used AIP this week</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Activity Volume Chart */}
                <div className="card pad">
                    <h2 className="mb-6">Optimization Volume</h2>
                    <div className="flex items-end justify-between h-48 px-2">
                        {/* Mock CSS Bar Chart */}
                        {[
                            { label: 'Mon', h: '40%' },
                            { label: 'Tue', h: '65%' },
                            { label: 'Wed', h: '85%', color: 'var(--primary)' }, // Peak day
                            { label: 'Thu', h: '60%' },
                            { label: 'Fri', h: '45%' },
                            { label: 'Sat', h: '15%' },
                            { label: 'Sun', h: '25%' },
                        ].map((day, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer w-[12%]">
                                <div className="w-full bg-[#e2e8f0] rounded-t-sm relative transition-all duration-300 hover:opacity-80" style={{ height: day.h, backgroundColor: day.color || '' }}>
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[var(--heading)] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        {day.h}
                                    </div>
                                </div>
                                <span className="text-xs text-[var(--body)] font-medium">{day.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ATS Score Improvement */}
                <div className="card pad">
                    <h2 className="mb-6">Score Improvement by Role</h2>

                    <div className="space-y-4">
                        {/* Mock horizontal bars */}
                        {[
                            { role: 'Software Engineering', before: 45, after: 88 },
                            { role: 'Product Management', before: 38, after: 92 },
                            { role: 'Marketing', before: 52, after: 85 },
                            { role: 'Sales & BD', before: 40, after: 82 },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-semibold text-[var(--heading)]">{stat.role}</span>
                                    <span className="text-[var(--body)] text-xs">+{stat.after - stat.before}%</span>
                                </div>
                                {/* Stacked progress bar to show improvement */}
                                <div className="w-full bg-[#f1f5f9] rounded-full h-2 mb-1 flex overflow-hidden">
                                    {/* Initial score (gray) */}
                                    <div className="bg-[#cbd5e1] h-2" style={{ width: `${stat.before}%` }}></div>
                                    {/* Improvement (teal) */}
                                    <div className="bg-[var(--primary)] h-2" style={{ width: `${stat.after - stat.before}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[var(--body)]">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#cbd5e1]"></div> Initial Score</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[var(--primary)]"></div> AIP Optimized Score</div>
                    </div>
                </div>

                {/* Top Missing Keywords */}
                <div className="card pad">
                    <h2 className="mb-4">Common Missing Keywords</h2>
                    <p className="text-sm text-[var(--body)] mb-4">Skills most frequently missing from initial resumes before optimization.</p>

                    <div className="flex flex-wrap gap-2">
                        {[
                            { word: 'Cross-functional Collaboration', count: 142 },
                            { word: 'Data Analysis', count: 98 },
                            { word: 'Agile Methodology', count: 87 },
                            { word: 'Stakeholder Management', count: 76 },
                            { word: 'Go-To-Market Strategy', count: 64 },
                            { word: 'KPI Tracking', count: 52 },
                            { word: 'Cloud Architecture', count: 45 },
                            { word: 'REST APIs', count: 38 },
                            { word: 'User Research', count: 31 },
                        ].map((kw, i) => (
                            <div key={i} className="px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-md text-sm text-[var(--heading)] flex items-center gap-2">
                                {kw.word}
                                <span className="text-[10px] bg-[#e2e8f0] px-1.5 py-0.5 rounded text-[var(--body)] font-medium">
                                    {kw.count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Users */}
                <div className="card pad">
                    <div className="flex justify-between items-center mb-4">
                        <h2>Top Team Members</h2>
                        <span className="text-xs px-2 py-1 bg-[#e8f5f1] text-[var(--primary)] font-medium rounded">By Optimization Volume</span>
                    </div>

                    <div className="space-y-3">
                        {[
                            { name: 'Sarah Jenks', scans: 42, score: '90%' },
                            { name: 'Marcus Wright', scans: 38, score: '88%' },
                            { name: 'Alex Thompson', scans: 25, score: '82%' },
                            { name: 'David Chen', scans: 19, score: '85%' }
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between p-2 hover:bg-[#f8fafc] rounded-md transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-7 h-7 rounded-sm bg-[var(--heading)] text-white flex items-center justify-center font-bold text-xs uppercase">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="font-medium text-sm text-[var(--heading)]">{user.name}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-semibold text-[var(--primary)]">{user.scans}</span>
                                    <span className="text-[var(--body)] text-xs ml-1">scans • avg {user.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
