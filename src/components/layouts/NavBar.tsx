import React from 'react';
import Image from 'next/image';

const NavBar = () => (
  <header className='bg-white border-gray-200 dark:bg-gray-900'>
    <div className='flex flex-wrap items-center justify-between mx-auto p-4'>
      <a href='#' className='flex items-center'>
        <Image src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='Flowbite Logo' width={16} height={16} />
        <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>CommerceFlow</span>
      </a>
      <div className='flex items-center md:order-2'>
        <button
          type='button'
          className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
          id='user-menu-button'
          aria-expanded='false'
          data-dropdown-toggle='user-dropdown'
          data-dropdown-placement='bottom'
        >
          <span className='sr-only'>Open user menu</span>
          <Image className='w-8 h-8 rounded-full' src='/docs/images/people/profile-picture-3.jpg' alt='user photo' width={8} height={8} />
        </button>

        <button
          data-collapse-toggle='mobile-menu-2'
          type='button'
          className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='mobile-menu-2'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
);

export default NavBar;
