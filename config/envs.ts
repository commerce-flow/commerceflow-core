interface EnvType {
  webflow: {
    webflowClientId: string;
    webflowAuthUrl: string;
  };
  githubPatToken: string;
  airtableToken: string;
  netlifyToken?: string;
  vercelToken?: string;
}

const envs: EnvType = {
  webflow: {
    webflowClientId: process.env.WEBFLOW_CLIENT_ID as string,
    webflowAuthUrl: process.env.WEBFLOW_AUTH_URL as string,
  },
  githubPatToken: process.env.GITHUB_PAT_TOKEN as string,
  airtableToken: process.env.AIRTABLE_PAT_TOKEN as string,
  vercelToken: process.env.VERCEL_TOKEN,
  netlifyToken: process.env.NETLIFY_TOKEN,
};

export default envs;
