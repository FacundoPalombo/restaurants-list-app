"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useState } from "react";
import useLogout from "../hooks/useLogout";
import ArrowUp from "./svg/ArrowUp";
import styles from "./UserNav.module.css";

type UserNavProps = {
  username: string;
};

export default function UserNav({ username }: UserNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [doLogout, setDoLogout] = useState(false);
  const { logout, isLoading, error } = useLogout(doLogout);

  const handleLogout = useCallback(() => {
    setDoLogout(true);
  }, [doLogout]);

  return (
    <header className="flex flex-row-reverse">
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
            "absolute z-50 top-16 right-4 w-max h-min bg-tailor-blue p-4 pt-6 rounded-2xl rounded-tr-none text-white"
          )}
        >
          <ul className="md:text-lg flex flex-col gap-2">
            <li>
              <Link href="/control-panel">Panel de control</Link>
            </li>

            <li>
              <Link href="/restaurants/add">Añadir restaurante</Link>
            </li>
            <hr className="border-white my-4" />
            <li>
              <button
                className=" md:text-xl font-semibold p-3 border border-white rounded-3xl w-full transition-[outline] duration-[50ms] hover:outline hover:outline-2 hover:outline-white"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
