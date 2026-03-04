import { ChangeEvent } from 'react';

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
}

export const ResumeUpload = ({ onFileSelect, isUploading }: ResumeUploadProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <label className="mb-2 block text-sm font-semibold text-slate-800">Upload Resume (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        disabled={isUploading}
        className="block w-full rounded-lg border border-slate-300 p-2 text-sm"
      />
    </div>
  );
};
