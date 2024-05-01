import AuthCard from "../components/AuthCard";
import MainBoxes from "../components/MainBoxes";
import restaurantPicture from "../assets/restaurant.jpeg";
import ArrowBack from "../components/svg/ArrowBack";
import Link from "next/link";
import Input from "../components/Input";

export default function Login() {
  return (
    <MainBoxes picture={{ src: restaurantPicture, alt: "Restaurant" }}>
      <AuthCard>
        <>
          <Link
            href="/login"
            className="border border-[#fff] rounded-xl  px-3 py-1 w-fit"
          >
            <ArrowBack />
          </Link>

          <form className="flex flex-col gap-6">
            <Input label={"Email:"} name="email" placeholder="Añade tu email" />
            <Input
              label={"Nombre de usuario:"}
              name="username"
              placeholder="Añade tu nombre de usuario"
            />
            <Input
              label={"Contraseña:"}
              name="password"
              type="password"
              placeholder="Crea tu contraseña"
            />
          </form>
        </>
      </AuthCard>
    </MainBoxes>
  );
}
