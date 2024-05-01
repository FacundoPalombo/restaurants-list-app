import AuthCard from "../components/AuthCard";
import MainBoxes from "../components/MainBoxes";
import restaurantPicture from "../assets/restaurant.jpeg";

export default function Login() {
  return (
    <MainBoxes picture={{ src: restaurantPicture, alt: "Restaurant" }}>
      <AuthCard />
    </MainBoxes>
  );
}
