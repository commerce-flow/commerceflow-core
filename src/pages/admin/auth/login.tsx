import React, { useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { getCsrfToken } from 'next-auth/react';
import { FiFrown } from 'react-icons/fi';
import SetupLayout from '../../../components/layouts/SetupLayout';
import { PAGE_ROUTES } from '../../../types/constants';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import SpinnerIcon from '../../../components/icons/SpinnerIcon';

const Login = ({ csrfToken }: { csrfToken: string | undefined }) => {
  const navigator = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState({
    isError: false,
    message: '',
  });

  const initiateLogin = async ({ email, password }: any) => {
    setIsLoading(true);
    try {
      const resp: any = await signIn('cred', {
        email,
        password,
        redirect: false,
      });
      setIsLoading(false);
      if (!resp.ok && resp.error) {
        if (resp.status === 401) {
          setFormMessage({
            isError: true,
            message: 'Invalid login credentials',
          });
        }
      } else {
        navigator.push(PAGE_ROUTES.DASHBOARD);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <SetupLayout>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pb-6' onClick={() => signIn()}>
        Sign in to your account
      </h1>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={initiateLogin}>
        {({ handleSubmit, values, handleChange }) => (
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            {formMessage.message && (
              <div
                id='toast-simple'
                className='flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800'
                role='alert'
              >
                <FiFrown width={8} height={8} />
                <div className='pl-4 text-sm font-normal text-danger'>{formMessage.message}</div>
              </div>
            )}
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
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                value={values.password}
                placeholder='••••••••'
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                required
              />
            </div>
            {/* <div className='flex items-center justify-between'>
              <div className='flex items-start'>
                <div className='flex items-center h-5'>
                  <input
                    id='remember'
                    aria-describedby='remember'
                    type='checkbox'
                    className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    required
                  />
                </div>
                <div className='ml-3 text-sm'>
                  <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                    Remember me
                  </label>
                </div>
              </div>
              <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Forgot password?
              </a>
            </div> */}
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              {isLoading ? <SpinnerIcon /> : `Sign In`}
            </button>
          </form>
        )}
      </Formik>
    </SetupLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
    },
  };
};

export default Login;
