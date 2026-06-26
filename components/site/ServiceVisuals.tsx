export function SaasVisual() {
  const bars = [40, 65, 85, 50, 95, 70, 55, 80];
  const colors = [
    "rgba(120,108,255,0.3)", "rgba(120,108,255,0.5)", "#786CFF",
    "rgba(120,108,255,0.6)", "#32C8FF", "rgba(50,200,255,0.6)",
    "rgba(120,108,255,0.4)", "#786CFF",
  ];
  return (
    <div className="relative h-[110px] px-4 py-3.5 overflow-hidden flex items-end gap-2" style={{ background: "var(--void)" }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 14, borderRadius: "3px 3px 0 0", background: colors[i], height: `${h}%` }} />
      ))}
      <div className="flex-1 rounded-md ml-1 flex flex-col justify-center px-2 py-1" style={{ background: "rgba(50,200,255,0.06)", border: "1px solid rgba(50,200,255,0.18)" }}>
        <div className="font-mono text-[8px]" style={{ color: "var(--indigo-dim)" }}>MRR</div>
        <div className="font-display font-bold text-[14px]" style={{ color: "var(--indigo-dim)" }}>$24k</div>
        <div className="text-[8px]" style={{ color: "var(--indigo-dim)" }}>+18%</div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(120,108,255,0.1)" }} />
    </div>
  );
}

export function MobileVisual() {
  return (
    <div className="relative h-[110px] flex items-center justify-center gap-3 overflow-hidden" style={{ background: "var(--void)" }}>
      {/* Browser */}
      <div className="w-[56px] rounded-lg overflow-hidden" style={{ background: "#221735", border: "1px solid rgba(120,108,255,0.25)" }}>
        <div className="flex justify-center gap-[3px] py-1" style={{ background: "var(--slate)" }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div className="p-1.5 space-y-[3px]">
          <div style={{ height: 3, background: "rgba(120,108,255,0.3)", borderRadius: 1 }} />
          <div style={{ height: 3, background: "rgba(50,200,255,0.4)", borderRadius: 1, width: "70%" }} />
          <div style={{ height: 3, background: "rgba(120,108,255,0.2)", borderRadius: 1 }} />
          <div style={{ height: 12, background: "rgba(50,200,255,0.08)", border: "1px solid rgba(50,200,255,0.25)", borderRadius: 2 }} />
          <div style={{ height: 3, background: "rgba(120,108,255,0.15)", borderRadius: 1, width: "50%" }} />
        </div>
      </div>
      {/* Phone */}
      <div className="w-[38px] rounded-md overflow-hidden" style={{ background: "#221735", border: "1px solid rgba(50,200,255,0.25)" }}>
        <div className="flex justify-center py-1" style={{ background: "var(--slate)" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--void)", border: "1px solid rgba(120,108,255,0.3)" }} />
        </div>
        <div className="p-1 space-y-[2px]">
          <div style={{ height: 3, background: "rgba(50,200,255,0.3)", borderRadius: 1 }} />
          <div style={{ height: 3, background: "rgba(120,108,255,0.2)", borderRadius: 1, width: "70%" }} />
          <div style={{ height: 6, background: "rgba(50,200,255,0.1)", border: "1px solid rgba(50,200,255,0.25)", borderRadius: 2 }} />
          <div style={{ height: 3, background: "rgba(120,108,255,0.15)", borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

export function AutomationVisual() {
  return (
    <div className="relative h-[110px] px-4 py-2 overflow-hidden flex items-center" style={{ background: "var(--void)" }}>
      <svg width="100%" height="86" viewBox="0 0 160 86">
        <defs>
          <marker id="sv-ah" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto">
            <path d="M1 1L5 3L1 5" fill="none" stroke="#786CFF" strokeWidth="1.2" />
          </marker>
          <marker id="sv-ah2" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="3" markerHeight="3" orient="auto">
            <path d="M1 1L5 3L1 5" fill="none" stroke="#32C8FF" strokeWidth="1.2" />
          </marker>
        </defs>
        <rect x="4" y="32" width="32" height="22" rx="4" fill="#221735" stroke="rgba(120,108,255,0.3)" strokeWidth="0.5" />
        <text x="20" y="46" fontSize="8" fill="#8B95B0" textAnchor="middle" fontFamily="monospace">API</text>
        <line x1="36" y1="43" x2="52" y2="43" stroke="#786CFF" strokeWidth="0.8" markerEnd="url(#sv-ah)" strokeDasharray="3,2" className="pv-flow" />
        <rect x="52" y="10" width="36" height="22" rx="4" fill="#221735" stroke="rgba(50,200,255,0.3)" strokeWidth="0.5" />
        <text x="70" y="24" fontSize="8" fill="#32C8FF" textAnchor="middle" fontFamily="monospace">Filter</text>
        <rect x="52" y="54" width="36" height="22" rx="4" fill="#221735" stroke="rgba(120,108,255,0.25)" strokeWidth="0.5" />
        <text x="70" y="68" fontSize="8" fill="#8B95B0" textAnchor="middle" fontFamily="monospace">Queue</text>
        <line x1="88" y1="21" x2="108" y2="38" stroke="#32C8FF" strokeWidth="0.8" markerEnd="url(#sv-ah2)" className="pv-flow" style={{ animationDelay: ".3s" }} />
        <line x1="88" y1="65" x2="108" y2="50" stroke="#786CFF" strokeWidth="0.8" markerEnd="url(#sv-ah)" className="pv-flow" style={{ animationDelay: ".6s" }} />
        <rect x="108" y="30" width="44" height="26" rx="4" fill="#221735" stroke="rgba(50,200,255,0.3)" strokeWidth="0.5" />
        <text x="130" y="41" fontSize="8" fill="#32C8FF" textAnchor="middle" fontFamily="monospace">Webhook</text>
        <text x="130" y="51" fontSize="7" fill="#5E46C9" textAnchor="middle" fontFamily="monospace">Dispatch</text>
        <circle cx="20" cy="14" r="3" fill="none" stroke="#32C8FF" strokeWidth="0.8" className="pv-dot" />
        <circle cx="130" cy="76" r="3" fill="none" stroke="#786CFF" strokeWidth="0.8" className="pv-dot" style={{ animationDelay: ".8s" }} />
      </svg>
    </div>
  );
}
