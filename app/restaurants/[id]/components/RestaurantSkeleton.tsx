"use client";

import ContentLoader from "react-content-loader";

export default function RestaurantDetailSkeleton({}) {
  const width = global?.window?.innerWidth;
  const height = global?.window?.innerHeight;

  function Hero() {
    return (
      <rect
        x={`${0}`}
        y={`${0}`}
        rx="12"
        ry="12"
        width={`${width - 32}`}
        height={`${height - 32}`}
      />
    );
  }
  return (
    <ContentLoader
      speed={2}
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#e6e6e6"
      foregroundColor="#8c8c8c"
    >
      <Hero />
    </ContentLoader>
  );
}
