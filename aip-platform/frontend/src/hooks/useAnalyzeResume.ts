import { useState } from 'react';
import type { AnalyzePayload, AnalyzeResponse } from '@/types/analysis';
import type { ResumeUploadResponse, RewriteResponse } from '@/types/resume';
import { analyzeResume, rewriteResume, uploadResume } from '@/services/resumeService';

export const useUploadResume = () => {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (file: File): Promise<ResumeUploadResponse> => {
    setIsPending(true);
    try {
      return await uploadResume(file);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, mutateAsync };
};

export const useAnalyzeResume = () => {
  const [isPending, setIsPending] = useState(false);

  const mutateAsync = async (payload: AnalyzePayload): Promise<AnalyzeResponse> => {
    setIsPending(true);
    try {
      return await analyzeResume(payload);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, mutateAsync };
};

export const useRewriteResume = () => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState<RewriteResponse | undefined>(undefined);

  const mutateAsync = async (payload: AnalyzePayload): Promise<RewriteResponse> => {
    setIsPending(true);
    try {
      const response = await rewriteResume(payload);
      setData(response);
      return response;
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, data, mutateAsync };
};
