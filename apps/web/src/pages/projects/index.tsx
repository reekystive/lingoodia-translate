import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { FC, ReactNode, useRef } from 'react';
import { HeaderPadding, NavBarPadding } from '../../components/padding.tsx';
import { lorems, titles } from '../../utils/lorem.ts';
import { MoreButton } from './_components/project-card-menu.tsx';

const useRandomDate = () => {
  const randomDate = useRef(
    dayjs()
      .add(Math.floor(Math.random() * 100), 'day')
      .add(Math.floor(Math.random() * 24), 'hour')
      .add(Math.floor(Math.random() * 60), 'minute')
      .format('llll')
  );
  return randomDate.current;
};

const ProjectCard: FC<{ children?: ReactNode }> = () => {
  const randomDate = useRandomDate();
  return (
    <div className="h-full w-full">
      <Card variant="outlined" className="flex h-full flex-col rounded-md">
        <CardContent className="flex-grow">
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {randomDate}
          </Typography>
          <Typography variant="h5" component="div">
            {titles.chinese[0]}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Chinese <span className="font-inter">-&gt;</span> English
          </Typography>
          <Typography
            variant="body2"
            sx={{ whiteSpaceCollapse: 'preserve' }}
            className="line-clamp-5 text-ellipsis"
          >
            {lorems.chinese[0].trim()}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-row justify-between">
          <Button className="px-4" startIcon={<EditIcon />} size="small">
            Edit
          </Button>
          <Box>
            <MoreButton />
          </Box>
        </CardActions>
      </Card>
    </div>
  );
};

const Page: FC = () => {
  return (
    <main className="h-full w-full overflow-auto overscroll-contain">
      <HeaderPadding />
      <div className="mx-auto max-w-[1400px] px-2 py-2 lg:px-8 lg:py-6">
        <Typography variant="h5" className="mb-4 mt-16 px-4 text-left font-medium leading-none">
          Saved Projects
        </Typography>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <ProjectCard key={index} />
          ))}
        </div>
      </div>
      <NavBarPadding />
    </main>
  );
};

export default Page;
