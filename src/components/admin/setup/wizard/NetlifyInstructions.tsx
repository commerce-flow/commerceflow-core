import React from 'react';
import SpinnerIcon from '../../../icons/SpinnerIcon';

const NetlifyInstructions = ({
  platform,
  showPreviousBtn = true,
  onActionBtn,
  platformApiKey,
  setPlatformApiKey,
  verifyApiKeyLoading = false,
}: {
  platform: string;
  onActionBtn: any;
  platformApiKey: string;
  setPlatformApiKey: any;
  verifyApiKeyLoading: boolean;
  showPreviousBtn?: boolean;
}) => {
  return (
    <>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
        <span className='capitalize'>{platform}</span>
        {` Setup`}
      </p>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
        {`CommerceFlow will handle updates, app versions among other things. Also your Airtable and Github keys will not be used or stored outside your app, this step is to create an API key for ${platform} that will help CommerceFlow handle updates, manage your keys without storing them etc.`}
      </p>

      <ol className='list-decimal list-inside mb-10 mt-10 text-sm text-left'>
        <li className='pb-2 text-sm'>
          Create a personal access token
          <div className='w-full text-center mt-4 mb-2'>
            <a target='_blank' href='https://docs.netlify.com/cli/get-started/#obtain-a-token-in-the-netlify-ui' className='text-blue-300'>
              https://docs.netlify.com/cli/get-started/#obtain-a-token-in-the-netlify-ui
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>Copy the token and paste it in the box below. Click continue to complete your setup</li>

        <li className='pb-2 mb-4 text-sm'>
          Note that you must revoke the access token if you remove or stop using CommerceFlow. You can delete it here:
          <div className='w-full text-center mt-2'>
            <a target='_blank' href='https://docs.netlify.com/cli/get-started/#cancel-access-tokens' className='text-blue-300'>
              {' '}
              https://docs.netlify.com/cli/get-started/#cancel-access-tokens
            </a>
          </div>
        </li>
      </ol>

      <div className='mb-4'>
        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left'>
          Enter <span className='capitalize'>{platform}</span> Token <br />
        </label>
        <input
          type='text'
          name='name'
          id='name'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
          placeholder='e.g. xxxxx'
          defaultValue={platformApiKey}
          onChange={(e) => setPlatformApiKey(e.target.value)}
        />
      </div>
      <div className='flex justify-between'>
        <button
          type='button'
          style={{ visibility: showPreviousBtn === true ? 'visible' : 'hidden' }}
          onClick={() => onActionBtn('previous')}
          className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-2 mb-2 inline-flex'
        >
          Back
        </button>

        <button
          type='button'
          disabled={platformApiKey === ''}
          onClick={() => onActionBtn('next')}
          className={`text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 ${
            platformApiKey === '' ? 'bg-[#ccc]' : 'bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50'
          }`}
        >
          {verifyApiKeyLoading ? <SpinnerIcon /> : `Continue`}
        </button>
      </div>
    </>
  );
};

export default NetlifyInstructions;
