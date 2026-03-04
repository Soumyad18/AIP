import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { resumeRouter } from './routes/resume.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api', resumeRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`AIP backend listening on http://localhost:${port}`);
});
