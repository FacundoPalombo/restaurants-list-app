"use client";

import Button from "@/app/components/Button";
import { Standalone as Logo } from "@/app/components/svg/Logo";
import { useEffect } from "react";

export default function NotFound({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col gap-6 items-center justify-center w-full h-full">
      <div className="absolute flex items-center justify-center overflow-hidden w-full h-full drop-shadow-sm animation-pulse text-[50vw] animation-all opacity-10 cursor-normal select-none -z-10">
        404
      </div>
      <Logo />
      <h1 className="text-tailor-blue text-xl font-bold">
        Lo siento, no hemos encontrado la página que buscabas.
      </h1>
      <Button
        hierarchy="quiet"
        size="lg"
        label="Volver al incio"
        type="link"
        href="/restaurants"
      />
      <Logo />
    </main>
  );
}
