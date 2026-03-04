export const FeatureCard = ({ title, desc, cta, href }) => `
  <div class="card pad">
    <h4>${title}</h4>
    <p>${desc}</p>
    ${href ? `<a class="btn btn-primary" href="${href}" data-link>${cta || 'Open'}</a>` : `<button class="btn btn-secondary">${cta || 'Coming soon'}</button>`}
  </div>
`;
