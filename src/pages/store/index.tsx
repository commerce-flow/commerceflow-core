import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import { GetServerSideProps } from 'next/types';
import { getToken } from 'next-auth/jwt';

const Dashboard = () => {
  return (
    <MainLayout>
      <h1 className='text-4xl text-black'></h1>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  await getToken({ req });

  return {
    props: {},
  };
};

export default Dashboard;
