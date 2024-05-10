import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../components/header.tsx';
import { AppNavBar } from '../components/nav-bar.tsx';

const Layout: FC = () => {
  return (
    <section className="h-svh w-screen overflow-clip">
      <AppHeader />
      <AppNavBar />
      <div className="dark:bg-contessa-950 bg-contessa-200 h-full w-full bg-opacity-30 transition-colors dark:bg-opacity-10">
        <Outlet />
      </div>
    </section>
  );
};

export default Layout;
