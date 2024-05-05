import { getRestaurantDetail } from "@/app/services/restaurants";
import Hero from "./components/Hero";
import ReviewComponent from "./components/Review";
import { Suspense } from "react";
import RestaurantDetailSkeleton from "./components/RestaurantSkeleton";
import { Review } from "@/app/lib/definitions";

export default async function Page({ params }) {
  const { id } = params;
  const restaurant = await getRestaurantDetail({ id });

  return (
    <main id="restaurant-detail" className="px-6">
      <Suspense fallback={<RestaurantDetailSkeleton />}>
        <Hero {...restaurant} />
        <div className="flex flex-col gap-4">
          {restaurant.reviews?.map((review: Review) => (
            <ReviewComponent key={review._id} {...review} />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
