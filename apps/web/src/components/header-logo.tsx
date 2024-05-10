import { clsx } from 'clsx';
import { FC } from 'react';
import logo from '../assets/lingoodia-logo.svg';
import { Link } from '../router.ts';

export const HeaderLogo: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/" className={clsx('h-full cursor-pointer', className)}>
      <img
        className={clsx('h-full transition-opacity hover:opacity-90 active:opacity-80 dark:invert')}
        src={logo}
      ></img>
    </Link>
  );
};
