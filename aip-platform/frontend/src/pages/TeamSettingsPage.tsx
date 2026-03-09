import { useState } from 'react';
import { Link } from 'react-router-dom';

export const TeamSettingsPage = () => {
    const [ssoEnabled, setSsoEnabled] = useState(false);

    return (
        <div className="page-container max-w-4xl mx-auto">
            <div className="page-header">
                <div>
                    <h1>Team Settings</h1>
                    <p className="subtitle">Manage your enterprise workspace preferences</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Team Profile */}
                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold font-heading text-[var(--heading)] mb-6">Workspace Profile</h2>
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                        <div className="w-24 h-24 bg-[#f1f5f9] border-2 border-dashed border-[#cbd5e1] rounded-lg flex flex-col items-center justify-center text-[var(--body)] cursor-pointer hover:bg-[#e2e8f0] transition-colors">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                            <span className="text-xs font-medium">Upload Logo</span>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-[var(--heading)] mb-1">Company / Workspace Name</label>
                                <input type="text" defaultValue="Acme Corp" className="w-full max-w-md px-3 py-2 border border-[#cbd5e1] rounded outline-none focus:border-[var(--primary)]" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[var(--heading)] mb-1">Workspace Domain</label>
                                <div className="flex items-center">
                                    <span className="px-3 py-2 bg-[#f8fafc] border border-r-0 border-[#cbd5e1] rounded-l text-[var(--body)] text-sm">acme</span>
                                    <span className="px-3 py-2 border border-[#cbd5e1] rounded-r text-[var(--heading)] text-sm w-full max-w-xs bg-[#f8fafc] bg-opacity-50">.aip-platform.com</span>
                                </div>
                            </div>
                            <button className="btn btn-primary mt-2">Save Changes</button>
                        </div>
                    </div>
                </div>

                {/* Billing & Subscription */}
                <div className="card p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold font-heading text-[var(--heading)]">Billing & Usage</h2>
                            <p className="text-sm text-[var(--body)] mt-1">Enterprise Plan • Renews Oct 12, 2026</p>
                        </div>
                        <Link to="/subscription" className="btn btn-secondary text-sm">Manage Subscription</Link>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-[var(--heading)]">Seat Licenses</span>
                                <span className="text-[var(--body)]">12 / 25 used</span>
                            </div>
                            <div className="w-full bg-[#e2e8f0] rounded-full h-2 mb-2">
                                <div className="bg-[#333F70] h-2 rounded-full" style={{ width: '48%' }}></div>
                            </div>
                            <Link to="/team/members" className="text-xs text-[var(--primary)] font-medium hover:underline">Invite more members →</Link>
                        </div>
                        <div className="p-4 bg-[#f8fafc] rounded-lg border border-[#e2e8f0]">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-semibold text-[var(--heading)]">API Usage</span>
                                <span className="text-[var(--body)]">1,248 / 10K calls</span>
                            </div>
                            <div className="w-full bg-[#e2e8f0] rounded-full h-2 mb-2">
                                <div className="bg-[#26A688] h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                            <span className="text-xs text-[var(--body)]">Resets in 18 days</span>
                        </div>
                    </div>
                </div>

                {/* Security & Access */}
                <div className="card p-6 md:p-8">
                    <h2 className="text-xl font-bold font-heading text-[var(--heading)] mb-6">Security & Access</h2>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0]">
                            <div>
                                <h3 className="font-semibold text-[var(--heading)] text-sm">SAML / Single Sign-On (SSO)</h3>
                                <p className="text-xs text-[var(--body)] mt-1 max-w-md">Allow team members to authenticate using your organization's identity provider (Okta, Azure AD, Google Workspace).</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" checked={ssoEnabled} onChange={() => setSsoEnabled(!ssoEnabled)} />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                            </label>
                        </div>

                        {ssoEnabled && (
                            <div className="bg-[#f8fafc] p-4 rounded border border-[#cbd5e1] animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-medium text-sm text-[var(--heading)]">Identity Provider Configuration</h4>
                                    <button className="text-xs btn btn-secondary py-1 px-3">Edit Config</button>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex"><span className="w-32 text-[var(--body)]">Provider:</span> <span className="font-medium">Okta</span></div>
                                    <div className="flex"><span className="w-32 text-[var(--body)]">Entity ID:</span> <span className="font-medium truncate max-w-xs">https://acme.okta.com/app/exk1...</span></div>
                                    <div className="flex"><span className="w-32 text-[var(--body)]">Status:</span> <span className="text-[var(--primary)] font-medium">Active</span></div>
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-[var(--heading)] text-sm">Enterprise API Keys</h3>
                                <button className="text-[var(--primary)] text-sm font-medium hover:underline">+ Generate New Key</button>
                            </div>
                            <p className="text-xs text-[var(--body)] mb-3">Use these keys to access the AIP scoring engine programmatically.</p>
                            <div className="flex items-center justify-between p-3 border border-[#cbd5e1] rounded bg-[#f8fafc]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--body)]"></div>)}
                                    </div>
                                    <span className="text-sm font-mono text-[var(--heading)]">a8F2</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[var(--body)]">
                                    <span>Created Mar 01</span>
                                    <button className="font-medium hover:text-[var(--heading)]">Revoke</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="card profile-section profile-danger-zone">
                    <h3 className="profile-section-title profile-danger-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        Danger Zone
                    </h3>
                    <div className="profile-security-row">
                        <div>
                            <p className="profile-info-value" style={{ fontWeight: 600, color: '#ef4444' }}>Delete Workspace</p>
                            <p className="profile-security-note" style={{ marginTop: 2 }}>Permanently remove this workspace and all associated data, users, and API keys. This action cannot be undone.</p>
                        </div>
                        <button className="btn profile-btn-danger">Delete Workspace</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
