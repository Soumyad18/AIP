import pdfParse from 'pdf-parse';
import { HttpError } from '../utils/httpError.js';

export const extractResumeTextFromPdf = async (fileBuffer: Buffer): Promise<string> => {
  const data = await pdfParse(fileBuffer);
  const text = data.text?.trim();

  if (!text) {
    throw new HttpError(400, 'Unable to extract text from the uploaded PDF.');
  }

  return text;
};
