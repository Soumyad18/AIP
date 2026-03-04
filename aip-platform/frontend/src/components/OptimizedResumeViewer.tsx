interface OptimizedResumeViewerProps {
  optimizedResume: string;
}

export const OptimizedResumeViewer = ({ optimizedResume }: OptimizedResumeViewerProps) => {
  const handleDownload = () => {
    const blob = new Blob([optimizedResume], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'optimized-resume.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-slate-900">AI Optimized Resume</h4>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
        >
          Download
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        {optimizedResume}
      </pre>
    </div>
  );
};
