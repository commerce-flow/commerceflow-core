import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { PAGE_ROUTES } from '../types/constants';

const unprotectedRoutes: string[] = [PAGE_ROUTES.LOGIN, PAGE_ROUTES.SIGNUP];

const AuthGuard = ({ children, pathName }: PropsWithChildren<{ pathName: string }>) => {
  const { data: session, status } = useSession();
  const navigator = useRouter();

  useEffect(() => {
    if (session?.user && unprotectedRoutes.includes(pathName)) {
      navigator.push(PAGE_ROUTES.DASHBOARD);
      return;
    }

    if (!session?.user) {
      navigator.push(PAGE_ROUTES.LOGIN);
      return;
    }
  }, [session?.user]);

  if (status === 'loading') {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
