import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/header.tsx';
import { AppNavBar } from '../components/nav-bar.tsx';
import { useMetaThemeColor, useRootColor } from '../utils/use-root-color.ts';

const Layout: FC = () => {
  useRootColor('#151312');
  useMetaThemeColor('#1B1514');
  return (
    <section className="h-svh w-screen overflow-clip">
      <AppHeader />
      <AppNavBar />
      <div className="dark:bg-contessa-950 h-full w-full dark:bg-opacity-10">
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
