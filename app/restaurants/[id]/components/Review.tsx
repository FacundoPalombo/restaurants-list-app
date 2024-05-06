import Star from "@/app/components/svg/Star";
import { Review } from "@/app/lib/definitions";
import EditingForm from "./EditingForm";
import clsx from "clsx";

export default function ReviewComponent({ owner, rating, comment }: Review) {
  return (
    <section aria-label={`Review de: ${owner}`}>
      <div className="flex flex-col gap-4 mx-4 max-w-[944px]">
        <div className="flex flex-row justify-between gap-2 items-center relative box-border h-min  whitespace-nowrap w-full">
          <h2 className="relative break-word overflow-hidden text-ellipsis border-collapse  box-content  text-3xl font-semibold w-min">
            {owner.name}
          </h2>
          <div
            aria-label={`${rating} estrella${rating > 1 && "s"} de puntiación`}
            className="block relative w-min box-border align-middle whitespace-nowrap h-min"
          >
            <div className="flex flex-row gap-2 align-center justify-end flex-nowrap">
              {[1, 2, 3, 4, 5].map((stars, k) => (
                <Star
                  className={clsx(
                    "relative drop-shadow-md",
                    rating < stars && "stroke-gray-600"
                  )}
                  fill={rating >= stars ? "#264BEB" : "white"}
                  key={k}
                />
              ))}
            </div>
          </div>
        </div>

        <EditingForm comment={comment} />
        <hr className="border border-tailor-blue w-full m-auto mb-4" />
      </div>
    </section>
  );
}
