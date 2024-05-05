import { restaurants as restaurantsMock } from "../mocks";
import dynamic from "next/dynamic";
import { getRestaurants } from "../services/restaurants";
import RestaurantChooser from "./components/RestaurantChooser";

export default function Restaurants() {
  // const restaurants = await getRestaurants();

  return (
    <main id="restaurants" className="w-full h-full">
      <RestaurantChooser restaurants={restaurantsMock.restaurantList} />
    </main>
  );
}
