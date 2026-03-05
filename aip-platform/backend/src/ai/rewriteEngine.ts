import OpenAI from 'openai';
import { HttpError } from '../utils/httpError.js';

let cachedClient: OpenAI | null = null;

const getClient = (): OpenAI => {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new HttpError(500, 'OPENAI_API_KEY is not configured.');
  }

  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }

  return cachedClient;
};

export const generateOptimizedResume = async (resumeText: string, jobDescription: string): Promise<string> => {
  try {
    const client = getClient();
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const completion = await client.chat.completions.create({
      model,
      temperature: 0.3,
      messages: [
        {
          role: 'system',
          content:
            'You are an expert resume optimization assistant focused on ATS readability and relevance. Do not fabricate any experiences, achievements, dates, certifications, or employers.'
        },
        {
          role: 'user',
          content: `Rewrite the candidate resume so that it better aligns with the provided job description. Do not fabricate experience. Improve phrasing, highlight relevant skills, and optimize the resume for ATS readability.\n\nCandidate Resume:\n${resumeText}\n\nJob Description:\n${jobDescription}\n\nReturn only the rewritten resume in plain text.`
        }
      ]
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new HttpError(500, 'OpenAI returned an empty response.');
    }

    return content;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    throw new HttpError(500, 'Failed to optimize resume using AI service.');
  }
};
