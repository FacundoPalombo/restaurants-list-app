import { deleteComment } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import clsx from "clsx";

export default function DeleteForm({
  restaurantId,
  commentId,
}: {
  restaurantId: string;
  commentId: string;
}) {
  const deleteCommentWithIds = deleteComment.bind(
    null,
    restaurantId as string,
    commentId
  );
  return (
    <form action={deleteCommentWithIds}>
      <Button
        className={clsx(
          "bg-red-400 hover:bg-red-300 active:bg-red-500 transition-colors"
        )}
        label="Eliminar"
        type="submit"
      />
    </form>
  );
}
