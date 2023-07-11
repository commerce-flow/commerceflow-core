import '@/styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../types/trpc';
import { SessionProvider } from 'next-auth/react';
import AuthGuard from '../guards/AuthGuard';
import { useRouter } from 'next/router';

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <AuthGuard pathName={pathname}>
        <Component {...pageProps} />
      </AuthGuard>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
