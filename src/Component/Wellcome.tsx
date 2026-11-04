import React, { useEffect, useRef, useState } from 'react';
import image from "../assets/Images/welcome.webp"
interface WelcomeSectionProps {
  className?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  className = '',
  title = "Everybody is welcome at MFM Youth Church Ojodu",
  description = "We are a vibrant, prayerful, and purpose-driven youth church in Ojodu, committed to helping young people grow in faith, holiness, and spiritual maturity through worship, prayer, and community.",
  imageUrl = image,
  imageAlt = "Welcome to our church community"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Split title into words for animation
  const titleWords = title.split(' ');

  return (
    <section 
      ref={sectionRef}
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #fbeaf5 0%, #f3eafa 54%, #fff7ed 100%)' }}
    >
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
      
      {/* Floating decorative circles */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-float hidden lg:block" />
      <div className="absolute bottom-10 right-10 w-6 h-6 bg-white/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1276px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-[115px]">
          {/* Image Section */}
          <div className={`w-full lg:w-[582px] flex-shrink-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
          }`}>
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_28px_70px_-32px_rgba(58,19,59,0.4)]">
              <img 
                src={imageUrl}
                alt={imageAlt}
                className={`w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[460px] object-cover transition-all duration-1000 ${
                  isImageLoaded ? 'scale-100' : 'scale-110'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                loading="lazy"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Decorative border accent */}
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full" />
            </div>
          </div>

          {/* Content Section */}
          <div className={`w-full lg:flex-1 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
          }`}>
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Title with word-by-word animation */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-medium leading-[100%] text-[#1E1E1E]">
                {titleWords.map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ 
                      transitionDelay: `${index * 100 + 400}ms`,
                      marginRight: '0.1em'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>

              {/* Description with animation */}
              <p className={`text-base sm:text-lg md:text-xl lg:text-[32px] font-normal leading-[120%] text-[#1E1E1E] transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                {description}
              </p>

              {/* Optional CTA Button */}
              <div className={`mt-4 transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <a href='https://wa.me/2347072926162'  className="
                  px-8 sm:px-10 md:px-12 py-3 sm:py-4 
                  bg-gradient-to-r from-[#8d2377] to-[#d33c98] text-white
                  text-base sm:text-lg md:text-xl 
                  font-medium rounded-full
                  hover:shadow-lg hover:shadow-[#8d2377]/25
                  transition-all duration-300 
                  hover:scale-105 hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2
                  flex items-center gap-2
                ">
                  <span className='text-center'>Visit Us</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;