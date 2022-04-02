import * as React from 'react';

import Head from 'next/head';
import { useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const MainTemplate: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <Head>
        <title>AutoChore</title>
        <meta name="description" content="Add your chores here!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default MainTemplate;
