import { Button } from '@mui/material';
import { FC } from 'react';
import { cn } from '../../utils/cn.ts';
import { TextEditor } from './text-editor.tsx';

const borderClassName = 'border-gray-200 dark:border-contessa-200 dark:border-opacity-10';

export const TranslationEditor: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        borderClassName,
        `dark:bg-contessa-950 w-full overflow-clip rounded-md border bg-white bg-opacity-80 dark:bg-opacity-20`,
        className
      )}
    >
      <div className={cn(borderClassName, 'grid w-full grid-cols-2 border-b-[1px]')}>
        <div className="p-2">
          <Button variant="contained" disableElevation className="py-1">
            Chinese (Simplified)
          </Button>
        </div>
        <div className="p-2">
          <Button variant="contained" disableElevation className="py-1">
            Chinese (Simplified)
          </Button>
        </div>
      </div>
      <div className="grid w-full lg:grid-cols-2">
        <TextEditor
          slotProps={{
            contentEditable: {
              className: cn(
                borderClassName,
                'border-b-[0.5px] lg:border-r-[0.5px] lg:border-b-[0px]'
              ),
            },
          }}
        />
        <TextEditor
          slotProps={{
            contentEditable: {
              className: cn(
                borderClassName,
                'border-t-[0.5px] lg:border-t-[0px] lg:border-l-[0.5px]'
              ),
            },
          }}
        />
      </div>
    </div>
  );
};
