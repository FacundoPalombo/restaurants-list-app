import clsx from "clsx";

type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "password" | "file";
  tabIndex?: number;
  autoFocus?: boolean;
  error?: boolean;
  autocomplete?: string | boolean;
  hierarchy?: "quiet" | "loud";
  modifier?: "success" | "warning" | undefined | false | null;
  loading?: boolean;
};

export default function Input({
  label,
  name,
  placeholder,
  modifier,
  loading,
  type = "text",
  tabIndex,
  autoFocus,
  error,
  autocomplete,
  hierarchy = "quiet",
}: InputProps) {
  const loud = hierarchy === "loud";
  const quiet = hierarchy === "quiet";
  const success = modifier === "success";
  const warning = modifier === "warning";

  const autoComplete =
    typeof autocomplete === "string"
      ? autocomplete
      : !autocomplete
      ? "off"
      : "on";

  return (
    <div className="flex flex-col w-full sm:w-2/3">
      <label
        htmlFor="email"
        className={clsx(
          "text-lg md:text-xl",
          quiet && "text-white",
          loud && "text-black",
          loading && "animation-pulse"
        )}
      >
        {label}
      </label>
      <input
        autoComplete={autoComplete}
        className={clsx(
          "border rounded-full text-lg md:text-xl px-4 py-1 md:px-6 md:py-2",
          quiet && "bg-transparent placeholder-white",
          loud && "bg-tailor-blue placeholder-slate-300",
          quiet && "text-white outline-white ",
          quiet &&
            error &&
            "text-danger outline-danger border-danger placeholder-danger",
          loud && "text-white outline-blue-400",
          loud &&
            error &&
            "text-rose-400 outline-rose-400 border-rose-400 placeholder-rose-400",
          loading && "animation-pulse"
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
