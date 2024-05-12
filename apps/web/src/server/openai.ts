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
  const client = useMemo(() => getOpenaiClient(apiKey ?? ''), [apiKey]);
  return client;
};
