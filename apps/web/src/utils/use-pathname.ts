import { useLocation } from 'react-router-dom';
import { Path } from '../router.ts';

export const usePathname = () => {
  const location = useLocation();
  const path = location.pathname as Path;
  return path;
};
