import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../assets/images/favicon.png';
import SearchModal from './search.component';

export const NavBar = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-white bg-twitch/20'
        : 'text-gray-400 hover:text-white hover:bg-white/10'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border-custom bg-[#0f0f11]/80 backdrop-blur-xl">
        <nav className="max-w-[1440px] mx-auto px-4 sm:px-6" aria-label="Main navigation">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="StreamVault Home"
            >
              <img src={Logo} className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg" alt="" />
              <span className="hidden sm:block text-lg font-bold text-white tracking-tight">
                Stream<span className="text-twitch">Vault</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/browse" className={navLinkClass}>
                Browse
              </NavLink>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="btn-ghost text-sm"
                aria-label="Open search"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden btn-ghost p-2"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden pb-3 border-t border-border-custom pt-2">
              <div className="flex flex-col gap-1">
                <NavLink
                  to="/"
                  end
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/browse"
                  className={navLinkClass}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse
                </NavLink>
              </div>
            </div>
          )}
        </nav>
      </header>

      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} />
      )}
    </>
  );
};
