import { extractResumeTextFromPdf } from '../parsing/resumeParser.js';
import { analyzeAtsScore } from '../scoring/atsScoring.js';
import { generateOptimizedResume } from '../ai/rewriteEngine.js';
import { HttpError } from '../utils/httpError.js';

const sanitizeInput = (value: string): string =>
  value
    .replace(/<[^>]*>?/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();

export const uploadAndExtractResumeText = async (file: Express.Multer.File | undefined): Promise<string> => {
  if (!file) {
    throw new HttpError(400, 'Resume PDF file is required.');
  }

  if (file.mimetype !== 'application/pdf') {
    throw new HttpError(400, 'Invalid file type. Please upload a PDF resume.');
  }

  return extractResumeTextFromPdf(file.buffer);
};

export const analyzeResumeAgainstJob = (resumeText: string, jobDescription: string) => {
  const cleanResumeText = sanitizeInput(resumeText);
  const cleanJobDescription = sanitizeInput(jobDescription);

  if (!cleanResumeText) {
    throw new HttpError(400, 'Resume text cannot be empty.');
  }

  if (!cleanJobDescription) {
    throw new HttpError(400, 'Job description cannot be empty.');
  }

  return analyzeAtsScore(cleanResumeText, cleanJobDescription);
};

export const rewriteResume = async (resumeText: string, jobDescription: string) => {
  const cleanResumeText = sanitizeInput(resumeText);
  const cleanJobDescription = sanitizeInput(jobDescription);

  if (!cleanResumeText) {
    throw new HttpError(400, 'Resume text cannot be empty.');
  }

  if (!cleanJobDescription) {
    throw new HttpError(400, 'Job description cannot be empty.');
  }

  return generateOptimizedResume(cleanResumeText, cleanJobDescription);
};
