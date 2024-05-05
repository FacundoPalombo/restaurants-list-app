"use client";

import { Restaurant } from "@/app/lib/definitions";

import { Suspense, createContext, useState } from "react";
import Map, { INITIAL_POSITION } from "./Map";
import Carousel from "./Carousel";
import { LatLngExpression } from "leaflet";
import RestaurantSkeleton from "./RestaurantSkeleton";

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
    <Suspense fallback={<RestaurantSkeleton />}>
      <RestaurantContext.Provider
        value={[selectedRestaurant, INITIAL_POSITION]}
      >
        <Map restaurants={restaurants} setRestaurant={setSelectedRestaurant} />
        <Carousel
          restaurants={restaurants}
          setRestaurant={setSelectedRestaurant}
        />
      </RestaurantContext.Provider>
    </Suspense>
  );
}
