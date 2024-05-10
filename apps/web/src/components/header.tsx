import { LinkProps } from '@generouted/react-router/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TranslateIcon from '@mui/icons-material/Translate';
import { Button, styled } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Link, Params, Path } from '../router.ts';
import { usePathname } from '../utils/use-pathname.ts';
import { HeaderLogo } from './header-logo.tsx';

const NavButton = styled(Button)(() => ({
  borderRadius: 0,
  height: '100%',
  paddingInline: '1.5rem',
  textTransform: 'none',
}));

const NavItem: <P extends Path>(props: {
  link: LinkProps<P, Params>;
  label: string;
  icon: ReactNode;
}) => ReactNode = ({ label, icon, link }) => {
  const pathname = usePathname();
  return (
    <Link {...link}>
      <NavButton
        startIcon={icon}
        sx={(theme) => ({
          color: pathname === link.to ? theme.palette.primary.main : theme.palette.primary.light,
        })}
      >
        {label}
      </NavButton>
    </Link>
  );
};

export const AppHeader: FC = () => {
  return (
    <header className="fixed top-0 z-10 hidden h-[48px] w-screen overflow-clip sm:block">
      <div className="border-b-contessa-800 dark:bg-contessa-950 flex h-full w-full flex-row items-center justify-between border-b-[1px] border-opacity-10 px-2 backdrop-blur-md dark:bg-opacity-20">
        <HeaderLogo className="px-2 py-2" />
        <div className="flex h-full flex-row items-stretch">
          <NavItem link={{ to: '/' }} label="Translate" icon={<TranslateIcon />} />
          <NavItem link={{ to: '/projects' }} label="Projects" icon={<TextSnippetIcon />} />
          <NavItem link={{ to: '/login' }} label="Profile" icon={<AccountCircleIcon />} />
        </div>
      </div>
    </header>
  );
};
