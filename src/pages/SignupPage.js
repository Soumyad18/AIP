import { Navbar } from '../components/Navbar.js';

export const SignupPage = () => `
${Navbar()}
<section class="auth-wrap"><div class="card auth-card"><h2>Sign up</h2><p>Create your free AIP account.</p><label>Email</label><input id="email" class="input" placeholder="you@company.com" /><label>Password</label><input id="password" type="password" class="input" placeholder="Create a password" /><button class="btn btn-primary" id="signupBtn">Create Account</button><p style="margin-top:10px">Already have an account? <a href="/login" data-link>Login</a></p></div></section>
`;
