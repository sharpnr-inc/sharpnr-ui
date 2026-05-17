"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import gsap from "gsap";

// ─── Types ───────────────────────────────────────────────────────────────────
interface GlobalErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

// ─── Icon ────────────────────────────────────────────────────────────────────
function ErrorIcon() {
  const ringRef = useRef<SVGCircleElement>(null);
  const glyphRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ringRef.current || !glyphRef.current) return;

    // Slow, calm breathing on the outer ring
    gsap.to(ringRef.current, {
      opacity: 0.3,
      scale: 1.06,
      duration: 2.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "center",
    });

    // Very subtle float on the glyph
    gsap.to(glyphRef.current, {
      y: -3,
      duration: 3.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <motion.svg
      viewBox="0 0 80 80"
      width={72}
      height={72}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Soft outer glow ring */}
      <circle
        ref={ringRef}
        cx="40"
        cy="40"
        r="37"
        fill="none"
        stroke="#e05a5a"
        strokeWidth="1"
        opacity="0.55"
      />
      {/* Main circle */}
      <circle
        cx="40"
        cy="40"
        r="28"
        fill="rgba(224,90,90,0.07)"
        stroke="#e05a5a"
        strokeWidth="1.2"
      />
      {/* Exclamation glyph */}
      <g ref={glyphRef}>
        <rect
          x="38.5"
          y="24"
          width="3"
          height="17"
          rx="1.5"
          fill="#e05a5a"
          opacity="0.85"
        />
        <circle cx="40" cy="49.5" r="2" fill="#e05a5a" opacity="0.85" />
      </g>
    </motion.svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = async () => {
    if (!reset || isResetting) return;
    setIsResetting(true);
    await new Promise((r) => setTimeout(r, 800));
    reset();
    setIsResetting(false);
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

        .err-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent);
        }

        .err-retry {
          background: rgba(224,90,90,0.1);
          border: 1px solid rgba(224,90,90,0.28);
          color: #e05a5a;
          padding: 10px 22px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }
        .err-retry:hover {
          background: rgba(224,90,90,0.17);
          border-color: rgba(224,90,90,0.45);
        }
        .err-retry:disabled { opacity: 0.4; cursor: not-allowed; }

        .err-home {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.07);
          color: #4a4a58;
          padding: 10px 22px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          border-radius: 6px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: border-color 0.2s, color 0.2s;
        }
        .err-home:hover { border-color: rgba(255,255,255,0.16); color: #7a7a90; }

        .err-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 11px;
          font-family: 'JetBrains Mono', monospace;
        }
        .err-row:last-child { border-bottom: none; }
        .err-key { color: #32323e; flex-shrink: 0; }
        .err-val { color: #5a4a4a; text-align: right; word-break: break-all; }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0e0e10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {/* Barely-there radial tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 40% at 50% 48%, rgba(70,15,15,0.14) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: 400,
            width: "100%",
            padding: "0 28px",
          }}
        >
          {/* Icon */}
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <ErrorIcon />
          </motion.div>

          {/* Status tag */}
          <motion.div
            variants={fadeUp}
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "#32323e",
              marginBottom: 14,
            }}
          >
            500 · INTERNAL ERROR
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: "clamp(20px, 4vw, 26px)",
              fontWeight: 500,
              color: "#c4c4d0",
              margin: "0 0 14px",
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
            }}
          >
            Something went wrong
          </motion.h1>

          {/* Body copy */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 12,
              color: "#3a3a48",
              lineHeight: 1.8,
              margin: "0 0 32px",
              maxWidth: 320,
            }}
          >
            An unexpected error occurred. The team has been notified — try
            refreshing or head back home.
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={fadeUp}
            style={{ width: "100%", marginBottom: 24 }}
          >
            <div className="err-divider" />
          </motion.div>

          {/* Error details (only when error is provided) */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{ width: "100%", marginBottom: 28, textAlign: "left" }}
              >
                <div className="err-row">
                  <span className="err-key">type</span>
                  <span className="err-val">{error.name || "Error"}</span>
                </div>
                <div className="err-row">
                  <span className="err-key">message</span>
                  <span className="err-val">
                    {(error.message || "—").slice(0, 58)}
                    {(error.message?.length ?? 0) > 58 ? "…" : ""}
                  </span>
                </div>
                {error.digest && (
                  <div className="err-row">
                    <span className="err-key">digest</span>
                    <span className="err-val">{error.digest}</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: 10, alignItems: "center" }}
          >
            {reset && (
              <motion.button
                className="err-retry"
                onClick={handleReset}
                disabled={isResetting}
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence mode="wait">
                  {isResetting ? (
                    <motion.span
                      key="busy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      retrying…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      try again
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            )}

            <motion.a href="/" className="err-home" whileTap={{ scale: 0.97 }}>
              go home
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
