import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

type MainBoxes = {
  picture: { src: string | StaticImport; alt: string };
  children: React.ReactNode;
};

export default function MainBoxes({ picture, children }: MainBoxes) {
  const { alt, src } = picture;

  return (
    <main className="flex relative h-full flex-col items-stretch justify-between p-2 gap-4 md:flex-row-reverse md:items-end">
      <div className="block relative h-full w-full md:w-1/2 min-h-48">
        <Image
          className="object-cover object-bottom rounded-xl md:h-full"
          src={src}
          alt={alt}
          fill
        />
      </div>
      <div className="w-full md:w-1/2">{children}</div>
    </main>
  );
}
