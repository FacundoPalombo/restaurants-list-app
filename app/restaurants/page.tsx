import { restaurants as restaurantsMock } from "../mocks";
import dynamic from "next/dynamic";
import { getRestaurants } from "../services/restaurants";
import RestaurantContainer from "./components/RestaurantContainer";

export default function Restaurants() {
  // const restaurants = await getRestaurants();

  return (
    <main id="restaurants" className="w-full h-full">
      <RestaurantContainer restaurants={restaurantsMock.restaurantList} />
    </main>
  );
}
