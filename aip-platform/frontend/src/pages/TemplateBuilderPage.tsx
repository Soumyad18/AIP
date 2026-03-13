import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const TemplateBuilderPage = () => {
    const navigate = useNavigate();

    // Metadata State
    const [name, setName] = useState('New Standard Template');
    const [dept, setDept] = useState('Engineering');
    const [targetScore, setTargetScore] = useState<number>(92);

    // Formatting State
    const [fontFamily, setFontFamily] = useState('Inter, sans-serif');
    const [accentColor, setAccentColor] = useState('#1a2744');
    const [includeImage, setIncludeImage] = useState(false);

    // Content State
    const [content, setContent] = useState(
        "{{candidate.name}}\n{{candidate.email}} | {{candidate.phone}}\n{{candidate.location}}\n\n" +
        "SUMMARY\n-------------------------------------------------\n{{candidate.summary}}\n\n" +
        "EXPERIENCE\n-------------------------------------------------\n" +
        "**{{experience.1.role}}** | {{experience.1.company}}\n" +
        "{{experience.1.dates}}\n" +
        "- {{experience.1.bullet1}}\n" +
        "- {{experience.1.bullet2}}\n\n" +
        "SKILLS\n-------------------------------------------------\n" +
        "{{candidate.skills}}"
    );

    // Auto-detect variables from content
    const detectedVariables = useMemo(() => {
        const matches = content.match(/\{\{([a-zA-Z0-9_.-]+)\}\}/g) || [];
        const unique = [...new Set(matches.map(m => m.replace(/[{}]/g, '')))];
        return unique.sort();
    }, [content]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc]">
            {/* Top Toolbar */}
            <div className="bg-white border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/team/resumes')}
                        className="p-2 hover:bg-[#f1f5f9] rounded-md transition-colors text-[var(--body)]"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    </button>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-[var(--heading)] text-lg">Template Builder</h1>
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#e8f5f1] text-[var(--primary)]">Draft</span>
                        </div>
                        <p className="text-xs text-[var(--body)]">Configure template variables for the backend ATS engine.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn btn-secondary py-2 text-sm">Test Render</button>
                    <button
                        className="btn btn-primary py-2 text-sm"
                        onClick={() => navigate('/team/resumes')}
                    >
                        Save to Bank
                    </button>
                </div>
            </div>

            {/* Split Workspace */}
            <div className="flex flex-1 overflow-hidden" style={{ minHeight: 'calc(100vh - 150px)' }}>

                {/* LEFT PANEL: Editor & Config (60%) */}
                <div className="w-3/5 flex flex-col border-r border-[#e2e8f0] bg-white overflow-y-auto">

                    {/* Metadata Config */}
                    <div className="p-6 border-b border-[#f1f5f9]">
                        <h2 className="text-sm font-bold text-[var(--heading)] uppercase tracking-wider mb-4">Template Settings</h2>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-[var(--body)] mb-1">Template Name</label>
                                <input type="text" className="input text-sm p-2 w-full" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--body)] mb-1">Department</label>
                                <select className="input text-sm p-2 w-full" value={dept} onChange={e => setDept(e.target.value)}>
                                    <option>Engineering</option>
                                    <option>Product</option>
                                    <option>Sales</option>
                                    <option>Design</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--body)] mb-1">Target ATS Score</label>
                                <input type="number" min="0" max="100" className="input text-sm p-2 w-full" value={targetScore} onChange={e => setTargetScore(parseInt(e.target.value))} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-xs font-semibold text-[var(--body)] mb-1">Font Family</label>
                                <select className="input text-sm p-2 w-full" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
                                    <option value="Inter, sans-serif">Inter (Modern Sans)</option>
                                    <option value="Merriweather, serif">Merriweather (Classic Serif)</option>
                                    <option value="Roboto Mono, monospace">Roboto Mono (Tech)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-[var(--body)] mb-1">Accent Color</label>
                                <div className="flex items-center gap-2">
                                    <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="h-9 w-9 p-0 border-0 rounded cursor-pointer" />
                                    <input type="text" value={accentColor} onChange={e => setAccentColor(e.target.value)} className="input text-sm p-2 flex-1 font-mono" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-[#f1f5f9]">
                            <input
                                type="checkbox"
                                id="includeImage"
                                checked={includeImage}
                                onChange={e => setIncludeImage(e.target.checked)}
                                className="w-4 h-4 rounded border-[#cbd5e1] text-[var(--primary)] focus:ring-[var(--primary)] cursor-pointer"
                            />
                            <label htmlFor="includeImage" className="text-sm font-semibold text-[var(--heading)] cursor-pointer">
                                Support Profile Picture / Logo
                            </label>
                            <span className="ml-2 text-xs text-[var(--body)] bg-[#f8fafc] px-2 py-0.5 rounded">Adds an image block to the layout</span>
                        </div>
                    </div>

                    {/* Syntax Editor */}
                    <div className="flex-1 flex flex-col p-6">
                        <div className="flex justify-between items-end mb-2">
                            <h2 className="text-sm font-bold text-[var(--heading)] uppercase tracking-wider">Engine Syntax Editor</h2>
                            <span className="text-xs text-[var(--body)] bg-[#f1f5f9] px-2 py-1 rounded">Use {'{{variable}}'} to inject candidate data</span>
                        </div>
                        <textarea
                            className="flex-1 w-full border border-[#cbd5e1] rounded-md p-4 outline-none focus:border-[var(--primary)] font-mono text-sm leading-relaxed resize-none bg-[#f8fafc] text-[var(--heading)]"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            spellCheck="false"
                        />
                    </div>
                </div>

                {/* RIGHT PANEL: Preview & Variables (40%) */}
                <div className="w-2/5 flex flex-col bg-[#f1f5f9] overflow-y-auto">

                    {/* Detected Variables Panel */}
                    <div className="p-6 bg-white border-b border-[#e2e8f0]">
                        <h2 className="text-sm font-bold text-[var(--heading)] uppercase tracking-wider mb-2 flex items-center gap-2">
                            Detected Variables
                            <span className="bg-[var(--primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{detectedVariables.length}</span>
                        </h2>
                        <p className="text-xs text-[var(--body)] mb-3 leading-relaxed">The backend generator will require these data points to render the template.</p>

                        <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-2 custom-scrollbar">
                            {detectedVariables.length > 0 ? detectedVariables.map(v => (
                                <span key={v} className="bg-[#e2e8f0] text-[var(--heading)] px-2 py-1 rounded text-xs font-mono border border-[#cbd5e1]">
                                    {v}
                                </span>
                            )) : (
                                <span className="text-sm text-[var(--body)] italic">No {'{{variables}}'} detected in editor.</span>
                            )}
                        </div>
                    </div>

                    {/* Rendering Preview Skeleton */}
                    <div className="flex-1 p-6 flex flex-col items-center justify-start">
                        <div className="w-full flex justify-between items-center mb-4">
                            <h2 className="text-sm font-bold text-[var(--heading)] uppercase tracking-wider">Live Preview</h2>
                            <span className="text-xs text-[var(--body)]">8.5" x 11" (A4)</span>
                        </div>

                        {/* The Mock Document */}
                        <div
                            className="bg-white rounded-sm shadow-md w-full max-w-[450px] aspect-[8.5/11] p-6 lg:p-8 overflow-hidden relative"
                            style={{ fontFamily }}
                        >
                            {/* Profile Image Placeholder */}
                            {includeImage && (
                                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 w-14 h-14 bg-[#f1f5f9] border border-[#cbd5e1] rounded flex items-center justify-center text-[8px] text-[#94a3b8] font-bold text-center tracking-wider overflow-hidden">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 mb-1">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                            )}

                            {/* Document Mock Representation based on content */}
                            <div className="whitespace-pre-wrap text-[10px] md:text-xs leading-relaxed" style={{ color: 'var(--heading)', paddingRight: includeImage ? '60px' : '0' }}>
                                {content.split('\n').map((line, idx) => {
                                    // Make sections look like headers using the selected accent color
                                    if (line.includes('---')) return <hr key={idx} className="my-2 border-t-2" style={{ borderColor: accentColor }} />;
                                    if (line === line.toUpperCase() && line.length > 2) return <div key={idx} className="font-bold mt-3 mb-1 text-[11px] md:text-sm" style={{ color: accentColor }}>{line}</div>;

                                    // Highlight variables in the preview to show they are dynamic
                                    const renderedLine = line.split(/(\{\{[^}]+\}\})/).map((part, i) => {
                                        if (part.startsWith('{{') && part.endsWith('}}')) {
                                            return <span key={i} className="bg-[#fefce8] text-[#b45309] font-bold px-1 mx-0.5 rounded border border-[#fde68a]">{part}</span>;
                                        }
                                        return part;
                                    });

                                    return <div key={idx} className="min-h-[14px]">{renderedLine}</div>;
                                })}
                            </div>

                            {/* Watermark overlay */}
                            <div className="absolute inset-x-0 bottom-4 text-center opacity-20 text-[8px] font-bold tracking-widest pointer-events-none">
                                POWERED BY AIP TEMPLATE ENGINE
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
