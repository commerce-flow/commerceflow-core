import '@/styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../types/trpc';
import { SessionProvider } from 'next-auth/react';
import AuthGuard from '../guards/AuthGuard';
import { useRouter } from 'next/router';
import Head from 'next/head';

const App: AppType = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Powerful e-Commerce Extensions for building amazing Webflow stores</title>
      </Head>
      <AuthGuard pathName={pathname}>
        <Component {...pageProps} />
      </AuthGuard>
    </SessionProvider>
  );
};

export default trpc.withTRPC(App);
