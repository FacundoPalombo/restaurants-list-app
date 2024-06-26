"use client";

import Link from "next/link";

import { useFormState, useFormStatus } from "react-dom";

import { signup } from "@/app/actions/auth";

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import ArrowBack from "@/app/components/svg/ArrowBack";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Spinner from "@/app/components/svg/Spinner";

export default function Form() {
  const [state, action] = useFormState(signup, undefined);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (state?.errors?.email || state?.errors?.username) {
      setStep(1);
    }
  }, [state?.errors]);

  return (
    <div>
      <Back step={step} setStep={setStep} />
      <form
        id="signup"
        action={action}
        className="relative p-1 -m-1 overflow-hidden"
      >
        <div className="flex flex-col gap-6">
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
          <Submit step={step} setStep={setStep} />
        </div>
      </form>
    </div>
  );
}

function Submit({ step, setStep }: { step: number; setStep: Function }) {
  const { pending } = useFormStatus();
  return (
    <>
      {step === 1 && (
        <Button
          hierarchy="loud"
          rounded="2xl"
          label="Siguiente"
          type="button"
          onClick={() => setStep(2)}
          tabIndex={4}
        />
      )}
      {step === 2 && (
        <Button
          hierarchy="loud"
          rounded="2xl"
          label="Finalizar"
          type="submit"
          form="signup"
          tabIndex={6}
          disabled={pending}
        >
          {pending && <Spinner />}
        </Button>
      )}
    </>
  );
}

function Back({ step, setStep }: { step: number; setStep: Function }) {
  return (
    <>
      {step === 1 && (
        <Button
          type="link"
          href="/login"
          hierarchy="loud"
          rounded="2xl"
          iconOnly
          tabIndex={1}
          ariaLabel="Volver al inicio de sesión"
        >
          <ArrowBack />
        </Button>
      )}
      {step === 2 && (
        <Button
          hierarchy="loud"
          type="button"
          rounded="2xl"
          iconOnly
          onClick={() => setStep(1)}
          tabIndex={4}
          ariaLabel="Volver a editar email o nombre de usuario"
        >
          <ArrowBack />
        </Button>
      )}
    </>
  );
}
