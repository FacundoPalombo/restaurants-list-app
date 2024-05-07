"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "@/app/actions/auth";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Spinner from "@/app/components/svg/Spinner";

export default function Form() {
  const [state, action] = useFormState(login, undefined);
  return (
    <form id="login" action={action} className="flex flex-col gap-6">
      <Input
        label="Email:"
        name="email"
        placeholder="Escribe tu email"
        autoFocus
      />
      <Input
        label="Contraseña:"
        name="password"
        type="password"
        placeholder="Escribe tu password"
      />
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" hierarchy="loud" label="Entrar" form="login">
      {pending && <Spinner />}
    </Button>
  );
}
