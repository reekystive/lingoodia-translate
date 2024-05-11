import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { $getRoot, $getSelection, EditorState, LexicalEditor } from 'lexical';
import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '../../utils/cn.ts';

type LexicalOnChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;

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

export const TextEditor: FC<{
  slotProps?: {
    contentEditable?: ComponentPropsWithoutRef<typeof ContentEditable>;
  };
}> = (props) => {
  const onChange: LexicalOnChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log('root: %o, selection: %o', root, selection);
    });
  };

  return (
    <LexicalComposer initialConfig={initialLexicalConfig}>
      <div className="relative w-full">
        <PlainTextPlugin
          contentEditable={
            <Editable
              {...props.slotProps?.contentEditable}
              className={cn('h-[10lh]', props.slotProps?.contentEditable?.className)}
            />
          }
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
};
