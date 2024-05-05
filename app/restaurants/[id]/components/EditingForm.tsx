"use client";

import Button from "@/app/components/Button";
import clsx from "clsx";
import { useCallback, useRef, useState } from "react";

export default function EditingForm({ comment }: { comment: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);

  const handleCancelEdit = useCallback(() => {
    setNewComment(comment);
    setIsEditing(false);
  }, [newComment]);
  return (
    <>
      <p className={clsx(isEditing && "hidden")}>{comment}</p>
      <textarea
        className={clsx(
          !isEditing && "hidden",
          "h-full rounded-3xl p-2 border-2  border-black shadow-lg"
        )}
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <div className="flex flex-row gap-2 justify-end py-2 md:py-4">
        <Button
          className={clsx(
            !isEditing && "hidden",
            "bg-gray-300 hover:bg-gray-50 transition-colors"
          )}
          type="button"
          label="Cancelar"
          onClick={handleCancelEdit}
        />
        <Button
          className={clsx(
            isEditing && "hidden",
            "bg-tailor-blue border text-white hover:bg-blue-500 active:bg-blue-700 transition-colors"
          )}
          type="button"
          label={"Editar"}
          onClick={() => setIsEditing(true)}
        />

        <Button
          className={clsx(
            !isEditing && "hidden",
            "bg-green-600 text-white hover:bg-green-400 active:bg-green-700 transition-colors"
          )}
          type="button"
          label={"Confirmar"}
          onClick={() => setIsEditing(true)}
        />
        <Button
          className={clsx(
            "bg-red-400 hover:bg-red-300 active:bg-red-500 transition-colors"
          )}
          label="Eliminar"
          type="submit"
        />
      </div>
    </>
  );
}
