"use client";
import { create } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import Cross from "@/app/components/svg/Cross";
import Star from "@/app/components/svg/Star";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function CreateComment({}) {
  const { id: restaurantId } = useParams();
  const createWithId = create.bind(null, restaurantId as string);
  const { pending } = useFormStatus();

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleClear = useCallback(() => {
    setNewComment("");
  }, [newComment]);

  useEffect(() => {}, [newComment]);

  return (
    <form
      id="comment"
      action={createWithId}
      className="flex flex-col gap-4 w-full h-max my-4 max-w-[944px]"
    >
      <input type="text" hidden value={newComment} name="comment" />
      <input type="number" hidden value={rating} name="rating" />
      <div className="relative w-full h-full px-4">
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpiar area de texto"
          hidden={newComment?.length === 0}
          className="absolute w-2 h-2 top-3 right-9"
        >
          <Cross />
        </button>
        <textarea
          className={clsx(
            "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg",
            pending && "bg-slate-400 animate-pulse"
          )}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-row justify-between items-center mx-4">
        <div className="flex flex-row justify-start gap-2 items-center">
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
        <Button
          htmlFor="comment"
          disabled={pending}
          onClick={() => {
            setNewComment("");
            setRating(1);
          }}
          className={clsx(
            "bg-green-600 text-white hover:bg-green-400 active:bg-green-700 transition-colors",
            pending && "bg-slate-400 animate-pulse"
          )}
          type="submit"
          label={"Envia una reseña"}
        />
      </div>
    </form>
  );
}
