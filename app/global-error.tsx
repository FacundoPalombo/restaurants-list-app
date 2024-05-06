"use client";

import Button from "@/app/components/Button";
import { Standalone as Logo } from "@/app/components/svg/Logo";
import { useEffect } from "react";

export default function GlobalError({
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
      <Logo />
      <h1 className="text-tailor-blue text-xl font-bold">
        Ups, algo salió mal
      </h1>
      <Button
        hierarchy="quiet"
        size="lg"
        label="Volver"
        type="button"
        onClick={() => reset()}
      />
      <Logo />
    </main>
  );
}
