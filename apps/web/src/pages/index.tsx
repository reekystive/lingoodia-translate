import { FC } from 'react';
import { HeaderPadding, NavBarPadding } from '../components/padding.tsx';
import { TranslationEditor } from './_components/translation-editor.tsx';

const Page: FC = () => {
  return (
    <main className="h-full w-full overflow-auto overscroll-contain">
      <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col items-center justify-center px-2 lg:px-8">
        <HeaderPadding />
        <TranslationEditor />
        <NavBarPadding />
      </div>
    </main>
  );
};

export default Page;
