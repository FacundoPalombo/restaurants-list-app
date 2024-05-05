import { getRestaurantDetail } from "@/app/services/restaurants";
import Hero from "./components/Hero";
import Review from "./components/Review";
import { Suspense } from "react";

export default async function Page({ params }) {
  const { id } = params;
  const restaurant = await getRestaurantDetail({ id });

  return (
    <main id="restaurant-detail">
      <Suspense fallback={<div>loading restaurant...</div>}>
        <Hero {...restaurant} />
      </Suspense>
    </main>
  );
}
