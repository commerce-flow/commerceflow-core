import { SupportedPlatforms } from '../src/types/constants';

interface EnvType {
  webflow: {
    webflowClientId: string;
    webflowAuthUrl: string;
  };
  platfrom: SupportedPlatforms | undefined;
  githubPatToken: string;
  airtableToken: string;
  netlifyToken?: string;
  vercelToken?: string;
}

const currentPlatform = (): SupportedPlatforms | undefined => {
  if (process.env.CM_PLATFORM == null) throw new Error('Platform variable not set');

  return (process.env.CM_PLATFORM?.toLowerCase() || '') === 'netlify' ? SupportedPlatforms.Netlify : SupportedPlatforms.Vercel;
};

const envs: EnvType = {
  webflow: {
    webflowClientId: process.env.WEBFLOW_CLIENT_ID as string,
    webflowAuthUrl: process.env.WEBFLOW_AUTH_URL as string,
  },
  githubPatToken: process.env.GITHUB_PAT_TOKEN as string,
  airtableToken: process.env.AIRTABLE_PAT_TOKEN as string,
  vercelToken: process.env.VERCEL_TOKEN,
  netlifyToken: process.env.NETLIFY_TOKEN,
  platfrom: currentPlatform(),
};

export default envs;
