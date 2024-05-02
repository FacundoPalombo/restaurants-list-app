import { MouseEventHandler } from "react";

type ButtonForm = {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  htmlFor?: string;
  type?: "submit" | "button";
  tabIndex?: number;
  disabled?: boolean;
};

export default function ButtonForm({
  onClick,
  label,
  htmlFor,
  type = "submit",
  tabIndex,
  disabled = false,
}: ButtonForm) {
  return (
    <button
      className="border border-[#fff] rounded-3xl  px-3 py-1 md:px-4 md:py-2 w-fit text-[white]"
      type={type}
      form={htmlFor}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
