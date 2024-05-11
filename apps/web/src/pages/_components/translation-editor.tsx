import { cn } from '@src/utils/cn.ts';
import { FC } from 'react';
import { LanguageSelect } from './language-select.tsx';
import { getDefaultLanguage } from './language.ts';
import { TextEditor } from './text-editor.tsx';

export const TranslationEditor: FC<{ className?: string }> = ({ className }) => {
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
          <LanguageSelect label="Source language" />
        </div>
        <div className="p-2">
          <LanguageSelect defaultValue={getDefaultLanguage()} label="Target language" />
        </div>
      </div>
      <div className="grid w-full lg:grid-cols-2">
        <TextEditor
          slotProps={{
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 border-t-[0.5px] lg:border-t-[0px] lg:border-l-[0.5px]',
            },
          }}
        />
        <TextEditor
          slotProps={{
            contentEditable: {
              className:
                'border-gray-200 dark:border-contessa-200 dark:border-opacity-10 border-t-[0.5px] lg:border-t-[0px] lg:border-l-[0.5px]',
            },
          }}
        />
      </div>
    </div>
  );
};
