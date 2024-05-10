import { FC } from 'react';
import { useParams } from '../../router.ts';

const Page: FC = () => {
  const { slug } = useParams('/projects/:slug');
  return <div className="flex h-full min-h-screen w-full items-center justify-center">{slug}</div>;
};

export default Page;
