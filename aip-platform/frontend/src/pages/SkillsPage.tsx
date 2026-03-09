import { useEffect, useState } from 'react';
import type { AnalyzeResponse } from '@/types/analysis';

interface SavedRecord {
    id: string;
    date: string;
    analysis: AnalyzeResponse;
    jobDescription: string;
}

export const SkillsPage = () => {
    const [skillFreq, setSkillFreq] = useState<{ matched: Record<string, number>, missing: Record<string, number>, totalAnalyses: number }>({
        matched: {}, missing: {}, totalAnalyses: 0
    });

    useEffect(() => {
        try {
            const stored = localStorage.getItem('aip_records');
            if (stored) {
                const records: SavedRecord[] = JSON.parse(stored);
                const freq = { matched: {} as Record<string, number>, missing: {} as Record<string, number>, totalAnalyses: records.length };

                records.forEach(r => {
                    r.analysis.matchedKeywords.forEach(k => {
                        freq.matched[k] = (freq.matched[k] || 0) + 1;
                    });
                    r.analysis.missingKeywords.forEach(k => {
                        freq.missing[k] = (freq.missing[k] || 0) + 1;
                    });
                });

                setSkillFreq(freq);
            }
        } catch (e) {
            console.error('Failed to load records for skills', e);
        }
    }, []);

    const topMatched = Object.entries(skillFreq.matched).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const topMissing = Object.entries(skillFreq.missing).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const StatBar = ({ count, max, color }: { count: number, max: number, color: string }) => {
        const percentage = max === 0 ? 0 : Math.max(5, (count / max) * 100);
        return (
            <div className="flex items-center gap-3">
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
                </div>
                <span className="text-xs font-bold text-slate-500 w-8 text-right">{count}x</span>
            </div>
        );
    };

    return (
        <div className="mx-auto max-w-5xl p-6 md:p-10">
            <h1 className="text-3xl font-bold" style={{ color: 'var(--heading)', fontFamily: "'Unbounded', sans-serif" }}>
                Skill Analytics
            </h1>
            <p className="mt-2 text-slate-500">Aggregated insights across your {skillFreq.totalAnalyses} saved resume analyses.</p>

            {skillFreq.totalAnalyses === 0 ? (
                <div className="card mt-8 p-10 text-center">
                    <p className="text-slate-500">More data needed. Analyze some resumes to see your skill trends!</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {/* Strongest Skills */}
                    <div className="card p-6 border-t-4" style={{ borderTopColor: 'var(--primary)' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[var(--secondary-1)] flex items-center justify-center text-[var(--primary)]">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Top Strengths</h2>
                        </div>

                        <p className="text-sm text-slate-500 mb-6 pb-4 border-b border-slate-100">
                            Keywords you consistently match against job descriptions.
                        </p>

                        {topMatched.length > 0 ? (
                            <div className="space-y-4">
                                {topMatched.map(([skill, count]) => (
                                    <div key={skill}>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="font-semibold text-slate-800 text-sm">{skill}</span>
                                        </div>
                                        <StatBar count={count} max={skillFreq.totalAnalyses} color="var(--primary)" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No matched skills recorded yet.</p>
                        )}
                    </div>

                    {/* Skill Gaps */}
                    <div className="card p-6 border-t-4" style={{ borderTopColor: '#ef4444' }}>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Frequent Gaps</h2>
                        </div>

                        <p className="text-sm text-slate-500 mb-6 pb-4 border-b border-slate-100">
                            Keywords frequently missing from your resume that employers want.
                        </p>

                        {topMissing.length > 0 ? (
                            <div className="space-y-4">
                                {topMissing.map(([skill, count]) => (
                                    <div key={skill}>
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="font-semibold text-slate-800 text-sm">{skill}</span>
                                        </div>
                                        <StatBar count={count} max={skillFreq.totalAnalyses} color="#ef4444" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No skill gaps recorded yet. Great job!</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
