import {
  LanguageCode,
  languageCodes,
  languageEmojiMap,
  languageLocalNames,
} from '@lingoodia/language-codes';
import { getUserAgentLanguageCode } from '@src/utils/user-agent-language.ts';

export interface Language {
  code: LanguageCode;
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

export const getLanguageByCode = (code: LanguageCode) => {
  const language = {
    code,
    label: languageLocalNames[code],
    emoji: languageEmojiMap[code],
  } satisfies Language;
  return language;
};

export const getDefaultLanguage = () => {
  const code = getUserAgentLanguageCode() ?? 'en';
  return getLanguageByCode(code);
};
