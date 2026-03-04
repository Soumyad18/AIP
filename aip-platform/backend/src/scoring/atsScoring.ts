export interface AtsAnalysisResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  totalKeywords: number;
}

const STOP_WORDS = new Set([
  'and', 'the', 'with', 'for', 'you', 'your', 'will', 'our', 'are', 'this', 'that', 'from', 'have', 'has', 'had',
  'about', 'into', 'their', 'they', 'them', 'his', 'her', 'its', 'was', 'were', 'job', 'role', 'candidate', 'work',
  'years', 'year', 'experience', 'using', 'must', 'should', 'able', 'requirements', 'preferred', 'plus', 'etc', 'all'
]);

const sanitizeText = (input: string): string =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s#+.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const extractKeywords = (jobDescription: string): string[] => {
  const tokens = sanitizeText(jobDescription).split(' ').filter(Boolean);
  const unique = new Set<string>();

  for (const token of tokens) {
    if (token.length < 3) continue;
    if (STOP_WORDS.has(token)) continue;
    unique.add(token);
  }

  return [...unique].slice(0, 60);
};

export const analyzeAtsScore = (resumeText: string, jobDescription: string): AtsAnalysisResult => {
  const keywords = extractKeywords(jobDescription);
  const normalizedResume = sanitizeText(resumeText);

  const matchedKeywords = keywords.filter((keyword) => normalizedResume.includes(keyword));
  const missingKeywords = keywords.filter((keyword) => !normalizedResume.includes(keyword));

  const totalKeywords = keywords.length;
  const rawScore = totalKeywords === 0 ? 0 : (matchedKeywords.length / totalKeywords) * 100;

  return {
    score: Math.round(rawScore),
    matchedKeywords,
    missingKeywords,
    totalKeywords
  };
};
