import React from 'react';

const AirtableSetup = ({
  showPreviousBtn = true,
  onActionBtn,
  airtable,
  setAirtableToken,
}: {
  onActionBtn: any;
  showPreviousBtn?: boolean;
  airtable: { token: string; workspaceId: string };
  setAirtableToken: any;
}) => {
  return (
    <>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`AirTable Setup`}</p>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
        {`We use AirTable as a database for storing extension data, authentication with CommerceFlow and other useful information that CommerceFlow needs to run.`}
      </p>
      <ol className='list-decimal list-inside mb-10 mt-6 text-sm text-left'>
        <li className='pb-2 text-sm'>
          Create an AirTable account ({`If you don't have one`}). You can create an account here
          <div className='w-full text-center mt-3 mb-2'>
            <a target='_blank' href='https://airtable.com/signup' className='text-blue-300'>
              https://airtable.com/signup
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>
          You can create a new workspace or use an existing one. Then get the workspaceId and paste in the box below
          <div className='w-full text-center mb-2'>
            <a target='_blank' href='https://support.airtable.com/docs/finding-airtable-ids#finding-workspace-ids' className='text-blue-300'>
              https://support.airtable.com/docs/finding-airtable-ids#finding-workspace-ids
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>
          Create a personal access token with access to only the base you created in the previous step with the following scopes
          <div className='w-full flex justify-center mt-2'>
            <div className='grid grid-cols-3 gap-3 font-bold'>
              <div>data.records:read</div>
              <div>data.records:write</div>
              <div>schema.bases:read</div>
              <div>schema.bases:write</div>
              <div>webhook:manage</div>
            </div>
          </div>
          <div className='w-full text-center mt-3 mb-2'>
            <a target='_blank' href='https://airtable.com/developers/web/guides/personal-access-tokens' className='text-blue-300'>
              https://airtable.com/developers/web/guides/personal-access-tokens
            </a>
          </div>
        </li>
      </ol>

      <div className='mb-4 text-left flex w-full space-x-4'>
        <div className='flex flex-col flex-1'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Airtable PAT Token <br />
          </label>
          <input
            type='text'
            name='token'
            id='token'
            defaultValue={airtable.token}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='e.g. xxxxx'
            onChange={(e) => setAirtableToken({ ...airtable, token: e.target.value })}
          />
        </div>
        <div className='flex flex-col flex-1'>
          <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Airtable Workspace Id <br />
          </label>
          <input
            type='text'
            name='workspaceId'
            id='workspaceId'
            defaultValue={airtable.workspaceId}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='e.g. xxxxx'
            onChange={(e) => setAirtableToken({ ...airtable, workspaceId: e.target.value })}
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
          disabled={airtable.token === '' && airtable.workspaceId === ''}
          onClick={() => onActionBtn('next')}
          className={`text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 ${
            airtable.token === '' || airtable.workspaceId === '' ? 'bg-[#ccc]' : 'bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50'
          }`}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default AirtableSetup;
