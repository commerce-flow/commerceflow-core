import React, { PropsWithChildren } from 'react';
import Image from 'next/image';

const SetupLayout = ({ children }: PropsWithChildren<{}>) => (
  <section className='bg-gray-50 dark:bg-gray-900'>
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <a className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
        <Image className='w-8 h-8 mr-2' src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg' alt='logo' width={10} height={10} />
        CommerceFlow
      </a>
      <div className='p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8 max-w-3xl w-full overflow-y-auto'>
        {children}
      </div>
    </div>
  </section>
);

export default SetupLayout;
