"use client";

import styles from "./RestaurantsCarousel.module.css";
import Star from "@/app/components/svg/Star";
import { Restaurant } from "@/app/lib/definitions";
import React, {
  WheelEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import clsx from "clsx";
import { RestaurantContext } from "./RestaurantChooser";

function RestaurantComponent({
  latlng,
  address,
  _id,
  name,
  owner,
  image,
  reviews,
  avgRating,
}: Restaurant) {
  return (
    <section
      className={clsx(
        "flex flex-row border-box w-[272px] h-[358px] text-white  active:outline-2 active:outline-red-200 cursor-pointer"
      )}
    >
      <div
        className={clsx(
          styles.scroll,
          "block relative w-full h-full rounded-3xl"
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
      </div>
    </section>
  );
}

type RestaurantsCarouselProps = {
  restaurants: Restaurant[];
  setRestaurant: Function;
};

export default function RestaurantsCarousel({
  restaurants,
  setRestaurant,
}: RestaurantsCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const activeSlide = useContext(RestaurantContext);

  const slidesRef = useRef({});

  // Trigger focus update on change selected restaurant
  useEffect(() => {
    if (activeSlide) {
      slidesRef?.current[activeSlide].focus();
      console.log(activeSlide);
    }
  }, [activeSlide]);

  // Maneja el evento de desplazamiento vertical para convertirlo en horizontal en el carousel
  const handleHorizontalScroll: WheelEventHandler<HTMLUListElement> = (
    event
  ) => {
    const verticalScrollAmount = event.deltaY;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += verticalScrollAmount;
      console.log(slidesRef);
    }
  };

  // Posicionar los elementos del carousel en función a la posicion y a la funcion seno.

  // Manejar el current element para mostrar el marker en el mapa con informacion extra del restaurante.

  return (
    <div
      id="slides"
      style={{ zIndex: 1000 }}
      className="absolute bottom-2 left-0 h-max w-[100vw]"
    >
      <ul
        className="relative flex flex-row gap-12 overflow-scroll py-6 whitespace-nowrap"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          scrollbarGutter: "unset",
        }}
        ref={scrollRef}
        onWheel={handleHorizontalScroll}
      >
        {restaurants.map((props, index) => (
          <li className="h-max" key={props._id}>
            <button
              onClick={() => setRestaurant(props._id)}
              aria-current={activeSlide === props._id}
              ref={(element) => {
                if (element) {
                  slidesRef.current[props._id] = element;
                } else {
                  delete slidesRef.current[props._id];
                }
              }}
              className="relative rounded-3xl flex flex-col h-fit text-left focus:shadow-lg  active:shadow-stone-700 focus:shadow-stone-700 transition-shadow"
            >
              <RestaurantComponent {...props} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
