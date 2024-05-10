import { FC } from 'react';
import logo from '../assets/lingoodia-logo.svg';
import { Link } from '../router.ts';
import { cn } from '../utils/cn.ts';

export const HeaderLogo: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link to="/" className={cn('h-full cursor-pointer', className)}>
      <img
        className={cn('h-full transition-opacity hover:opacity-90 active:opacity-80 dark:invert')}
        src={logo}
      ></img>
    </Link>
  );
};
