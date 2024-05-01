type InputProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "password";
};

export default function Input({
  label,
  name,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div className="flex flex-col w-2/3">
      <label htmlFor="email" className="text-[white] text-lg md:text-xl">
        {label}
      </label>
      <input
        className="border rounded-full text-lg md:text-xl px-4 py-1 md:px-6 md:py-2 bg-[transparent] text-[white] outline-[white]"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
