import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  quote: string;
  role?: string;
}

interface TestimoniesSectionProps {
  className?: string;
  testimonials?: Testimonial[];
  title?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const TestimoniesSection: React.FC<TestimoniesSectionProps> = ({
  className = '',
  testimonials = [
    {
      id: 1,
      name: "Sister Peculiar",
      quote: "God saved the life of a friend who was abducted and they demanded for a ransom for his life, glory to God he was brought to his family hail and hearty.",
      role: "Member"
    },
    {
      id: 2,
      name: "Brother Daniel",
      quote: "God saved my mum's life from an uncontrolled truck accident on her way home.",
      role: "Member"
    },
    {
      id: 3,
      name: "Brother Sayo Adenuga",
      quote: "God healed me from sudden and terrible stomach ache which happened immediately I got back from work.",
      role: "Member"
    },
    {
      id: 4,
      name: "Bro Emmanuel",
      quote: "God made me did my one year nysc in peace, though I lost my luggage when returning back to lagos but thank none of my documents was missing.",
      role: "Member"
    },
    {
      id: 5,
      name: "Brother Emmanuel",
      quote: "God made me did my one year nysc in peace, though I lost my luggage when returning back to lagos but thank none of my documents was missing.",
      role: "Member"
    },
    {
      id: 6,
      name: "Sister Loveth",
      quote: "God saved me and my household from explosive gas accident which should have burnt down the building but nothing bad was recorded.",
      role: "Member"
    },
    {
      id: 7,
      name: "Brother Favour",
      quote: "God saved me from an electric shock, though it took the life of my dog the same spot I was standing, all thanks to God am alive to his glory.",
      role: "Member"
    },
    {
      id: 8,
      name: "Brother Elvis",
      quote: "God delivered my son from scorpion sting/harm in his apartment, glory to his name.",
      role: "Member"
    }
  ],
  title = "Testimonies",
  autoplay = true,
  autoplaySpeed = 5000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Split testimonials into rows of 4
  const rows = [];
  for (let i = 0; i < testimonials.length; i += 4) {
    rows.push(testimonials.slice(i, i + 4));
  }

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

  const scrollToRow = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const rowHeight = 339 + 20;
      scrollContainerRef.current.scrollTo({
        top: index * rowHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && isVisible) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % rows.length;
          return next;
        });
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, isVisible, rows.length, autoplaySpeed]);

  useEffect(() => {
    scrollToRow(activeIndex);
  }, [activeIndex, scrollToRow]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset autoplay timer
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % rows.length;
          scrollToRow(next);
          return next;
        });
      }, autoplaySpeed);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden ${className}`}
    >
      {/* Background decorations */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      
      {/* Floating decorative quote marks */}
      <div className="absolute top-20 right-20 text-[#CB3398]/5 text-[200px] font-serif hidden lg:block">"</div>
      <div className="absolute bottom-20 left-20 text-[#CB3398]/5 text-[200px] font-serif hidden lg:block">"</div>

      <div className="max-w-[1840px] mx-auto relative z-10">
        {/* Title with animation */}
        <div className={`mb-10 sm:mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[120%] text-[#1E1E1E] relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 w-20 h-1 bg-[#CB3398] rounded-full" />
          </h2>
        </div>

        {/* Testimonials Container */}
        <div 
          ref={scrollContainerRef}
          className="relative overflow-y-auto scroll-smooth testimonials-scroll"
          style={{ 
            maxHeight: '718px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex flex-col gap-5">
            {rows.map((row, rowIndex) => (
              <div 
                key={rowIndex}
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${rowIndex * 150}ms` }}
              >
                {row.map((testimonial, index) => {
                  const globalIndex = rowIndex * 4 + index;
                  const isHovered = hoveredIndex === globalIndex;
                  
                  return (
                    <div
                      key={testimonial.id}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 100 + rowIndex * 150}ms`
                      }}
                    >
                      <div className={`
                        border border-[#323745] rounded-bl-[100px] p-5 sm:p-6 md:p-7 lg:p-8 
                        min-h-[339px] bg-white 
                        transition-all duration-500 
                        ${isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-md hover:shadow-xl'}
                        ${isHovered ? 'border-[#CB3398]' : ''}
                      `}>
                        {/* Quote Mark with animation */}
                        <div className={`
                          text-[#1E1E1E] text-4xl sm:text-5xl lg:text-[47px] font-normal leading-[120%] 
                          mb-2 sm:mb-3 lg:mb-4
                          transition-all duration-500
                          ${isHovered ? 'text-[#CB3398] scale-110' : ''}
                        `}>
                          “”
                        </div>
                        
                        {/* Quote Text */}
                        <p className={`
                          text-[#1E1E1E] text-base sm:text-lg md:text-xl lg:text-[24px] font-medium leading-[120%] 
                          mb-4 sm:mb-5 lg:mb-6 line-clamp-4
                          transition-all duration-500
                          ${isHovered ? 'text-[#1E1E1E]/90' : ''}
                        `}>
                          {testimonial.quote}
                        </p>
                        
                        {/* Author */}
                        <div className="flex items-center gap-3">
                          {/* Avatar placeholder */}
                          <div className={`
                            w-10 h-10 rounded-full bg-gradient-to-br from-[#CB3398] to-[#FF6B9D] 
                            flex items-center justify-center text-white font-medium text-sm
                            transition-all duration-500
                            ${isHovered ? 'scale-110' : ''}
                          `}>
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[#323745] text-base sm:text-lg lg:text-[20px] font-normal leading-[120%]">
                              {testimonial.name}
                            </p>
                            {testimonial.role && (
                              <p className="text-[#323745]/60 text-xs sm:text-sm font-normal">
                                {testimonial.role}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        {rows.length > 1 && (
          <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {rows.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`
                  h-2 sm:h-3 rounded-full transition-all duration-300
                  ${index === activeIndex
                    ? 'w-8 sm:w-10 bg-[#CB3398]'
                    : 'w-2 sm:w-3 bg-[#CB3398]/30 hover:bg-[#CB3398]/50'
                  }
                `}
                aria-label={`Go to testimonial row ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Autoplay indicator */}
        {autoplay && (
          <div className="absolute bottom-4 right-4 text-xs text-gray-400 opacity-50">
            Autoplay
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimoniesSection;