import { SystemSecrets } from '../../../types/platforms/secrets';

interface PlatformService {
  createSystemSecrets(secrets: SystemSecrets): Promise<void>;
  storeSecret(key: string, value: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<void>;
  getSecret(key: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<string>;
  verifyApiKey(): Promise<boolean>;
  verifySystemSecretsExist(): Promise<{}>;
}

export default PlatformService;
