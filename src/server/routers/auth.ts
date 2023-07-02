import { z } from 'zod';
import { procedure, router } from '../trpc';
import * as platfromsCtrl from '../controllers/platforms';

export const authRouter = router({
  signup: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        fullName: z.string(),
      })
    )
    .mutation(platfromsCtrl.createSystemSecrets),
  login: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(platfromsCtrl.createSystemSecrets),
});

export default authRouter;
