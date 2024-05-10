import { FC } from 'react';
import { Link } from '../../router.ts';

const projects = ['summon-untold', 'burst-shopworn', 'glazier-dashing'];

const Page: FC = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center gap-2">
      {projects.map((project) => (
        <div key={project} className="rounded-md bg-white bg-opacity-10">
          <Link to="/projects/:slug" params={{ slug: project }} className="block p-4">
            {project}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
