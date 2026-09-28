import Image from "next/image";
import type { Photo } from "@/data/site";

// Masonry via CSS columns keeps every photo at its natural aspect ratio.
export function Gallery({ photos, alt }: { photos: Photo[]; alt: string }) {
  return (
    <div className="columns-2 gap-3 md:columns-3 lg:columns-4 [&>*]:mb-3">
      {photos.map((photo, i) => (
        <div key={photo.src} className="overflow-hidden rounded-xl bg-ink-2 break-inside-avoid">
          <Image
            src={photo.src}
            alt={`${alt} — photo ${i + 1}`}
            width={photo.w}
            height={photo.h}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="h-auto w-full transition duration-500 hover:scale-[1.03]"
          />
        </div>
      ))}
    </div>
  );
}
