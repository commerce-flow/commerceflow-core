import { SystemSecrets } from '../../../types/platforms/secrets';
import NetlifyService from '../../services/platforms/netlify.service';
import getPlatformService from '../../services/platforms/platform-factory';
import { Context } from '../../trpc';

export const verifyPlatformApiKey = ({ ctx }: { ctx: Context }) => {
  const platformSvc = getPlatformService(ctx.platform);
  return platformSvc.verifyApiKey();
  // return { isLoading: false, data: {} };
};

export const fetchNetlifyAccounts = () => {
  const netlifySvc = new NetlifyService();
  return netlifySvc.listAccounts();
};

export const fetchNetlifySites = () => {
  const netlifySvc = new NetlifyService();
  return netlifySvc.listSites();
};

export const createSystemSecrets = async ({ ctx, input }: any) => {
  const platformSvc = getPlatformService(ctx.platform);
  await platformSvc.createSystemSecrets(input);
};

export const verifySystemSecretsExist = () => {};

export const createSecret = () => {};

export const getSecret = () => {};
