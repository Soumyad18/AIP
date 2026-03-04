import { isAuthenticated, login, logout } from './spa/auth.js?v=20260304c';
import { LandingPage } from './spa/pages/LandingPage.js?v=20260304c';
import { LoginPage } from './spa/pages/LoginPage.js?v=20260304c';
import { SignupPage } from './spa/pages/SignupPage.js?v=20260304c';
import { DashboardPage } from './spa/pages/DashboardPage.js?v=20260304c';
import { AnalyzerPage } from './spa/pages/AnalyzerPage.js?v=20260304c';
import { bindNavbar } from './spa/components/Navbar.js?v=20260304c';
import { bindResumeAnalyzer } from './spa/components/ResumeAnalyzer.js?v=20260304c';

window.__AIP_UI_VERSION = 'saas-v3-20260304c';
document.title = 'AIP SaaS v3';

let app;
const protectedPaths = ['/dashboard', '/analyzer'];

const ensureAppRoot = () => {
  app = document.getElementById('app');
  if (!app) {
    document.body.innerHTML = '<div id="app"></div>';
    app = document.getElementById('app');
  }
};

const navigate = (path) => {
  window.history.pushState({}, '', path);
  render();
};

const render = () => {
  ensureAppRoot();
  const path = window.location.pathname;

  if (protectedPaths.includes(path) && !isAuthenticated()) {
    navigate('/login');
    return;
  }

  if (path === '/') app.innerHTML = LandingPage();
  else if (path === '/login') app.innerHTML = LoginPage();
  else if (path === '/signup') app.innerHTML = SignupPage();
  else if (path === '/dashboard') app.innerHTML = DashboardPage();
  else if (path === '/analyzer') app.innerHTML = AnalyzerPage();
  else app.innerHTML = LandingPage();

  bindGlobalEvents();
};

const bindGlobalEvents = () => {
  document.querySelectorAll('[data-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.getAttribute('href'));
    });
  });

  bindNavbar(navigate);

  document.getElementById('sidebarLogout')?.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
    navigate('/login');
  });

  document.getElementById('loginBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!email || !password) return;
    login();
    navigate('/dashboard');
  });

  document.getElementById('signupBtn')?.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!email || !password) return;
    login();
    navigate('/dashboard');
  });

  if (window.location.pathname === '/analyzer') bindResumeAnalyzer();
};

window.addEventListener('popstate', render);
render();
