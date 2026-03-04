import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { HttpError } from '../utils/httpError.js';

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
};

export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
    res.status(413).json({ error: 'Uploaded file is too large.' });
    return;
  }

  if (error instanceof HttpError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }

  res.status(500).json({ error: 'Internal server error' });
};
