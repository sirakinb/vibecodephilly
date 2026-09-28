"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/data/site";

export function PhotoGrid({ photos, title, date }: { photos: Photo[]; title: string; date: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpen(i)}
            className="relative aspect-[16/10] cursor-zoom-in overflow-hidden rounded-lg bg-base-2 focus-visible:outline-2 focus-visible:outline-pink"
          >
            <Image
              src={photo.src}
              alt={`${title}, photo ${i + 1}`}
              fill
              sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
              className="object-cover object-[50%_30%] transition duration-300 hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] p-4 md:p-10"
        >
          <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
            <Image
              key={current.src}
              src={current.src}
              alt={`${title}, photo ${open + 1}`}
              width={current.w}
              height={current.h}
              sizes="100vw"
              className="max-h-full w-auto max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
              priority
            />
          </div>
          <div className="mt-5 text-center text-sm" onClick={(e) => e.stopPropagation()}>
            <p className="text-white">{title}</p>
            <p className="mt-1 text-white/50">
              {date} · {open + 1} / {photos.length}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-2xl text-white/70 hover:text-white"
          >
            ×
          </button>
          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-6"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-6"
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
