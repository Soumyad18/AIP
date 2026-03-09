import { useState } from 'react';

export const TeamMembersPage = () => {
    const [showInviteModal, setShowInviteModal] = useState(false);

    const mockMembers = [
        { id: 1, name: 'Enterprise Admin', email: 'admin@company.com', role: 'Admin', status: 'Active', joined: 'Oct 12, 2025' },
        { id: 2, name: 'Sarah Jenks', email: 'sarah.j@company.com', role: 'Member', status: 'Active', joined: 'Jan 04, 2026' },
        { id: 3, name: 'David Chen', email: 'david.c@company.com', role: 'Member', status: 'Active', joined: 'Feb 18, 2026' },
        { id: 4, name: 'Marcus Wright', email: 'm.wright@company.com', role: 'Viewer', status: 'Active', joined: 'Mar 01, 2026' },
        { id: 5, name: 'Elena Rodriguez', email: 'elena.r@company.com', role: 'Member', status: 'Invited', joined: '-' },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1>Team Members</h1>
                    <p className="subtitle">Manage access and roles for your workspace (12/25 seats used)</p>
                </div>
                <button onClick={() => setShowInviteModal(true)} className="btn btn-primary">
                    + Invite Member
                </button>
            </div>

            <div className="card">
                {/* Table Controls */}
                <div className="flex justify-between items-center p-4 border-b border-[#e2e8f0]">
                    <div className="relative w-64">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--body)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        <input
                            type="text"
                            placeholder="Search members..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-[#e2e8f0] bg-[#f8fafc] rounded-md focus:outline-none focus:border-[var(--primary)] transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 text-sm">
                        <button className="px-3 py-1.5 border border-[#e2e8f0] rounded-md bg-white hover:bg-[#f8fafc] font-medium text-[var(--body)] transition-colors">Role</button>
                        <button className="px-3 py-1.5 border border-[#e2e8f0] rounded-md bg-white hover:bg-[#f8fafc] font-medium text-[var(--body)] transition-colors">Status</button>
                    </div>
                </div>

                {/* Table */}
                <div className="enterprise-table-wrapper">
                    <table className="whitespace-nowrap w-full">
                        <thead>
                            <tr>
                                <th className="w-[40%]">Member</th>
                                <th className="w-[15%]">Role</th>
                                <th className="w-[15%]">Status</th>
                                <th className="w-[20%]">Joined</th>
                                <th className="w-[10%] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockMembers.map((member) => (
                                <tr key={member.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[var(--heading)] text-white flex items-center justify-center font-bold text-xs uppercase">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[var(--heading)]">{member.name}</div>
                                                <div className="text-[var(--body)] text-xs mt-0.5">{member.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${member.role === 'Admin' ? 'bg-[#333F70]/10 text-[#333F70]' :
                                            member.role === 'Member' ? 'bg-[#26A688]/10 text-[#26A688]' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {member.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="flex items-center gap-1.5 focus:outline-none">
                                            <span className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-[#26A688]' : 'bg-orange-400'}`}></span>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="text-[var(--body)]">
                                        {member.joined}
                                    </td>
                                    <td className="text-right">
                                        <button className="text-[var(--primary)] hover:underline font-medium text-sm">Edit</button>
                                        <button className="text-red-500 hover:underline font-medium text-sm ml-4">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mock Invite Modal */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
                            <h2 className="text-xl font-bold font-heading text-[var(--heading)] m-0">Invite Team Member</h2>
                            <button onClick={() => setShowInviteModal(false)} className="text-[var(--body)] hover:text-red-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--heading)] mb-1">Email Address</label>
                                    <input type="email" placeholder="colleague@company.com" className="input" style={{ marginBottom: 0 }} />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-[var(--heading)] mb-1">Role</label>
                                    <select className="input bg-white" style={{ marginBottom: 0 }}>
                                        <option value="member">Member (Can analyze context & upload to bank)</option>
                                        <option value="viewer">Viewer (Read-only access to resume bank)</option>
                                        <option value="admin">Admin (Full billing & team access)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => setShowInviteModal(false)} className="btn btn-secondary py-2">Cancel</button>
                                <button onClick={() => setShowInviteModal(false)} className="btn btn-primary py-2">Send Invite</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
