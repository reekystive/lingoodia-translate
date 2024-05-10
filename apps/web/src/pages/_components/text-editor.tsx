import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '../../utils/cn.ts';

const initialLexicalConfig: InitialConfigType = {
  namespace: 'lingoodia-editor',
  onError: (error) => {
    console.error(error);
  },
};

const Placeholder: FC = () => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 select-none p-2 opacity-50">
      Enter some text...
    </div>
  );
};

interface EditableProps extends ComponentPropsWithoutRef<typeof ContentEditable> {
  className?: string;
}

const Editable: FC<EditableProps> = ({ className, ...props }) => {
  return (
    <ContentEditable
      {...props}
      className={cn('relative h-[3lh] w-full p-2 outline-none', className)}
    />
  );
};

export const TextEditor: FC = () => {
  return (
    <LexicalComposer initialConfig={initialLexicalConfig}>
      <div className="relative w-full border">
        <RichTextPlugin
          contentEditable={<Editable className="h-[10lh]" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
};
