"use client";

import { useFormState } from "react-dom";
import { login } from "@/app/actions/auth";
import Input from "@/app/components/Input";
import ButtonForm from "@/app/components/ButtonForm";
import Button from "@/app/components/Button";

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
      <Button type="submit" hierarchy="loud" label="Entrar" htmlFor="login" />
    </form>
  );
}
