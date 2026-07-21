import type { ReactNode } from "react";

export function BrowserChrome({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div style={{ background: "var(--void)" }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ background: "#071B33", borderBottom: "1px solid rgba(11,95,170,0.08)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
        <div className="flex-1 rounded px-2 py-0.5 ml-1" style={{ background: "var(--void)" }}>
          <span className="font-mono text-[9px]" style={{ color: "var(--indigo-dim)" }}>{url}</span>
        </div>
      </div>
      <div className="px-3 py-3 h-[100px] overflow-hidden">{children}</div>
    </div>
  );
}

export function MetricsVisual() {
  const cards = [
    { label: "Users", val: "2.4k", color: "var(--indigo)", bg: "rgba(11,95,170,0.06)", border: "rgba(11,95,170,0.15)" },
    { label: "Uptime", val: "99.9%", color: "var(--teal)", bg: "rgba(67,180,255,0.05)", border: "rgba(67,180,255,0.2)" },
    { label: "Speed", val: "-42%", color: "var(--indigo)", bg: "rgba(11,95,170,0.06)", border: "rgba(11,95,170,0.15)" },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-1.5 mb-2">
        {cards.map((c) => (
          <div key={c.label} className="rounded px-2 py-1.5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
            <div className="font-mono text-[8px]" style={{ color: "var(--indigo-dim)" }}>{c.label}</div>
            <div className="font-display font-bold text-[13px]" style={{ color: c.color }}>{c.val}</div>
          </div>
        ))}
      </div>
      <div className="h-[2px] rounded overflow-hidden" style={{ background: "rgba(11,95,170,0.1)" }}>
        <div style={{ height: "100%", width: "72%", background: "var(--teal)" }} />
      </div>
      <div className="mt-1.5 flex gap-1">
        <div className="h-[3px] flex-[3] rounded" style={{ background: "rgba(11,95,170,0.2)" }} />
        <div className="h-[3px] flex-[2] rounded" style={{ background: "rgba(67,180,255,0.25)" }} />
        <div className="h-[3px] flex-1 rounded" style={{ background: "rgba(11,95,170,0.12)" }} />
      </div>
    </>
  );
}

export function PipelineVisual() {
  return (
    <svg width="100%" height="76" viewBox="0 0 240 76">
      <defs>
        <marker id="cv-ah" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto">
          <path d="M1 1L5 3L1 5" fill="none" stroke="#0B5FAA" strokeWidth="1" />
        </marker>
      </defs>
      {[
        { x: 4, label1: "Intake", label2: "Form", stroke: "rgba(11,95,170,0.25)", c1: "#8B95B0" },
        { x: 62, label1: "AI", label2: "Process", stroke: "rgba(67,180,255,0.3)", c1: "#43B4FF" },
        { x: 120, label1: "Route", label2: "Logic", stroke: "rgba(11,95,170,0.25)", c1: "#8B95B0" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="26" width="44" height="24" rx="4" fill="#071B33" stroke={b.stroke} strokeWidth="0.5" />
          <text x={b.x + 22} y="38" fontSize="7" fill={b.c1} textAnchor="middle" fontFamily="monospace">{b.label1}</text>
          <text x={b.x + 22} y="47" fontSize="7" fill="#003B78" textAnchor="middle" fontFamily="monospace">{b.label2}</text>
        </g>
      ))}
      {[48, 106, 164].map((x, i) => (
        <line key={i} x1={x} y1="38" x2={x + 14} y2="38" stroke="#0B5FAA" strokeWidth="0.8" markerEnd="url(#cv-ah)" strokeDasharray="3,2" className="pv-flow" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <rect x="178" y="26" width="56" height="24" rx="4" fill="#071B33" stroke="rgba(67,180,255,0.3)" strokeWidth="0.5" />
      <text x="206" y="38" fontSize="7" fill="#43B4FF" textAnchor="middle" fontFamily="monospace">Dispatch</text>
      <text x="206" y="47" fontSize="7" fill="#003B78" textAnchor="middle" fontFamily="monospace">+Notify</text>
      <circle cx="26" cy="14" r="3" fill="none" stroke="#43B4FF" strokeWidth="0.8" className="pv-dot" />
      <circle cx="206" cy="68" r="3" fill="none" stroke="#0B5FAA" strokeWidth="0.8" className="pv-dot" style={{ animationDelay: ".8s" }} />
    </svg>
  );
}
