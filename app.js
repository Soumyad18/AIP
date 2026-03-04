import { isAuthenticated, login, logout } from './src/auth.js';
import { LandingPage } from './src/pages/LandingPage.js';
import { LoginPage } from './src/pages/LoginPage.js';
import { SignupPage } from './src/pages/SignupPage.js';
import { DashboardPage } from './src/pages/DashboardPage.js';
import { AnalyzerPage } from './src/pages/AnalyzerPage.js';
import { bindNavbar } from './src/components/Navbar.js';
import { bindResumeAnalyzer } from './src/components/ResumeAnalyzer.js';

const app = document.getElementById('app');
const protectedPaths = ['/dashboard', '/analyzer'];

const navigate = (path) => {
  window.history.pushState({}, '', path);
  render();
};

const render = () => {
  let path = window.location.pathname;

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
