import clsx from "clsx";
import Cross from "./svg/Cross";
import { ChangeEventHandler, useCallback, useEffect, useState } from "react";

export function TextArea({
  name,
  maxLength,
  onChange,
  className,
  hidden,
  value,
}: {
  name?: string;
  maxLength?: number;
  onChange?: ChangeEventHandler;
  className?: string;
  hidden?: boolean;
  value?: string | undefined;
}) {
  const isControlledComponent = typeof name !== "string";

  const [text, setText] = useState("");

  useEffect(() => {
    if (isControlledComponent) {
      setText(value!);
    }
  }, [text, value, isControlledComponent]);

  const handleClear = () => {
    setText("");
  };

  const defaultOnChange: ChangeEventHandler = (e) =>
    setText((e?.target as HTMLTextAreaElement)?.value);

  const handleChange: ChangeEventHandler = onChange ?? defaultOnChange;

  return (
    <div className={clsx("relative", hidden && "hidden")}>
      {name && <input type="text" hidden value={text} name={name} />}
      <button
        type="button"
        onClick={handleClear}
        aria-label="Limpiar area de texto"
        hidden={text?.length === 0}
        className="absolute w-2 h-2 top-3 right-9 hover:drop-shadow-xl active:drop-shadow-md active:stroke-w-2"
      >
        <Cross />
      </button>
      <textarea
        maxLength={255}
        minLength={10}
        className={clsx(
          className,
          "h-full w-full rounded-3xl p-2 border-2  border-black shadow-lg",
          text?.length === 255 && "border-2 border-red-500 text-red-500"
        )}
        value={text}
        onChange={handleChange}
      ></textarea>

      {maxLength && (
        <span
          className={clsx(
            "relative text-xs top-0 -pt-4",
            text?.length === maxLength && "text-red-500"
          )}
        >
          {text?.length} / {maxLength}
        </span>
      )}
    </div>
  );
}
