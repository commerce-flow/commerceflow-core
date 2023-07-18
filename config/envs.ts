import { SYSTEM_SECRETS, SupportedPlatforms } from '../src/types/constants';

export interface EnvType {
  webflow: () => {
    clientId: string;
    secret: string;
    apiUrl: string;
  };
  platfrom: () => SupportedPlatforms | undefined;
  githubPatToken: string;
  airtable: () => {
    token: string;
    baseId: string;
    workspaceId: string;
    baseUrl: string;
  };
  appConfig: () => Record<string, unknown>;
  netlifyToken?: string;
  vercelToken?: string;
  url: string; // Netlify base url for site
}

const currentPlatform = (): SupportedPlatforms | undefined => {
  if (process.env.CM_PLATFORM == null) throw new Error('Platform variable not set');

  return (process.env.CM_PLATFORM?.toLowerCase() || '') === 'netlify' ? SupportedPlatforms.Netlify : SupportedPlatforms.Vercel;
};

const parseWebflowTokens = () => {
  const webflowTokens = process.env[SYSTEM_SECRETS.WEBFLOW_TOKENS] as string;
  if (webflowTokens == null) {
    throw new Error('Missing webflow tokens');
  }
  const { clientId = '', secret = '' } = JSON.parse(webflowTokens);
  if (clientId == '' || secret == '') {
    throw new Error('Missing webflow tokens');
  }

  return {
    apiUrl: 'https://api.webflow.com',
    clientId,
    secret,
  };
};

const parseAirtableTokens = () => {
  const airtableTokens = process.env[SYSTEM_SECRETS.AIRTABLE_TOKEN] as string;
  if (airtableTokens == null) {
    throw new Error('Missing airtable tokens');
  }
  const { token = '', baseId = '', workspaceId = '' } = JSON.parse(airtableTokens);
  if (token == '' || workspaceId == '') {
    throw new Error('Missing airtable tokens');
  }

  return {
    baseUrl: 'https://api.airtable.com/v0/',
    token,
    baseId,
    workspaceId,
  };
};

const parseAppConfig = (): Record<string, unknown> => {
  const cfg = process.env[SYSTEM_SECRETS.APP_CONFIG] as string;
  if (cfg && typeof cfg === 'string') {
    return JSON.parse(cfg);
  }

  return {};
};

const envs: EnvType = {
  webflow: parseWebflowTokens,
  githubPatToken: process.env[SYSTEM_SECRETS.GITHUB_TOKEN] as string,
  airtable: parseAirtableTokens,
  vercelToken: process.env[SYSTEM_SECRETS.VERCEL_TOKEN],
  netlifyToken: process.env[SYSTEM_SECRETS.NETLIFY_TOKEN],
  platfrom: currentPlatform,
  appConfig: parseAppConfig,
  url: process.env.URL as string,
};

export default envs;
