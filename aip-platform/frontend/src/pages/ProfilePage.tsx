import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabase';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || user?.user_metadata?.name || '');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Password change state
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSaving, setPasswordSaving] = useState(false);

    const provider = user?.app_metadata?.provider || 'email';
    const isOAuth = provider !== 'email';

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName, name: fullName },
            });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }
        setPasswordSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setShowPasswordForm(false);
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update password' });
        } finally {
            setPasswordSaving(false);
        }
    };

    const getInitials = () => {
        if (fullName) return fullName.split(' ').map((p: string) => p[0]).join('').toUpperCase().slice(0, 2);
        if (user?.email) return user.email[0].toUpperCase();
        return '?';
    };

    const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;

    return (
        <div className="profile-page">
            {/* Page Header */}
            <div className="profile-page-header">
                <h1>My Profile</h1>
                <p>Manage your account details, security, and preferences.</p>
            </div>

            {/* Status Message */}
            {message && (
                <div className={`profile-message ${message.type === 'success' ? 'profile-message--success' : 'profile-message--error'}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {message.type === 'success' ? (
                            <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>
                        ) : (
                            <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>
                        )}
                    </svg>
                    {message.text}
                </div>
            )}

            {/* Profile Card */}
            <div className="card profile-card">
                <div className="profile-card-header">
                    <div className="profile-avatar-section">
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className="profile-avatar-img" />
                        ) : (
                            <div className="profile-avatar">{getInitials()}</div>
                        )}
                        <div className="profile-identity">
                            {isEditing ? (
                                <div>
                                    <label className="profile-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="input"
                                        style={{ marginBottom: 0, maxWidth: 280 }}
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Your full name"
                                        id="profile-name-input"
                                    />
                                </div>
                            ) : (
                                <>
                                    <h2 className="profile-name">{fullName || 'Add your name'}</h2>
                                    <p className="profile-email">{user?.email}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="profile-actions">
                        {isEditing ? (
                            <>
                                <button onClick={() => { setIsEditing(false); setFullName(user?.user_metadata?.full_name || user?.user_metadata?.name || ''); }} className="btn btn-secondary" disabled={saving}>Cancel</button>
                                <button onClick={handleSave} className="btn btn-primary" disabled={saving} id="save-profile-btn">
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary" id="edit-profile-btn">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Account Info + Plan Summary Grid */}
            <div className="profile-grid">
                {/* Account Info */}
                <div className="card profile-section">
                    <h3 className="profile-section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        Account Details
                    </h3>
                    <div className="profile-info-grid">
                        <div className="profile-info-item">
                            <span className="profile-info-label">Email Address</span>
                            <span className="profile-info-value">{user?.email}</span>
                        </div>
                        <div className="profile-info-item">
                            <span className="profile-info-label">Sign-in Provider</span>
                            <span className="profile-info-value capitalize">{provider}</span>
                        </div>
                        <div className="profile-info-item">
                            <span className="profile-info-label">Joined</span>
                            <span className="profile-info-value">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                            </span>
                        </div>
                        <div className="profile-info-item">
                            <span className="profile-info-label">Status</span>
                            <span className="profile-info-value profile-status-active">
                                <span className="profile-status-dot"></span> Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Plan Summary */}
                <div className="card profile-section profile-plan-card">
                    <h3 className="profile-section-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Current Plan
                    </h3>
                    <div className="profile-plan-badge">Starter — Free</div>
                    <div className="profile-plan-usage">
                        <div className="profile-plan-meter">
                            <div className="profile-plan-meter-label">
                                <span>Analyses Used</span>
                                <span className="profile-plan-meter-count">0 / 3</span>
                            </div>
                            <div className="profile-plan-meter-bar">
                                <div className="profile-plan-meter-fill" style={{ width: '0%' }}></div>
                            </div>
                        </div>
                    </div>
                    <Link to="/subscription" className="btn btn-primary w-full" id="upgrade-plan-btn" style={{ marginTop: 12 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                        </svg>
                        Upgrade Plan
                    </Link>
                </div>
            </div>

            {/* Security Section */}
            <div className="card profile-section">
                <h3 className="profile-section-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Security
                </h3>

                {isOAuth ? (
                    <p className="profile-security-note">
                        You signed in with <strong className="capitalize">{provider}</strong>. Password management is handled by your provider.
                    </p>
                ) : showPasswordForm ? (
                    <div className="profile-password-form">
                        <div>
                            <label className="profile-label">New Password</label>
                            <input
                                type="password"
                                className="input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Minimum 6 characters"
                                id="new-password-input"
                            />
                        </div>
                        <div>
                            <label className="profile-label">Confirm Password</label>
                            <input
                                type="password"
                                className="input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                id="confirm-password-input"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => { setShowPasswordForm(false); setNewPassword(''); setConfirmPassword(''); }} className="btn btn-secondary" disabled={passwordSaving}>Cancel</button>
                            <button onClick={handlePasswordChange} className="btn btn-primary" disabled={passwordSaving} id="save-password-btn">
                                {passwordSaving ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="profile-security-row">
                        <div>
                            <p className="profile-info-value" style={{ fontWeight: 600 }}>Password</p>
                            <p className="profile-security-note" style={{ marginTop: 2 }}>Last changed: Never</p>
                        </div>
                        <button onClick={() => setShowPasswordForm(true)} className="btn btn-secondary" id="change-password-btn">Change Password</button>
                    </div>
                )}
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
                        <p className="profile-info-value" style={{ fontWeight: 600, color: '#ef4444' }}>Delete Account</p>
                        <p className="profile-security-note" style={{ marginTop: 2 }}>Permanently remove your account and all associated data. This action cannot be undone.</p>
                    </div>
                    <button className="btn profile-btn-danger" id="delete-account-btn">Delete Account</button>
                </div>
            </div>
        </div>
    );
};
