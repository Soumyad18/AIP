import { Navbar } from '../components/Navbar.js';

export const LoginPage = () => `
${Navbar()}
<section class="auth-wrap"><div class="card auth-card"><h2>Login</h2><p>Welcome back to AIP.</p><label>Email</label><input id="email" class="input" placeholder="you@company.com" /><label>Password</label><input id="password" type="password" class="input" placeholder="••••••••" /><button class="btn btn-primary" id="loginBtn">Login</button><p style="margin-top:10px">No account? <a href="/signup" data-link>Sign up</a></p></div></section>
`;
