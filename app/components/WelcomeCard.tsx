import Link from "next/link";
import Logo from "./svg/Logo";
import { headers } from "next/headers";

export default function WelcomeCard() {
  const referer = headers().get("referer");
  console.log(referer, "tremendo");
  return (
    <section className="rounded-xl p-4 md:p-5 bg-[#F1F1F0] flex flex-col justify-between gap-4 md:gap-6">
      <Logo className="mb-4 md:mb-5" />
      <p className="md:text-4xl text-3xl">
        Hola, <br /> Bienvenido a la prueba de Tailor hub, en ella has de añadir
        los restaurantes favoritos donde te gustaría ir en tu onboarding.
      </p>
      <Link
        href="/signup"
        className="rounded-xl px-2 py-1 border text-l md:text-xl font-semibold border-black w-min"
      >
        {" "}
        Entrar
      </Link>
    </section>
  );
}
