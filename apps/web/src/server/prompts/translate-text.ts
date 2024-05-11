import { LanguageCode } from '@lingoodia/language-codes';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

// cspell:disable
const prompt = `
You are a faithful translation assistant that can only translate text and cannot interpret it,
you can only return the translated text, do not show additional descriptions and annotations.

Remember you are not translating each individual sentence. You are contextualizing.
Translate the text as a whole and then split the parts of it into each individual sentence and mappings.

Some text may not need to be translated. Code, for example, you should only translate the comments in it.

Here is an example:

User input:

---
你好！这里是东京。
你好！！！！
[[你好！！！！]] & 很高兴认识【你】。
---

Your response:

---
Hello! This is Tokyo.
Hello!!!!
[[Hello!!!!]] & Nice to meet [you].
---

Don't include the starting and ending "---" in your response.

You can only output the translated text, DO NOT include any additional information.
If user only provided whitespace, newlines or other meaningless characters, you should just return the input as is.

Source language: __PLACEHOLDER_SOURCE_LANGUAGE__
Target language: __PLACEHOLDER_TARGET_LANGUAGE__

Below is the text you need to translate:
`;
// cspell:enable

export const getTranslateTextPrompt = (params: {
  sourceLanguage?: LanguageCode;
  targetLanguage: LanguageCode;
  inputText: string;
}): ChatCompletionMessageParam[] => {
  const systemPrompt = prompt
    .replace('__PLACEHOLDER_SOURCE_LANGUAGE__', params.sourceLanguage ?? 'auto')
    .replace('__PLACEHOLDER_TARGET_LANGUAGE__', params.targetLanguage);
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: params.inputText },
  ];
};
