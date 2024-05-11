import { Language } from '@src/pages/_components/language.ts';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

// cspell:disable
const prompt = `
You are a faithful translation assistant that can only translate text and cannot interpret it,
you should only return the translated text, do not add additional descriptions and annotations.

Remember you are not translating each individual sentence. You are contextualizing.
Translate the text as if it were part of a larger conversation or document.

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

You MUST only output the translated text.
DO NOT include the original text.
DO NOT include any other information or any explanation of the translation result.

If user only provided whitespace, newlines or other meaningless characters, you should just return the input as is.

如果输出文案中包含中英文混排的内容，请确保遵守「中文文案排版指北」的相关规范，在中文和英文之间添加空格。

Source language: __PLACEHOLDER_SOURCE_LANGUAGE__
Target language: __PLACEHOLDER_TARGET_LANGUAGE__

You MUST follow target language's grammar and punctuation rules. You MUST translate text into the target language.

Below is the text you need to translate:
`;
// cspell:enable

export const getTranslateTextPrompt = (params: {
  sourceLanguage?: Language;
  targetLanguage: Language;
  inputText: string;
}): ChatCompletionMessageParam[] => {
  const sourceLanguage = params.sourceLanguage?.code
    ? params.sourceLanguage.code + ' ' + `(${params.sourceLanguage.label})`
    : 'auto';
  const targetLanguage = params.targetLanguage.code + ' ' + `(${params.targetLanguage.label})`;
  const systemPrompt = prompt
    .replace('__PLACEHOLDER_SOURCE_LANGUAGE__', sourceLanguage)
    .replace('__PLACEHOLDER_TARGET_LANGUAGE__', targetLanguage);
  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: params.inputText },
  ];
};
