import '@/styles/globals.css';
import type { AppProps, AppType } from 'next/app';
import { trpc } from '../types/trpc';

const App: AppType = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
