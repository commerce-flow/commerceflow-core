import React from 'react';

const WebfloSetup = ({
  showPreviousBtn = true,
  onActionBtn,
  webflowTokens,
  setWebfloTokens,
  siteBaseUrl,
}: {
  onActionBtn: any;
  showPreviousBtn?: boolean;
  webflowTokens: { clientId: string; secret: string };
  setWebfloTokens: any;
  siteBaseUrl: string;
}) => {
  return (
    <>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`Webflow Setup`}</p>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
        {`Commerceflow needs to integrate with webflow so extensions can work with your webflow online store. Using this integration Commerceflow will be able to automatically work with your store data and webflow CMS.`}
      </p>
      <ol className='list-decimal list-inside mb-10 mt-6 text-sm text-left'>
        <li className='pb-2 text-sm'>
          You should already have a webflow account. If not, create one here.
          <div className='w-full text-center mt-3 mb-2'>
            <a target='_blank' href='https://webflow.com/dashboard/signup' className='text-blue-300'>
              https://webflow.com/dashboard/signup
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>
          Follow these instructions to register Commerceflow as an app. You must add the url in the next step as the redirect URL for the CommerceFlow app.
          <div className='w-full text-center mb-2'>
            <a target='_blank' href='https://docs.developers.webflow.com/docs/oauth#app-registration' className='text-blue-300'>
              https://docs.developers.webflow.com/docs/oauth#app-registration
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>
          Please add the CommerceFlow url below as the redirect url when registering the app. This is a required step for the integration to work
          <div className='w-full flex justify-center mt-2'>
            <a target='_blank' href={siteBaseUrl} className='text-blue-300'>
              {siteBaseUrl}
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>Copy the Client ID and Client Secret provided by Webflow and paste in the boxes below</li>
      </ol>

      <div className='mb-4 text-left flex w-full space-x-4'>
        <div className='flex flex-col flex-1'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Client ID <br />
          </label>
          <input
            type='text'
            name='id'
            id='webflowId'
            defaultValue={webflowTokens.clientId}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='e.g. xxxxx'
            onChange={(e) => setWebfloTokens({ ...webflowTokens, clientId: e.target.value })}
          />
        </div>
        <div className='flex flex-col flex-1'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Client Secret <br />
          </label>
          <input
            type='text'
            name='secret'
            id='webflowSecret'
            defaultValue={webflowTokens.secret}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='e.g. xxxxx'
            onChange={(e) => setWebfloTokens({ ...webflowTokens, secret: e.target.value })}
          />
        </div>
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
          disabled={webflowTokens.clientId === '' && webflowTokens.secret === ''}
          onClick={() => onActionBtn('next')}
          className={`text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 ${
            webflowTokens.clientId === '' || webflowTokens.secret === ''
              ? 'bg-[#ccc]'
              : 'bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50'
          }`}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default WebfloSetup;
