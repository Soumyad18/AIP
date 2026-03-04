import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ATSScoreCard } from '@/components/ATSScoreCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { OptimizedResumeViewer } from '@/components/OptimizedResumeViewer';
import { SkillGapList } from '@/components/SkillGapList';
import { useRewriteResume } from '@/hooks/useAnalyzeResume';
import type { AnalyzeResponse } from '@/types/analysis';

interface ResultsLocationState {
  analysis: AnalyzeResponse;
  resumeText: string;
  jobDescription: string;
}

export const ResultsPage = () => {
  const location = useLocation();
  const state = location.state as ResultsLocationState | undefined;
  const rewriteMutation = useRewriteResume();
  const [error, setError] = useState<string | null>(null);

  if (!state) {
    return <Navigate to="/analyzer" replace />;
  }

  const { analysis, resumeText, jobDescription } = state;

  const handleOptimize = async () => {
    setError(null);

    try {
      await rewriteMutation.mutateAsync({ resumeText, jobDescription });
    } catch (rewriteError: any) {
      setError(rewriteError?.response?.data?.error || 'Failed to rewrite resume.');
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Analysis Results</h1>
        <Link to="/analyzer" className="text-sm font-semibold text-brand-700 hover:underline">
          New Analysis
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <ATSScoreCard score={analysis.score} totalKeywords={analysis.totalKeywords} />
        <SkillGapList
          title="Matched Keywords"
          items={analysis.matchedKeywords}
          emptyText="No direct keyword matches found yet."
        />
      </div>

      <div className="mt-4">
        <SkillGapList title="Missing Skills / Keywords" items={analysis.missingKeywords} emptyText="Great! No skill gaps found." />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">AI Resume Optimization</h3>
        <p className="mt-2 text-sm text-slate-600">
          Generate an ATS-friendly rewrite using your current resume and target job description.
        </p>
        <button
          type="button"
          onClick={handleOptimize}
          disabled={rewriteMutation.isPending}
          className="mt-4 rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          Optimize Resume
        </button>
        {rewriteMutation.isPending && <div className="mt-3"><LoadingSpinner /></div>}
        {error && <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
      </div>

      {rewriteMutation.data?.optimizedResume && (
        <div className="mt-6">
          <OptimizedResumeViewer optimizedResume={rewriteMutation.data.optimizedResume} />
        </div>
      )}
    </main>
  );
};
