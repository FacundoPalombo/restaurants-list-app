import Link from "next/link";

import AuthCard from "@/app/components/AuthCard";
import MainBoxes from "@/app/components/MainBoxes";
import officePicture from "@/app/assets/office.jpeg";

import Form from "./components/Form";

export default function Login() {
  return (
    <MainBoxes picture={{ src: officePicture, alt: "People on the office" }}>
      <AuthCard>
        <span className="text-white">
          ¿No tienes cuenta?{" "}
          <Link className="font-semibold" href="/signup">
            Regístrate
          </Link>
        </span>
        <Form />
      </AuthCard>
    </MainBoxes>
  );
}
