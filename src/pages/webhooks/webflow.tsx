import React, { useEffect } from 'react';
import SpinnerIcon from '../../components/icons/SpinnerIcon';
import { useRouter } from 'next/router';
import { trpc } from '../../types/trpc';

const WebflowHook = () => {
  const router = useRouter();
  const webFlowTokenExch = trpc.auth.requestWebflowOauthToken.useMutation({
    onSuccess: (data) => {
      // Show success
      console.log({ data }, 'in success func');
    },
    onError: () => {
      // Handle error
    },
  });

  useEffect(() => {
    const { code } = router.query;
    webFlowTokenExch.mutate({ authCode: code as string });
  }, [router.query]);

  return (
    <div className='flex justify-center items-center flex-col h-screen bg-white'>
      <SpinnerIcon circleColor='' />
      <h1 className='text-black'>...Please wait</h1>
    </div>
  );
};

export default WebflowHook;
