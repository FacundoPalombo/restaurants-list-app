import { deleteComment } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import { useFormStatus } from "react-dom";

export default function DeleteComment({
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
  const { pending } = useFormStatus();
  return (
    <form action={deleteCommentWithIds}>
      <Button
        hierarchy="danger"
        loading={pending}
        label="Eliminar"
        type="submit"
      />
    </form>
  );
}
