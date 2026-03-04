export const LoadingSpinner = () => (
  <div className="flex items-center gap-2 text-sm text-slate-600">
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-700 border-t-transparent" />
    <span>Processing...</span>
  </div>
);
