import { Review } from "@/app/lib/definitions";
import UpdateComment from "./UpdateComment";

export default function ReviewComponent({
  owner,
  rating,
  comment,
  _id,
}: Review) {
  return (
    <section className=" w-full" aria-label={`Review de: ${owner.name}`}>
      <div className="flex flex-col gap-4 mx-4">
        <UpdateComment
          comment={comment}
          _id={_id}
          rating={rating}
          owner={owner}
        />
        <hr className="border border-tailor-blue w-full m-auto mb-4" />
      </div>
    </section>
  );
}
