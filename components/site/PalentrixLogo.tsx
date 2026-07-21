export function PalentrixLogo({
  size = 36,
  showWordmark = false,
  stacked = false,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  stacked?: boolean;
  className?: string;
}) {
  if (showWordmark) {
    return (
      <span
        aria-label="Palentrix"
        className={`inline-flex ${stacked ? "flex-col items-start gap-3" : "items-center gap-2.5"} ${className}`}
      >
        <img
          src="/brand/palentrix-mark-blue.svg"
          alt=""
          aria-hidden="true"
          style={{ height: size, width: "auto", display: "block" }}
        />
        <span
          aria-hidden="true"
          className="font-display font-semibold leading-none tracking-[0.16em] text-ink"
          style={{ fontSize: stacked ? Math.max(20, size * 0.3) : Math.max(14, size * 0.46) }}
        >
          PALENTRIX
        </span>
      </span>
    );
  }

  return (
    <img
      src="/brand/palentrix-mark-blue.svg"
      alt=""
      aria-hidden="true"
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
