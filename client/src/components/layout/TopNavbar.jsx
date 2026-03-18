import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export function TopNavbar() {
  return (
    <header className="h-16 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center">
        <button className="md:hidden p-2 text-gray-400 hover:text-gray-100 shrink-0">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex relative ml-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search candidates..." 
            className="bg-gray-900 border border-gray-800 text-sm rounded-full pl-10 pr-4 py-2 text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-full hover:bg-gray-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-gray-950"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[1px]">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=transparent" 
              alt="User" 
              className="w-full h-full rounded-full bg-gray-900 object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-200 leading-none">Admin User</p>
            <p className="text-xs text-gray-500 mt-1">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
