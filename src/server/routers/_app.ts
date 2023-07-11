import { router } from '../trpc';
import platformRoutes from './platforms';
import authRoutes from './auth';

export const appRouter = router({
  platforms: platformRoutes,
  auth: authRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
