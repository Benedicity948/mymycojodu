import React, { useState, useRef, useEffect } from 'react';
import image1 from "../assets/Images/image1.webp"
import image2 from "../assets/Images/image2.webp"
import image3 from "../assets/Images/image3.webp"
import image4 from "../assets/Images/image4.webp"
import image5 from "../assets/Images/image5.webp"
interface GalleryCard {
  id: number;
  imageUrl: string;
  title?: string;
  description?: string;
}

interface GallerySectionProps {
  cards?: GalleryCard[];
  className?: string;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

const GallerySection: React.FC<GallerySectionProps> = ({
  cards = [
    {
      id: 1,
      imageUrl: image1,
      title: 'Community Gathering',
      description: 'Coming together in faith and fellowship'
    },
    {
      id: 2,
      imageUrl: image2,
      title: 'Worship Service',
      description: 'Lifting our voices in praise'
    },
    {
      id: 3,
      imageUrl: image3,
      title: 'Youth Ministry',
      description: 'Building the next generation'
    },
    {
      id: 4,
      imageUrl:image4,
      title: 'Community Outreach',
      description: 'Serving our neighbors'
    },
    {
      id: 5,
      imageUrl: image5,
      title: 'Prayer Meeting',
      description: 'Seeking God together'
    }
  ],
  className = '',
  autoplay = true,
  autoplaySpeed = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Duplicate cards for infinite scroll effect
  const displayCards = [...cards, ...cards, ...cards];
  const totalCards = cards.length;

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoplaySpeed);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, isHovered, currentIndex]);

  // Scroll to current index
  useEffect(() => {
    if (scrollContainerRef.current) {
      const cardWidth = 327 + 20; // card width + gap
      const scrollPosition = (currentIndex + totalCards) * cardWidth - scrollContainerRef.current.clientWidth / 2 + cardWidth / 2;
      
      setIsTransitioning(true);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });

      // Reset transition state after animation
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [currentIndex, totalCards]);

  // Handle infinite scroll loop
  useEffect(() => {
    if (!isTransitioning && scrollContainerRef.current) {
      const cardWidth = 327 + 20;
      const currentScroll = scrollContainerRef.current.scrollLeft;

      // If we've scrolled past the last real card, jump to the first
      if (currentScroll > (cards.length + 1) * cardWidth) {
        setIsTransitioning(true);
        scrollContainerRef.current.scrollTo({
          left: (currentIndex + totalCards) * cardWidth - scrollContainerRef.current.clientWidth / 2 + cardWidth / 2,
          behavior: 'auto'
        });
        setTimeout(() => setIsTransitioning(false), 50);
      }
      
      // If we've scrolled before the first real card, jump to the last
      if (currentScroll < totalCards * cardWidth) {
        setIsTransitioning(true);
        scrollContainerRef.current.scrollTo({
          left: (currentIndex + totalCards * 2) * cardWidth - scrollContainerRef.current.clientWidth / 2 + cardWidth / 2,
          behavior: 'auto'
        });
        setTimeout(() => setIsTransitioning(false), 50);
      }
    }
  }, [currentIndex, isTransitioning, cards.length, displayCards.length, totalCards]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      className={`relative w-full overflow-hidden bg-gradient-to-br from-[#fff8fc] via-white to-[#f5effa] px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:px-20 lg:py-20 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto mb-8 max-w-[1276px] sm:mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a12b83]">Life at MFM Ojodu YC</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-[#27152e] sm:text-4xl lg:text-5xl">Moments together</h2>
          <a href="/gallery-page" className="text-sm font-semibold text-[#a12b83] transition hover:text-[#6f1d63]">
            Explore the gallery <span aria-hidden="true">→</span>
          </a>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[#6f6074] sm:text-lg">
          Worship, friendship, and serving our community—there’s a place for you here.
        </p>
      </div>

      {/* Gallery Container */}
      <div className="relative mx-auto max-w-[1276px]">
        {/* Cards Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-hidden scroll-smooth py-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {displayCards.map((card, index) => (
            <div
              key={`${card.id}`}
              className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[327px] h-[360px] sm:h-[400px] md:h-[430px] rounded-[24px] border border-[#f0e0ef] overflow-hidden relative group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              onClick={() => handleCardClick(index % totalCards)}
              style={{
                backgroundImage: `url(${card.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211126]/85 via-[#211126]/10 to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 transition-transform duration-300">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-medium mb-1">
                  {card.title || `Image ${card.id}`}
                </h3>
                <p className="text-white/80 text-sm sm:text-base">
                  {card.description || 'Discover more'}
                </p>
              </div>

              {/* Card number badge */}
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                {index % totalCards + 1}/{totalCards}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#4a2050] w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#CB3398] backdrop-blur-sm z-10"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#4a2050] w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#CB3398] backdrop-blur-sm z-10"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 sm:w-10 bg-[#CB3398]'
                  : 'w-2 sm:w-3 bg-[#CB3398]/30 hover:bg-[#CB3398]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Autoplay indicator */}
    
    </section>
  );
};

export default GallerySection;