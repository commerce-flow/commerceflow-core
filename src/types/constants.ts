export enum SupportedPlatforms {
  Netlify = 'netlify',
  Vercel = 'vercel',
}

export const SYSTEM_SECRETS = {
  GITHUB_TOKEN: 'GITHUB_TOKEN',
  AIRTABLE_TOKEN: 'AIRTABLE_TOKENS',
  PLATFORM_TOKEN: 'PLATFORM_TOKEN',
  PLATFORM_META: 'PLATFORM_META',
  APP_CONFIG: 'APP_CONFIG',
  WEBFLOW_TOKENS: 'WEBFLOW_TOKENS',
  VERCEL_TOKEN: 'VERCEL_TOKEN',
  NETLIFY_TOKEN: 'NETLIFY_TOKEN',
};

export const PAGE_ROUTES = {
  DASHBOARD: '/store',
  SIGNUP: '/auth/signup',
};
