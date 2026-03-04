export const Sidebar = (path) => `<aside class="sidebar">
  <h3 style="color:#fff">AIP Platform</h3>
  <a class="side-item ${path==='/dashboard'?'active':''}" href="/dashboard" data-link>Dashboard</a>
  <a class="side-item ${path==='/analyzer'?'active':''}" href="/analyzer" data-link>Resume Analyzer</a>
  <a class="side-item" href="#">Reports</a>
  <a class="side-item" href="#">Settings</a>
  <a class="side-item" id="sidebarLogout" href="#">Logout</a>
</aside>`;
