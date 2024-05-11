import { useOpenaiApiKey } from '@src/store/auth/use-openai-api-key.ts';
import { usePathname } from '@src/utils/use-pathname.ts';
import { FC, ReactNode } from 'react';
import { useNavigate } from '../router.ts';
import { OPENAI_API_KEY_REQUIRED } from './path.ts';

export const Redirects: FC<{ children?: ReactNode }> = ({ children }) => {
  const { apiKey } = useOpenaiApiKey();
  const pathname = usePathname();
  const navigate = useNavigate();

  const noOpenaiApiKeyOnRequiredPath = !apiKey && OPENAI_API_KEY_REQUIRED.includes(pathname);
  if (noOpenaiApiKeyOnRequiredPath) navigate('/onboarding', { replace: true });

  return <>{children}</>;
};
