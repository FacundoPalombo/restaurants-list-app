import { restaurants as restaurantsMock } from "../mocks";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => <p>Loading maps...</p>,
});

export default function Restaurants() {
  return (
    <main id="restaurants" className="w-full h-full rounded-2xl">
      <div className="rounded-2xl overflow-hidden w-full h-full">
        <Map />
      </div>
    </main>
  );
}
