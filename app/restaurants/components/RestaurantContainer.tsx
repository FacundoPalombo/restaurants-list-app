"use client";

import { Restaurant } from "@/app/lib/definitions";

import { Suspense, createContext, useState } from "react";
import Map, { INITIAL_POSITION } from "./Map";
import Carousel from "./Carousel";
import { LatLngExpression } from "leaflet";
import { CarouselSkeleton, MapSkeleton } from "./Skeleton";

export const RestaurantContext = createContext<[string, LatLngExpression]>([
  "",
  INITIAL_POSITION,
]);

export default function RestaurantContainer({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <RestaurantContext.Provider value={[selectedRestaurant, INITIAL_POSITION]}>
      <Suspense fallback={<MapSkeleton />}>
        <Map restaurants={restaurants} setRestaurant={setSelectedRestaurant} />
      </Suspense>
      <Suspense fallback={<CarouselSkeleton />}>
        <Carousel
          restaurants={restaurants}
          setRestaurant={setSelectedRestaurant}
        />
      </Suspense>
    </RestaurantContext.Provider>
  );
}
