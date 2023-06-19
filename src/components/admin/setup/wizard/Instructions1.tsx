import React from 'react';
import { SupportedPlatforms } from '../../../../types/constants';

const Instructions1 = ({ platform, showPreviousBtn = true, onActionBtn }: { platform: SupportedPlatforms; onActionBtn: any; showPreviousBtn?: boolean }) => (
  <>
    <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`Welcome to CommerceFlow.`}</p>
    <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`Before setting up your app, we need to setup some tools. We will provide instructions on setting up each tool and how to obtain an Access Key (API key in technical terms) that CommerceFlow will use in storing and managing your data. This is only a one time setup which you will not need to do again. The tools we will be setting up are:`}</p>
    <ol className='list-decimal list-inside mb-10 mt-10'>
      <li className='pb-2'>Github (For storing your very own custom extensions)</li>
      <li className='pb-2'>Airtable (For storing your extension and app data)</li>
      <li>
        <span style={{ textTransform: 'capitalize' }}>{platform}</span> API key
      </li>
    </ol>
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
        onClick={() => onActionBtn('next')}
        className='text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2'
      >
        Continue
      </button>
    </div>
  </>
);

export default Instructions1;
