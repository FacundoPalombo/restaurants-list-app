"use client";
import { RestaurantDetail } from "@/app/lib/definitions";
import Image from "next/image";
import { FloatingActions } from "./FloatingActions";

export default function Hero({ image, address, name, _id }: RestaurantDetail) {
  return (
    <section id="hero" className="h-max w-full mb-6 px-6 max-w-[944px]">
      <FloatingActions />
      <div className="relative w-full h-[33vh] sm:h-[66vh] lg:h-[80vh] rounded-3xl overflow-hidden">
        <Image src={image} alt={name} fill />
        <hgroup className="absolute m-auto w-full h-full flex flex-col justify-center items-center gap-4 text-white text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">
          <h1 className="drop-shadow-lg text-4xl sm:text-5xl md:text-6xl">
            {name}
          </h1>
          <h2 className="drop-shadow-lg text-xl">{address}</h2>
        </hgroup>
      </div>

      {/* aca debería ir una descripcion pero la api no lo devuelve asi que devuelvo un lorem <p>{description}</p> */}
      <p className="py-4 mx-auto text-lg sm:text-xl">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi eos
        perspiciatis fuga iste quod et sequi labore est enim, delectus tenetur
        aliquid, fugiat quos ea soluta tempore cumque voluptates officiis? Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Praesentium omnis
        illo quo eligendi est similique qui, deleniti, accusamus molestias sed
        inventore aliquam sapiente corrupti porro non. Beatae sed non totam!
        lorem
      </p>
    </section>
  );
}
