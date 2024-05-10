import { LinkProps } from '@generouted/react-router/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TranslateIcon from '@mui/icons-material/Translate';
import { ButtonBase } from '@mui/material';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { Link, Params, Path } from '../router.ts';
import { usePathname } from '../utils/use-pathname.ts';

const NavItem: <P extends Path>(props: {
  link: LinkProps<P, Params>;
  label: string;
  icon: ReactNode;
}) => ReactNode = ({ label, icon, link }) => {
  const pathname = usePathname();
  return (
    <Link
      {...link}
      className={clsx(
        'flex h-full flex-grow basis-1 flex-row items-center justify-center transition-colors',
        pathname === link.to && 'text-contessa-400'
      )}
    >
      <ButtonBase className="flex h-full w-full flex-col items-center justify-center text-xs leading-none">
        {icon}
        <div>{label}</div>
      </ButtonBase>
    </Link>
  );
};

export const AppNavBar = () => {
  return (
    <nav className="fixed bottom-0 z-10 block h-[calc(56px+env(safe-area-inset-bottom))] w-screen overflow-clip sm:hidden">
      <div
        className="flex h-full w-full flex-row items-center justify-between border-t-[1px]
          border-gray-400 border-opacity-20 pb-[env(safe-area-inset-bottom)]
          backdrop-blur-md dark:bg-gray-950 dark:bg-opacity-60"
      >
        <NavItem link={{ to: '/' }} label="Translate" icon={<TranslateIcon />} />
        <NavItem link={{ to: '/projects' }} label="Projects" icon={<TextSnippetIcon />} />
        <NavItem link={{ to: '/login' }} label="Profile" icon={<AccountCircleIcon />} />
      </div>
    </nav>
  );
};