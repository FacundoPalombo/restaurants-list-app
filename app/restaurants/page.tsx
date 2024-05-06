import { getRestaurants } from "../services/restaurants";
import RestaurantContainer from "./components/RestaurantContainer";
import { RestaurantList } from "../lib/definitions";
import { Suspense } from "react";
import Skeleton from "./components/Skeleton";

export default async function Page() {
  const restaurantsResponse: RestaurantList = await getRestaurants({
    page: "1",
  });
  const restaurants = restaurantsResponse.restaurantList;

  return (
    <main id="restaurants" className="overflow-hidden w-full h-[90vh]">
      <Suspense fallback={<Skeleton />}>
        <RestaurantContainer restaurants={restaurants} />
      </Suspense>
    </main>
  );
}
