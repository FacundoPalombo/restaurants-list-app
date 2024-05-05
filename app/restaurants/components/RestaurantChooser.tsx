"use client";

import { Restaurant } from "@/app/lib/definitions";

import { createContext, useState } from "react";
import Map from "./Map";
import RestaurantsCarousel from "./RestaurantsCarousel";

export const RestaurantContext = createContext("");

export default function RestaurantChooser({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <RestaurantContext.Provider value={selectedRestaurant}>
      <Map restaurants={restaurants} setRestaurant={setSelectedRestaurant} />
      <RestaurantsCarousel
        restaurants={restaurants}
        setRestaurant={setSelectedRestaurant}
      />
    </RestaurantContext.Provider>
  );
}
