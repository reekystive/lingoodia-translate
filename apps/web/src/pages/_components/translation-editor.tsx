import { LanguageCode } from '@lingoodia/language-codes';
import { useOpenaiClient } from '@src/server/openai.ts';
import { getLanguageCodePrompt } from '@src/server/prompts/language-code.ts';
import { getTranslateTextPrompt } from '@src/server/prompts/translate-text.ts';
import { cn } from '@src/utils/cn.ts';
import { getLanguageCodeByString } from '@src/utils/user-agent-language.ts';
import useThrottledCallback from 'beautiful-react-hooks/useThrottledCallback';
import { FC, useRef, useState } from 'react';
import { LanguageSelect } from './language-select.tsx';
import { Language, getDefaultLanguage, getLanguageByCode } from './language.ts';
import { TextEditor } from './text-editor.tsx';

export const TranslationEditor: FC<{ className?: string }> = ({ className }) => {
  const openai = useOpenaiClient();
  const [sourceLanguage, setSourceLanguage] = useState<Language | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(getDefaultLanguage());
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const sourceLanguageAbortControllers = useRef<AbortController[]>([]);
  const targetLanguageAbortControllers = useRef<AbortController[]>([]);

  const inferenceSourceLanguage = useThrottledCallback(
    async (text: string) => {
      if (sourceLanguageAbortControllers.current.some((controller) => !controller.signal.aborted)) {
        console.warn('[OpenAI] Aborting previous inferenceSourceLanguage request');
        sourceLanguageAbortControllers.current.forEach((controller) => controller.abort());
      }
      const controller = new AbortController();
      sourceLanguageAbortControllers.current.push(controller);
      const messages = getLanguageCodePrompt(text);
      try {
        console.info('[OpenAI] inferenceSourceLanguage');
        const stream = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          stream: true,
        });

        let code = '';
        for await (const message of stream) {
          if (controller.signal.aborted) {
            console.warn('[OpenAI] inferenceSourceLanguage aborted');
            stream.controller.abort();
            throw new Error('Aborted');
          }
          if (message.choices[0]?.delta.content) {
            code += message.choices[0].delta.content;
            break;
          }
        }
        console.info('[OpenAI] inferenceSourceLanguage response: %o', code);
        const languageCode = getLanguageCodeByString(code) ?? 'en';
        const language = getLanguageByCode(languageCode);
        setSourceLanguage(language);
      } catch (e) {
        console.warn('[OpenAI] inferenceSourceLanguage error: %o', e);
      } finally {
        sourceLanguageAbortControllers.current = sourceLanguageAbortControllers.current.filter(
          (item) => item !== controller
        );
      }
    },
    [openai.chat.completions],
    3000,
    { leading: true, trailing: true }
  );

  const translate = useThrottledCallback(
    async (
      source: string,
      sourceLanguage: LanguageCode | undefined,
      targetLanguage: LanguageCode
    ) => {
      if (!sourceLanguage?.trim()) {
        return;
      }
      if (targetLanguageAbortControllers.current.some((controller) => !controller.signal.aborted)) {
        console.warn('[OpenAI] Aborting previous translation request');
        targetLanguageAbortControllers.current.forEach((controller) => controller.abort());
      }
      const controller = new AbortController();
      targetLanguageAbortControllers.current.push(controller);
      const prompt = getTranslateTextPrompt({
        sourceLanguage,
        targetLanguage,
        inputText: source,
      });
      try {
        console.info('[OpenAI] starting translation');
        const stream = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: prompt,
          stream: true,
        });
        let translation = '';
        for await (const message of stream) {
          if (controller.signal.aborted) {
            console.warn('[OpenAI] translation aborted');
            stream.controller.abort();
            throw new Error('Aborted');
          }
          if (message.choices[0]?.delta.content) {
            translation += message.choices[0].delta.content;
            setTargetText(translation);
          }
        }
        console.info('[OpenAI] translation response: %o', translation);
      } catch (e) {
        console.error('[OpenAI] translation error: %o', e);
      } finally {
        targetLanguageAbortControllers.current = targetLanguageAbortControllers.current.filter(
          (item) => item !== controller
        );
      }
    },
    [openai.chat.completions],
    3000,
    { leading: true, trailing: true }
  );

  return (
    <div
      className={cn(
        `dark:border-contessa-200 dark:bg-contessa-950 w-full overflow-clip rounded-md border border-gray-200
         bg-white bg-opacity-80 dark:border-opacity-10 dark:bg-opacity-20`,
        className
      )}
    >
      <div className="dark:border-contessa-200 grid w-full grid-cols-2 border-b-[1px] border-gray-200 dark:border-opacity-10">
        <div className="p-2">
          <LanguageSelect
            label="Source language"
            value={sourceLanguage}
            onChange={(_e, language) => setSourceLanguage(language)}
          />
        </div>
        <div className="p-2">
          <LanguageSelect
            label="Target language"
            value={targetLanguage}
            onChange={(_e, language) => setTargetLanguage(language)}
          />
        </div>
      </div>
      <div className="grid w-full lg:grid-cols-2">
        <TextEditor
          slotProps={{
            placeholder: {
              children: 'Enter some text to translate.',
            },
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 border-t-[0.5px] lg:border-t-[0px] lg:border-l-[0.5px]',
            },
          }}
          value={sourceText}
          onChange={(_editorState, textContent) => {
            setSourceText(textContent);
            void inferenceSourceLanguage(textContent);
            if (!targetLanguage?.code) {
              return;
            }
            void translate(textContent, sourceLanguage?.code, targetLanguage.code);
          }}
        />
        <TextEditor
          slotProps={{
            placeholder: {
              children: 'Translated text will appear here.',
            },
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 border-t-[0.5px] lg:border-t-[0px] lg:border-l-[0.5px]',
            },
          }}
          editable={false}
          value={targetText}
          onChange={(_editorState, textContent) => setTargetText(textContent)}
        />
      </div>
    </div>
  );
};
