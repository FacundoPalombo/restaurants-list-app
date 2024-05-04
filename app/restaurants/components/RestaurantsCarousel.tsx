"use client";

import styles from "./RestaurantsCarousel.module.css";
import Star from "@/app/components/svg/Star";
import { Restaurant } from "@/app/lib/definitions";
import { WheelEventHandler, useRef, useState } from "react";

import clsx from "clsx";
import Link from "next/link";

type RestaurantsCarouselProps = {
  restaurants: Restaurant[];
};

export default function RestaurantsCarousel({
  restaurants,
}: RestaurantsCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Maneja el evento de desplazamiento vertical para convertirlo en horizontal en el carousel
  const handleHorizontalScroll: WheelEventHandler<HTMLDivElement> = (event) => {
    const verticalScrollAmount = event.deltaY;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft += verticalScrollAmount / 2;
    }
  };

  return (
    <div
      id="slides"
      style={{ zIndex: 1000 }}
      className="absolute bottom-4 left-0 w-[100vw] overflow-hidden"
    >
      <div
        className="flex flex-row gap-12 overflow-x-scroll whitespace-nowrap"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          scrollbarGutter: "unset",
        }}
        ref={scrollRef}
        onWheel={handleHorizontalScroll}
      >
        {restaurants.map(
          (
            { latlng, address, _id, name, owner, image, reviews, avgRating },
            index
          ) => (
            <Link href={`/restaurants/${_id}`}>
              <div
                key={_id}
                className={clsx(
                  "flex flex-row border-box w-[272px] h-[358px] text-white  active:outline-2 active:outline-red-200",
                  activeSlide && "border-2 border-blue-200"
                )}
              >
                <section
                  className={clsx(
                    styles.scroll,
                    "block relative w-full h-full rounded-3xl overflow-hidden"
                  )}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="-mt-4 ml-4 flex flex-col justify-end w-full h-full">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <h3 className="text-xl">{address}</h3>
                    <div className="flex flex-row w-fit relative bg-gradient-to-r">
                      <div
                        className="block absolute bg-gradient-to-r bg-cyan-400"
                        style={{
                          mask: "#264BEB",
                          width: `calc(${avgRating} * 100%)`,
                        }}
                      ></div>
                      {[5, 4, 3, 2, 1].map((m, k) => (
                        <Star
                          className="relative"
                          fill={avgRating < m ? "#264BEB" : "white"}
                          key={k}
                        />
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
