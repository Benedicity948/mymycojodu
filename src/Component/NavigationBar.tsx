import React, { useState, useCallback } from "react";
import logo from "../assets/Images/logo.webp";
import { Link } from "react-router-dom";
interface NavItem {
  label: string;
  href: string;
}

interface NavigationBarProps {
  logoAlt?: string;
  logoSrc?: string;
  navItems?: NavItem[];
  joinButtonText?: string;
  onJoinClick?: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  logoAlt = "Company Logo",
  //   logoSrc = logo,
  navItems = [
    { label: "Our Programs", href: "/#program" },
    { label: "Giving", href: "/#giving-page " },
  ],
  joinButtonText = "Join us",
  onJoinClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = useCallback((): void => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsMenuOpen(false);
  }, []);

  const handleJoinClick = useCallback((): void => {
    if (onJoinClick) {
      onJoinClick();
    }
    closeMenu();
  }, [onJoinClick, closeMenu]);

  return (
    <nav className="w-full h-[70px] md:h-[100px] lg:h-[130px] bg-white border-b border-[#CB3398] flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-20 relative">
      {/* Logo */}
      <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] flex-shrink-0">
        <Link to="/">
          <img
            src={logo}
            alt={logoAlt}
            className="w-full h-full object-contain"
            loading="eager"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-[#1E1E1E] p-2 hover:text-[#CB3398] transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB3398] rounded-lg"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Navigation Links - Desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-[47px]">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Join Us Button - Desktop */}
      <a
        href="https://wa.me/2347072926162"
        className="hidden lg:flex w-[140px] sm:w-[160px] lg:w-[200px] h-[45px] sm:h-[50px] lg:h-[55px] bg-[#CB3398] rounded-2xl hover:bg-[#b02d84] transition-all duration-200 hover:scale-105 items-center justify-center flex-shrink-0 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2"
        onClick={handleJoinClick}
      >
        <span className="text-white text-sm sm:text-base lg:text-[19px] font-medium tracking-wide">
          {joinButtonText}
        </span>
      </a>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="absolute top-[70px] md:top-[100px] left-0 right-0 bg-white border-b border-[#CB3398] p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 lg:hidden shadow-xl z-50 animate-slideDown">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            <button
              className="w-full max-w-[280px] sm:max-w-[320px] h-[50px] sm:h-[55px] bg-[#CB3398] rounded-2xl hover:bg-[#b02d84] transition-all duration-200 hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2"
              onClick={handleJoinClick}
            >
              <span className="text-white text-base sm:text-[19px] font-medium">
                {joinButtonText}
              </span>
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

// Reusable NavLink component with better TypeScript typing
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <a
      href={href}
      className="text-[#1E1E1E] text-base md:text-xl lg:text-2xl font-medium hover:text-[#CB3398] transition-colors duration-200 whitespace-nowrap focus:outline-none focus:text-[#CB3398]"
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavigationBar;
