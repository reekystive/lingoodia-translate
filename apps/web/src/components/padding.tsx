import { clsx } from 'clsx';
import { FC } from 'react';

export const HeaderPadding: FC<{ className?: string }> = ({ className }) => {
  return <div className={clsx('hidden h-[48px] flex-shrink-0 sm:block', className)}></div>;
};

export const NavBarPadding: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={clsx(
        'block h-[calc(56px+env(safe-area-inset-bottom))] flex-shrink-0 sm:hidden',
        className
      )}
    ></div>
  );
};
