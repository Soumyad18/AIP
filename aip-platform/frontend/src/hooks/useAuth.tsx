import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { }
});

// A dummy enterprise user for the mock session
const mockEnterpriseUser: User = {
    id: 'mock-ent-1234',
    app_metadata: { provider: 'email' },
    user_metadata: { isEnterprise: true, name: 'Enterprise Team' },
    aud: 'authenticated',
    created_at: new Date().toISOString(),
    email: 'enterprise@aip.mock',
    phone: '',
    role: 'authenticated',
    updated_at: new Date().toISOString(),
};

const mockEnterpriseSession: Session = {
    access_token: 'mock-token',
    refresh_token: 'mock-refresh',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: mockEnterpriseUser
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for mock enterprise session first
        if (localStorage.getItem('mock_enterprise') === 'true') {
            setSession(mockEnterpriseSession);
            setUser(mockEnterpriseUser);
            setLoading(false);
            return;
        }

        // Get initial session from Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            // Only update from Supabase if we aren't using the mock session
            if (localStorage.getItem('mock_enterprise') !== 'true') {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        if (localStorage.getItem('mock_enterprise') === 'true') {
            localStorage.removeItem('mock_enterprise');
            setSession(null);
            setUser(null);
            return;
        }
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
