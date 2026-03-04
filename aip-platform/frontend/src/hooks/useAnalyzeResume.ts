import { useMutation } from '@tanstack/react-query';
import type { AnalyzePayload } from '@/types/analysis';
import { analyzeResume, rewriteResume, uploadResume } from '@/services/resumeService';

export const useUploadResume = () =>
  useMutation({
    mutationFn: uploadResume
  });

export const useAnalyzeResume = () =>
  useMutation({
    mutationFn: (payload: AnalyzePayload) => analyzeResume(payload)
  });

export const useRewriteResume = () =>
  useMutation({
    mutationFn: (payload: AnalyzePayload) => rewriteResume(payload)
  });
