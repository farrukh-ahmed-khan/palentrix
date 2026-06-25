export function PalentrixLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/brand/palentrix-mark-dark.png"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
