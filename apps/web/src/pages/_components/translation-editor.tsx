import SendIcon from '@mui/icons-material/Send';
import { IconButton, TextField } from '@mui/material';
import { useOpenaiClient } from '@src/server/openai.ts';
import { getLanguageCodePrompt } from '@src/server/prompts/language-code.ts';
import { getTranslateTextPrompt } from '@src/server/prompts/translate-text.ts';
import { getTranslationOptimizationPrompt } from '@src/server/prompts/translation-optimization.ts';
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
  const [optimizationText, setOptimizationText] = useState('');
  const sourceLanguageAbortControllers = useRef<AbortController[]>([]);
  const targetLanguageAbortControllers = useRef<AbortController[]>([]);
  const optimizationAbortControllers = useRef<AbortController[]>([]);

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
    async (source: string, sourceLanguage: Language | undefined, targetLanguage: Language) => {
      if (!source.trim()) {
        setTargetText('');
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

  const handleOptimizeTranslation = useThrottledCallback(
    async (params: {
      sourceLanguage: Language | null;
      targetLanguage: Language;
      sourceText: string;
      targetText: string;
      userFeedback: string;
    }) => {
      if (optimizationAbortControllers.current.some((controller) => !controller.signal.aborted)) {
        console.warn('[OpenAI] Aborting previous optimization request');
        optimizationAbortControllers.current.forEach((controller) => controller.abort());
      }
      const controller = new AbortController();
      optimizationAbortControllers.current.push(controller);
      const messages = getTranslationOptimizationPrompt({
        sourceLanguage: params.sourceLanguage ?? undefined,
        targetLanguage: params.targetLanguage,
        sourceText: params.sourceText,
        translatedText: params.targetText,
        userFeedback: params.userFeedback,
      });
      try {
        console.info('[OpenAI] starting optimization');
        const stream = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages,
          stream: true,
        });
        let optimizedTranslation = '';
        for await (const message of stream) {
          if (controller.signal.aborted) {
            console.warn('[OpenAI] optimization aborted');
            stream.controller.abort();
            throw new Error('Aborted');
          }
          if (message.choices[0]?.delta.content) {
            optimizedTranslation += message.choices[0].delta.content;
            setTargetText(optimizedTranslation);
          }
        }
        console.info('[OpenAI] optimization response: %o', optimizedTranslation);
      } catch (e) {
        console.error('[OpenAI] optimization error: %o', e);
      } finally {
        optimizationAbortControllers.current = optimizationAbortControllers.current.filter(
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
        `dark:bg-contessa-950 w-full overflow-clip rounded-md bg-white bg-opacity-80 dark:bg-opacity-20`,
        className
      )}
    >
      <div className="dark:border-contessa-200 grid w-full grid-cols-2 rounded-t-md border-[1px] border-gray-200 dark:border-opacity-10">
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
            onChange={(_e, language) => {
              setTargetLanguage(language);
              if (language) {
                void translate(sourceText, sourceLanguage ?? undefined, language);
              }
            }}
          />
        </div>
      </div>
      <div className="dark:border-contessa-200 grid w-full border-x-[1px] border-gray-200 lg:grid-cols-2 dark:border-opacity-10">
        <TextEditor
          slotProps={{
            placeholder: {
              children: 'Enter some text to translate.',
            },
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 h-full lg:border-r-[0.5px] border-b-[1px] lg:border-b-[0px]',
            },
          }}
          value={sourceText}
          onChange={(_editorState, textContent) => {
            setSourceText(textContent);
            void inferenceSourceLanguage(textContent);
            if (!targetLanguage?.code) {
              return;
            }
            void translate(textContent, sourceLanguage ?? undefined, targetLanguage);
          }}
        />
        <TextEditor
          slotProps={{
            placeholder: {
              children: 'Translated text will appear here.',
            },
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 lg:border-l-[0.5px] h-full',
            },
          }}
          editable={false}
          value={targetText}
          onChange={(_editorState, textContent) => setTargetText(textContent)}
        />
      </div>
      <form
        className="relative"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            console.log('submit (meta enter)');
            void handleOptimizeTranslation({
              sourceLanguage,
              targetLanguage: targetLanguage ?? getDefaultLanguage(),
              sourceText,
              targetText,
              userFeedback: optimizationText,
            });
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit');
          void handleOptimizeTranslation({
            sourceLanguage,
            targetLanguage: targetLanguage ?? getDefaultLanguage(),
            sourceText,
            targetText,
            userFeedback: optimizationText,
          });
        }}
      >
        <TextField
          sx={{
            '& .MuiInputBase-root fieldset.MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
              borderColor: 'inherit',
            },
          }}
          InputProps={{
            className:
              'dark:border-contessa-200 border-gray-200 dark:border-opacity-10 rounded-b-md rounded-t-none',
          }}
          InputLabelProps={{
            className: 'bg-red',
          }}
          label="Optimize translation"
          placeholder="You should translate the original text as..."
          multiline
          fullWidth
          minRows={5}
          maxRows={10}
          name="optimization-text"
          value={optimizationText}
          onChange={(e) => {
            setOptimizationText(e.target.value);
          }}
        />
        <IconButton className="absolute bottom-2 right-2 aspect-square" type="submit">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};
