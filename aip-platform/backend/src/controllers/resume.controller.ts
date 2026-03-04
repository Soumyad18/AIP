import { Request, Response, NextFunction } from 'express';
import { analyzeResumeAgainstJob, rewriteResume, uploadAndExtractResumeText } from '../services/resume.service.js';

export const uploadResumeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resumeText = await uploadAndExtractResumeText(req.file);
    res.status(200).json({ resumeText });
  } catch (error) {
    next(error);
  }
};

export const analyzeResumeController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const result = analyzeResumeAgainstJob(resumeText, jobDescription);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const rewriteResumeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const optimizedResume = await rewriteResume(resumeText, jobDescription);
    res.status(200).json({ optimizedResume });
  } catch (error) {
    next(error);
  }
};
