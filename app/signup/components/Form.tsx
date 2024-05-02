"use client";

import Link from "next/link";

import { useFormState, useFormStatus } from "react-dom";

import { signup } from "@/app/actions/auth";

import Input from "@/app/components/Input";
import ButtonForm from "@/app/components/ButtonForm";
import ArrowBack from "@/app/components/svg/ArrowBack";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Form() {
  const [state, action] = useFormState(signup, undefined);
  const { pending } = useFormStatus();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (state?.errors?.email || state?.errors?.username) {
      setStep(1);
    }
  }, [state?.errors]);

  return (
    <div>
      {step === 1 && (
        <Link
          href="/login"
          className="border border-[#fff] rounded-xl  px-3 py-1 w-fit block mb-4"
          tabIndex={1}
          aria-label="Volver al inicio de sesión"
        >
          <ArrowBack />
        </Link>
      )}
      {step === 2 && (
        <button
          onClick={() => setStep(1)}
          tabIndex={4}
          aria-label="Volver a editar email o nombre de usuario"
          className="border border-[#fff] rounded-xl  px-3 py-1 w-fit block mb-4"
        >
          <ArrowBack />
        </button>
      )}
      <form
        id="signup"
        action={action}
        className="flex flex-col gap-6 overflow-hidden"
      >
        <div className="flex w-[200%]">
          <div className="block w-full">
            <div
              className={clsx(
                "overflow-hidden",
                "flex flex-col gap-6 relative",
                "transition-[transform,visibility]",
                step === 2 && "invisible translate-x-[-100%]"
              )}
            >
              <Input
                label="Email:"
                name="email"
                placeholder="Añade tu email"
                tabIndex={2}
                autoFocus
                error={Boolean(state?.errors?.email)}
              />
              {state?.errors?.email && (
                <p className="text-danger">{state.errors.email}</p>
              )}
              <Input
                label="Nombre de usuario:"
                name="username"
                placeholder="Añade tu nombre de usuario"
                tabIndex={3}
                error={Boolean(state?.errors?.username)}
              />
              {state?.errors?.username && (
                <p className="text-danger">{state.errors.username}</p>
              )}
            </div>
          </div>
          <div
            className={clsx(
              "block w-full",
              "overflow-hidden",
              "transition-[transform,visibility]",
              "translate-x-[-100%]",
              step === 1 && "invisible translate-x-[100%]"
            )}
          >
            <div className={clsx("flex flex-col gap-6")}>
              <Input
                label="Contraseña:"
                name="password"
                type="password"
                placeholder="Crea tu contraseña"
                tabIndex={5}
                error={Boolean(state?.errors?.password)}
              />
              {state?.errors?.password && (
                <div className="text-danger">
                  <p>El password debe contener:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {step === 1 && (
          <ButtonForm
            label="Siguiente"
            onClick={() => setStep(2)}
            tabIndex={4}
          />
        )}
        {step === 2 && (
          <ButtonForm
            label="Finalizar"
            htmlFor="signup"
            tabIndex={6}
            disabled={pending}
          />
        )}
      </form>

      {pending && <p>loading....</p>}
    </div>
  );
}
