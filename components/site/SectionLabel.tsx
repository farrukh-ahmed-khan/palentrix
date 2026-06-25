export function SectionLabel({ children, dark = true }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`font-mono text-[12px] uppercase tracking-[0.15em] ${dark ? "text-indigo" : "text-indigo-dim"}`}>
      [ {children} ]
    </div>
  );
}
