import React from 'react';
import MainLayout from '../../components/layouts/MainLayout';
import TodoChecklist from '../../components/admin/store/TodoChecklist';
import { trpc } from '../../types/trpc';

const Dashboard = () => {
  const clientEnvs = trpc.auth.clientEnvs.useQuery();

  return (
    <MainLayout>
      <div className='flex justify-center items-center w-full'>
        <div className='w-1/2 flex items-center justify-center p-6'>
          <TodoChecklist webflowClientID={clientEnvs.data?.webflow.clientId as string} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
