"use client";

import React from "react";
import ContentLoader from "react-content-loader";

export default function RestaurantSkeleton(props: any) {
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
  function RectangleMap({ index }: { index: number }) {
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
      {[1, 2, 3, 4, 5, 6].map((item, index) => (
        <Card index={index} key={item} />
      ))}
      {[1, 2, 3].map((item, index) => (
        <RectangleMap index={index} key={item} />
      ))}
    </ContentLoader>
  );
}
