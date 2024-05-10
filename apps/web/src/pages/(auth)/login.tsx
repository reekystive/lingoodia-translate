import { Button, TextField, styled } from '@mui/material';
import { clsx } from 'clsx';
import { FC, ReactNode } from 'react';
import appleLogo from '../../assets/apple-logo.svg';
import googleLogo from '../../assets/google-logo.svg';
import { HeaderPadding, NavBarPadding } from '../../components/padding.tsx';

const Sidebar: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={clsx('bg-contessa-800 relative bg-opacity-20', className)}>
      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-clip">
        <div
          className="absolute -bottom-40 -left-10 -right-10 -top-40
        select-none font-serif text-6xl font-bold leading-none text-red-100
        opacity-5 mix-blend-lighten [writing-mode:vertical-rl]"
        >
          {Array.from({ length: 20 }, () => hello).join(' ')}
        </div>
      </div>
    </div>
  );
};

const LoginTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '6px',
  },
}));

const LoginButton = styled(Button)(() => ({
  paddingBlock: '8px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  borderRadius: '6px',
}));

const ThirdPartyLoginButton: FC<{ icon: string; className?: string; children: ReactNode }> = ({
  icon,
  children,
  className,
}) => {
  return (
    <button
      className={clsx(
        'flex gap-2 rounded-md bg-black px-4 py-3 font-bold transition-opacity hover:opacity-90 active:opacity-80',
        className
      )}
    >
      <img src={icon} alt="Google logo" className="h-6 w-6" />
      <div className="flex-grow">{children}</div>
      <div className="h-6 w-6"></div>
    </button>
  );
};

const Divider: FC = () => {
  return (
    <div className="relative flex flex-row items-center py-4">
      <div className="h-1 flex-grow bg-white opacity-10"></div>
      <div className="flex-shrink-0 px-2">Or Sign up With</div>
      <div className="h-1 flex-grow bg-white opacity-10"></div>
    </div>
  );
};

const LoginPanel: FC = () => {
  return (
    <>
      <h1 className="mb-2 text-3xl font-bold leading-none">
        Continue to <span className="font-belanosima text-[1.1em]">Lingoodia</span>
      </h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <LoginTextField
          name="username"
          variant="outlined"
          label="Username, email & phone number"
          autoComplete="username"
          type="text"
        />
        <LoginTextField
          name="password"
          variant="outlined"
          label="Password"
          autoComplete="current-password"
          type="password"
        />
        <a
          href="#"
          className="mb-2 w-fit self-end text-right text-sm text-gray-300"
          onClick={(e) => e.preventDefault()}
        >
          Forgot password?
        </a>
        <LoginButton variant="contained" fullWidth disableElevation>
          Login
        </LoginButton>
      </form>
      <Divider />
      <div className="flex flex-col gap-3">
        <ThirdPartyLoginButton className="bg-white text-gray-700" icon={googleLogo}>
          Sign up with Google
        </ThirdPartyLoginButton>
        <ThirdPartyLoginButton className="bg-black text-white" icon={appleLogo}>
          Sign up with Apple
        </ThirdPartyLoginButton>
      </div>
    </>
  );
};

const Page: FC = () => {
  return (
    <main className="flex h-full w-full flex-row">
      <Sidebar className="hidden h-full min-w-[100px] basis-1/4 flex-col lg:flex" />
      <div className="flex-grow overflow-auto">
        <div className="mx-auto flex min-h-full w-[400px] max-w-full flex-col items-stretch justify-center gap-3 px-4 py-8">
          <HeaderPadding />
          <LoginPanel />
          <NavBarPadding />
        </div>
      </div>
    </main>
  );
};

export default Page;

const hello =
  // cspell:disable-next-line
  'Hello 你好 Hola Bonjour Hallo こんにちは مرحبا Здравствуйте Olá नमस्ते Ciao 안녕하세요 Hallo Γειά σας Merhaba שלום Hej Hei Hej Hei Cześć Szia สวัสดี Xin chào Kamusta Halo Selamat sejahtera سلام Привіт Ahoj Ahoj Здравейте Salut Прывітанне Bok Здраво Здраво Živijo Tere Sveiki Sveiki Halló Bongu Helo Dia dhuit Hola Kaixo Ola Përshëndetje Բարև გამარჯობა Сайн уу? नमस्ते Habari ሰላም Salaam alaykum Sannu Ndewo Ẹ n lẹ Salama Bonjou';
