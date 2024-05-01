import WelcomeCard from "./components/WelcomeCard";
import restaurantPic from "./assets/restaurant.jpeg";
import MainBoxes from "./components/MainBoxes";

export default function Home() {
  return (
    <MainBoxes picture={{ src: restaurantPic, alt: "Restaurants" }}>
      <WelcomeCard />
    </MainBoxes>
  );
}
