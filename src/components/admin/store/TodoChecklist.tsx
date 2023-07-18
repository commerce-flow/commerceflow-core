import React from 'react';
// import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';

interface Props {
  webflowClientID: string;
}

const TodoChecklist = ({ webflowClientID }: Props) => {
  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800 xl:mb-0'>
      <div className='flow-root'>
        <h3 className='text-xl font-semibold dark:text-whit mb-6'>Next Steps Checklist</h3>

        <div className='divide-y divide-gray-200 dark:divide-gray-700'>
          <div className='flex items-center justify-between py-4'>
            <BiCircle className='w-8 h-8 mr-6' />

            <div className='flex flex-col flex-grow'>
              <div className='text-lg font-semibold text-gray-900 dark:text-white'>Add Webflow site</div>
              <div className='text-base font-normal text-gray-500 dark:text-gray-400 flex items-center'>
                Select the webflow site you wish to work with.
                <div className='ml-2'>
                  <a
                    href={`https://webflow.com/oauth/authorize?client_id=${webflowClientID}&response_type=code`}
                    className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                  >
                    Start
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-center justify-between py-4'>
            <BiCircle className='w-8 h-8 mr-6' />
            {/* <AiFillCheckCircle className='w-8 h-8 mr-6' /> */}
            <div className='flex flex-col flex-grow'>
              <div className='text-lg font-semibold text-gray-900 dark:text-white'>Add Extension</div>
              <div className='text-base font-normal text-gray-500 dark:text-gray-400 flex items-center'>
                Install your first extension
                <div className='ml-2 flex'>
                  <button className='text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>

          {''}
        </div>
      </div>
    </div>
  );
};

export default TodoChecklist;
