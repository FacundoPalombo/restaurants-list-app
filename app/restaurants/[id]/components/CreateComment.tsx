"use client";
import { create } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import { TextArea } from "@/app/components/TextArea";
import Cross from "@/app/components/svg/Cross";
import Spinner from "@/app/components/svg/Spinner";
import Star from "@/app/components/svg/Star";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function CreateComment() {
  const { id: restaurantId } = useParams();
  const createWithId = create.bind(null, restaurantId as string);

  return (
    <form
      id="comment"
      action={createWithId}
      className="flex flex-col gap-4 w-full h-max my-4 max-w-[944px]"
    >
      <div className="relative w-full h-full px-4">
        <TextArea name="comment" maxLength={255} />
      </div>
      <div className="flex flex-row justify-between items-center mx-4">
        <Rating />
        <Submit />
      </div>
    </form>
  );
}

function Rating() {
  const [rating, setRating] = useState(1);

  return (
    <div className="flex flex-row justify-start gap-2 items-center">
      <input type="number" hidden value={rating} name="rating" />
      <span className="hidden sm:flex">Tu puntuación: </span>
      <div
        aria-label={`${rating} estrella${rating > 1 && "s"} de puntiación`}
        className="block relative w-min box-border align-middle whitespace-nowrap h-min"
      >
        <div className="flex flex-row gap-2 align-center justify-end flex-nowrap">
          {[1, 2, 3, 4, 5].map((stars, k) => (
            <button key={k} type="button" onClick={() => setRating(stars)}>
              <Star
                className={clsx(
                  "relative drop-shadow-md",
                  rating < stars && "stroke-gray-600"
                )}
                fill={rating >= stars ? "#264BEB" : "white"}
                key={k}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      tipology="cartoon"
      htmlFor="comment"
      hierarchy="confirm"
      disabled={pending}
      loading={pending}
      type="submit"
      label={"Envia una reseña"}
    >
      {pending && <Spinner />}
    </Button>
  );
}
