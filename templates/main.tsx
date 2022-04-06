import * as React from 'react';

import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logout } from '@firebase';
import { useRouter } from 'next/router';
interface Props {
  children: React.ReactNode;
}

const MainTemplate: React.FC<Props> = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) router.push('/auth/login');
  }, [user, loading]);

  console.log(user);

  return (
    <>
      <Head>
        <title>AutoChore</title>
        <meta name="description" content="Add your chores here!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {user && <h1>Welcome {user && user.email}</h1>}
        {children}
      </main>
    </>
  );
};

export default MainTemplate;
