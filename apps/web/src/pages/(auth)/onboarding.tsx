import { Button, TextField, Typography } from '@mui/material';
import { useOpenaiApiKey } from '@src/store/auth/use-openai-api-key.ts';
import { FC, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderPadding, NavBarPadding } from '../../components/padding.tsx';

const validateApiKey = (apiKey: string) => {
  if (!apiKey.startsWith('sk-')) {
    return { valid: false };
  } else {
    return { valid: true };
  }
};

const Page: FC = () => {
  const [error, setError] = useState<boolean>(false);
  const { apiKey, setApiKey } = useOpenaiApiKey();
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const apiKey = formData.get('apiKey') as string;
    const { valid } = validateApiKey(apiKey);
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setApiKey(apiKey);
    navigate('/', { replace: true });
  };

  return (
    <main className="h-full w-full overflow-scroll overscroll-contain">
      <div className="flex min-h-full w-full flex-col items-center justify-center px-2 py-6">
        <HeaderPadding />
        <div className="w-[480px] max-w-full sm:pb-20">
          <Typography variant="h4" className="mb-2 px-2">
            👋 Welcome!
          </Typography>
          <Typography variant="body1" className="mb-4 px-[14px]">
            Enter your OpenAI API key to continue.
          </Typography>
          <form className="w-full" onChange={() => setError(false)} onSubmit={handleSubmit}>
            <TextField
              defaultValue={apiKey}
              type="password"
              variant="outlined"
              autoComplete="off"
              label="OpenAI API Key"
              fullWidth
              name="apiKey"
              placeholder="sk-proj-..."
              error={error}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              className="mt-4 py-3"
              fullWidth
            >
              Continue
            </Button>
          </form>
        </div>
        <NavBarPadding />
      </div>
    </main>
  );
};

export default Page;
