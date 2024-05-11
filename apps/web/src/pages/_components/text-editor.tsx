import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { cn } from '@src/utils/cn.ts';
import { useThemeMode } from '@src/utils/use-theme-mode.ts';
import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  LexicalEditor,
} from 'lexical';
import { ComponentPropsWithoutRef, FC, ReactNode, useEffect, useState } from 'react';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';

type LexicalOnChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;

const initialLexicalConfig: InitialConfigType = {
  namespace: 'lingoodia-editor',
  onError: (error) => {
    console.error(error);
  },
};

const Placeholder: FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute left-0 top-0 select-none p-2 opacity-50',
        className
      )}
    >
      {children}
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
      className={cn('relative min-h-[3lh] w-full p-2 outline-none', className)}
    />
  );
};

export const TextEditor: FC<{
  slotProps?: {
    contentEditable?: ComponentPropsWithoutRef<typeof ContentEditable>;
    placeholder?: ComponentPropsWithoutRef<typeof Placeholder>;
  };
  className?: string;
  editable?: boolean;
  value?: string;
  onChange?: (editorState: EditorState, textContent: string) => void;
}> = (props) => {
  const onChange: LexicalOnChange = (editorState, editor) => {
    if (editor.isComposing()) {
      return;
    }
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      props.onChange?.(editorState, textContent);
      console.info('[OnChangePlugin] textContent: %o', textContent);
    });
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...initialLexicalConfig,
        editable: props.editable,
      }}
    >
      <div className={cn('relative w-full', props.className)}>
        <PlainTextPlugin
          contentEditable={
            <Editable
              {...props.slotProps?.contentEditable}
              className={cn('min-h-[10lh]', props.slotProps?.contentEditable?.className)}
            />
          }
          placeholder={<Placeholder {...props.slotProps?.placeholder} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        {/* <EditorStateDebugger /> */}
      </div>
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} ignoreSelectionChange />
      <ValuePlugin value={props.value} />
    </LexicalComposer>
  );
};

export const EditorStateDebugger: FC = () => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const { themeMode } = useThemeMode();
  const json = editorState?.toJSON();
  return (
    <>
      <OnChangePlugin
        onChange={(editorState) => {
          setEditorState(editorState);
        }}
      />
      <JsonView
        data={json ?? {}}
        shouldExpandNode={allExpanded}
        style={themeMode === 'dark' ? darkStyles : defaultStyles}
      />
    </>
  );
};

const ValuePlugin: FC<{ value?: string }> = ({ value }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (value === undefined) {
      return;
    }
    const needToUpdate = editor.getEditorState().read(() => {
      const root = $getRoot();
      const currentTextContent = root.getTextContent();
      if (value === currentTextContent) {
        return false;
      }
      return true;
    });
    if (!needToUpdate) {
      console.info('[ValuePlugin] no need to update');
      return;
    }
    editor.update(() => {
      const rootNode = $getRoot();
      rootNode.clear();
      const paragraph = $createParagraphNode();
      const values = value.split('\n');
      values.forEach((value, index) => {
        if (index > 0) {
          paragraph.append($createLineBreakNode());
        }
        paragraph.append($createTextNode(value));
      });
      rootNode.append(paragraph);
    });
  }, [editor, value]);
  return null;
};
