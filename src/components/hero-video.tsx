"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current?.pause();
  }, []);

  // Phones get a single vertical cut; wider screens get the three-column reel.
  return (
    <video
      ref={ref}
      poster="/hero-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src="/hero-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
