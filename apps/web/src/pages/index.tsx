import { FC } from 'react';
import { HeaderPadding, NavBarPadding } from '../components/padding.tsx';
import { TextEditor } from './_components/text-editor.tsx';

const Page: FC = () => {
  return (
    <main className="h-full w-full overflow-auto overscroll-contain">
      <div className="mx-auto flex min-h-full w-full max-w-[1400px] flex-col items-center justify-center px-2 lg:px-8">
        <HeaderPadding />
        <div className="grid w-full lg:grid-cols-2">
          <TextEditor />
          <TextEditor />
        </div>
        <NavBarPadding />
      </div>
    </main>
  );
};

export default Page;
