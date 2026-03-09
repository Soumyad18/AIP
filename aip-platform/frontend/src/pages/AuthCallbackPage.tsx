import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

/**
 * This page handles the OAuth callback after Google/GitHub login.
 * Supabase redirects here with the access_token in the URL hash.
 */
export const AuthCallbackPage = () => {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        // Log the hash to make sure Vercel didn't strip it
        console.log("Auth callback mounted.");
        console.log("Origin:", window.location.origin);
        console.log("Href:", window.location.href);
        console.log("Hash:", window.location.hash);

        if (!window.location.hash || !window.location.hash.includes('access_token')) {
            setAuthError("No access token found in URL. Are you sure you came from a login redirect? Current URL: " + window.location.href);
        }

        // Check immediately in case the session is already processed
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            console.log("Initial getSession result:", { session, error });
            if (error) {
                console.error("Auth getSession error:", error);
                setAuthError(`getSession error: ${error.message}`);
            } else if (session) {
                navigate('/analyzer', { replace: true });
            }
        });

        // Listen for any auth state change that results in a session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth state changed in callback. Event:", event, "Session exists:", !!session);
            if (event === 'PASSWORD_RECOVERY') {
                setAuthError("Password recovery unsupported here");
            } else if (session) {
                navigate('/analyzer', { replace: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
                {authError ? (
                    <>
                        <div className="text-red-500 mb-2">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                        </div>
                        <p className="text-red-500 font-bold">Authentication Error</p>
                        <p className="text-[var(--body)] text-sm font-mono bg-white p-3 rounded border border-red-200 mt-2">{authError}</p>
                        <button onClick={() => navigate('/login')} className="btn btn-primary mt-4">Return to Login</button>
                    </>
                ) : (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                        <p className="text-[var(--body)] font-medium">Completing secure sign in...</p>
                        <p className="text-xs text-[var(--body)] mt-2 opacity-60">If you are stuck here, please let us know.</p>
                    </>
                )}
            </div>
        </div>
    );
};
