import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  type: "button" | "link" | "submit";
  href?: Url;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  label?: string;
  className?: string;
};

export default function Button({
  type = "button",
  href,
  onClick,
  children,
  label,
  className,
}: ButtonProps) {
  const buttonBaseStyles =
    "rounded-xl px-2 py-1 border text-l md:text-xl font-semibold border-black w-min";
  if (type === "button" || type === "submit") {
    return (
      <button
        type={type}
        className={clsx(buttonBaseStyles, className)}
        onClick={onClick}
      >
        {label}
        {children}
      </button>
    );
  }
  if (type === "link") {
    if (!href)
      throw new Error("The prop href is mandatory on Button type='link'");

    return (
      <Link
        href={href}
        className={clsx(buttonBaseStyles, className)}
        onClick={onClick}
      >
        {label}
        {children}
      </Link>
    );
  }
}