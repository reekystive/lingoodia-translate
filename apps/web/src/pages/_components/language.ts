import { languageCodes, languageEmojiMap, languageLocalNames } from '@lingoodia/language-codes';
import { getUserAgentLanguageCode } from '@src/utils/user-agent-language.ts';

export interface Language {
  code: string;
  label: string;
  emoji: string;
}

export const languages = languageCodes.map((code) => {
  return {
    code,
    label: languageLocalNames[code],
    emoji: languageEmojiMap[code],
  } satisfies Language;
});

export const getDefaultLanguage = () => {
  const code = getUserAgentLanguageCode() ?? 'en';
  const language: Language = {
    code: code,
    label: languageLocalNames[code],
    emoji: languageEmojiMap[code],
  };
  return language;
};
