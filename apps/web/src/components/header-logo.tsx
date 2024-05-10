import { FC } from 'react';
import LingoodiaLogo from '../assets/lingoodia-logo.svg?react';
import { Link } from '../router.ts';
import { cn } from '../utils/cn.ts';

export const HeaderLogo: FC<{ className?: string }> = ({ className }) => {
  return (
    <Link
      to="/"
      className={cn(
        'h-full cursor-pointer transition-opacity hover:opacity-90 active:opacity-80',
        className
      )}
    >
      <LingoodiaLogo className={cn('text-contessa-700 dark:text-contessa-100 h-full w-auto')} />
    </Link>
  );
};
