import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

/**
 * This page handles the OAuth callback after Google/GitHub login.
 * Supabase redirects here with the access_token in the URL hash.
 * We wait for Supabase to process the token, then navigate to /analyzer.
 */
export const AuthCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check immediately in case the session is already processed
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                navigate('/analyzer', { replace: true });
            }
        });

        // Listen for any auth state change that results in a session
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate('/analyzer', { replace: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
                <p className="text-[var(--body)] font-medium">Completing secure sign in...</p>
            </div>
        </div>
    );
};
