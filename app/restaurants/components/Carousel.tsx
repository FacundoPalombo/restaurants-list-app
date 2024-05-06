"use client";

import styles from "./Carousel.module.css";
import Star from "@/app/components/svg/Star";
import { Restaurant } from "@/app/lib/definitions";
import React, {
  Suspense,
  WheelEventHandler,
  useContext,
  useEffect,
  useRef,
} from "react";

import clsx from "clsx";
import { RestaurantContext } from "./RestaurantContainer";

// #region Restaurant
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
        "flex flex-row border-box w-[272px] h-[358px] text-white cursor-pointer"
      )}
    >
      <div
        className={clsx(
          styles.scroll,
          "block relative box-border w-full h-full rounded-3xl",
          "hover:shadow-lg"
        )}
        style={{
          backgroundColor: "lightgrey",
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="relative box-content flex flex-col justify-end flex-wrap mx-4 w-full h-full">
          <div className="relative box-content flex flex-col justify-end flex-wrap pb-4 w-[256px]">
            <h2 className="drop-shadow-lg text-xl font-semibold">{name}</h2>
            <h3 className="drop-shadow-lg text-xl">{address}</h3>
            <div className="flex flex-row w-fit relative bg-gradient-to-r">
              <div
                className="block absolute bg-gradient-to-r bg-cyan-400"
                style={{
                  mask: "#264BEB",
                  width: `calc(${avgRating} * 100%)`,
                }}
              ></div>
              {[1, 2, 3, 4, 5].map((stars, k) => (
                <Star
                  className="relative drop-shadow-lg"
                  fill={Math.round(avgRating) >= stars ? "#264BEB" : "white"}
                  key={k}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type CarouselProps = {
  restaurants: Restaurant[];
  setRestaurant: Function;
};

// #region Carousel
export default function Carousel({
  restaurants,
  setRestaurant,
}: CarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [activeSlide] = useContext(RestaurantContext);

  const slidesRef = useRef<Record<string, HTMLButtonElement>>({});

  // Trigger focus update on change selected restaurant
  useEffect(() => {
    if (activeSlide) {
      slidesRef?.current[activeSlide].focus();
    }
  }, [activeSlide]);

  // Maneja el evento de desplazamiento vertical para convertirlo en horizontal en el carousel
  const handleHorizontalScroll: WheelEventHandler<HTMLUListElement> = (
    event
  ) => {
    const verticalScrollAmount = event.deltaY;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += verticalScrollAmount;
    }
  };

  //TODO: Posicionar los elementos del carousel en función a la posicion y a la funcion seno.

  return (
    <div
      id="slides"
      style={{ zIndex: 1000 }}
      className="absolute bottom-2 left-0 h-max w-[100vw]"
    >
      <ul
        className="relative flex flex-row gap-12 overflow-scroll py-6"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          scrollbarGutter: "unset",
        }}
        ref={scrollRef}
        onWheel={handleHorizontalScroll}
      >
        {restaurants.map((props, index) => (
          <li className="h-max first-of-type:ml-6" key={props._id}>
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
