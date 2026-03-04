import { isAuthenticated, logout } from '../auth.js';

export const Navbar = () => {
  if (isAuthenticated()) {
    return `<nav class="nav"><div class="container nav-inner"><div class="logo">AIP</div><div class="actions"><span style="padding:9px 12px;background:#eef8f5;border-radius:12px">👤 User</span><button class="btn btn-secondary" id="logoutBtn">Logout</button></div></div></nav>`;
  }

  return `<nav class="nav"><div class="container nav-inner"><div class="logo">AIP</div><div class="actions"><a class="btn btn-secondary" href="/login" data-link>Login</a><a class="btn btn-secondary" href="#enterprise">Enterprise</a><a class="btn btn-primary" href="/signup" data-link>Sign up free</a></div></div></nav>`;
};

export const bindNavbar = (navigate) => {
  const btn = document.getElementById('logoutBtn');
  if (btn) btn.addEventListener('click', () => { logout(); navigate('/login'); });
};
