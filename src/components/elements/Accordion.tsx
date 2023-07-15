import React, { PropsWithChildren } from 'react';

interface Props {
  isOpen?: boolean;
  title: string;
  onOpen: () => void;
}

const Accordion = ({ title, isOpen = false, children, onOpen }: PropsWithChildren<Props>) => {
  return (
    <div id='accordion-collapse' data-accordion='collapse' className='w-full'>
      <h2 id='accordion-collapse-heading-1'>
        <button
          type='button'
          className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border  border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          data-accordion-target='#accordion-collapse-body-1'
          aria-expanded='true'
          aria-controls='accordion-collapse-body-1'
          onClick={onOpen}
        >
          <span>{title}</span>
          <svg data-accordion-icon className='w-3 h-3 rotate-180 shrink-0' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5 5 1 1 5' />
          </svg>
        </button>
      </h2>
      <div id='accordion-collapse-body-1' className={`${isOpen ? '' : 'hidden'}`} aria-labelledby='accordion-collapse-heading-1'>
        <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900'>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
