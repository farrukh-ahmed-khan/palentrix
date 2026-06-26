export function HeroVisuals() {
  return (
    <div className="relative h-[440px] w-full select-none">
      {/* backdrop concentric circles */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 240, height: 240, background: "rgba(120,108,255,0.04)", border: "1px solid rgba(120,108,255,0.08)" }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: 360, height: 360, background: "rgba(50,200,255,0.02)", border: "1px solid rgba(50,200,255,0.06)" }} />

      {/* Card 1 â€” dashboard / bars */}
      <div
        className="absolute z-30"
        style={{
          top: 30, left: 20, width: 230,
          background: "var(--slate)", border: "1px solid rgba(120,108,255,0.25)",
          borderRadius: 14, padding: 16,
          animation: "floatA 5s ease-in-out infinite",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="pv-pulse" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--teal)" }} />
          <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>dashboard.tsx</span>
        </div>
        <div style={{ position: "relative", height: 60 }}>
          {[
            { c: "rgba(120,108,255,0.5)", h: "60%", d: ".1s", x: 4 },
            { c: "rgba(120,108,255,0.7)", h: "80%", d: ".2s", x: 30 },
            { c: "#786CFF", h: "55%", d: ".3s", x: 56 },
            { c: "rgba(120,108,255,0.6)", h: "90%", d: ".4s", x: 82 },
            { c: "#32C8FF", h: "70%", d: ".5s", x: 108 },
            { c: "rgba(50,200,255,0.6)", h: "45%", d: ".6s", x: 134 },
            { c: "rgba(120,108,255,0.5)", h: "85%", d: ".7s", x: 160 },
          ].map((b, i) => (
            <div key={i} className="pv-bar"
              style={{ width: 20, background: b.c, left: b.x, animationDelay: b.d, ["--h" as never]: b.h }} />
          ))}
        </div>
        <div className="mt-3 flex justify-between items-end">
          <div>
            <div className="font-mono text-[9px]" style={{ color: "var(--indigo-dim)" }}>MRR</div>
            <div className="font-display font-bold text-[18px]" style={{ color: "var(--indigo-dim)" }}>$24k</div>
          </div>
          <span className="font-mono text-[11px] font-semibold" style={{ color: "var(--indigo-dim)" }}>+18%</span>
        </div>
      </div>

      {/* Card 2 â€” code block */}
      <div
        className="absolute z-20"
        style={{
          bottom: 30, right: 10, width: 210,
          background: "var(--slate)", border: "1px solid rgba(50,200,255,0.25)",
          borderRadius: 14, padding: 14,
          animation: "floatB 6s ease-in-out infinite",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="3" stroke="#786CFF" strokeWidth="1" />
            <path d="M4 7h6M7 4v6" stroke="#32C8FF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="font-mono text-[10px]" style={{ color: "var(--muted)" }}>auth.service.ts</span>
        </div>
        <div style={{ background: "var(--ink)", borderRadius: 6, padding: 10, fontFamily: "var(--font-mono)", fontSize: 10, lineHeight: 1.8 }}>
          <div><span style={{ color: "#786CFF" }}>const</span> <span style={{ color: "#F4F5F9" }}>token</span> <span style={{ color: "#8B95B0" }}>= await</span></div>
          <div><span style={{ color: "#32C8FF" }}>jwt</span><span style={{ color: "#8B95B0" }}>.</span><span style={{ color: "#F4F5F9" }}>sign</span><span style={{ color: "#8B95B0" }}>(</span></div>
          <div style={{ paddingLeft: 10 }}><span style={{ color: "#F4F5F9" }}>payload</span><span style={{ color: "#8B95B0" }}>,</span></div>
          <div style={{ paddingLeft: 10 }}><span style={{ color: "#32C8FF" }}>SECRET_KEY</span></div>
          <div><span style={{ color: "#8B95B0" }}>)</span><span className="pv-blink" style={{ color: "#32C8FF" }}>|</span></div>
        </div>
      </div>

      {/* Card 3 â€” automation flow */}
      <div
        className="absolute z-10"
        style={{
          bottom: 50, left: 40, width: 180,
          background: "var(--slate)", border: "1px solid rgba(120,108,255,0.25)",
          borderRadius: 14, padding: 14,
          animation: "floatC 7s ease-in-out infinite",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="font-mono text-[9px] mb-2" style={{ color: "var(--indigo-dim)" }}>AUTOMATION FLOW</div>
        <svg width="100%" height="74" viewBox="0 0 140 74">
          <defs>
            <marker id="hv-ah" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M1 1L5 3L1 5" fill="none" stroke="#786CFF" strokeWidth="1.2" />
            </marker>
          </defs>
          <rect x="2" y="24" width="36" height="22" rx="4" fill="#221735" stroke="rgba(120,108,255,0.3)" strokeWidth="0.5" />
          <text x="20" y="38" fontSize="8" fill="#8B95B0" textAnchor="middle" fontFamily="monospace">Trigger</text>
          <line x1="38" y1="35" x2="52" y2="35" stroke="#786CFF" strokeWidth="0.8" markerEnd="url(#hv-ah)" strokeDasharray="3,2" className="pv-flow" />
          <rect x="52" y="24" width="36" height="22" rx="4" fill="#221735" stroke="rgba(50,200,255,0.3)" strokeWidth="0.5" />
          <text x="70" y="38" fontSize="8" fill="#32C8FF" textAnchor="middle" fontFamily="monospace">Process</text>
          <line x1="88" y1="35" x2="102" y2="35" stroke="#786CFF" strokeWidth="0.8" markerEnd="url(#hv-ah)" strokeDasharray="3,2" className="pv-flow" style={{ animationDelay: ".5s" }} />
          <rect x="102" y="24" width="36" height="22" rx="4" fill="#221735" stroke="rgba(120,108,255,0.2)" strokeWidth="0.5" />
          <text x="120" y="38" fontSize="8" fill="#8B95B0" textAnchor="middle" fontFamily="monospace">Output</text>
          <circle cx="20" cy="10" r="3" fill="none" stroke="#32C8FF" strokeWidth="0.8" className="pv-dot" />
          <circle cx="120" cy="10" r="3" fill="none" stroke="#32C8FF" strokeWidth="0.8" className="pv-dot" style={{ animationDelay: "1s" }} />
        </svg>
      </div>
    </div>
  );
}
