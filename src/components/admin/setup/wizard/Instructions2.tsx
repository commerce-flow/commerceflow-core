import React from 'react';

const Instructions2 = ({
  githubToken,
  showPreviousBtn = true,
  onActionBtn,
  setGithubToken,
}: {
  githubToken: string;
  onActionBtn: any;
  setGithubToken: any;
  showPreviousBtn?: boolean;
}) => {
  return (
    <>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>{`Github Setup`}</p>
      <p className='font-light text-gray-500 dark:text-gray-400 text-sm mb-4'>
        {`We use github to store extensions for your e-commerce store. Extensions are programs that give your store extra abilities like user memberships, gating content, booking appointments among others.`}
      </p>

      <ol className='list-decimal list-inside mb-10 mt-6 text-sm text-left'>
        <li className='pb-2 text-sm'>
          Create a github account ({`If you don't have one`}). You can create a new github account here
          <div className='w-full text-center mt-2 mb-2'>
            <a target='_blank' href='https://github.com/signup' className='text-blue-300'>
              https://github.com/signup
            </a>
          </div>
        </li>

        <li className='pb-2 text-sm'>
          Manually create a PUBLIC repository with the name commerceflow-extensions where CommerceFlow can store all your extensions. Follow this guide on how
          to create a repository
          <div className='w-full text-center mb-2'>
            <a target='_blank' href='https://docs.github.com/en/get-started/quickstart/create-a-repo' className='text-blue-300'>
              https://docs.github.com/en/get-started/quickstart/create-a-repo
            </a>
          </div>
        </li>

        <li className='pb-2 mb-4 text-sm'>
          Next, you need to create a Fine-grained personal access token. Follow the link below to create one. When creating, choose repository permissions and
          then select both Content and workflow, give both of them the Read and Write permission. <br />
          <br /> Note: Make sure you only select the repository you just created when giving access. Also, create a token that does not expire, if the token
          expires, CommerceFlow will inform you so you can generate another.
          <div className='w-full text-center mt-1'>
            <a
              target='_blank'
              href='https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token'
              className='text-blue-300'
            >
              {' '}
              https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-fine-grained-personal-access-token
            </a>
          </div>
        </li>
      </ol>

      <div className='mb-4 text-left'>
        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          Enter Github Token <br />
        </label>
        <input
          type='text'
          name='name'
          id='name'
          defaultValue={githubToken}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
          placeholder='e.g. xxxxx'
          onChange={(e) => setGithubToken(e.target.value)}
        />
      </div>
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
          disabled={githubToken === ''}
          onClick={() => onActionBtn('next')}
          className={`text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 ${
            githubToken === '' ? 'bg-[#ccc]' : 'bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:ring-[#4285F4]/50'
          }`}
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default Instructions2;
