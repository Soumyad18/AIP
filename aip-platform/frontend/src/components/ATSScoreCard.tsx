interface ATSScoreCardProps {
  score: number;
  totalKeywords: number;
}

export const ATSScoreCard = ({ score, totalKeywords }: ATSScoreCardProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-slate-900">ATS Compatibility Score</h3>
    <p className="mt-2 text-4xl font-bold text-brand-700">{score}%</p>
    <p className="mt-2 text-sm text-slate-600">Evaluated against {totalKeywords} extracted job keywords</p>
    <div className="mt-4 h-3 w-full rounded-full bg-slate-200">
      <div
        className="h-3 rounded-full bg-brand-600"
        style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
      />
    </div>
  </div>
);
