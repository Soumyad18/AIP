import { Link } from 'react-router-dom';

export const LandingPage = () => (
  <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
      ATS Intelligence Platform
    </span>
    <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">Optimize Your Resume for ATS in Minutes</h1>
    <p className="mt-4 max-w-2xl text-lg text-slate-600">
      Upload your resume, paste a job description, and get instant scoring, keyword alignment insights, and an AI optimized rewrite.
    </p>
    <Link
      to="/analyzer"
      className="mt-8 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-brand-600"
    >
      Start Analysis
    </Link>
  </main>
);
