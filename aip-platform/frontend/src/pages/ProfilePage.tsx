import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/services/supabase';

export const ProfilePage = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user?.user_metadata?.full_name || user?.user_metadata?.name || '');
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName, name: fullName }
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

    const getInitials = () => {
        if (fullName) return fullName.split(' ').map((p: string) => p[0]).join('').toUpperCase().slice(0, 2);
        if (user?.email) return user.email[0].toUpperCase();
        return '?';
    };

    return (
        <div className="mx-auto max-w-3xl p-6 md:p-10">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                My Profile
            </h1>
            <p className="mt-2 text-slate-500">Manage your account details and preferences.</p>

            <div className="card mt-8 p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                        style={{ background: 'var(--primary)', fontFamily: "'Unbounded', sans-serif" }}
                    >
                        {getInitials()}
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="max-w-sm">
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    style={{ marginBottom: 0 }}
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    placeholder="John Doe"
                                />
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold m-0" style={{ color: 'var(--heading)' }}>
                                    {fullName || 'Add your name'}
                                </h2>
                                <p className="text-slate-500 mt-1">{user?.email}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditing(false)} className="btn btn-secondary" disabled={saving}>Cancel</button>
                                <button onClick={handleSave} className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="btn btn-secondary">
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {message && (
                    <div className={`mb-6 p-4 rounded-lg text-sm border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {message.text}
                    </div>
                )}

                <div>
                    <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--heading)' }}>Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                            <p className="font-medium text-slate-800">{user?.email}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Sign In Provider</p>
                            <p className="font-medium text-slate-800 capitalize">{user?.app_metadata?.provider || 'Email'}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Joined On</p>
                            <p className="font-medium text-slate-800">
                                {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown'}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Account Status</p>
                                <p className="font-medium text-emerald-600 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Active
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
