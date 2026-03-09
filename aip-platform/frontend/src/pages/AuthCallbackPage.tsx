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
        // Supabase will automatically process the URL hash and store the session.
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error("Auth error:", error);
                navigate('/login?error=auth', { replace: true });
            } else if (session) {
                navigate('/analyzer', { replace: true });
            }
        });

        // Also listen for changes just in case getSession is too fast
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                navigate('/analyzer', { replace: true });
            }
            if (event === 'SIGNED_OUT') {
                navigate('/login', { replace: true });
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
