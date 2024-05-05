"use client";

import { useRef, useState } from "react";

export default function EditingForm({ comment }: { comment: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(comment);

  return (
    <>
      <p aria-hidden={isEditing}>{comment}</p>
      <textarea aria-hidden={!isEditing} value={textAreaRef.current}></textarea>
      <div>
        <button onClick={() => setIsEditing(!isEditing)}>Editar</button>
        <button type="submit">Eliminar</button>
      </div>
    </>
  );
}
