import { useEffect, useRef, useState } from "react";
import logo from "../assets/Images/logo.webp";
import { theme } from "../theme";

const InitialLoader = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const logoRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setIsExiting(true), 1600);
    const removeTimer = window.setTimeout(() => setIsVisible(false), 2050);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animations = prefersReducedMotion
      ? []
      : [
          logoRef.current?.animate(
            [
              { transform: "translateY(0) scaleX(1) scaleY(1)" },
              { transform: "translateY(-1rem) scaleX(0.98) scaleY(1.02)", offset: 0.35 },
              { transform: "translateY(0) scaleX(1.08) scaleY(0.92)", offset: 0.62 },
              { transform: "translateY(-0.25rem) scaleX(0.99) scaleY(1.01)", offset: 0.78 },
              { transform: "translateY(0) scaleX(1) scaleY(1)" },
            ],
            { duration: 900, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)", iterations: Infinity },
          ),
          shadowRef.current?.animate(
            [
              { transform: "scaleX(1)", opacity: 0.75 },
              { transform: "scaleX(0.72)", opacity: 0.35, offset: 0.35 },
              { transform: "scaleX(1.16)", opacity: 0.9, offset: 0.62 },
              { transform: "scaleX(0.9)", opacity: 0.6, offset: 0.78 },
              { transform: "scaleX(1)", opacity: 0.75 },
            ],
            { duration: 900, easing: "ease-in-out", iterations: Infinity },
          ),
        ].filter((animation): animation is Animation => animation !== undefined);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      animations.forEach((animation) => animation.cancel());
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        background: theme.gradients.loader,
        opacity: isExiting ? 0 : 1,
        visibility: isExiting ? "hidden" : "visible",
        transition: "opacity 450ms ease, visibility 450ms ease",
      }}
      role="status"
      aria-label="Loading MFM Ojodu Youth Church"
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(72vw, 34rem)",
          aspectRatio: "1",
          border: "1px solid rgb(164 43 131 / 8%)",
          borderRadius: "50%",
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(54vw, 25rem)",
          aspectRatio: "1",
          border: "1px solid rgb(164 43 131 / 10%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img
          ref={logoRef}
          src={logo}
          alt="MFM Ojodu Youth Church"
          style={{
            width: "clamp(3rem, 10vw, 4rem)",
            height: "auto",
            filter: "drop-shadow(0 8px 10px rgb(80 23 68 / 12%))",
          }}
        />
        <span
          ref={shadowRef}
          aria-hidden="true"
          style={{
            width: "clamp(2.25rem, 8.5vw, 3.2rem)",
            height: "0.5rem",
            marginTop: "-0.25rem",
            borderRadius: "50%",
            background: "rgb(67 24 58 / 24%)",
            filter: "blur(7px)",
          }}
        />
        <p
          style={{
            margin: "0.25rem 0 0",
            color: theme.colors.plum,
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          MFM Ojodu Youth Church
        </p>
      </div>
    </div>
  );
};

export default InitialLoader;
