import StorageAdapterFactory from '../../../internal/storage/factory';
import NetlifyService from '../../services/platforms/netlify.service';
import getPlatformService from '../../services/platforms/platform-factory';
import { Context } from '../../trpc';

export const verifyPlatformApiKey = ({ ctx }: { ctx: Context }) => {
  const platformSvc = getPlatformService(ctx.platform);
  return platformSvc.verifyApiKey();
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
  const airtableToken = JSON.parse(input.airtableToken);

  const storageAdp = StorageAdapterFactory.getStorage(airtableToken);
  const { baseId } = await storageAdp.init();

  airtableToken.baseId = baseId;
  const platformSvc = getPlatformService(ctx.platform);
  await platformSvc.createSystemSecrets({
    ...input,
    airtableToken: JSON.stringify(airtableToken),
  });
};
