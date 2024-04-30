import Image from "next/image";
import TailorCard from "./components/TailorCard";
import restaurantPic from "./assets/restaurant.jpeg";

export default function Home() {
  return (
    <main className="flex relative h-full flex-col items-stretch justify-between p-2 gap-4 md:flex-row-reverse md:items-end">
      <div className="block relative h-full w-full md:w-1/2 min-h-48">
        <Image
          className="object-cover object-bottom rounded-xl md:h-full"
          src={restaurantPic}
          alt="Restaurant"
          fill
        />
      </div>
      <div className="w-full md:w-1/2">
        <TailorCard />
      </div>
    </main>
  );
}
