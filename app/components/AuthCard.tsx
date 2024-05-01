import Logo from "./svg/Logo";

export default function AuthCard() {
  return (
    <section className="rounded-xl p-4 bg-tailor-blue flex flex-col justify-between gap-4 md:gap-6">
      <Logo fill="white" className="mb-4 md:mb-5" />
      <form></form>
    </section>
  );
}
