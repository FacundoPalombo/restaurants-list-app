import Button from "@/app/components/Button";
import { Standalone as Logo } from "@/app/components/svg/Logo";

export default async function Page() {
  return (
    <main className="flex flex-col gap-6 items-center justify-center w-full h-full">
      <Logo />
      <h1 className="text-tailor-blue text-xl font-bold">
        Restaurante guardado
      </h1>
      <Button
        hierarchy="quiet"
        size="md"
        label="Ver restaurante"
        type="link"
        href="/restaurants"
      />
      <Logo />
    </main>
  );
}
