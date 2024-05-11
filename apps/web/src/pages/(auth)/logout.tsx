import { FC } from 'react';
import { HeaderPadding, NavBarPadding } from '../../components/padding.tsx';

const Page: FC = () => {
  return (
    <main className="h-full w-full">
      <div className="flex min-h-full w-full flex-col items-center justify-center">
        <HeaderPadding />
        <div>Logout</div>
        <NavBarPadding />
      </div>
    </main>
  );
};

export default Page;
