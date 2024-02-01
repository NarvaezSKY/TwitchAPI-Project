import React, { useState } from 'react';
import Logo from '../assets/images/favicon.png';
import SearchModal from './search.component';

export const NavBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleSearchButtonClick = () => {
    setIsSearchModalOpen(true);
  };

  return (
    <>
      {/* This navbar is a template from uiverse.io c: */}
      <nav className="bg-white border-gray-200 dark:bg-navbar">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-5">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={Logo} className="h-10" alt="Flowbite Logo" />
          </a>
          <div
            className="w-full md:flex md:w-auto md:order-1 md:justify-end md:space-x-4"
            id="navbar-search"
          >
            <button
              id="search-navbar"
              className="p-2 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-white focus:border-blue-500 dark:bg-twitch-color dark:text-white dark:focus:border-white hover:border-white"
              onClick={handleSearchButtonClick}
            >
              Search
            </button>
          </div>
        </div>
        {isSearchModalOpen && <SearchModal onClose={() => setIsSearchModalOpen(false)} />}
      </nav>
    </>
  );
  
};
