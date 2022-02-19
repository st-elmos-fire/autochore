import { Toolbar, IconButton, Divider, List, ListItemButton, ListItemIcon, ListItemText, styled } from '@mui/material'
import MuiDrawer, { DrawerProps } from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { ListAlt, Task } from '@mui/icons-material';
import React from 'react'
import NavigationItem from '../navigation-item';

/* Prop Types */
export interface Props {
  /**
   * The toggle boolean to open/close the drawer
   **/
  open: boolean
  /**
   * The dispatch function to switch the view
   **/
  dispatch: (action: any) => void
  /**
   * The toggle function to open/close the drawer
   */
  toggleDrawer: () => void
  /**
   * How wide should the drawer be?
   */
  drawerWidth: number
}

interface StyledDrawerProps extends DrawerProps {
  drawerWidth?: number;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<StyledDrawerProps>(
  ({ theme, open, drawerWidth }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

/* Render component */
export const SideNavigation: React.FC<Props> = ({ open, dispatch, toggleDrawer, drawerWidth }: Props) => {

  return <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
      >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List>
      <NavigationItem dispatch={() => dispatch('VIEW')} icon={<ListAlt />} label="View chores list" />
      <NavigationItem dispatch={() => dispatch('ADD')} icon={<Task />} label="Add new chore" />
    </List>
  </Drawer>
}

export default SideNavigation
