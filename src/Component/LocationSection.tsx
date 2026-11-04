import React, { useEffect, useRef, useState } from 'react';

interface LocationSectionProps {
  className?: string;
  address?: string;
  addressLabel?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  mapUrl?: string;
  showMap?: boolean;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  className = '',
  address = "2nd Floor, 18 Baale Street, off Adebiwale Street, Grammer School B/S, Ojodu",
  addressLabel = "Our Church Address",
  buttonText = "Join us",
  onButtonClick,
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9524122603607!2d3.375295414770757!3d6.527375295278651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367d8c4e2!2sOjodu%20Berger%2C%20Lagos!5e0!3m2!1sen!2sng!4v1647600000000!5m2!1sen!2sng",
  showMap = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Helper to check if URL is embed or share
  const isEmbedUrl = (url: string) => url.includes('embed') || url.includes('pb=');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      const encodedAddress = encodeURIComponent(address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
    }
  };

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full bg-gradient-to-br from-[#fff8fc] via-white to-[#f5effa] px-4 sm:px-6 md:px-8 lg:px-20 py-16 sm:py-20 lg:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1277px] mx-auto relative z-10">
        {/* Header */}
        <div className={`flex flex-col gap-5 mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a12b83]">Come worship with us</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[110%] tracking-[-0.035em] text-[#27152e] relative inline-block">
            Where we are located
          </h2>
          <p className="max-w-2xl text-base sm:text-lg leading-7 text-[#6f6074]">
            We’d love to welcome you. Find us at our Ojodu location and join us for worship, prayer, and fellowship.
          </p>
        </div>

        {/* Location Card */}
        <div className={`relative rounded-[28px] overflow-hidden transition-all duration-1000 delay-300 shadow-[0_28px_80px_-40px_rgba(48,17,51,0.45)] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Background Image with Map Toggle */}
          <div 
            className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[560px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'radial-gradient(circle at 78% 14%, rgba(239, 105, 189, 0.42), transparent 28%), linear-gradient(135deg, #321532, #74417c 58%, #d64ca1)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Map Overlay (Optional) */}
            {showMap && isHovered && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-500">
                <div className="bg-white rounded-2xl p-4 max-w-[90%] w-[600px]">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[#1E1E1E] font-medium">Find us on Google Maps</h4>
                    <button 
                      onClick={handleDirectionsClick}
                      className="text-[#CB3398] text-sm font-medium hover:underline"
                    >
                      Get Directions
                    </button>
                  </div>
                  <div className="relative w-full h-[200px] sm:h-[250px] rounded-xl overflow-hidden">
                    {isEmbedUrl(mapUrl) ? (
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Church Location Map"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-100">
                        <p className="text-gray-600">Please provide a valid embed URL</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Location Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-[#1E1E1E] text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4 text-[#CB3398]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Visit Us
              </span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[#5e1b61] via-[#942778] to-[#c53291] px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 max-w-[1212px] mx-auto">
              {/* Address Info */}
              <div className="flex flex-col justify-center gap-1 w-full sm:w-auto">
                <p className="text-white/80 text-xs sm:text-sm font-medium uppercase tracking-wider">
                  {addressLabel}
                </p>
                <p className="text-white text-base sm:text-lg md:text-xl lg:text-[23px] font-medium leading-[120%]">
                  {address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {/* Directions Button */}
                <button
                  onClick={handleDirectionsClick}
                  className="w-full sm:w-auto px-6 py-2 bg-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions
                </button>

                {/* Join Us Button */}
                <button
                  onClick={handleButtonClick}
                  className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-white text-[#CB3398] rounded-2xl font-medium text-base sm:text-lg lg:text-[19px] transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#CB3398] whitespace-nowrap flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;