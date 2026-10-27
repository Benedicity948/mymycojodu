import React, { useState, useCallback, useEffect } from "react";
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
  transparentOnHero?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  logoAlt = "MFM Ojodu Youth Church",
  //   logoSrc = logo,
  navItems = [
    { label: "Our Programs", href: "/#program" },
    { label: "Giving", href: "/#giving-page" },
    { label: "Gallery", href: "/gallery-page" },
  ],
  joinButtonText = "Join us",
  onJoinClick,
  transparentOnHero = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHeroHeader, setIsHeroHeader] = useState(transparentOnHero);

  useEffect(() => {
    if (!transparentOnHero) {
      setIsHeroHeader(false);
      return;
    }

    const hero = document.getElementById("home-hero");
    if (!hero) {
      setIsHeroHeader(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroHeader(entry.isIntersecting),
      { rootMargin: "-84px 0px 0px 0px" },
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, [transparentOnHero]);

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
    <nav
      className={`${transparentOnHero ? "fixed top-0" : "sticky top-0"} z-50 w-full h-[72px] md:h-[84px] flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 transition-colors duration-300 ${
        isHeroHeader
          ? "border-b border-transparent bg-transparent backdrop-blur-none"
          : "border-b border-[#efd9eb] bg-white/90 backdrop-blur-xl"
      }`}
    >
      {/* Logo */}
      <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] flex-shrink-0">
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
        className={`lg:hidden p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#CB3398] rounded-lg ${
          isHeroHeader ? "text-white hover:text-[#f3b9df]" : "text-[#1E1E1E] hover:text-[#CB3398]"
        }`}
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
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 xl:gap-10">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href} transparent={isHeroHeader}>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Join Us Button - Desktop */}
      <a
        href="https://wa.me/2347072926162"
        className="hidden lg:flex min-w-[150px] h-[48px] px-6 bg-gradient-to-r from-[#8d2377] to-[#d33c98] rounded-full hover:shadow-lg hover:shadow-[#a02c82]/25 transition-all duration-200 hover:-translate-y-0.5 items-center justify-center flex-shrink-0 shadow-md focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2"
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
            className="fixed inset-0 bg-[#211126]/35 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#efd9eb] p-4 sm:p-6 flex flex-col items-center gap-4 sm:gap-6 lg:hidden shadow-xl z-50">
            {navItems.map((item) => (
              <NavLink key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            <a
              href="https://wa.me/2347072926162"
              className="w-full max-w-[280px] sm:max-w-[320px] h-[50px] sm:h-[55px] bg-gradient-to-r from-[#8d2377] to-[#d33c98] rounded-full transition-all duration-200 hover:scale-[1.02] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2"
              onClick={handleJoinClick}
            >
              <span className="text-white text-base sm:text-[19px] font-medium">
                {joinButtonText}
              </span>
            </a>
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
  transparent?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({
  href,
  children,
  onClick,
  transparent = false,
}) => {
  return (
    <a
      href={href}
      className={`text-sm md:text-base font-semibold transition-colors duration-200 whitespace-nowrap focus:outline-none focus:text-[#CB3398] ${
        transparent
          ? "text-white hover:text-[#f3b9df]"
          : "text-[#49364e] hover:text-[#a12b83]"
      }`}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default NavigationBar;
