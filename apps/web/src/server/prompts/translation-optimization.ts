import { Language } from '@src/pages/_components/language.ts';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

// cspell:disable
const prompt = `
You are optimizing the translation results.

Users may not be satisfied with the translation results, so they will provide improvement suggestions.
Your task is to re-output a optimized translation result based on the original text, translated text, and user feedback.

You should only return the translated text, DO NOT add any additional descriptions and annotations.
You should output the FULL translation result, not just the changed part.
`;
// cspell:enable

const userPromptTemplate = `
Source language: __PLACEHOLDER_SOURCE_LANGUAGE__

--- start of source text ---
___PLACEHOLDER_SOURCE_TEXT___
--- end of source text ---

Target language: __PLACEHOLDER_TARGET_LANGUAGE__

--- start of translated text ---
___PLACEHOLDER_TRANSLATED_TEXT___
--- end of translated text ---

User feedback:

___PLACEHOLDER_USER_FEEDBACK___
`;

export const getTranslationOptimizationPrompt = (params: {
  sourceLanguage?: Language;
  targetLanguage: Language;
  sourceText: string;
  translatedText: string;
  userFeedback: string;
}): ChatCompletionMessageParam[] => {
  const sourceLanguage = params.sourceLanguage?.code
    ? params.sourceLanguage.code + ' ' + `(${params.sourceLanguage.label})`
    : 'auto';
  const targetLanguage = params.targetLanguage.code + ' ' + `(${params.targetLanguage.label})`;
  const userPrompt = userPromptTemplate
    .replace('__PLACEHOLDER_SOURCE_LANGUAGE__', sourceLanguage)
    .replace('__PLACEHOLDER_TARGET_LANGUAGE__', targetLanguage)
    .replace('___PLACEHOLDER_SOURCE_TEXT___', params.sourceText)
    .replace('___PLACEHOLDER_TRANSLATED_TEXT___', params.translatedText)
    .replace('___PLACEHOLDER_USER_FEEDBACK___', params.userFeedback);
  return [
    { role: 'system', content: prompt },
    { role: 'user', content: userPrompt },
  ];
};
