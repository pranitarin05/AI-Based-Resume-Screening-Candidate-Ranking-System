import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export default function PageLayout() {
  return (
    <div className="flex h-screen w-full bg-[#030712] text-gray-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto w-full custom-scrollbar p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
