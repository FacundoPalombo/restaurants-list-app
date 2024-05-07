import { deleteComment } from "@/app/actions/comments";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/svg/Spinner";
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
  return (
    <form action={deleteCommentWithIds}>
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      tipology="cartoon"
      hierarchy="danger"
      loading={pending}
      label="Eliminar"
      type="submit"
    >
      {pending && <Spinner />}
    </Button>
  );
}
