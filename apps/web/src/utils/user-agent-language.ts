import { LanguageCode, languageCodes } from '@lingoodia/language-codes';

export const getUserAgentLanguageCode = (): LanguageCode | null => {
  const language = navigator.language;
  const languageCode = languageCodes.find((code) => language === code);
  if (languageCode) {
    return languageCode;
  }
  const fuzzyLanguageCode = languageCodes.find((code) => language.startsWith(code));
  if (fuzzyLanguageCode) {
    return fuzzyLanguageCode;
  }
  const languageParts = language.split('-')[0];
  if (!languageParts) {
    return null;
  }
  const languagePartsCode = languageCodes.find((code) => code.startsWith(languageParts));
  if (languagePartsCode) {
    return languagePartsCode;
  }
  return null;
};
