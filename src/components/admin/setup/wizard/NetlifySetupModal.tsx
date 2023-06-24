import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { TfiClose } from 'react-icons/tfi';
import { NetlifyAccount, NetlifySite } from '../../../../types/platforms/netlify';
import SpinnerIcon from '../../../icons/SpinnerIcon';

interface Props {
  isOpen: boolean;
  accounts: NetlifyAccount[];
  sites: NetlifySite[];
  defaultAccount?: NetlifyAccount;
  onNetlifySiteOptionsSelected: any;
  loading: boolean;
  onClose: () => void;
}

const colorStyles: StylesConfig<any> = {
  option: (styles) => {
    return {
      ...styles,
      color: '#000',
    };
  },
};

const NetlifySetupModal = ({ isOpen, accounts = [], sites = [], defaultAccount, onNetlifySiteOptionsSelected, loading, onClose }: Props) => {
  return (
    <div className={`fixed inset-0 bg-opacity-80 overflow-y-auto h-full w-full bg-black flex justify-center items-center ${isOpen ? '' : 'hidden'}`}>
      <div className='bg-gray-50 dark:bg-gray-900 w-full max-w-2xl'>
        <div className='p-6 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-gray-800 dark:border-gray-700 sm:p-8'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-2xl text-center'>Netlify Setup</h1>
            <TfiClose className='w-6 h-6 cursor-pointer' onClick={() => onClose()} />
          </div>
          <form onSubmit={onNetlifySiteOptionsSelected}>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Select Account
              </label>
              <Select
                options={accounts.map((account) => ({
                  label: account.name,
                  value: account.id,
                }))}
                name='account'
                // options={options}
                styles={colorStyles}
                isDisabled={defaultAccount != null}
                value={
                  defaultAccount
                    ? {
                        value: defaultAccount.id,
                        label: defaultAccount.name,
                      }
                    : {}
                }
              />
            </div>

            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Select Project
              </label>
              <Select
                options={sites.map((account) => ({
                  label: account.name,
                  value: account.id,
                }))}
                name='site'
                // options={options}
                styles={colorStyles}
              />
            </div>

            <div className='flex justify-center items-center'>
              <button
                type='submit'
                disabled={loading}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                  loading ? 'disabled:opacity-25' : ''
                }`}
              >
                {loading ? <SpinnerIcon /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NetlifySetupModal;
