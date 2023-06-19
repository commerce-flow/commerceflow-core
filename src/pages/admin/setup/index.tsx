import Image from 'next/image';
import { OAuthApp, Octokit, App } from 'octokit';
import { createAppAuth } from '@octokit/auth-app';
import React, { useEffect, useState } from 'react';
import { Instructions1, Instructions2, Instructions3, NetlifyInstructions, VercelInstructions } from '../../../components/admin/setup/wizard';
import { SupportedPlatforms } from '../../../types/constants';
import envs from '../../../../config/envs';
import axios from 'axios';

const AdminSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [platform, setPlatform] = useState<SupportedPlatforms>(SupportedPlatforms.Netlify);
  const [githubToken, setGithubToken] = useState('');
  const [airtableToken, setAirtableToken] = useState('');
  const [tokenError, setTokenError] = useState('');
  const [platformApiKey, setPlatformApiKey] = useState('');

  /* useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/hello');
        console.log({ data });
      } catch (e: any) {
        console.log(e, 'aaaaa');
      }
    })();
  }, []); */

  const onActionBtn = (btnState: 'next' | 'previous') => {
    setTokenError('');
    if (btnState === 'next') {
      if (currentStep === 1) {
        const gToken = githubToken.trim();
        const isValid = /^github_pat_.*/g.test(gToken);

        if (!isValid) {
          setTokenError(
            'Invalid github token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.'
          );
        }
      }
      if (currentStep === 2) {
        const aToken = airtableToken.trim();
        const isValid = /^pat.*/g.test(aToken);

        if (!isValid) {
          setTokenError(
            'Invalid airtable token provided. Please check the steps for creating the token or create an issue here for support https://github.com/commerce-flow/commerceflow-app/issues.'
          );
        }
      }

      if (currentStep + 1 > steps.length - 1) {
        return;
      }
      setCurrentStep(currentStep + 1);
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    { component: <Instructions1 platform={platform} onActionBtn={onActionBtn} showPreviousBtn={false} /> },
    { component: <Instructions2 onActionBtn={onActionBtn} setGithubToken={setGithubToken} githubToken={githubToken} tokenError={tokenError} /> },
    { component: <Instructions3 onActionBtn={onActionBtn} tokenError={tokenError} airtableToken={airtableToken} setAirtableToken={setAirtableToken} /> },
    {
      component:
        platform === SupportedPlatforms.Netlify ? (
          <NetlifyInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            tokenError={tokenError}
            platformApiKey={platformApiKey}
            setPlatformApiKey={setPlatformApiKey}
          />
        ) : (
          <VercelInstructions
            platform={platform}
            onActionBtn={onActionBtn}
            tokenError={tokenError}
            platformApiKey={platformApiKey}
            setPlatformApiKey={setPlatformApiKey}
          />
        ),
    },
  ];

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <Image className='w-8 h-8 mr-2' src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg' alt='logo' width={10} height={10} />
          CommerceFlow
        </a>
        <div className='p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8 max-w-3xl w-full'>
          {steps[currentStep].component}
        </div>
      </div>
    </section>
  );
};

export default AdminSetup;
