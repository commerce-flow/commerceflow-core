import { initTRPC, type inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
import envs from '../../config/envs';

export const createContext = async (opts: CreateNextContextOptions) => {
  const session = await getSession({ req: opts.req });
  const platform = envs.platfrom();
  return {
    session,
    platform,
  };
};
export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
