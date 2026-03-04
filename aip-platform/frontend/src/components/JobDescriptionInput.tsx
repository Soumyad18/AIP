interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
    <label className="mb-2 block text-sm font-semibold text-slate-800">Job Description</label>
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={10}
      placeholder="Paste the full job description here..."
      className="w-full rounded-lg border border-slate-300 p-3 text-sm focus:border-brand-600 focus:outline-none"
    />
  </div>
);
