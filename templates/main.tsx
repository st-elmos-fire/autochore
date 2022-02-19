import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Head from 'next/head';
import { useContext, useState } from 'react';
import { ModeContext } from '../pages';
import SideNavigation from '../components/side-navigation';
import AppHeader from '../components/app-header';

const drawerWidth: number = 240;

const mdTheme = createTheme();
interface Props {
  children: React.ReactNode;
}

const MainTemplate: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const { dispatch } = useContext(ModeContext);

  const toggleDrawer = () => setOpen(!open);

  return (
    <ThemeProvider theme={mdTheme}>
      <Head>
        <title>AutoChore</title>
        <meta name="description" content="Add your chores here!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader
          open={open}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <SideNavigation
          open={open}
          dispatch={dispatch}
          toggleDrawer={toggleDrawer}
          drawerWidth={drawerWidth}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default MainTemplate;
