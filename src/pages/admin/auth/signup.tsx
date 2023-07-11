import React, { useState } from 'react';
import { Formik } from 'formik';
import { FiFrown } from 'react-icons/fi';
import { useRouter } from 'next/router';
import SetupLayout from '../../../components/layouts/SetupLayout';
import { trpc } from '../../../types/trpc';
import { PAGE_ROUTES } from '../../../types/constants';

const Signup = () => {
  const navigator = useRouter();

  const [formMessage, setFormMessage] = useState({
    isError: false,
    message: '',
  });

  const signup = trpc.auth.signup.useMutation({
    onSuccess: () => {
      navigator.push(PAGE_ROUTES.LOGIN);
    },
    onError: (e) => {
      setFormMessage({
        isError: true,
        message: e.message,
      });
    },
  });

  const initiateLogin = ({ email, password, fullName }: any) => {
    signup.mutate({
      email,
      fullName,
      password,
    });
  };

  return (
    <SetupLayout>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pb-6'>Create your account</h1>
      <Formik initialValues={{ email: '', password: '', fullName: '' }} onSubmit={initiateLogin}>
        {({ handleSubmit, values, handleChange }) => (
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            {formMessage.message && (
              <div
                id='toast-simple'
                className='flex items-center w-full p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800'
                role='alert'
              >
                <FiFrown width={8} height={8} />
                <div className='pl-4 text-sm font-normal text-danger'>{formMessage.message}</div>
              </div>
            )}

            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Full Name
              </label>
              <input
                name='fullName'
                id='fullName'
                value={values.fullName}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Your email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                value={values.email}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='name@company.com'
                required
              />
            </div>
            <div>
              <label htmlFor='password' data-popover-target='popover-default' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Password - <span className='text-xs text-primary-400'> Protect your password, it can be used to access your admin dashboard</span>
              </label>

              <input
                type='password'
                name='password'
                id='password'
                value={values.password}
                placeholder='Minimum 8 characters•'
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>

            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign up
            </button>
          </form>
        )}
      </Formik>
    </SetupLayout>
  );
};

export default Signup;
