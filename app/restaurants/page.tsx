import { restaurants as restaurantsMock } from "../mocks";
import dynamic from "next/dynamic";
import { getRestaurants } from "../services/restaurants";
import RestaurantContainer from "./components/RestaurantContainer";
import { Suspense } from "react";
import RestaurantSkeleton from "./components/RestaurantSkeleton";
import { RestaurantList } from "../lib/definitions";

export default async function Page() {
  const restaurantsResponse: RestaurantList = await getRestaurants({
    page: "1",
  });
  const restaurants = restaurantsResponse.restaurantList;

  return (
    <main id="restaurants" className="w-full h-full">
      <RestaurantContainer restaurants={restaurants} />
    </main>
  );
}
