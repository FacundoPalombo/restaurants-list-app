export default function Delete({
  className,
  fill = "#000",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="32px"
      width="32px"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
  );
}
