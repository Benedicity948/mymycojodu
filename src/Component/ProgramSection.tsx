import React, { useEffect, useRef, useState } from 'react';
import program1 from "../assets/Images/program1.webp";
import program2 from "../assets/Images/program2.jpeg";

interface ProgramCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt?: string;
  className?: string;
  delay?: number;
}

interface ProgramsSectionProps {
  className?: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = 'Program image',
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className={`relative bg-[#F9F9F9] border border-[#323745] rounded-3xl overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with zoom effect */}
      <div 
        className="absolute top-5 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] h-[calc(100%-166px)] rounded-2xl overflow-hidden"
      >
        <img 
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Content */}
      <div className="absolute bottom-0 left-6 right-6 flex flex-col gap-2 z-10 mt-10">
        <h3 className="text-[#1E1E1E] text-3xl sm:text-4xl lg:text-[40px] font-medium leading-[120%] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#1E1E1E] text-xl sm:text-2xl lg:text-[32px] font-normal leading-[120%] group-hover:text-white/90 transition-colors duration-300">
          {subtitle}
        </p>
        
  
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#CB3398] group-hover:w-full transition-all duration-700" />
      
      {/* Day badge */}
      <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-[#1E1E1E] shadow-lg">
        {title}
      </div>
    </div>
  );
};

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ 
  className = '',
}) => {
  return (
    <section id='program' className={`w-full px-4 sm:px-6 md:px-8 lg:px-20 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden ${className}`}>
      {/* Background decorations */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#CB3398]/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1276px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-12 md:mb-16">
          <div className="flex flex-col gap-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[60px] font-medium leading-[120%] text-[#1E1E1E] relative inline-block">
              Youth Church Programs in Ojodu
            </h2>
            <p className="text-xl sm:text-2xl lg:text-[32px] font-medium leading-[120%] text-[#1E1E1E] opacity-80">
              Discover weekly worship, Bible study, prayer meetings, and spiritual growth programs designed to strengthen faith and build a strong Christian community.
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Left Card - Sundays (Full height) */}
          <div className="lg:flex-1">
            <ProgramCard
              title="Sundays"
              subtitle="Sunday Worship Service | 7:30AM"
              imageUrl={program1}
              className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[710px]"
              delay={0}
            />
          </div>

          {/* Right Column */}
          <div className="lg:flex-1 flex flex-col gap-5">
            {/* Tuesdays Card */}
            <ProgramCard
              title="Tuesdays"
              subtitle="Bible Study & Prayer | 6:00PM"
              imageUrl={program2}
              className="w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[349px]"
              delay={200}
            />

            {/* Wednesdays Card */}
            <ProgramCard
              title="Wednesdays"
              subtitle="Manna Water Service | 4:30PM"
              imageUrl={  program1} // Fallback to program1 if program3 doesn't exist
              className="w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[349px]"
              delay={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;