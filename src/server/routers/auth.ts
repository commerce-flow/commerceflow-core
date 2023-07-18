import { z } from 'zod';
import { procedure, router } from '../trpc';
import * as authCtrl from '../controllers/auth';

export const authRouter = router({
  signup: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        fullName: z.string(),
      })
    )
    .mutation(authCtrl.signup),
  login: procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(authCtrl.login),
  clientEnvs: procedure.query(authCtrl.getClientEnvs),
  requestWebflowOauthToken: procedure
    .input(
      z.object({
        authCode: z.string(),
      })
    )
    .mutation(authCtrl.requestWebflowOauthAccessToken),
});

export default authRouter;
