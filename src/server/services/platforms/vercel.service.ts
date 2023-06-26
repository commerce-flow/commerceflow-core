import { SystemSecrets } from '../../../types/platforms/secrets';
import PlatformService from './base';

class VercelService implements PlatformService {
  createSystemSecrets(secrets: SystemSecrets): Promise<void> {
    throw new Error('Method not implemented.');
  }
  verifySystemSecretsExist(): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  verifyApiKey(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  storeSecret(key: string, value: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getSecret(key: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export default VercelService;
