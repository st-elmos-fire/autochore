import { Toolbar, IconButton, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'

/* Prop Types */
export interface Props {
  /**
   * A boolean to open/close the drawer
   */
  open: boolean
  /**
   * The function to open/close the drawer
   */
  toggleDrawer: () => void
  /**
   * How wide should the drawer be?
   */
   drawerWidth?: number;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth?: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/* Render component */
export const AppHeader: React.FC<Props> = ({ open, toggleDrawer, drawerWidth }: Props) =>
<AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
  <Toolbar sx={{pr: '24px'}}>
    <IconButton edge="start" color="inherit" aria-label="open drawer"
      onClick={toggleDrawer}
      sx={{
        marginRight: '36px',
        ...(open && { display: 'none' }),
      }}
      >
      <MenuIcon />
    </IconButton>
    <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
      Chores CMS
    </Typography>
  </Toolbar>
</AppBar>

export default AppHeader
