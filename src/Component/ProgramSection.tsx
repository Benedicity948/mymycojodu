import React from "react";
import culturalSunday from "../assets/Images/culturalSunday.jpeg";
import hymnSunday from "../assets/Images/hymnsunday.jpeg";
import loveFeast from "../assets/Images/lovefeast.jpeg";

interface Programme {
  title: string;
  subtitle: string;
  date: string;
  dateTime: string;
  time: string;
  image: string;
  imageAlt: string;
  venue: string;
}

interface ProgrammesSectionProps {
  className?: string;
}

const programmes: Programme[] = [
  {
    title: "Community Hymn Service",
    subtitle: "A morning of worship through hymns",
    date: "Sunday, 22 November 2026",
    dateTime: "2026-11-22",
    time: "8:00 AM",
    image: hymnSunday,
    imageAlt: "Community Hymn Service programme poster",
    venue: "2nd Floor, 18 Baale Street, off Adebowale Street, Grammar School Bus-Stop, Ojodu, Lagos",
  },
  {
    title: "Cultural Thanksgiving Sunday",
    subtitle: "Every Tribe, Every Tongue 2026 · Native attire",
    date: "Sunday, 6 December 2026",
    dateTime: "2026-12-06",
    time: "8:00 AM",
    image: culturalSunday,
    imageAlt: "Cultural Thanksgiving Sunday programme poster",
    venue: "2nd Floor, 18 Baale Street, off Adebowale Street, Grammar School Bus-Stop, Ojodu, Lagos",
  },
  {
    title: "Annual Love Feast 2026",
    subtitle: "Theme: Oneness in Jesus",
    date: "Sunday, 20 December 2026",
    dateTime: "2026-12-20",
    time: "3:00 PM",
    image: loveFeast,
    imageAlt: "Annual Love Feast 2026 programme poster",
    venue: "Church Auditorium",
  },
];

const ProgramSection: React.FC<ProgrammesSectionProps> = ({ className = "" }) => (
  <section
    id="program"
    aria-labelledby="programmes-heading"
    className={`relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-20 lg:py-24 ${className}`}
  >
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-tight text-slate-50"
    >
      PROGRAMMES
    </span>

    <div className="relative z-10 mx-auto max-w-[1276px]">
      <header className="mb-10 flex flex-col gap-4 sm:mb-12 md:mb-14">
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-700">
          Upcoming programmes
        </p>
        <h2
          id="programmes-heading"
          className="max-w-3xl font-sans text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl md:text-5xl"
        >
          Special gatherings. Meaningful moments.
        </h2>
        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Mark your calendar for these special times of worship, thanksgiving,
          and fellowship.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {programmes.map((programme) => (
          <article
            key={programme.dateTime}
            className="flex min-w-0 overflow-hidden rounded-2xl bg-slate-100"
          >
            <div className="relative w-[38%] min-w-[104px] max-w-[220px] shrink-0 self-stretch bg-white">
              <img
                src={programme.image}
                alt={programme.imageAlt}
                className="absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-4 sm:gap-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <time
                  dateTime={programme.dateTime}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm"
                >
                  {programme.date}
                </time>
                <time
                  dateTime={programme.time === "8:00 AM" ? "08:00" : "15:00"}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm"
                >
                  {programme.time}
                </time>
              </div>
              <div>
                <h3 className="font-sans text-lg font-bold leading-snug text-slate-950 sm:text-xl">
                  {programme.title}
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-600">
                  {programme.subtitle}
                </p>
              </div>
              <p className="text-sm leading-5 text-slate-700">
                <span className="font-semibold text-blue-700">Venue: </span>
                {programme.venue}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramSection;
