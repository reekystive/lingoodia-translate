import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { usePromise } from 'react-use';
import reactLogo from '../assets/react.svg';
import { Button } from '../components/button.tsx';
import { HeaderPadding, NavBarPadding } from '../components/padding.tsx';
import { trpc } from '../server/trpc.ts';
import css from './index.module.scss';
import viteLogo from '/vite.svg';

const App: FC = () => {
  const [count, setCount] = useState(0);
  const mounted = usePromise();
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const list = await mounted(trpc.userList.query());
      setList(list);
    })().catch((e: unknown) => {
      console.error(e);
    });
  }, [mounted]);

  return (
    <main className="h-full w-full overflow-auto">
      <div className="flex min-h-full w-full flex-col items-center justify-center">
        <HeaderPadding />
        <div className="flex flex-row">
          <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className={classNames(css.logo, css.vue)} alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className={classNames(css.logo, css.react)} alt="React logo" />
          </a>
        </div>
        <h1 className="my-[0.5em] text-[3.2em] font-bold leading-[1.1]">Vite + React</h1>
        <div className="py-[2em] text-center">
          <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
          <p className="my-[1em]">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-[#888]">Click on the Vite and React logos to learn more</p>
        <h2 className="mt-[2em]">From tRPC Server</h2>
        <ul className="mt-4 grid grid-cols-6 gap-2">
          {list.map((item) => (
            <li className="border-[1px] border-slate-500 border-opacity-20 p-2" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <NavBarPadding />
      </div>
    </main>
  );
};

export default App;