import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Instructions1, Instructions2, Instructions3, NetlifyInstructions, VercelInstructions } from '../../../components/admin/setup/wizard';
import { SupportedPlatforms } from '../../../types/constants';
import NetlifySetupModal from '../../../components/admin/setup/wizard/NetlifySetupModal';
import { trpc } from '../../../types/trpc';
import { NetlifyAccount, NetlifySite } from '../../../types/platforms/netlify';
import swal from 'sweetalert';

const AdminSetup = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [platform] = useState<SupportedPlatforms>(SupportedPlatforms.Netlify);
  const [githubToken, setGithubToken] = useState<string>('');
  const [airtableToken, setAirtableToken] = useState<string>('');
  const [stepError, setStepError] = useState('');
  const [platformApiKey, setPlatformApiKey] = useState('');
  const [defaultAccount, setDefaultAccount] = useState<NetlifyAccount>();
  const [showNetlifyModal, setShowNetlifyModal] = useState(false);

  const {
    refetch: verifyApiToken,
    isLoading: verifyApiTokenLoading,
    isFetching,
  } = trpc.platforms.verifyApiKey.useQuery({ apiKey: platformApiKey }, { enabled: false });

  const [netlifyAccounts, netlifySites] = [trpc.platforms.fetchNetlifyAccounts.useQuery(), trpc.platforms.fetchNetlifySites.useQuery()];
  // [{ data: [] }, { data: [] }];
  // [trpc.platforms.fetchNetlifyAccounts.useQuery(), trpc.platforms.fetchNetlifySites.useQuery()];
  const systemScMutation = trpc.platforms.createAllSystemSecrets.useMutation();

  useEffect(() => {
    if (netlifyAccounts.data?.length === 1) {
      const defaultAccount = netlifyAccounts.data[0];
      setDefaultAccount(defaultAccount);
    }
  }, [netlifyAccounts]);

  const onActionBtn = async (btnState: 'next' | 'previous') => {
    setStepError('');
    if (btnState === 'next') {
      // github
      if (currentStep === 1) {
        const gToken = githubToken.trim();
        const isValid = /^github_pat_.*/g.test(gToken);

        if (!isValid) {
          setStepError(
            'Invalid github token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.'
          );
        }
      }

      // airtable
      if (currentStep === 2) {
        const aToken = airtableToken.trim();
        const isValid = /^pat.*/g.test(aToken);

        if (!isValid) {
          setStepError(
            'Invalid airtable token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.'
          );
        }
      }

      // Platform step
      if (currentStep === 3) {
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
      airtableToken,
      platformToken: platformApiKey,
      platformSiteMeta: {
        accountId: data.get('account')?.toString() as string,
        siteId: data.get('site')?.toString() as string,
      },
    });

    if (systemScMutation.isSuccess) {
      // TODO - Move to next step
    }
  };

  const steps = [
    { component: <Instructions1 platform={platform} onActionBtn={onActionBtn} showPreviousBtn={false} /> },
    { component: <Instructions2 onActionBtn={onActionBtn} setGithubToken={setGithubToken} githubToken={githubToken} tokenError={stepError} /> },
    { component: <Instructions3 onActionBtn={onActionBtn} tokenError={stepError} airtableToken={airtableToken} setAirtableToken={setAirtableToken} /> },
    {
      component:
        platform === SupportedPlatforms.Netlify ? (
          <NetlifyInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            tokenError={stepError}
            platformApiKey={platformApiKey}
            setPlatformApiKey={setPlatformApiKey}
            verifyApiKeyLoading={verifyApiTokenLoading && isFetching}
          />
        ) : (
          <VercelInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            tokenError={stepError}
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
        accounts={(netlifyAccounts?.data || []) as NetlifyAccount[]}
        sites={(netlifySites?.data || []) as NetlifySite[]}
        defaultAccount={defaultAccount}
        onNetlifySiteOptionsSelected={onNetlifySiteOptionsSelected}
        loading={systemScMutation.isLoading}
      />

      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <a className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <Image className='w-8 h-8 mr-2' src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg' alt='logo' width={10} height={10} />
            CommerceFlow
          </a>
          <div className='p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8 max-w-3xl w-full text-center'>
            {steps[currentStep].component}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSetup;
