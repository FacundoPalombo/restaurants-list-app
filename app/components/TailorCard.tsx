import Link from "next/link";
import Logo from "./svg/Logo";

export default function TailorCard() {
  return (
    <section className="rounded-xl p-4 bg-[#F1F1F0] flex flex-col justify-between gap-4 md:gap-6">
      <Logo className="mb-4 md:mb-5" />
      <p className="md:text-4xl text-3xl">
        Hola, <br /> Bienvenido a la prueba de Tailor hub, en ella has de añadir
        los restaurantes favoritos donde te gustaría ir en tu onboarding.
      </p>
      <Link
        href="/restaurants"
        className="rounded-xl px-2 py-1 border-2 text-l md:text-xl font-bold border-black w-min"
      >
        {" "}
        Entrar
      </Link>
    </section>
  );
}
