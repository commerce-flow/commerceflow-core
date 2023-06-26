import React from 'react';

const SideMenu = () => (
  <aside className=' top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0' aria-label='Sidenav'>
    <div className='overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
      <ul className='space-y-2'>
        <li>
          <a
            href='#'
            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
          >
            <svg
              aria-hidden='true'
              className='w-4 h-4 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
              <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
            </svg>
            <span className='ml-3 text-sm'>Overview</span>
          </a>
        </li>
      </ul>
      <ul className='pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700'>
        <li>
          <a
            href='#'
            className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group'
          >
            <svg
              aria-hidden='true'
              className='flex-shrink-0 w-4 h-4 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M9 2a1 1 0 000 2h2a1 1 0 100-2H9z'></path>
              <path
                fill-rule='evenodd'
                d='M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='ml-3 text-sm'>Docs</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
);

export default SideMenu;
