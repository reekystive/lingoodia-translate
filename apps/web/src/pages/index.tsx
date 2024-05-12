import { ButtonBase, Typography } from '@mui/material';
import { cn } from '@src/utils/cn.ts';
import { FC, MouseEventHandler, useState } from 'react';
import { HeaderPadding, NavBarPadding } from '../components/padding.tsx';
import { TranslationEditor } from './_components/translation-editor.tsx';

const Page: FC = () => {
  const [userInput, setUserInput] = useState('');
  return (
    <main className="h-full w-full overflow-auto overscroll-contain">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-2 py-2 lg:px-8 lg:py-6">
        <HeaderPadding />
        <Typography
          variant="h5"
          className="mb-4 mt-16 w-full px-4 text-left font-medium leading-none"
        >
          Translate
        </Typography>
        <TranslationEditor
          userInputValue={userInput}
          onUserInputChange={(value) => setUserInput(value)}
        />
        <div className="flex w-full flex-row flex-wrap gap-2 pt-2">
          {presets.map((preset, index) => (
            <SuggestionButton
              key={index}
              content={preset}
              className="flex-grow"
              onClick={() => setUserInput(preset.description)}
            />
          ))}
        </div>
        <NavBarPadding />
      </div>
    </main>
  );
};

const SuggestionButton: FC<{
  content: Preset;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = ({ content, className, onClick }) => {
  return (
    <ButtonBase
      className={cn(
        'w-[250px] overflow-clip rounded-md bg-[#FEFDFD] text-left dark:bg-[#1B1514]',
        className
      )}
      onClick={onClick}
    >
      <div
        className="dark:border-contessa-200 flex h-full w-full flex-col items-start rounded-md border-[1px]
      border-gray-200 p-4 dark:border-opacity-10"
      >
        <Typography variant="h6">{content.title}</Typography>
        <Typography variant="body1" className="mt-2 line-clamp-3 h-[3lh] flex-grow">
          {content.description}
        </Typography>
      </div>
    </ButtonBase>
  );
};

interface Preset {
  title: string;
  description: string;
}

const presets: Preset[] = [
  {
    title: '扩展原文',
    description: '你需要发挥想象力，尽可能地扩展原文，增加一些原文不存在的内容，而不仅限于原文。',
  },
  {
    title: '提升表达',
    description: '你需要提升原文的表达水平，使其更加生动、有趣、有感染力。',
  },
  {
    title: '缩减原文',
    description: '你需要缩减原文，减少一些原文中的内容，让内容更精简。',
  },
  {
    title: '转换风格',
    description: '你需要转换原文的风格，让其更符合口语、随意、幽默等风格。',
  },
  {
    title: '调整语气',
    description: '你需要调整原文的语气，让原文以更加主观的方式表达。',
  },
  {
    title: '技术文档',
    description:
      '你需要将原文转换为技术文档会使用的翻译风格，使其更加专业、严谨。对于一些术语或专有名词，你需要适当保留原文。',
  },
  {
    title: '排版优化',
    description: '遵循「中文文案排版指北」，对原文进行排版优化，在中英文之间加上空格。',
  },
];

export default Page;
