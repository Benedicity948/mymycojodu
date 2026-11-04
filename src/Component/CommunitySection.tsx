import React, { useEffect, useRef, useState } from 'react';
import image1 from "../assets/Images/comm1.webp"
import image2 from "../assets/Images/sp2.webp"
import image3 from "../assets/Images/sp3.webp"

interface CommunityCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonLink?: string;
  icon?: React.ReactNode;
}

interface CommunitySectionProps {
  className?: string;
  cards?: CommunityCard[];
  onButtonClick?: (cardId: number) => void;
  title?: string;
  subtitle?: string;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  className = '',
  cards = [
    {
      id: 1,
      title: "Join a Group",
      description: "We have a community that would help you build a wonderful relationship with both God and man.",
      imageUrl: image1,
      buttonText: "Join us"
    },
    {
      id: 2,
      title: "Prayer Requests",
      description: "Our team of prayer warriors are available to pray with you. Please contact us",
      imageUrl: image2,
      buttonText: "Send Prayer Request"
    },
    {
      id: 3,
      title: "Counselling",
      description: "Find support and guidance through prayer and counselling. We're here to help you.",
      imageUrl: image3,
      buttonText: "Get Help"
    }
  ],
  onButtonClick,
  title = "Join Our Community",
  subtitle = "Find your place in our community and grow in faith together"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const handleButtonClick = (cardId: number) => {
    if (onButtonClick) {
      onButtonClick(cardId);
    } else {
      // Default behavior based on card type
      const card = cards.find(c => c.id === cardId);
      if (card) {
        switch(cardId) {
          case 1:
            // Join a Group - scroll to programs section
            {
              const programsSection = document.getElementById('program');
              if (programsSection) {
                programsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
            break;
          case 2:
            // Prayer Request - scroll to contact
            {
              const contactSection = document.getElementById('contact-section');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
            break;
          case 3:
            // Counselling - scroll to contact
            {
              const counsellingSection = document.getElementById('contact-section');
              if (counsellingSection) {
                counsellingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }
            break;
          default:
            break;
        }
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-[#CB3398]/20 rounded-full hidden lg:block" />
      <div className="absolute bottom-1/4 right-10 w-3 h-3 bg-[#CB3398]/20 rounded-full hidden lg:block" />

      <div className="max-w-[1276px] mx-auto relative z-10">
        {/* Section Title */}
        <div className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-medium leading-[120%] text-[#1E1E1E] relative inline-block">
            {title}
            {/* <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#CB3398] rounded-full" /> */}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mt-4 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <div
                key={card.id}
                className={`relative rounded-xl overflow-hidden transition-all duration-700 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  height: '579px'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${card.imageUrl})`,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)'
                  }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500" />

                {/* Bottom Gradient Overlay */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[305px] transition-all duration-500"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(to top, rgba(203, 51, 152, 0.6), rgba(38, 38, 38, 0.4))'
                      : 'rgba(38, 38, 38, 0.38)'
                  }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Title with icon */}
                    <div className="flex items-center gap-3">
                      {card.icon && (
                        <span className="text-white/80 text-2xl">
                          {card.icon}
                        </span>
                      )}
                      <h3 className="text-white text-2xl sm:text-3xl md:text-[40px] font-medium leading-[120%] transition-all duration-300">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-white/90 text-base sm:text-lg md:text-[24px] font-normal leading-[120%] max-w-[348px] transition-all duration-300">
                      {card.description}
                    </p>

                    {/* Button */}
                    <a href='https://wa.me/2347072926162'
                      onClick={() => handleButtonClick(card.id)}
                      className={`
                        w-full max-w-[348px] h-[55px] bg-[#CB3398] text-white rounded-2xl 
                        font-medium text-base sm:text-lg lg:text-[19px] 
                        transition-all duration-300 
                        hover:bg-[#b02d84] hover:scale-105 hover:shadow-xl
                        focus:outline-none focus:ring-2 focus:ring-[#CB3398] focus:ring-offset-2
                        flex items-center justify-center gap-2
                        ${isHovered ? 'shadow-2xl bg-[#b02d84]' : ''}
                      `}
                    >
                      <span>{card.buttonText}</span>
                      <svg 
                        className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#CB3398]/10 rounded-bl-full transition-all duration-500" 
                     style={{ opacity: isHovered ? 1 : 0 }} />

                {/* Top-right badge */}
                <div className={`absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium transition-all duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}>
                  {card.id === 1 ? 'Community' : card.id === 2 ? 'Prayer' : 'Support'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;