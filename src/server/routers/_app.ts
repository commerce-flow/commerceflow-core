import { z } from 'zod';
import { procedure, router } from '../trpc';
import platformRoutes from './platforms';

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  platforms: platformRoutes,
});

// export type definition of API
export type AppRouter = typeof appRouter;
