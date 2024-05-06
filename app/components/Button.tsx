"use client";

import clsx from "clsx";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

type ButtonProps = {
  type: "button" | "link" | "submit";
  tipology?: "cartoon" | "normal";
  hierarchy?:
    | "loud"
    | "quiet"
    | "primary"
    | "confirm"
    | "danger"
    | "indifferent";
  size?: "md" | "lg" | "xl";
  rounded?: "md" | "lg" | "xl" | "2xl" | "full";
  href?: Url;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  label?: string;
  ariaLabel?: string;
  tabIndex?: number;
  className?: string;
  htmlFor?: string;
  disabled?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
};

export default function Button({
  size = "md",
  rounded = "xl",
  type = "button",
  hierarchy = "quiet",
  tipology = "normal",
  href,
  onClick,
  children,
  label,
  ariaLabel,
  tabIndex,
  className,
  htmlFor,
  disabled,
  loading,
  iconOnly,
}: ButtonProps) {
  const md = size === "md";
  const lg = size === "lg";
  const xl = size === "xl";
  const loud = hierarchy === "loud";
  const primary = hierarchy === "primary";
  const quiet = hierarchy === "quiet";
  const confirm = hierarchy === "confirm";
  const danger = hierarchy === "danger";
  const indifferent = hierarchy === "indifferent";
  const cartoon = tipology === "cartoon";

  const genericProps: Partial<ButtonProps> = {
    type,
    onClick,
    tabIndex,
    disabled,
  };

  const htmlProps = {
    "aria-label": ariaLabel,
    "aria-busy": loading,
  };

  const linkProps: Partial<ButtonProps> = {
    href,
  };

  const buttonProps: Partial<ButtonProps> = {
    htmlFor,
  };

  const buttonBaseStyles = clsx(
    className,
    `rounded-${rounded}`,
    "border font-semibold text-black border-black w-fit select-none transition-colors",
    md && "px-2 py-1 text-md md:text-xl",
    lg && "px-2 py-2 text-lg md:text-2xl",
    xl && "px-4 py-2 text-xl md:text-2xl",
    indifferent && "bg-gray-300 hover:bg-gray-50",
    primary &&
      "bg-tailor-blue border text-white hover:bg-blue-500 active:bg-blue-700",
    confirm && "bg-green-600 text-white hover:bg-green-400 active:bg-green-700",
    danger && "bg-red-400 hover:bg-red-300 active:bg-red-500 transition-colors",
    quiet &&
      "bg-white hover:bg-slate-50 hover:drop-shadow-sm active:bg-slate-200 active:text-slate-800 ",
    loud &&
      "bg-tailor-blue border text-white hover:bg-blue-600 active:bg-blue-500",
    loud &&
      "transition-[outline] duration-[50ms] hover:outline hover:outline-2 hover:outline-white",
    iconOnly &&
      "border border-white  px-3 py-1 w-fit block mb-4 lg:px-6 lg:py-2",
    !cartoon && "border-white font-semibold px-4 py-2"
  );

  if (type === "button" || type === "submit") {
    // Don't do this at home...
    return (
      <button
        className={buttonBaseStyles}
        {...(htmlProps as any)}
        {...(genericProps as any)}
        {...(buttonProps as any)}
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
        role="button"
        className={buttonBaseStyles}
        {...(htmlProps as any)}
        {...(genericProps as any)}
        {...(linkProps as any)}
      >
        {label}
        {children}
      </Link>
    );
  }
}
