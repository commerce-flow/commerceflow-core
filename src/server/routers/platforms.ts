import { z } from 'zod';
import { procedure, router } from '../trpc';
import * as platfromsCtrl from '../controllers/platforms';

export const platformsRouter = router({
  verifyApiKey: procedure
    .input(
      z.object({
        apiKey: z.string(),
      })
    )
    .query(platfromsCtrl.verifyPlatformApiKey),
  fetchNetlifyAccounts: procedure.query(platfromsCtrl.fetchNetlifyAccounts),
  fetchNetlifySites: procedure.query(platfromsCtrl.fetchNetlifySites),
  createAllSystemSecrets: procedure
    .input(
      z.object({
        airtableToken: z.string(),
        githubToken: z.string(),
        platformToken: z.string(),
        platformSiteMeta: z.object({
          siteId: z.string(),
          accountId: z.string(),
        }),
      })
    )
    .mutation(platfromsCtrl.createSystemSecrets),
});

export default platformsRouter;
