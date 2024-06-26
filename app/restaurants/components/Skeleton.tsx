"use client";

import React from "react";
import ContentLoader from "react-content-loader";

// Si viniste a esta pagina y todavía estan rotos los skeletons, estoy probando esta librería y se rompen todo, suelo hacer los skeletons normalmente con html mas que con svg.

export default function Skeleton(props: any) {
  const width = global?.window?.innerWidth;
  const height = global?.window?.innerHeight;

  return (
    <ContentLoader
      speed={2}
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#e6e6e6"
      foregroundColor="#8c8c8c"
      {...props}
    >
      <MapSkeleton />
      <CarouselSkeleton />
    </ContentLoader>
  );
}

export function CarouselSkeleton() {
  const cardWidth = 256;
  const cardHeight = 358;

  function Card({ index }: { index: number }) {
    return (
      <rect
        x={`${cardWidth * index + 32 * index}`}
        y={`${global?.window?.innerHeight - 126 - cardHeight}`}
        rx="12"
        ry="12"
        width={`${cardWidth}`}
        height={`${cardHeight}`}
      />
    );
  }
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <Card index={index} key={item} />
      ))}
    </>
  );
}

export function MapSkeleton() {
  const width = global?.window?.innerWidth;
  const height = global?.window?.innerHeight;

  function Map({ index }: { index: number }) {
    return (
      <rect
        x="16"
        y={`${128 + 16 * index + 32 * index}`}
        rx="12"
        ry="12"
        width={`${global?.window?.innerWidth - 64}`}
        height="28"
      />
    );
  }
  return (
    <>
      {[1, 2, 3].map((item, index) => (
        <Map index={index} key={item} />
      ))}
    </>
  );
}
