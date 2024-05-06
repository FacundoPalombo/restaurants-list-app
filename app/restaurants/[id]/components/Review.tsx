import Star from "@/app/components/svg/Star";
import { Review } from "@/app/lib/definitions";
import EditingForm from "./EditingForm";
import clsx from "clsx";

export default function ReviewComponent({
  owner,
  rating,
  comment,
  _id,
}: Review) {
  return (
    <section className=" w-full" aria-label={`Review de: ${owner.name}`}>
      <div className="flex flex-col gap-4 mx-4">
        <EditingForm
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
