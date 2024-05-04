import { restaurants as restaurantsMock } from "../mocks";
import dynamic from "next/dynamic";
import RestaurantsCarousel from "./components/RestaurantsCarousel";
import { getRestaurants } from "../services/restaurants";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => <p>Loading maps...</p>,
});

export default function Restaurants() {
  // const restaurants = await getRestaurants();

  return (
    <main id="restaurants" className="w-full h-full">
      <Map restaurants={restaurantsMock.restaurantList} />
      <RestaurantsCarousel restaurants={restaurantsMock.restaurantList} />
    </main>
  );
}
