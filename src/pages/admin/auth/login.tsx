import React, { useState } from 'react';
import { Formik } from 'formik';
import { FiFrown } from 'react-icons/fi';
import SetupLayout from '../../../components/layouts/SetupLayout';

const Login = () => {
  const [formMessage, setFormMessage] = useState({
    isError: false,
    message: '',
  });
  const initiateLogin = ({ email, password }: any) => {
    console.log({ email, password });
  };

  return (
    <SetupLayout>
      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center pb-6'>Sign in to your account</h1>
      <Formik initialValues={{ email: '', password: '' }} onSubmit={initiateLogin}>
        {({ handleSubmit, values, handleBlur, handleChange }) => (
          <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
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
            <div className='flex items-center justify-between'>
              {/* <div className='flex items-start'>
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
              </div> */}
              <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                Forgot password?
              </a>
            </div>
            <button
              type='submit'
              className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            >
              Sign in
            </button>
          </form>
        )}
      </Formik>
    </SetupLayout>
  );
};

export default Login;
