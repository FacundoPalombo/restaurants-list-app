"use client";

import { update } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import DeleteComment from "./DeleteComment";

import Star from "@/app/components/svg/Star";
import { useFormStatus } from "react-dom";

function Heading({
  owner,
  rating,
  setRating,
  isEditing,
}: {
  owner: { name: string };
  rating: number;
  setRating: Function;
  isEditing: boolean;
}) {
  useEffect(() => {}, [isEditing]);
  return (
    <div className="flex flex-row justify-between gap-2 items-center relative box-border h-min  whitespace-nowrap w-full">
      <h2 className="relative break-word overflow-hidden text-ellipsis border-collapse  box-content  text-3xl font-semibold w-min">
        {owner?.name}
      </h2>
      <div
        aria-label={`${rating} estrella${rating > 1 && "s"} de puntiación`}
        className="block relative w-min box-border align-middle whitespace-nowrap h-min"
      >
        <div className="flex flex-row gap-2 align-center justify-end flex-nowrap">
          {[1, 2, 3, 4, 5].map((stars, k) => (
            <button
              key={k}
              className={clsx(!isEditing && "cursor-default")}
              type="button"
              onClick={() => {
                if (isEditing) {
                  setRating(stars);
                }
              }}
            >
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

export default function UpdateComment({
  comment,
  _id,
  rating,
  owner,
}: {
  comment: string;
  _id: string;
  rating: number;
  owner: { name: string };
}) {
  const updateSubmitRef = useRef<any>();

  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [newRating, setNewRating] = useState(rating);

  const { id: restaurantId }: { id: string } = useParams();
  const { pending } = useFormStatus();

  useEffect(() => {
    console.log(newRating);
  }, [newRating]);

  const updateCommentWithIds = update.bind(null, _id, restaurantId as string);

  const handleCancelEdit = useCallback(() => {
    setNewComment(comment);
    setNewRating(rating);
    setIsEditing(false);
  }, [newComment]);

  return (
    <section>
      <Heading
        owner={owner}
        rating={newRating}
        setRating={setNewRating}
        isEditing={isEditing}
      />
      <form hidden action={updateCommentWithIds}>
        <input type="text" hidden name="comment" value={newComment} />
        <input type="number" hidden name="rating" value={newRating} />
        <input type="submit" hidden ref={updateSubmitRef} />
      </form>
      <p className={clsx(isEditing && "hidden")}>{comment}</p>
      <textarea
        className={clsx(
          !isEditing && "hidden",
          "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg"
        )}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <div className="flex flex-row gap-2 justify-end py-2 md:py-4">
        <Button
          className={clsx(!isEditing && "hidden")}
          hierarchy="indifferent"
          type="button"
          label="Cancelar"
          onClick={handleCancelEdit}
        />
        <Button
          className={clsx(isEditing && "hidden")}
          hierarchy="primary"
          type="button"
          label={"Editar"}
          onClick={() => setIsEditing(true)}
        />

        <Button
          className={clsx(!isEditing && "hidden")}
          hierarchy="confirm"
          type="button"
          label={"Confirmar"}
          loading={pending}
          onClick={() => {
            updateSubmitRef.current.click();
            setIsEditing(false);
          }}
        />
        <DeleteComment restaurantId={restaurantId} commentId={_id} />
      </div>
    </section>
  );
}