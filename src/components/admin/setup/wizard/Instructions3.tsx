import Image from 'next/image';
import React from 'react';

const Instructions3 = ({
  showPreviousBtn = true,
  onActionBtn,
  tokenError,
  airtableToken,
  setAirtableToken,
}: {
  onActionBtn: any;
  showPreviousBtn?: boolean;
  tokenError: string;
  airtableToken: string;
  setAirtableToken: any;
}) => (
  <>
    <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`AirTable Setup`}</p>
    <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
      {`We use AirTable as a database for storing extension data, authentication with CommerceFlow and other useful information that CommerceFlow needs to run.`}
    </p>
    <ol className='list-decimal list-inside mb-10 mt-10 text-sm'>
      <li className='pb-2 text-sm'>
        Create an AirTable account ({`If you don't have one`}). You can create an account here
        <div className='w-full text-center mt-3 mb-2'>
          <a target='_blank' href='https://airtable.com/signup' className='text-blue-300'>
            https://airtable.com/signup
          </a>
        </div>
      </li>

      <li className='pb-2 text-sm'>
        Create a new empty AirTable base called CommerceFlow. We want to restrict token access to only this base in the next step.
        <div className='w-full text-center mt-3 mb-2'>
          <a target='_blank' href='https://www.airtable.com/guides/build/create-a-base' className='text-blue-300'>
            https://www.airtable.com/guides/build/create-a-base
          </a>
        </div>
      </li>

      <li className='pb-2 text-sm'>
        Create a personal access token with access to only the base you created in the previous step with the following scopes
        <div className='w-full flex justify-center'>
          <ul>
            <li>data.records:read</li>
            <li>data.records:write</li>
            <li>schema.bases:read</li>
            <li>schema.bases:write</li>
            <li>webhook:manage</li>
          </ul>
        </div>
        <div className='w-full text-center mt-3 mb-2'>
          <a target='_blank' href='https://airtable.com/developers/web/guides/personal-access-tokens' className='text-blue-300'>
            https://airtable.com/developers/web/guides/personal-access-tokens
          </a>
        </div>
      </li>
    </ol>
    <div className='mb-4'>
      <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Enter Airtable Token <br />
        <span className='text-red-300 text-xs text-center flex'>{tokenError}</span>
      </label>
      <input
        type='text'
        name='name'
        id='name'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
        placeholder='e.g. xxxxx'
        onChange={(e) => setAirtableToken(e.target.value)}
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
        disabled={airtableToken === ''}
        onClick={() => onActionBtn('next')}
        className={`text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 ${
          airtableToken === '' ? 'bg-[#ccc]' : 'bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50'
        }`}
      >
        Continue
      </button>
    </div>
  </>
);

export default Instructions3;
