import { Link } from 'react-router-dom';

export const TeamDashboardPage = () => {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Team Dashboard</h1>
                    <p className="subtitle">Overview of your enterprise workspace</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/team/members" className="btn btn-secondary">Invite Member</Link>
                    <Link to="/team/analytics" className="btn btn-primary">View Reports</Link>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid-layout grid-layout-3 mb-6">
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Total Members</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">12</div>
                    <p className="text-xs text-[var(--primary)] mt-2">↑ 2 new this month</p>
                </div>
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Analyses This Month</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">428</div>
                    <p className="text-xs text-[var(--primary)] mt-2">↑ 15% vs last month</p>
                </div>
                <div className="card pad">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1">Avg. ATS Score</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">84%</div>
                    <p className="text-xs text-[var(--primary)] mt-2">↑ 4% improvement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Activity Feed */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card pad">
                        <div className="flex justify-between items-center mb-6">
                            <h2>Recent Activity</h2>
                            <Link to="/team/analytics" className="text-sm text-[var(--primary)] font-medium">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {[
                                { user: 'Sarah Jenks', action: 'optimized a resume for', role: 'Senior Product Manager', time: '10 mins ago', score: 88 },
                                { user: 'David Chen', action: 'invited a new member:', role: 'alex@company.com', time: '2 hours ago', score: null },
                                { user: 'Marcus Wright', action: 'optimized a resume for', role: 'Frontend Developer', time: '4 hours ago', score: 92 },
                                { user: 'Elena Rodriguez', action: 'downloaded a template:', role: 'The Executive', time: 'Yesterday', score: null },
                                { user: 'Sarah Jenks', action: 'optimized a resume for', role: 'Product Marketing Manager', time: 'Yesterday', score: 75 },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-[#f8fafc] transition-colors border border-transparent hover:border-[#e2e8f0]">
                                    <div className="w-10 h-10 rounded-full bg-[#e8f5f1] text-[var(--primary)] flex items-center justify-center font-bold font-heading text-sm flex-shrink-0">
                                        {activity.user.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-[var(--heading)]">
                                            <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium">{activity.role}</span>
                                        </p>
                                        <p className="text-xs text-[var(--body)] mt-1">{activity.time}</p>
                                    </div>
                                    {activity.score && (
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-full border-2 border-[var(--primary)] flex items-center justify-center font-bold text-xs text-[var(--primary)]">
                                                {activity.score}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-6">
                    {/* Active Workspaces */}
                    <div className="card pad">
                        <h2>Team Workspaces</h2>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#333F70] text-white flex items-center justify-center font-bold text-xs">E</div>
                                    <span className="font-medium text-sm text-[var(--heading)]">Engineering</span>
                                </div>
                                <span className="text-xs text-[var(--body)]">8 members</span>
                            </div>
                            <div className="flex items-center justify-between p-3 border border-[#e2e8f0] rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-[#26A688] text-white flex items-center justify-center font-bold text-xs">M</div>
                                    <span className="font-medium text-sm text-[var(--heading)]">Marketing</span>
                                </div>
                                <span className="text-xs text-[var(--body)]">4 members</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 border border-dashed border-[#cbd5e1] rounded-lg text-sm font-medium text-[var(--body)] hover:text-[var(--heading)] hover:border-[#94a3b8] transition-colors">
                            + Create Workspace
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="card pad">
                        <h2>Enterprise Resources</h2>
                        <div className="mt-4 space-y-2">
                            <Link to="/team/resumes" className="flex items-center gap-2 p-2 text-sm text-[var(--heading)] hover:bg-[#f8fafc] rounded transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
                                Submit to Resume Bank
                            </Link>
                            <Link to="/team/settings" className="flex items-center gap-2 p-2 text-sm text-[var(--heading)] hover:bg-[#f8fafc] rounded transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                                Configure SSO Settings
                            </Link>
                            <a href="#" className="flex items-center gap-2 p-2 text-sm text-[var(--heading)] hover:bg-[#f8fafc] rounded transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                Contact Account Manager
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
