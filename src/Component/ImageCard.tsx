import React, { useEffect, useRef, useState } from "react";

interface ImageCardProps {
  title: string;
  imageUrl: string;
  imageAlt: string;
  eyebrow?: string;
  description?: string;
  badge?: string;
  className?: string;
  delay?: number;
}

const ImageCard: React.FC<ImageCardProps> = ({
  title,
  imageUrl,
  imageAlt,
  eyebrow,
  description,
  badge,
  className = "",
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative isolate overflow-hidden rounded-[28px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#351633]/20 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <img
        src={imageUrl}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1a1020]/90 via-[#211126]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#c53291] via-[#ef69bd] to-[#f3bd69] transition-all duration-500 group-hover:h-2" />
      {badge && (
        <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#28182c]/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:left-7 sm:top-7">
          {badge}
        </span>
      )}
      <div className="absolute inset-x-5 bottom-7 z-10 flex flex-col gap-2 sm:inset-x-7 sm:bottom-9">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f6c3e5]">
            {eyebrow}
          </p>
        )}
        <h3 className="text-2xl leading-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h3>
        {description && (
          <p className="text-base font-medium text-white/80 sm:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
