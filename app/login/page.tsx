import AuthCard from "../components/AuthCard";
import MainBoxes from "../components/MainBoxes";
import officePicture from "../assets/office.jpeg";
import Input from "../components/Input";
import Link from "next/link";

export default function Login() {
  return (
    <MainBoxes picture={{ src: officePicture, alt: "People on the office" }}>
      <AuthCard>
        <span className="text-[white]">
          ¿No tienes cuenta?{" "}
          <Link className="font-semibold" href="/signin">
            Regístrate
          </Link>
        </span>
        <form className="flex flex-col gap-6">
          <Input label={"Email:"} name="email" placeholder="Escribe tu email" />
          <Input
            label={"Nombre de usuario:"}
            name="username"
            placeholder="Escribe tu nombre de usuario"
          />
        </form>
      </AuthCard>
    </MainBoxes>
  );
}
