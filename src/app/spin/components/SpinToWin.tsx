"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";

// ─── Prize Data ────────────────────────────────────────────────────────────────
interface Prize {
  label: string;
  code: string;
  discount: number; // 0 = no discount (retry)
  color: string;
  darkColor: string;
  textColor: string;
  isRetry: boolean;
}

const PRIZES: Prize[] = [
  { label: "%5 İndirim",    code: "FIRSATSPIN5",  discount: 5,  color: "#a78bfa", darkColor: "#7c3aed", textColor: "#fff", isRetry: false },
  { label: "%10 İndirim",   code: "FIRSATSPIN10", discount: 10, color: "#5aacf0", darkColor: "#2563eb", textColor: "#fff", isRetry: false },
  { label: "Tekrar Dene",   code: "",             discount: 0,  color: "#e2e8f0", darkColor: "#374151", textColor: "#6b7280", isRetry: true  },
  { label: "%15 İndirim",   code: "FIRSATSPIN15", discount: 15, color: "#2ec4a0", darkColor: "#059669", textColor: "#fff", isRetry: false },
  { label: "%20 İndirim",   code: "FIRSATSPIN20", discount: 20, color: "#f59e0b", darkColor: "#d97706", textColor: "#fff", isRetry: false },
  { label: "%25 İndirim",   code: "FIRSATSPIN25", discount: 25, color: "#ec4899", darkColor: "#db2777", textColor: "#fff", isRetry: false },
];

const SLICE_COUNT = PRIZES.length; // 6
const SLICE_DEG = 360 / SLICE_COUNT; // 60°

const LS_COOLDOWN_KEY = "spinwheel_cooldown_until";
const LS_USED_CODES_KEY = "spinwheel_used_codes";

function getWinningIndex(finalDeg: number): number {
  const normalised = ((finalDeg % 360) + 360) % 360;
  const raw = (360 - normalised) / SLICE_DEG;
  return Math.floor(raw) % SLICE_COUNT;
}

function getCooldownUntil(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(LS_COOLDOWN_KEY) || "0", 10);
}

function setCooldown() {
  const until = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem(LS_COOLDOWN_KEY, String(until));
}

function getUsedCodes(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LS_USED_CODES_KEY) || "[]");
  } catch {
    return [];
  }
}

function markCodeUsed(code: string) {
  const used = getUsedCodes();
  if (!used.includes(code)) {
    used.push(code);
    localStorage.setItem(LS_USED_CODES_KEY, JSON.stringify(used));
  }
}

function isCodeUsed(code: string): boolean {
  return getUsedCodes().includes(code);
}

