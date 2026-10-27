import React from 'react';

interface FooterProps {
  className?: string;
  companyName?: string;
  builtBy?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    facebook?: string;
  };
}

const Footer: React.FC<FooterProps> = ({
  className = '',
  companyName = "mfmojoduyc",
  builtBy = "techdeal.IT",
  socialLinks = {
    instagram: "https://www.instagram.com/mfmojoduyc?igsh=Ymptc3NydDVxb2pm",
    youtube: "https://youtube.com/@mfmojoduyc?si=A1baFEO1VA-0NzEu",
    facebook: "https://www.facebook.com/share/18xcf1eFcA/"
  }
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`w-full bg-gradient-to-r from-[#321532] via-[#64205f] to-[#9a287d] px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-10 relative ${className}`}
    >
      <div className="max-w-[1440px] mx-auto relative">
        {/* Built by text - positioned to the right */}
        <div className="text-right  mb-4 sm:mb-0">
          <a href='https://www.techdeal.it.com' className="text-white text-sm sm:text-base lg:text-[20px] font-normal leading-[120%] underline">
            Built by {builtBy}
          </a>
        </div>

        {/* Center content - Social icons and Copyright */}
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          {/* Social Icons */}
          <div className="flex items-center gap-2 sm:gap-[7.59px]">
            {/* Instagram */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-[33.39px] sm:h-[33.39px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 sm:w-[19.73px] sm:h-[19.73px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163C15.204 2.163 15.584 2.176 16.849 2.234C18.021 2.287 18.659 2.516 19.085 2.706C19.635 2.953 20.028 3.246 20.444 3.662C20.86 4.078 21.153 4.471 21.4 5.021C21.59 5.447 21.819 6.085 21.872 7.257C21.93 8.522 21.943 8.902 21.943 12.106C21.943 15.31 21.93 15.69 21.872 16.955C21.819 18.127 21.59 18.765 21.4 19.191C21.153 19.741 20.86 20.134 20.444 20.55C20.028 20.966 19.635 21.259 19.085 21.506C18.659 21.696 18.021 21.925 16.849 21.978C15.584 22.036 15.204 22.049 12 22.049C8.796 22.049 8.416 22.036 7.151 21.978C5.979 21.925 5.341 21.696 4.915 21.506C4.365 21.259 3.972 20.966 3.556 20.55C3.14 20.134 2.847 19.741 2.6 19.191C2.41 18.765 2.181 18.127 2.128 16.955C2.07 15.69 2.057 15.31 2.057 12.106C2.057 8.902 2.07 8.522 2.128 7.257C2.181 6.085 2.41 5.447 2.6 5.021C2.847 4.471 3.14 4.078 3.556 3.662C3.972 3.246 4.365 2.953 4.915 2.706C5.341 2.516 5.979 2.287 7.151 2.234C8.416 2.176 8.796 2.163 12 2.163ZM12 0C8.741 0 8.332 0.014 7.052 0.072C5.77 0.131 4.875 0.371 4.095 0.709C3.28 1.059 2.584 1.524 1.89 2.218C1.196 2.912 0.731 3.608 0.381 4.423C0.043 5.203 -0.197 6.098 -0.138 7.38C-0.08 8.66 -0.066 9.069 -0.066 12.328C-0.066 15.587 -0.08 15.996 -0.138 17.276C-0.197 18.558 -0.437 19.453 0.381 20.233C1.201 21.013 1.897 21.478 2.712 21.828C3.492 22.166 4.387 22.406 5.669 22.465C6.949 22.523 7.358 22.537 10.617 22.537C13.876 22.537 14.285 22.523 15.565 22.465C16.847 22.406 17.742 22.166 18.522 21.828C19.337 21.478 20.033 21.013 20.727 20.319C21.421 19.625 21.886 18.929 22.236 18.114C22.574 17.334 22.814 16.439 22.873 15.157C22.931 13.877 22.945 13.468 22.945 10.209C22.945 6.95 22.931 6.541 22.873 5.261C22.814 3.979 22.574 3.084 22.236 2.304C21.886 1.489 21.421 0.793 20.727 0.099C20.033 -0.595 19.337 -1.06 18.522 -1.41C17.742 -1.748 16.847 -1.988 15.565 -2.047C14.285 -2.105 13.876 -2.119 10.617 -2.119L12 0Z" fill="#001D0B"/>
                <path d="M12 5.838C8.598 5.838 5.838 8.598 5.838 12C5.838 15.402 8.598 18.162 12 18.162C15.402 18.162 18.162 15.402 18.162 12C18.162 8.598 15.402 5.838 12 5.838ZM12 16C9.794 16 8 14.206 8 12C8 9.794 9.794 8 12 8C14.206 8 16 9.794 16 12C16 14.206 14.206 16 12 16Z" fill="#001D0B"/>
                <path d="M18.406 4.735C17.826 4.735 17.356 5.205 17.356 5.785C17.356 6.365 17.826 6.835 18.406 6.835C18.986 6.835 19.456 6.365 19.456 5.785C19.456 5.205 18.986 4.735 18.406 4.735Z" fill="#001D0B"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-[33.39px] sm:h-[33.39px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 sm:w-[19.73px] sm:h-[19.73px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186C23.267 5.328 22.596 4.657 21.738 4.426C19.836 3.9 12 3.9 12 3.9C12 3.9 4.164 3.9 2.262 4.426C1.404 4.657 0.733 5.328 0.502 6.186C0 8.088 0 12 0 12C0 12 0 15.912 0.502 17.814C0.733 18.672 1.404 19.343 2.262 19.574C4.164 20.1 12 20.1 12 20.1C12 20.1 19.836 20.1 21.738 19.574C22.596 19.343 23.267 18.672 23.498 17.814C24 15.912 24 12 24 12C24 12 24 8.088 23.498 6.186Z" fill="#001D0B"/>
                <path d="M9.6 15.6L15.6 12L9.6 8.4V15.6Z" fill="white"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-[33.39px] sm:h-[33.39px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 sm:w-[19.73px] sm:h-[19.73px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0C5.373 0 0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.387 11.916 4.716 14.658 4.716C15.97 4.716 17.344 4.951 17.344 4.951V7.923H15.831C14.34 7.923 13.875 8.853 13.875 9.808V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.099 24 12.073Z" fill="#001D0B"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 sm:gap-[6.07px]">
            <span className="text-white text-base sm:text-[18.2143px] font-normal leading-[22px]">
              Copyright
            </span>
            <svg className="w-4 h-4 sm:w-[18.21px] sm:h-[18.21px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5"/>
            </svg>
            <span className="text-white text-base sm:text-[18.2143px] font-normal leading-[22px]">
              {currentYear} {companyName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;