"use client";

import { update } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DeleteComment from "./DeleteComment";

import Star from "@/app/components/svg/Star";
import { useFormStatus } from "react-dom";
import Spinner from "@/app/components/svg/Spinner";
import { TextArea } from "@/app/components/TextArea";

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
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [newRating, setNewRating] = useState(rating);

  const { id: restaurantId }: { id: string } = useParams();

  useEffect(() => {}, [newRating, newComment]);

  const updateCommentWithIds = update.bind(null, _id, restaurantId as string);

  const handleCancelEdit = useCallback(() => {
    setNewComment(comment);
    setNewRating(rating);
    setIsEditing(false);
  }, [comment, rating]);

  return (
    <section>
      <Heading
        owner={owner}
        rating={newRating}
        setRating={setNewRating}
        isEditing={isEditing}
      />
      <p className={clsx(isEditing && "hidden")}>{comment}</p>
      <TextArea
        maxLength={255}
        hidden={!isEditing}
        value={newComment}
        onChange={(e) => setNewComment((e.target as HTMLTextAreaElement).value)}
      />
      <div className="flex flex-row gap-2 justify-end items-center py-2 md:py-4">
        <form
          className="flex flex-row gap-2 justify-end py-2 md:py-4"
          id="update-comment"
          action={updateCommentWithIds}
        >
          <Button
            tipology="cartoon"
            className={clsx(!isEditing && "hidden")}
            hierarchy="indifferent"
            type="button"
            label="Cancelar"
            onClick={handleCancelEdit}
          />
          <Button
            tipology="cartoon"
            className={clsx(isEditing && "hidden")}
            hierarchy="primary"
            type="button"
            label={"Editar"}
            onClick={() => setIsEditing(true)}
          />

          <input type="text" hidden name="comment" value={newComment} />
          <input type="number" hidden name="rating" value={newRating} />
          <Submit isEditing={isEditing} />
        </form>
        <DeleteComment restaurantId={restaurantId} commentId={_id} />
      </div>
    </section>
  );
}

function Submit({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={clsx(!isEditing && "hidden")}
      tipology="cartoon"
      hierarchy="confirm"
      htmlFor="update-comment"
      type="submit"
      label={"Confirmar"}
      loading={pending}
    >
      {pending && <Spinner />}
    </Button>
  );
}
