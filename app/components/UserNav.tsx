"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useState } from "react";
import useLogout from "../hooks/useLogout";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [doLogout, setDoLogout] = useState(false);
  const { logout, isLoading, error } = useLogout(doLogout);

  const handleLogout = useCallback(() => {
    setDoLogout(true);
  }, [doLogout]);

  return (
    <header>
      <button onClick={() => setIsOpen(!isOpen)}>Nombre de Usuario</button>
      <nav>
        <ul className={clsx(!isOpen && "hidden")}>
          <li>
            <Link href="/control-panel">Panel de control</Link>
          </li>

          <li>
            <Link href="/restaurants/add">Añadir restaurante</Link>
          </li>
          <hr />
          <li>
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
