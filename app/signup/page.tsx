import restaurantPicture from "@/app/assets/restaurant.jpeg";

import AuthCard from "@/app/components/AuthCard";
import MainBoxes from "@/app/components/MainBoxes";
import Form from "./components/Form";

export default function Signup() {
  return (
    <MainBoxes picture={{ src: restaurantPicture, alt: "Restaurant" }}>
      <AuthCard>
        <Form />
      </AuthCard>
    </MainBoxes>
  );
}
