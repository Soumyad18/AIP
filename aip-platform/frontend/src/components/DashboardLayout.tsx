import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
}

const ProfileIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const RecordsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const SkillsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);

const UploadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);

const TemplatesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
    </svg>
);

const AnalyzerIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const SubscriptionIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);

const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
);

const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Collapse / Expand chevrons
const CollapseIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="11 17 6 12 11 7" />
        <polyline points="18 17 13 12 18 7" />
    </svg>
);

const ExpandIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 17 18 12 13 7" />
        <polyline points="6 17 11 12 6 7" />
    </svg>
);

const navItems: NavItem[] = [
    { to: '/analyzer', label: 'Analyzer', icon: <AnalyzerIcon /> },
    { to: '/profile', label: 'Profile', icon: <ProfileIcon /> },
    { to: '/records', label: 'My Records', icon: <RecordsIcon /> },
    { to: '/skills', label: 'Skills', icon: <SkillsIcon /> },
    { to: '/upload', label: 'Upload Resume', icon: <UploadIcon /> },
    { to: '/templates', label: 'Templates', icon: <TemplatesIcon /> },
    { to: '/subscription', label: 'Subscription', icon: <SubscriptionIcon /> },
];

function getInitials(name?: string | null, email?: string | null): string {
    if (name) {
        return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
    }
    return email ? email[0].toUpperCase() : '?';
}

const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 68;

export const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || null;
    const email = user?.email || '';
    const initials = getInitials(displayName, email);
    const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    const SidebarContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Logo + Collapse Toggle */}
            <div style={{ padding: isCollapsed ? '28px 12px 20px' : '28px 24px 20px', borderBottom: '1px solid #e8f5f1', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between' }}>
                <Link to="/analyzer" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                    <img src="/aip-logo.svg" alt="AIP" style={{ width: 38, height: 38, flexShrink: 0 }} />
                    {!isCollapsed && (
                        <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 15, color: 'var(--heading)' }}>
                            Dashboard
                        </span>
                    )}
                </Link>
                {!isCollapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="sidebar-toggle-btn"
                        title="Collapse sidebar"
                        aria-label="Collapse sidebar"
                    >
                        <CollapseIcon />
                    </button>
                )}
            </div>

            {/* Expand button when collapsed */}
            {isCollapsed && (
                <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => setCollapsed(false)}
                        className="sidebar-toggle-btn"
                        title="Expand sidebar"
                        aria-label="Expand sidebar"
                    >
                        <ExpandIcon />
                    </button>
                </div>
            )}

            {/* Nav */}
            <nav style={{ flex: 1, padding: isCollapsed ? '8px 8px' : '16px 12px', overflowY: 'auto' }}>
                {!isCollapsed && (
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#9ab5ad', textTransform: 'uppercase', padding: '0 12px', marginBottom: 8 }}>
                        Navigation
                    </p>
                )}
                {navItems.map(item => {
                    const active = location.pathname === item.to;
                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setMobileOpen(false)}
                            title={isCollapsed ? item.label : undefined}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: isCollapsed ? '10px 0' : '10px 12px',
                                justifyContent: isCollapsed ? 'center' : 'flex-start',
                                borderRadius: 10, marginBottom: 2,
                                fontFamily: "'Open Sans', sans-serif", fontSize: 14, fontWeight: active ? 700 : 500,
                                color: active ? 'var(--primary)' : 'var(--body)',
                                background: active ? 'var(--secondary-1)' : 'transparent',
                                textDecoration: 'none',
                                transition: 'all 0.15s ease',
                                position: 'relative',
                            }}
                            onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = '#f0faf7'; }}
                            onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                        >
                            <span style={{ color: active ? 'var(--primary)' : '#7a9e97', flexShrink: 0 }}>{item.icon}</span>
                            {!isCollapsed && item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User + Logout */}
            <div style={{ padding: isCollapsed ? '12px 8px' : '16px 12px', borderTop: '1px solid #e8f5f1' }}>
                {isCollapsed ? (
                    /* Collapsed: just show avatar */
                    <Link to="/profile" onClick={() => setMobileOpen(false)} title={displayName || email} style={{
                        display: 'flex', justifyContent: 'center', marginBottom: 8,
                        textDecoration: 'none',
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'var(--primary)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: "'Unbounded', sans-serif", fontSize: 12, fontWeight: 700,
                        }}>
                            {initials}
                        </div>
                    </Link>
                ) : (
                    /* Expanded: show full user card */
                    <Link to="/profile" onClick={() => setMobileOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
                        background: '#f8fdfc', marginBottom: 8,
                        transition: 'background 0.15s ease',
                    }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary-1)')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#f8fdfc')}
                    >
                        <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'var(--primary)', color: '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: "'Unbounded', sans-serif", fontSize: 12, fontWeight: 700, flexShrink: 0,
                        }}>
                            {initials}
                        </div>
                        <div style={{ overflow: 'hidden' }}>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {displayName || 'My Profile'}
                            </p>
                            <p style={{ margin: 0, fontSize: 11, color: '#7a9e97', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {email}
                            </p>
                        </div>
                    </Link>
                )}
                <button
                    onClick={handleSignOut}
                    className="btn btn-secondary"
                    title="Log Out"
                    style={{
                        width: '100%', fontSize: 13,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        padding: isCollapsed ? '10px 0' : undefined,
                    }}
                >
                    <LogoutIcon />
                    {!isCollapsed && 'Log Out'}
                </button>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
            {/* Desktop Sidebar */}
            <aside
                className="hidden-mobile-sidebar"
                style={{
                    width: sidebarWidth,
                    flexShrink: 0,
                    background: '#fff',
                    borderRight: '1px solid #e0f0eb',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    boxShadow: '2px 0 16px rgba(38,166,136,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden',
                }}
            >
                <SidebarContent isCollapsed={collapsed} />
            </aside>

            {/* Mobile Header */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                background: '#fff', borderBottom: '1px solid #e0f0eb',
                padding: '0 20px', height: 60,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(38,166,136,0.08)',
            }}
                className="mobile-header"
            >
                <Link to="/analyzer" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                    <img src="/aip-logo.svg" alt="AIP" style={{ width: 30, height: 30 }} />
                    <span style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--heading)' }}>Dashboard</span>
                </Link>
                <button onClick={() => setMobileOpen(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--heading)', padding: 4 }}>
                    {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }}>
                    <div onClick={() => setMobileOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
                    <aside style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0, width: 260,
                        background: '#fff', display: 'flex', flexDirection: 'column',
                        boxShadow: '4px 0 24px rgba(0,0,0,0.12)',
                    }}>
                        <SidebarContent isCollapsed={false} />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main style={{ flex: 1, minWidth: 0 }} className="dashboard-main">
                {children ? children : <Outlet />}
            </main>

            <style>{`
        .sidebar-toggle-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 1px solid #e0f0eb;
          background: #f8fdfc;
          color: #7a9e97;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .sidebar-toggle-btn:hover {
          background: var(--secondary-1);
          color: var(--primary);
          border-color: var(--primary);
        }
        @media (min-width: 769px) {
          .hidden-mobile-sidebar { display: flex !important; flex-direction: column; }
          .mobile-header { display: none !important; }
          .dashboard-main { padding-top: 0; }
        }
        @media (max-width: 768px) {
          .hidden-mobile-sidebar { display: none !important; }
          .mobile-header { display: flex !important; }
          .dashboard-main { padding-top: 60px; }
        }
      `}</style>
        </div>
    );
};