function formatCooldownRemaining(until: number): string {
  const diff = until - Date.now();
  if (diff <= 0) return "";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return `${h}s ${m}dk`;
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SpinToWin() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [modal, setModal] = useState<{ open: boolean; prize: Prize | null; alreadyUsed?: boolean }>({ open: false, prize: null });
  const [hasSpun, setHasSpun] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState("");
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentRotation = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const checkCooldown = () => {
      const until = getCooldownUntil();
      if (until > Date.now()) {
        setIsCoolingDown(true);
        setCooldownRemaining(formatCooldownRemaining(until));
      } else {
        setIsCoolingDown(false);
        setCooldownRemaining("");
      }
    };
    checkCooldown();
    timerRef.current = setInterval(checkCooldown, 3000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const spin = useCallback(() => {
    if (spinning || isCoolingDown) return;

    const targetIndex = Math.floor(Math.random() * SLICE_COUNT);
    const extraTurns = (5 + Math.floor(Math.random() * 4)) * 360;
    const targetOffset = 360 - targetIndex * SLICE_DEG - SLICE_DEG / 2;
    const delta = extraTurns + targetOffset - (currentRotation.current % 360);
    const finalRotation = currentRotation.current + delta;

    currentRotation.current = finalRotation;
    setRotation(finalRotation);
    setSpinning(true);
    setHasSpun(true);

    setTimeout(() => {
      setSpinning(false);
      const winIndex = getWinningIndex(finalRotation);
      const prize = PRIZES[winIndex];

      if (!prize.isRetry) {
        // Set 1-day cooldown
        setCooldown();
        setIsCoolingDown(true);
        setCooldownRemaining(formatCooldownRemaining(getCooldownUntil()));
        const alreadyUsed = prize.code ? isCodeUsed(prize.code) : false;
        setModal({ open: true, prize, alreadyUsed });
      } else {
        // Retry — no cooldown, just show modal
        setModal({ open: true, prize, alreadyUsed: false });
      }
    }, 5100);
  }, [spinning, isCoolingDown]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    markCodeUsed(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const closeModal = () => setModal({ open: false, prize: null });

  // ─── SVG Wheel ───────────────────────────────────────────────────────────────
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  function round(value: number) {
    return Math.round(value * 1000) / 1000;
  }

  function polarToCartesian(angle: number, radius: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: round(cx + radius * Math.cos(rad)), y: round(cy + radius * Math.sin(rad)) };
  }

  function slicePath(index: number) {
    const startAngle = index * SLICE_DEG;
    const endAngle = startAngle + SLICE_DEG;
    const start = polarToCartesian(startAngle, r);
    const end = polarToCartesian(endAngle, r);
    return `M ${round(cx)} ${round(cy)} L ${start.x} ${start.y} A ${round(r)} ${round(r)} 0 0 1 ${end.x} ${end.y} Z`;
  }

  function labelTransform(index: number) {
    const midAngle = index * SLICE_DEG + SLICE_DEG / 2;
    const labelR = r * 0.62;
    const pos = polarToCartesian(midAngle, labelR);
    return { x: pos.x, y: pos.y, rotate: round(midAngle - 90) };
  }

  return (
    <>
      <section id="spin" className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-[#f0f8ff] via-[#fdfaf5] to-[#f0fdf9] dark:from-[#0a0f1c] dark:via-[#0d1220] dark:to-[#0a0f1c] transition-colors duration-500">
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full opacity-30 dark:opacity-20"
            style={{ background: "radial-gradient(circle, rgba(90,172,240,0.3) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-16 -right-16 w-[400px] h-[400px] rounded-full opacity-25 dark:opacity-15"
            style={{ background: "radial-gradient(circle, rgba(46,196,160,0.3) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-[1024px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.06em] uppercase mb-4 bg-[rgba(90,172,240,0.1)] dark:bg-[rgba(90,172,240,0.15)] border border-[rgba(90,172,240,0.25)] text-[#5aacf0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2ec4a0] animate-pulse" />
              Özel Kampanya
            </span>
            <h2 className="text-[2.2rem] md:text-[3rem] font-bold leading-tight mb-3 text-[#1a1a2e] dark:text-white" style={{ letterSpacing: "-0.04em" }}>
              Çevir &amp; Kazan!
            </h2>
            <p className="text-[16px] font-light max-w-md mx-auto text-[#8a8aaa] dark:text-gray-400">
              Çarkı çevir, %5'ten %25'e kadar indirim fırsatlarını yakala.
            </p>
          </div>

          {/* Cooldown Banner */}
          {isCoolingDown && (
            <div className="max-w-md mx-auto mb-8 flex items-center gap-3 px-5 py-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 text-amber-700 dark:text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <p className="text-[13px] font-semibold">Bir sonraki çevirme hakkın:</p>
                <p className="text-[12px] opacity-80">{cooldownRemaining} sonra tekrar çevirebilirsin.</p>
              </div>
            </div>
          )}

          {/* Wheel + Button */}
          <div className="flex flex-col items-center gap-8">
            <div className="relative flex items-center justify-center">
              {/* Pointer */}
              <div className="absolute z-20 top-0 left-1/2 -translate-x-1/2 -translate-y-1" style={{ filter: "drop-shadow(0 4px 8px rgba(26,26,46,0.25))" }}>
                <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
                  <polygon points="14,38 2,4 26,4" fill="#1a1a2e" />
                  <polygon points="14,38 2,4 26,4" fill="url(#ptr-grad)" />
                  <defs>
                    <linearGradient id="ptr-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5aacf0" />
                      <stop offset="100%" stopColor="#1a1a2e" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Wheel SVG */}
              <div className="relative" style={{ width: "min(420px, 90vw)", height: "min(420px, 90vw)", filter: "drop-shadow(0 16px 48px rgba(90,172,240,0.22))" }}>
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  width="100%"
                  height="100%"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 1)" : "none",
                    willChange: "transform",
                  }}
                >
                  <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="rgba(90,172,240,0.2)" strokeWidth="12" />

                  {PRIZES.map((prize, i) => {
                    const lt = labelTransform(i);
                    return (
                      <g key={i}>
                        <path d={slicePath(i)} fill={prize.color} stroke="#fff" strokeWidth="2" />
                        <text
                          x={lt.x} y={lt.y}
                          textAnchor="middle" dominantBaseline="middle"
                          fill={prize.textColor}
                          fontSize="11"
                          fontWeight="700"
                          fontFamily="DM Sans, sans-serif"
                          transform={`rotate(${lt.rotate}, ${lt.x}, ${lt.y})`}
                          style={{ pointerEvents: "none", userSelect: "none" }}
                        >
                          {prize.label.split(" ").map((word, wi) => (
                            <tspan key={wi} x={lt.x} dy={wi === 0 ? (prize.label.includes(" ") ? "-7" : "0") : "14"}>
                              {word}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center hub */}
                  <circle cx={cx} cy={cy} r={36} fill="#1a1a2e" />
                  <circle cx={cx} cy={cy} r={30} fill="url(#hub-grad)" />
                  <defs>
                    <radialGradient id="hub-grad" cx="40%" cy="35%">
                      <stop offset="0%" stopColor="#5aacf0" />
                      <stop offset="100%" stopColor="#1a1a2e" />
                    </radialGradient>
                  </defs>
                  <text x={cx} y={cy + 5} textAnchor="middle" dominantBaseline="middle" fontSize="22" style={{ userSelect: "none" }}>✦</text>
                </svg>
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={spin}
              disabled={spinning || isCoolingDown}
              className="relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full text-white text-[16px] font-semibold tracking-[-0.01em] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: (spinning || isCoolingDown)
                  ? "linear-gradient(135deg, #8a8aaa 0%, #b0b0c8 100%)"
                  : "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)",
                boxShadow: (spinning || isCoolingDown) ? "none" : "0 8px 32px rgba(26,26,46,0.22)",
                transform: spinning ? "scale(0.97)" : "scale(1)",
              }}
            >
              {spinning ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Çevriliyor…
                </>
              ) : isCoolingDown ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                  Bekleniyor…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                  </svg>
                  {hasSpun ? "Tekrar Çevir" : "Çarkı Çevir!"}
                </>
              )}
            </button>

            {/* Prize legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg mt-2">
              {PRIZES.map((prize, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium bg-white/70 dark:bg-white/5 border border-gray-200/80 dark:border-gray-700/50 text-[#1a1a2e] dark:text-gray-300"
                >
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: prize.color }} />
                  {prize.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Modal ───────────────────────────────────────────────────────────── */}
      {modal.open && modal.prize && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,46,0.65)", backdropFilter: "blur(8px)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-white dark:bg-[#111827]"
            style={{
              boxShadow: "0 32px 80px rgba(26,26,46,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
              animation: "modalPop 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #5aacf0 0%, #2ec4a0 50%, #a78bfa 100%)" }} />

            <div className="px-8 py-8 text-center">
              {modal.prize.isRetry ? (
                <>
                  <div className="text-5xl mb-4">🔄</div>
                  <h3 className="text-[1.6rem] font-bold mb-2 text-[#1a1a2e] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                    Tekrar Dene!
                  </h3>
                  <p className="text-[15px] mb-6 text-[#8a8aaa] dark:text-gray-400">
                    Bu sefer olmadı ama bir hakkın daha var! Çarkı tekrar çevir.
                  </p>
                  <button
                    onClick={() => { closeModal(); }}
                    className="w-full py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] text-white"
                    style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)", boxShadow: "0 6px 20px rgba(26,26,46,0.18)" }}
                  >
                    Tekrar Çevir →
                  </button>
                </>
              ) : modal.alreadyUsed ? (
                <>
                  <div className="text-5xl mb-4">⚠️</div>
                  <h3 className="text-[1.6rem] font-bold mb-2 text-[#1a1a2e] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                    Kod Kullanıldı
                  </h3>
                  <p className="text-[15px] mb-6 text-[#8a8aaa] dark:text-gray-400">
                    <strong className="text-[#1a1a2e] dark:text-white">{modal.prize.code}</strong> kodu daha önce kullanıldı.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] text-white"
                    style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)", boxShadow: "0 6px 20px rgba(26,26,46,0.18)" }}
                  >
                    Tamam
                  </button>
                </>
              ) : (
                <>
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-[1.6rem] font-bold mb-2 text-[#1a1a2e] dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                    Tebrikler!
                  </h3>
                  <p className="text-[15px] mb-4 text-[#8a8aaa] dark:text-gray-400">
                    Kazandığın ödül:
                  </p>
                  <div className="text-[1.25rem] font-bold mb-4 py-2 px-4 rounded-2xl bg-[rgba(90,172,240,0.08)] dark:bg-[rgba(90,172,240,0.12)] text-[#1a1a2e] dark:text-white">
                    {modal.prize.label}
                  </div>
                  <p className="text-[13px] mb-3 text-[#8a8aaa] dark:text-gray-400">
                    Kupon kodun (tek kullanımlık):
                  </p>
                  <button
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl mb-3 w-full justify-center transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #1a1a2e 0%, #2d2d4e 100%)",
                      color: "#fff",
                      letterSpacing: "0.12em",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                    }}
                    onClick={() => handleCopyCode(modal.prize!.code)}
                    title="Kopyalamak için tıkla"
                  >
                    {copied ? "✓ Kopyalandı!" : modal.prize.code}
                    {!copied && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                  <p className="text-[11px] text-[#b0b0c8] dark:text-gray-500 mb-6">
                    Ödeme ekranında bu kodu gir, {modal.prize.discount}% indirim otomatik uygulanır.
                  </p>
                  <button
                    onClick={closeModal}
                    className="w-full py-3 rounded-2xl text-[14px] font-semibold transition-all duration-200 hover:scale-[1.02] text-white"
                    style={{ background: "linear-gradient(135deg, #5aacf0 0%, #2ec4a0 100%)", boxShadow: "0 6px 20px rgba(90,172,240,0.25)" }}
                  >
                    Alışverişe Devam Et →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
