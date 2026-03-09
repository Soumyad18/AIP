import { useState } from 'react';
import { Link } from 'react-router-dom';

export const TeamCandidatesPage = () => {
    // Mock data for Candidates
    const mockCandidates = [
        { id: 1, name: 'Alex Thompson', email: 'alex.t@example.com', role: 'UX Designer', appliedDate: 'Mar 09, 2026', status: 'Under Review', score: 85, pipeline: 'Interviewing' },
        { id: 2, name: 'Jessica Davis', email: 'jdavis@example.com', role: 'Senior Frontend Engineer', appliedDate: 'Mar 07, 2026', status: 'New', score: 92, pipeline: 'Screening' },
        { id: 3, name: 'Michael Chen', email: 'mchen.dev@example.com', role: 'Backend Engineer', appliedDate: 'Mar 05, 2026', status: 'Rejected', score: 64, pipeline: 'Archived' },
        { id: 4, name: 'Priya Sharma', email: 'psharma88@example.com', role: 'Product Manager', appliedDate: 'Mar 01, 2026', status: 'Offer Extended', score: 95, pipeline: 'Offered' },
        { id: 5, name: 'David Wilson', email: 'david.w@example.com', role: 'Account Executive', appliedDate: 'Feb 28, 2026', status: 'Reviewing', score: 78, pipeline: 'Screening' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'bg-blue-100 text-blue-700';
            case 'Under Review': return 'bg-amber-100 text-amber-700';
            case 'Reviewing': return 'bg-amber-100 text-amber-700';
            case 'Offer Extended': return 'bg-emerald-100 text-emerald-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Candidates Pipeline</h1>
                    <p className="subtitle">Track and manage applicants and their analyzed resumes</p>
                </div>
                <button className="btn btn-primary shadow-sm hover:shadow-md transition-shadow">
                    + Add Candidate
                </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid-layout grid-layout-4 mb-6">
                <div className="card pad p-6 border-l-4 border-l-[var(--primary)]">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1 uppercase tracking-wide">Total Candidates</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">124</div>
                    <p className="text-xs text-[var(--primary)] mt-2 font-medium">Active Pipeline</p>
                </div>
                <div className="card pad p-6 border-l-4 border-l-blue-400">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1 uppercase tracking-wide">New This Week</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">18</div>
                    <p className="text-xs text-[var(--body)] mt-2 font-medium">Requires review</p>
                </div>
                <div className="card pad p-6 border-l-4 border-l-amber-400">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1 uppercase tracking-wide">Interviewing</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">32</div>
                    <p className="text-xs text-[var(--body)] mt-2 font-medium">In active stages</p>
                </div>
                <div className="card pad p-6 border-l-4 border-l-emerald-400">
                    <h3 className="text-sm text-[var(--body)] font-medium mb-1 uppercase tracking-wide">Offers Extended</h3>
                    <div className="text-3xl font-bold font-heading text-[var(--heading)]">4</div>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">Pending acceptance</p>
                </div>
            </div>

            <div className="card p-0 overflow-hidden">
                {/* Table Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-[#e2e8f0] bg-[#f8fafc] gap-4">
                    <div className="relative w-full md:w-80">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--body)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input
                            type="text"
                            placeholder="Search candidates by name, role, or email..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-[#cbd5e1] bg-white rounded-md focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all shadow-sm"
                        />
                    </div>
                    <div className="flex gap-3 text-sm w-full md:w-auto">
                        <select className="px-3 py-2 border border-[#cbd5e1] rounded-md bg-white text-[var(--heading)] font-medium outline-none shadow-sm flex-1 md:flex-none cursor-pointer">
                            <option>All Pipelines</option>
                            <option>Screening</option>
                            <option>Interviewing</option>
                            <option>Offered</option>
                        </select>
                        <select className="px-3 py-2 border border-[#cbd5e1] rounded-md bg-white text-[var(--heading)] font-medium outline-none shadow-sm flex-1 md:flex-none cursor-pointer">
                            <option>Sort by: Newest</option>
                            <option>Sort by: ATS Score</option>
                            <option>Sort by: Status</option>
                        </select>
                    </div>
                </div>

                {/* Candidates Table */}
                <div className="enterprise-table-wrapper">
                    <table className="whitespace-nowrap w-full">
                        <thead className="bg-[#f1f5f9]">
                            <tr>
                                <th className="w-[30%] py-4">Candidate</th>
                                <th className="w-[15%]">Target Role</th>
                                <th className="w-[10%]">ATS Score</th>
                                <th className="w-[15%]">Pipeline Stage</th>
                                <th className="w-[15%]">Applied Date</th>
                                <th className="w-[15%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e2e8f0]">
                            {mockCandidates.map((candidate) => (
                                <tr key={candidate.id} className="hover:bg-[#f8fafc] transition-colors cursor-pointer group">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-[var(--secondary-1)] text-[var(--primary)] border border-[var(--secondary-2)] flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[var(--heading)] group-hover:text-[var(--primary)] transition-colors">{candidate.name}</div>
                                                <div className="text-[var(--body)] text-xs mt-0.5 font-medium">{candidate.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-sm font-semibold text-[var(--heading)]">{candidate.role}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-xs border ${candidate.score >= 90 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                                                candidate.score >= 70 ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                                    'bg-red-50 border-red-200 text-red-700'
                                                }`}>
                                                {candidate.score}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border transition-colors ${getStatusColor(candidate.status)} border-opacity-50`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-70"></span>
                                            {candidate.status}
                                        </span>
                                    </td>
                                    <td className="text-[var(--body)] text-sm font-medium">
                                        {candidate.appliedDate}
                                    </td>
                                    <td className="text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link to="/results" className="text-[var(--primary)] bg-[var(--secondary-1)] px-3 py-1.5 rounded text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-colors">
                                                View Resume
                                            </Link>
                                            <button className="text-[var(--body)] hover:text-[var(--heading)] p-1.5 rounded bg-gray-100 hover:bg-gray-200 transition-colors" title="Download">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                                            </button>
                                        </div>
                                        {/* Fallback dotted menu for mobile/when not hovered */}
                                        <div className="group-hover:hidden text-[var(--body)] px-2">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between text-sm">
                    <span className="text-[var(--body)] font-medium">Showing <span className="text-[var(--heading)] font-bold">1 to 5</span> of <span className="text-[var(--heading)] font-bold">124</span> candidates</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-[#cbd5e1] rounded bg-white text-gray-400 cursor-not-allowed">Prevent</button>
                        <button className="px-3 py-1 border border-[#cbd5e1] rounded bg-[var(--primary)] text-white font-medium hover:bg-opacity-90 transition-colors">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
