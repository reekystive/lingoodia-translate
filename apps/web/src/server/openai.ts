import { useNavigate } from '@src/router.ts';
import { useOpenaiApiKey } from '@src/store/auth/use-openai-api-key.ts';
import OpenAI from 'openai';
import { useMemo } from 'react';

export const getOpenaiClient = (apiKey: string) => {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};

export const useOpenaiClient = () => {
  const { apiKey } = useOpenaiApiKey();
  const navigate = useNavigate();
  if (!apiKey) {
    navigate('/onboarding');
    throw new Error('OpenAI API key is required');
  }
  const client = useMemo(() => getOpenaiClient(apiKey), [apiKey]);
  return client;
};
