import OpenAI from 'openai';

export const getOpenaiClient = (apiKey: string) => {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};
