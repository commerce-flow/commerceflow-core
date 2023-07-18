import React, { useEffect, useState } from 'react';
import { WelcomeInstruction, GithubSetup, AirtableSetup, NetlifyInstructions, VercelInstructions, WebflowSetup } from '../../../components/admin/setup/wizard';
import { PAGE_ROUTES, SupportedPlatforms } from '../../../types/constants';
import NetlifySetupModal from '../../../components/admin/setup/wizard/NetlifySetupModal';
import { trpc } from '../../../types/trpc';
import { NetlifyAccount, NetlifySite } from '../../../types/platforms/netlify';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
import SetupLayout from '../../../components/layouts/SetupLayout';

const AdminSetup = () => {
  const navigator = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [platform] = useState<SupportedPlatforms>(SupportedPlatforms.Netlify);
  const [githubToken, setGithubToken] = useState<string>('');
  const [airtable, setAirtableToken] = useState<{ token: string; workspaceId: string }>({ token: '', workspaceId: '' });
  const [platformApiKey, setPlatformApiKey] = useState('');
  const [defaultAccount, setDefaultAccount] = useState<NetlifyAccount>();
  const [showNetlifyModal, setShowNetlifyModal] = useState(false);
  const [platformData, setPlaformData] = useState<{
    accounts: NetlifyAccount[];
    sites: NetlifySite[];
  }>({
    accounts: [],
    sites: [],
  });
  const [webflowTokens, setWebflowTokens] = useState<{ clientId: string; secret: string }>({ clientId: '', secret: '' });

  const {
    refetch: verifyApiToken,
    isLoading: verifyApiTokenLoading,
    isFetching,
  } = trpc.platforms.verifyApiKey.useQuery({ apiKey: platformApiKey }, { enabled: false });
  const { refetch: netlifyAccounts } = trpc.platforms.fetchNetlifyAccounts.useQuery(undefined, { enabled: false });
  const { refetch: netlifySites } = trpc.platforms.fetchNetlifySites.useQuery(undefined, { enabled: false });

  const systemScMutation = trpc.platforms.createAllSystemSecrets.useMutation({
    onSuccess: () => {
      navigator.push(PAGE_ROUTES.SIGNUP);
    },
    onError: () => {},
  });

  useEffect(() => {
    (async () => {
      const [getAccounts, getSites] = [netlifyAccounts(), netlifySites()];

      setPlaformData({
        accounts: (await getAccounts).data || [],
        sites: (await getSites).data || [],
      });
    })();
  }, []);

  useEffect(() => {
    if (platformData.accounts.length === 1) {
      const defaultAccount = platformData.accounts[0];
      setDefaultAccount(defaultAccount);
    }
  }, [platformData.accounts]);

  const onActionBtn = async (btnState: 'next' | 'previous') => {
    if (btnState === 'next') {
      // github
      if (currentStep === 2) {
        const gToken = githubToken.trim();
        const isValid = /^github_pat_.*/g.test(gToken);

        if (!isValid) {
          swal({
            title: `Invalid github token!`,
            text: `Invalid access token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.`,
            icon: 'warning',
            dangerMode: true,
          });
          return;
        }
      }

      // airtable
      if (currentStep === 3) {
        const isValid = /^pat.*/g.test(airtable.token);

        if (!isValid) {
          swal({
            title: `Invalid airtable token!`,
            text: `Invalid personal access token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.`,
            icon: 'warning',
            dangerMode: true,
          });
          return;
        }
      }

      // Platform step
      if (currentStep === 4) {
        const resp = await verifyApiToken();
        if (!resp.data) {
          swal({
            title: `Invalid ${platform} key!`,
            text: `The key provided for ${platform} is invalid, please check and try again!`,
            icon: 'warning',
            dangerMode: true,
          });
          return;
        }
        setShowNetlifyModal(true);
      }

      if (currentStep + 1 <= steps.length - 1) {
        setCurrentStep(currentStep + 1);
        return;
      }
    }
    setCurrentStep(currentStep - 1);
  };

  const onNetlifySiteOptionsSelected = (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    systemScMutation.mutate({
      githubToken,
      airtableToken: JSON.stringify(airtable),
      platformToken: platformApiKey,
      platformSiteMeta: {
        accountId: data.get('account')?.toString() as string,
        siteId: data.get('site')?.toString() as string,
      },
      webflowTokens: JSON.stringify({
        clientId: webflowTokens.clientId,
        secret: webflowTokens.secret,
      }),
    });
  };

  const steps = [
    { component: <WelcomeInstruction platform={platform} onActionBtn={onActionBtn} showPreviousBtn={false} /> },
    { component: <WebflowSetup onActionBtn={onActionBtn} setWebfloTokens={setWebflowTokens} webflowTokens={webflowTokens} siteBaseUrl='localhost:3000' /> },
    { component: <GithubSetup onActionBtn={onActionBtn} setGithubToken={setGithubToken} githubToken={githubToken} /> },
    { component: <AirtableSetup onActionBtn={onActionBtn} airtable={airtable} setAirtableToken={setAirtableToken} /> },
    {
      component:
        platform === SupportedPlatforms.Netlify ? (
          <NetlifyInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            platformApiKey={platformApiKey}
            setPlatformApiKey={setPlatformApiKey}
            verifyApiKeyLoading={verifyApiTokenLoading && isFetching}
          />
        ) : (
          <VercelInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            platformApiKey={platformApiKey}
            setPlatformApiKey={setPlatformApiKey}
            verifyApiKeyLoading={verifyApiTokenLoading && isFetching}
          />
        ),
    },
  ];

  return (
    <>
      <NetlifySetupModal
        isOpen={showNetlifyModal}
        onClose={() => setShowNetlifyModal(false)}
        accounts={(platformData.accounts || []) as NetlifyAccount[]}
        sites={(platformData.sites || []) as NetlifySite[]}
        defaultAccount={defaultAccount}
        onNetlifySiteOptionsSelected={onNetlifySiteOptionsSelected}
        loading={systemScMutation.isLoading}
      />
      <SetupLayout>
        <div className='text-center'>{steps[currentStep].component}</div>
      </SetupLayout>
    </>
  );
};

export default AdminSetup;
