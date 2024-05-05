import Star from "@/app/components/svg/Star";
import { Review as ReviewT } from "@/app/lib/definitions";
import EditingForm from "./EditingForm";

export default function Review({ owner, rating, comment }: ReviewT) {
  return (
    <section>
      <div>
        <h2>{owner.name}</h2>
        <div>
          {[5, 4, 3, 2, 1].map((stars, k) => (
            <Star
              className="relative drop-shadow-lg"
              fill={rating < stars ? "#264BEB" : "white"}
              key={k}
            />
          ))}
        </div>
      </div>
      <EditingForm comment={comment} />
      <hr />
    </section>
  );
}
