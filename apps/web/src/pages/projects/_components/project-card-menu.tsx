import ContentCopy from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, Menu, MenuProps } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { FC, MouseEvent, ReactNode, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const HotKey: FC = () => {
  useHotkeys('meta+backspace', () => {
    console.log('meta+backspace pressed');
  });
  useHotkeys('meta+d', (e) => {
    e.preventDefault();
    console.log('meta+d pressed');
  });
  useHotkeys('meta+e', (e) => {
    e.preventDefault();
    console.log('meta+e pressed');
  });
  return null;
};

const Key: FC<{ children?: ReactNode }> = ({ children }) => {
  return <span className="font-inter inline-block w-[1em] text-left">{children}</span>;
};

const ShortCut: FC<{ keys: string[]; className?: string }> = ({ keys, className }) => {
  return (
    <Typography variant="body2" className={className}>
      {keys.map((key, index) => (
        <>
          <Key key={index}>{key}</Key>{' '}
        </>
      ))}
    </Typography>
  );
};

const MenuItemWithShortCut: FC<{
  icon: ReactNode;
  label: string;
  shortCut: string[];
  className?: string;
}> = ({ icon, label, shortCut, className }) => {
  return (
    <MenuItem className={className}>
      <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
      <ShortCut keys={shortCut} />
    </MenuItem>
  );
};

export const ProjectCardContextMenu: FC<{
  anchorEl: Element | null;
  open: boolean;
  onClose: MenuProps['onClose'];
}> = ({ anchorEl, open, onClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      transitionDuration={150}
      sx={{
        '& .MuiPaper-root': {
          width: 260,
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <HotKey />
      <MenuItemWithShortCut
        icon={<ContentCopy fontSize="small" />}
        label="Duplicate"
        shortCut={['⌘', 'D']}
      />
      <MenuItemWithShortCut
        icon={<IosShareIcon fontSize="small" />}
        label="Export"
        shortCut={['⌘', 'E']}
      />
      <Divider />
      <MenuItemWithShortCut
        icon={<DeleteIcon fontSize="small" />}
        label="Delete"
        shortCut={['⌘', '⌫']}
        className="text-red-300"
      />
    </Menu>
  );
};

export const MoreButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const contextMenuOpen = Boolean(anchorEl);
  const handleClickMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button startIcon={<MoreHorizIcon />} className="px-4" size="small" onClick={handleClickMore}>
        More
      </Button>
      <ProjectCardContextMenu
        anchorEl={anchorEl}
        open={contextMenuOpen}
        onClose={handleCloseMenu}
      />
    </>
  );
};
