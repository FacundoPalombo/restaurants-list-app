import clsx from "clsx";
import React, { MouseEventHandler } from "react";

type ButtonForm = {
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlFor?: string;
  type?: "submit" | "button";
  tabIndex?: number;
  disabled?: boolean;
  children?: React.ReactElement | string;
};

export default function ButtonForm({
  onClick,
  label,
  htmlFor,
  type = "submit",
  tabIndex,
  disabled = false,
  children,
}: ButtonForm) {
  return (
    <button
      className={clsx(
        "transition-[outline] duration-[50ms] hover:outline hover:outline-2 hover:outline-white",
        "border border-[#fff] rounded-3xl  px-3 py-1 md:px-4 md:py-2 w-fit text-[white]",
        disabled && "disabled:font-grey"
      )}
      type={type}
      form={htmlFor}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
}
