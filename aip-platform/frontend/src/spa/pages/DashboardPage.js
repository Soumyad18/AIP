import { Sidebar } from '../components/Sidebar.js';
import { FeatureCard } from '../components/FeatureCard.js';

export const DashboardPage = () => `
<div class="layout">
  ${Sidebar('/dashboard')}
  <main class="main">
    <h2>Welcome back 👋</h2>
    <p>Your ATS optimization workspace is ready.</p>
    <div class="card pad" style="margin-bottom:14px"><strong>User Summary:</strong> 4 analyses this week · 2 resumes optimized · 1 report generated</div>
    <div class="cards4">
      ${FeatureCard({ title: 'Resume Analyzer', desc: 'Analyze resume vs target JD and optimize.', cta: 'Open Analyzer', href: '/analyzer' })}
      ${FeatureCard({ title: 'Resume History', desc: 'Track prior versions and improvements.', cta: 'Coming soon' })}
      ${FeatureCard({ title: 'ATS Reports', desc: 'View trends across roles and applications.', cta: 'Coming soon' })}
      ${FeatureCard({ title: 'Account Settings', desc: 'Manage profile, API and preferences.', cta: 'Coming soon' })}
    </div>
  </main>
</div>
`;
