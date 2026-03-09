import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResumeUpload } from '@/components/ResumeUpload';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useUploadResume } from '@/hooks/useAnalyzeResume';

export const UploadResumePage = () => {
    const navigate = useNavigate();
    const uploadMutation = useUploadResume();
    const [resumeText, setResumeText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (file: File) => {
        setError(null);
        setResumeText('');
        try {
            const result = await uploadMutation.mutateAsync(file);
            setResumeText(result.resumeText);
        } catch (uploadError: any) {
            setError(uploadError?.response?.data?.error || 'Failed to upload and parse resume.');
        }
    };

    const handleAnalyze = () => {
        navigate('/analyzer', { state: { prefilledResume: resumeText } });
    };

    return (
        <div className="mx-auto max-w-4xl p-6 md:p-10">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                Upload Resume
            </h1>
            <p className="mt-2 text-slate-500 mb-8">Upload your latest resume to parse and store it for future analyses.</p>

            <div className="grid md:grid-cols-[1fr_400px] gap-8">
                <div>
                    <div className="card p-6">
                        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--heading)' }}>Select PDF File</h2>
                        <ResumeUpload onFileSelect={handleFileSelect} isUploading={uploadMutation.isPending} />
                        {uploadMutation.isPending && (
                            <div className="mt-4"><LoadingSpinner /></div>
                        )}
                        {error && (
                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
                        )}
                    </div>
                </div>

                <div>
                    <div className="card p-6 h-full flex flex-col">
                        <h2 className="text-lg font-bold mb-4 flex items-center justify-between" style={{ color: 'var(--heading)' }}>
                            Parsed Content
                            {resumeText && <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded font-semibold">Ready</span>}
                        </h2>

                        {resumeText ? (
                            <>
                                <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg p-4 mb-6 overflow-y-auto max-h-[300px]">
                                    <p className="text-sm font-mono text-slate-600 whitespace-pre-wrap">{resumeText}</p>
                                </div>
                                <button onClick={handleAnalyze} className="btn btn-primary w-full">
                                    Analyze This Resume
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 text-slate-400">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                <p className="text-sm">Upload a PDF to see the text AIP extracts from your resume.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
