import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { logout } from '@firebase';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/');
  }, []);
  return false;
};

export default LogoutPage;
