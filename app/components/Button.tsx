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
  htmlFor?: string;
  disabled?: boolean;
  size?: "md" | "lg";
};

export default function Button({
  size = "md",
  type = "button",
  href,
  onClick,
  children,
  label,
  className,
  htmlFor,
  disabled,
}: ButtonProps) {
  const md = size === "md";
  const lg = size === "lg";

  const buttonBaseStyles = clsx(
    className,
    "rounded-xl border  font-semibold border-black w-fit select-none",
    md && "px-2 py-1 text-md md:text-xl",
    lg && "px-2 py-2 text-lg md:text-2xl"
  );

  if (type === "button" || type === "submit") {
    return (
      <button
        type={type}
        disabled={disabled}
        form={htmlFor}
        className={buttonBaseStyles}
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
      <Link href={href} className={buttonBaseStyles} onClick={onClick}>
        {label}
        {children}
      </Link>
    );
  }
}
