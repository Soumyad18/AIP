import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AnalyzeResponse } from '@/types/analysis';

interface SavedRecord {
    id: string;
    date: string;
    analysis: AnalyzeResponse;
    jobDescription: string;
}

export const MyRecordsPage = () => {
    const [records, setRecords] = useState<SavedRecord[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('aip_records');
            if (stored) {
                setRecords(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load records', e);
        }
    }, []);

    const deleteRecord = (id: string) => {
        const updated = records.filter(r => r.id !== id);
        setRecords(updated);
        localStorage.setItem('aip_records', JSON.stringify(updated));
    };

    return (
        <div className="mx-auto max-w-4xl p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                        My Records
                    </h1>
                    <p className="mt-2 text-slate-500">History of your resume analyses and ATS scores.</p>
                </div>
                <Link to="/analyzer" className="btn btn-primary self-start md:self-auto">
                    New Analysis
                </Link>
            </div>

            {records.length === 0 ? (
                <div className="card text-center py-16 px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--bg)] rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
                    <div className="w-20 h-20 mx-auto rounded-full bg-slate-50 flex items-center justify-center mb-4 relative z-10">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                            <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 relative z-10">No records yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-6 relative z-10">
                        You haven't analyzed any resumes yet. Run your first analysis to see your history here.
                    </p>
                    <Link to="/analyzer" className="btn btn-primary relative z-10">Get Started</Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(record => {
                        const date = new Date(record.date);
                        const scoreColor = record.analysis.score >= 80 ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                            : record.analysis.score >= 60 ? 'text-amber-700 bg-amber-50 border-amber-200'
                                : 'text-red-700 bg-red-50 border-red-200';

                        return (
                            <div key={record.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-5 transition-shadow hover:shadow-lg">
                                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center border font-bold text-xl ${scoreColor}`}
                                    style={{ fontFamily: "'Unbounded', sans-serif" }}>
                                    {record.analysis.score}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold truncate" style={{ color: 'var(--heading)' }}>
                                            Target Role Analysis
                                        </h3>
                                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                            {date.toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                        "{record.jobDescription.trim().replace(/\n/g, ' ')}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:pl-4 sm:border-l border-slate-100 shrink-0">
                                    <Link
                                        to="/results"
                                        state={{ analysis: record.analysis, jobDescription: record.jobDescription, resumeText: '' }}
                                        className="btn btn-secondary text-sm py-2 px-3 flex-1 sm:w-full"
                                    >
                                        View Result
                                    </Link>
                                    <button
                                        onClick={() => deleteRecord(record.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                        title="Delete record"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
