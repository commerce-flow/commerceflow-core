import React, { PropsWithChildren } from 'react';
import SideMenu from './SideMenu';
import NavBar from './NavBar';

const MainLayout = ({ children }: PropsWithChildren<unknown>) => (
  <>
    <NavBar />
    <div className='flex flex-row h-screen overflow-hidden bg-[#f1f1f1]'>
      <SideMenu />
      <div className='flex h-screen w-full p-6'>{children}</div>
    </div>
  </>
);

export default MainLayout;
