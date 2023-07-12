// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { App } from 'octokit';

type Data = {
  name: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const pk = Buffer.from(process.env.GITHUB_PRIVATE_KEY as string, 'base64').toString();

  const gitApp = new App({
    appId: process.env.GITHUB_APP_ID as string,
    privateKey: pk,
  });
  // const octokit = await gitApp.getInstallationOctokit(38726416);

  // const resp = await octokit.request('GET /meta');
  const { data }: any = await gitApp.octokit.request('GET /app/installations');

  res.status(200).json({ name: 'John Doe' });
}
