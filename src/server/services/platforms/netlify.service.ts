import axios, { AxiosInstance } from 'axios';
import PlatformService from './base';
import envs from '../../../../config/envs';
import { NetlifyAccount, NetlifyEnvVar, NetlifySite, NetlifyUser } from '../../../types/platforms/netlify';
import { SystemSecrets } from '../../../types/platforms/secrets';
import { SYSTEM_SECRETS } from '../../../types/constants';

class NetlifyService implements PlatformService {
  private client: AxiosInstance;
  private baseURL = 'https://api.netlify.com/api/v1/';

  private urls = {
    listSites: '/sites',
    accounts: '/accounts/',
    user: '/user',
  };

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Bearer ${envs.netlifyToken}`,
      },
    });
  }

  async createSystemSecrets(secrets: SystemSecrets): Promise<void> {
    const {
      airtableToken,
      githubToken,
      platformToken,
      platformSiteMeta: { accountId, siteId },
    } = secrets;
    const { GITHUB_TOKEN, AIRTABLE_TOKEN, PLATFORM_META, PLATFORM_TOKEN } = SYSTEM_SECRETS;

    await Promise.all([
      this.storeSecret(GITHUB_TOKEN, githubToken, { accountId, siteId }),
      this.storeSecret(AIRTABLE_TOKEN, airtableToken, { accountId, siteId }),
      this.storeSecret(PLATFORM_TOKEN, platformToken, { accountId, siteId }),
      this.storeSecret(PLATFORM_META, JSON.stringify({ accountId, siteId }), { accountId, siteId }),
    ]);
  }

  verifySystemSecretsExist(): Promise<{}> {
    throw new Error('Method not implemented.');
  }

  async verifyApiKey(): Promise<boolean> {
    const response = await this.client.get<NetlifyUser>(this.urls.user);
    return response.data?.id != null;
  }

  async listSites(): Promise<NetlifySite[]> {
    const response = await this.client.get<NetlifySite[]>(this.urls.listSites);
    return response.data;
  }

  async listAccounts(): Promise<NetlifyAccount[]> {
    const response = await this.client.get<NetlifyAccount[]>(this.urls.accounts);
    return response.data;
  }

  async storeSecret(key: string, value: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<void> {
    await this.client.post(`${this.urls.accounts}${accountId}/env?site_id=${siteId}`, {
      key,
      values: [
        {
          value,
        },
      ],
    });
  }

  async getSecret(key: string, { accountId, siteId }: { accountId: string; siteId: string }): Promise<string> {
    const response = await this.client.get<NetlifyEnvVar>(`${this.urls.accounts}${accountId}/env/${key}?site_id=${siteId}`);

    if (response.data.values.length < 1) throw new Error('Invalid key provided, no value was found for this key');

    return response.data.values[0].value;
  }
}

export default NetlifyService;
