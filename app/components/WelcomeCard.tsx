import Link from "next/link";
import Logo from "./svg/Logo";
import { headers } from "next/headers";
import Button from "./Button";

export default function WelcomeCard() {
  //TODO: Implementar logica redireccion al login desde el referer
  const referer = headers().get("referer");

  return (
    <section className="rounded-xl p-4 md:p-5 bg-[#F1F1F0] flex flex-col justify-between gap-4 md:gap-6">
      <Logo className="mb-4 md:mb-5" />
      <p className="md:text-4xl text-3xl">
        Hola, <br /> Bienvenido a la prueba de Tailor hub, en ella has de añadir
        los restaurantes favoritos donde te gustaría ir en tu onboarding.
      </p>
      <Button
        href="/signup"
        hierarchy="quiet"
        tipology="cartoon"
        type="link"
        ariaLabel="Entra a ver los restaurantes"
      >
        {" "}
        Entrar
      </Button>
    </section>
  );
}
