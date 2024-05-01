import AuthCard from "../components/AuthCard";
import MainBoxes from "../components/MainBoxes";
import officePicture from "../assets/office.jpeg";

export default function Login() {
  return (
    <MainBoxes picture={{ src: officePicture, alt: "People on the office" }}>
      <AuthCard />
    </MainBoxes>
  );
}
