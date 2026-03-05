import { api } from './api';
import type { AnalyzePayload, AnalyzeResponse } from '@/types/analysis';
import type { ResumeUploadResponse, RewriteResponse } from '@/types/resume';

export const uploadResume = async (file: File): Promise<ResumeUploadResponse> => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post<ResumeUploadResponse>('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return data;
};

export const analyzeResume = async (payload: AnalyzePayload): Promise<AnalyzeResponse> => {
  const { data } = await api.post<AnalyzeResponse>('/analyze', payload);
  return data;
};

export const rewriteResume = async (payload: AnalyzePayload): Promise<RewriteResponse> => {
  const { data } = await api.post<RewriteResponse>('/rewrite', payload);
  return data;
};
