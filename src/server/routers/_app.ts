import { z } from 'zod';
import { procedure, router } from '../trpc';
import platformRoutes from './platforms';

export const appRouter = router({
  platforms: platformRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
