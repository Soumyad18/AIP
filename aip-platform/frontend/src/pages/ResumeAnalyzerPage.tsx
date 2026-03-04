import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobDescriptionInput } from '@/components/JobDescriptionInput';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ResumeUpload } from '@/components/ResumeUpload';
import { useAnalyzeResume, useUploadResume } from '@/hooks/useAnalyzeResume';

export const ResumeAnalyzerPage = () => {
  const navigate = useNavigate();
  const uploadMutation = useUploadResume();
  const analyzeMutation = useAnalyzeResume();

  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);
    try {
      const result = await uploadMutation.mutateAsync(file);
      setResumeText(result.resumeText);
    } catch (uploadError: any) {
      setError(uploadError?.response?.data?.error || 'Failed to upload and parse resume.');
    }
  };

  const handleAnalyze = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!resumeText.trim()) {
      setError('Please upload a resume before analyzing.');
      return;
    }

    if (!jobDescription.trim()) {
      setError('Please paste a job description.');
      return;
    }

    try {
      const analysis = await analyzeMutation.mutateAsync({ resumeText, jobDescription });
      navigate('/results', {
        state: {
          analysis,
          resumeText,
          jobDescription
        }
      });
    } catch (analyzeError: any) {
      setError(analyzeError?.response?.data?.error || 'Failed to analyze resume.');
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Resume Analyzer</h1>
      <p className="mt-2 text-slate-600">Upload your resume and compare it against a target role.</p>

      <form className="mt-6 space-y-4" onSubmit={handleAnalyze}>
        <ResumeUpload onFileSelect={handleFileSelect} isUploading={uploadMutation.isPending} />
        {uploadMutation.isPending && <LoadingSpinner />}
        {resumeText && <p className="text-sm text-emerald-700">Resume successfully parsed and ready for analysis.</p>}

        <JobDescriptionInput value={jobDescription} onChange={setJobDescription} />

        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <button
          type="submit"
          disabled={analyzeMutation.isPending}
          className="rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 disabled:opacity-60"
        >
          Analyze Resume
        </button>

        {analyzeMutation.isPending && <LoadingSpinner />}
      </form>
    </main>
  );
};
