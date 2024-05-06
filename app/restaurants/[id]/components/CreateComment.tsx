"use client";
import Button from "@/app/components/Button";
import Star from "@/app/components/svg/Star";
import clsx from "clsx";
import { useCallback, useState } from "react";

export default function CreateComment({}) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(1);

  const handleCancelEdit = useCallback(() => {
    setNewComment("");
  }, [newComment]);

  return (
    <form className="flex flex-col gap-4 w-full h-max my-4 max-w-[944px]">
      <input type="text" hidden value={newComment} />
      <textarea
        className={clsx(
          "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg"
        )}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row justify-start gap-2 items-center">
          <span className="hidden sm:flex">Tu puntuación: </span>
          <div
            aria-label={`${rating} estrella${rating > 1 && "s"} de puntiación`}
            className="block relative w-min box-border align-middle whitespace-nowrap h-min"
          >
            <div className="flex flex-row gap-2 align-center justify-end flex-nowrap">
              {[1, 2, 3, 4, 5].map((stars, k) => (
                <button type="button" onClick={() => setRating(stars)}>
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
          className={clsx(
            "bg-green-600 text-white hover:bg-green-400 active:bg-green-700 transition-colors"
          )}
          type="submit"
          label={"Envia una reseña"}
        />
      </div>
    </form>
  );
}
