import React from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showDecorations?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  subtitle2?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Surely the lord is in this place ",
  subtitle = "A place of faith, hope, and love where lives are transformed and purpose is discovered.",
  subtitle2 = "MFM OJODU YC",
  showDecorations = true,
  backgroundColor = "transparent",
  backgroundImage = "https://mfmstorage.blob.core.windows.net/mfmwebsite/images/MFM.jpg",
}) => {
  return (
    <section
      className={`w-full relative px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 overflow-hidden`}
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Decorative elements */}
      {showDecorations && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full relative"></div>
        </div>
      )}

      <div className="max-w-[844px] mx-auto text-center relative z-10">
        <h1
          className="
          text-[40px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[80px] 
          font-medium leading-[120%] text-white 
          mb-4 sm:mb-5 md:mb-6 lg:mb-8
          hover:scale-105 transition-transform duration-300
          relative
          drop-shadow-lg
        "
        >
          {title}
        </h1>

        <p
          className="
          text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[36px] 
          font-normal leading-[120%] sm:leading-[130%] md:leading-[120%]
          text-white max-w-full
          transition-all duration-300
          hover:text-gray-200
          relative
          drop-shadow-md
        "
        >
          {subtitle}
        </p>
        <p
          className="
          text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[36px] 
     leading-[120%] sm:leading-[130%] md:leading-[120%]
          text-white max-w-full
          transition-all duration-300
          hover:text-gray-200
          relative
         font-bold mt-5"
        >
          {subtitle2}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
