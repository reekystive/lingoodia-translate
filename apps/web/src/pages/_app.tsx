import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useMedia } from 'react-use';
import { AppHeader } from '../components/header.tsx';
import { AppNavBar } from '../components/nav-bar.tsx';
import { updateMetaThemeColor, updateRootColor } from '../utils/update-root-color.ts';
import { useBodyThemeAttribute } from '../utils/use-root-color.ts';

const useThemeColor = () => {
  const isDesktop = useMedia('(min-width: 640px)');
  const isDark = useMedia('(prefers-color-scheme: dark)');
  useEffect(() => {
    if (isDark) {
      updateRootColor('#151312');
      if (isDesktop) {
        updateMetaThemeColor('#1B1514');
      } else {
        updateMetaThemeColor('#151312');
      }
    } else {
      updateRootColor('#F9F9F9');
      if (isDesktop) {
        updateMetaThemeColor('#F9F9F9');
      } else {
        updateMetaThemeColor('#F9F9F9');
      }
    }
  }, [isDark, isDesktop]);
};

const Layout: FC = () => {
  useBodyThemeAttribute();
  useThemeColor();
  return (
    <section className="h-svh w-screen overflow-clip">
      <AppHeader />
      <AppNavBar />
      <div className="dark:bg-contessa-950 bg-contessa-50 h-full w-full bg-opacity-10 transition-colors dark:bg-opacity-10">
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
