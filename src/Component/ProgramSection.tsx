import React from 'react';
import program1 from "../assets/Images/program1.webp";
import program2 from "../assets/Images/program2.jpeg";
import ImageCard from "./ImageCard";

interface Program {
  day: string;
  title: string;
  time: string;
  imageUrl: string;
  imageAlt: string;
}

interface ProgramsSectionProps {
  className?: string;
}

const programs: Program[] = [
  {
    day: "Sundays",
    title: "Sunday Worship Service",
    time: "7:30 AM",
    imageUrl: program1,
    imageAlt: "Youth church members gathered for Sunday worship",
  },
  {
    day: "Tuesdays",
    title: "Bible Study & Prayer",
    time: "6:00 PM",
    imageUrl: program2,
    imageAlt: "Youth church members gathered for Bible study and prayer",
  },
  {
    day: "Wednesdays",
    title: "Manna Water Service",
    time: "4:30 PM",
    imageUrl: program1,
    imageAlt: "Youth church members gathered for a midweek service",
  },
];

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ 
  className = '',
}) => {
  return (
    <section id='program' className={`relative w-full overflow-hidden bg-gradient-to-br from-[#fff2fa] via-[#fffafe] to-[#f1eafa] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-20 lg:py-24 ${className}`}>
      <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[#CB3398]/10 blur-3xl animate-pulse-slow" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#8c5ab2]/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1276px] mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a12b83]">Grow together</p>
          <div className="flex flex-col gap-4">
            <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#27152e] sm:text-4xl md:text-5xl lg:text-6xl">
              Youth Church Programs in Ojodu
            </h2>
            <p className="max-w-3xl text-base leading-7 text-[#6f6074] sm:text-lg sm:leading-8">
              Discover weekly worship, Bible study, prayer meetings, and spiritual growth programs designed to strengthen faith and build a strong Christian community.
            </p>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <ImageCard
              key={program.day}
              badge="Weekly gathering"
              eyebrow={program.day}
              title={program.title}
              description={program.time}
              imageUrl={program.imageUrl}
              imageAlt={program.imageAlt}
              className={`h-[360px] sm:h-[410px] ${index === 2 ? "md:col-span-2 lg:col-span-1" : ""}`}
              delay={index * 200}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;