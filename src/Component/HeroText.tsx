import React from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showDecorations?: boolean;
  backgroundColor?: string;
  backgroundImage?: string;
  subtitle2?: string;
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Surely the Lord is in this place",
  subtitle = "A place of faith, hope, and love where lives are transformed and purpose is discovered.",
  subtitle2 = "MFM OJODU YC",
  showDecorations = true,
  backgroundColor = "transparent",
  backgroundImage = "https://mfmstorage.blob.core.windows.net/mfmwebsite/images/MFM.jpg",
}) => {
  return (
    <>
      <section
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-6 pt-24 sm:px-8 sm:pb-8 sm:pt-28 lg:px-20"
        style={{ backgroundColor }}
      >
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211126]/95 via-[#32132f]/80 to-[#511744]/35" />
        {showDecorations && (
          <>
            <div className="absolute -right-28 -top-36 -z-10 h-[440px] w-[440px] rounded-full bg-[#df55b0]/25 blur-3xl" />
            <div className="absolute -bottom-48 left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-[#6d42a1]/25 blur-3xl" />
          </>
        )}

        <div className="relative z-10 mx-auto flex w-full max-w-[1276px] flex-1 items-center py-10 sm:py-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#f3b9df]" />
              {subtitle2}
            </span>
            <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[86px]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl sm:leading-9 md:text-2xl">
              {subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/2347072926162"
                className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#c53291] to-[#ef69bd] px-7 text-base font-semibold text-white shadow-lg shadow-[#a12779]/30 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Plan your visit
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#program"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore our programs
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1276px] rounded-3xl border border-white/35 bg-white/85 p-5 shadow-[0_20px_60px_-36px_rgba(30,12,34,0.55)] backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a12b83]">Make room for faith</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#27152e] sm:text-3xl">Gather with us</h2>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-3 md:max-w-[820px]">
              {[
                { day: "Sunday", service: "Worship Service", time: "7:30 AM" },
                { day: "Tuesday", service: "Bible Study & Prayer", time: "6:00 PM" },
                { day: "Wednesday", service: "Manna Water Service", time: "4:30 PM" },
              ].map((gathering) => (
                <a
                  key={gathering.day}
                  href="#program"
                  className="group rounded-2xl border border-[#f1e7f1] bg-gradient-to-br from-white/95 to-[#fff8fc]/90 p-4 transition hover:-translate-y-1 hover:border-[#d9b2d1] hover:shadow-lg hover:shadow-[#71265f]/10"
                >
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-[#a12b83]">{gathering.day}</span>
                  <span className="mt-2 block font-semibold text-[#2b1b31]">{gathering.service}</span>
                  <span className="mt-1 block text-sm text-[#725f78]">{gathering.time}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
