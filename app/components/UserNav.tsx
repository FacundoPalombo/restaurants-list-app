"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import ArrowUp from "./svg/ArrowUp";
import styles from "./UserNav.module.css";
import Spinner from "./svg/Spinner";

import Button from "./Button";
import { useFormStatus } from "react-dom";
import { useFormState } from "react-dom";
import { logout } from "../actions/auth";

type UserNavProps = {
  username: string;
};

export default function UserNav({ username }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [state, action] = useFormState(logout, undefined);

  useEffect(() => {
    console.log(state);
    if (state?.error) {
      toast.error(state?.error, { closeButton: true });
      if (state?.error?.payload?.message) {
      }
    }
  }, [state]);

  return (
    <header className="flex flex-row-reverse my-4">
      <nav className="flex flex-col justify-end w-max">
        <button
          className="flex flex-row align-text-bottom md:text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {username}
          <ArrowUp
            className={clsx("transition-transform", !isOpen && styles.rotateX)}
          />
        </button>
        <div
          aria-hidden={!isOpen}
          style={{ zIndex: 99999 }}
          className={clsx(
            !isOpen && "invisible ease-in-out  opacity-5",
            "transition-opacity delay-0 duration-100",
            "absolute z-50 top-16 right-4 w-max h-min bg-tailor-blue p-4 pt-6 rounded-2xl rounded-tr-none text-white shadow-lg border border-slate-300"
          )}
        >
          <ul className="md:text-lg flex flex-col gap-2">
            <li>
              <Link onClick={() => setIsOpen(false)} href="/control-panel">
                Panel de control
              </Link>
            </li>

            <li>
              <Link onClick={() => setIsOpen(false)} href="/restaurants/create">
                Añadir restaurante
              </Link>
            </li>
            <hr className="border-white my-4" />
            <li>
              <form action={action} id="logout">
                <Logout />
              </form>
            </li>
          </ul>
        </div>
      </nav>
      <Toaster richColors position="bottom-right" />
    </header>
  );
}

function Logout() {
  const { pending } = useFormStatus();

  return (
    <Button
      label="Cerrar Sesión"
      type="submit"
      hierarchy="loud"
      htmlFor="logout"
      loading={pending}
      size="lg"
      rounded="2xl"
      className={clsx(
        "relative flex flex-row items-center align-middle justify-between gap-2 p-3 w-full ",
        "md:text-xl font-semibold border border-white rounded-3xl "
      )}
    >
      {pending && <Spinner />}
    </Button>
  );
}
