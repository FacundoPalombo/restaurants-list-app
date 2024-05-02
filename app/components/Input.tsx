import clsx from "clsx";

type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "password";
  tabIndex?: number;
  autoFocus?: boolean;
  error?: boolean;
};

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
  tabIndex,
  autoFocus,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col w-full sm:w-2/3">
      <label htmlFor="email" className="text-[white] text-lg md:text-xl">
        {label}
      </label>
      <input
        className={clsx(
          "border rounded-full text-lg md:text-xl px-4 py-1 md:px-6 md:py-2 bg-[transparent] placeholder-[white]",
          error
            ? "text-danger outline-danger border-danger placeholder-danger"
            : "text-[white] outline-[white] "
        )}
        type={type}
        id={name}
        name={name}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
    </div>
  );
}
