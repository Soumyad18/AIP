import { Router } from 'express';
import multer from 'multer';
import { analyzeResumeController, rewriteResumeController, uploadResumeController } from '../controllers/resume.controller.js';
import { HttpError } from '../utils/httpError.js';

const uploadLimitMb = Number(process.env.MAX_UPLOAD_MB || 5);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: uploadLimitMb * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype !== 'application/pdf') {
      callback(new HttpError(400, 'Invalid file type. Please upload a PDF.'));
      return;
    }

    callback(null, true);
  }
});

export const resumeRouter = Router();

resumeRouter.post('/resume/upload', upload.single('resume'), uploadResumeController);
resumeRouter.post('/analyze', analyzeResumeController);
resumeRouter.post('/rewrite', rewriteResumeController);
