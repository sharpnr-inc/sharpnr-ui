"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─────────────────────────────────────────────────────────────────────────────
// USAGE
//   defaultPendingComponent: () => <GlobalLoader />
//   pendingComponent: () => <GlobalLoader message="Fetching Policies..." />
// ─────────────────────────────────────────────────────────────────────────────

interface GlobalLoaderProps {
  message?: string;
}

export function GlobalLoader({ message = "Loading..." }: GlobalLoaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const ring3Ref = useRef<SVGCircleElement>(null);
  const ticksRef = useRef<SVGGElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  // Gene Sequence Refs
  const moleculeRef = useRef<SVGGElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const connectorsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── Entrance ────────────────────────────────────────────────────────────

      // Backdrop fade
      tl.fromTo(
        wrapRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        0,
      );

      // Outer ring draws in
      tl.fromTo(
        ring1Ref.current,
        { strokeDashoffset: 314, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.9, ease: "expo.inOut" },
        0.1,
      );

      // Middle ring
      tl.fromTo(
        ring2Ref.current,
        { strokeDashoffset: 226, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.3,
          duration: 0.75,
          ease: "expo.inOut",
        },
        0.25,
      );

      // Inner ring
      tl.fromTo(
        ring3Ref.current,
        { strokeDashoffset: 138, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.15,
          duration: 0.6,
          ease: "expo.inOut",
        },
        0.38,
      );

      // Tick marks stagger in
      tl.fromTo(
        ticksRef.current!.children,
        { opacity: 0, scale: 0, transformOrigin: "center" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "back.out(2)",
        },
        0.55,
      );

      // --- Gene Sequence Entrance ---
      // Nodes pop in with a bounce
      tl.fromTo(
        nodesRef.current!.children,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(1.7)",
        },
        0.65,
      );

      // Connectors reveal
      tl.fromTo(
        connectorsRef.current!.children,
        { scale: 0, opacity: 0, transformOrigin: "center" },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.04 },
        0.8,
      );

      // Label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.75,
      );

      // Bar fill sweep
      tl.fromTo(
        barFillRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.55, ease: "power2.inOut" },
        0.8,
      );

      // ── Idle loops ───────────────────────────────────────────────────────────

      // Ring 1 — slow spin
      gsap.to(ring1Ref.current, {
        rotation: 360,
        transformOrigin: "60px 60px",
        duration: 9,
        repeat: -1,
        ease: "none",
        delay: 1,
      });

      // Ring 2 — counter spin
      gsap.to(ring2Ref.current, {
        rotation: -360,
        transformOrigin: "60px 60px",
        duration: 14,
        repeat: -1,
        ease: "none",
        delay: 1,
      });

      // Molecule slowly rotates as a whole
      gsap.to(moleculeRef.current, {
        rotation: 360,
        transformOrigin: "25px 25px", // Center point of the SVG group
        duration: 20,
        repeat: -1,
        ease: "none",
        delay: 1,
      });

      // Subtle breathing float on individual nodes
      Array.from(nodesRef.current!.children).forEach((node, i) => {
        gsap.to(node, {
          y: i % 2 === 0 ? -3 : 3,
          duration: 1.5 + i * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Scanline sweep
      gsap.to(scanlineRef.current, {
        y: "100vh",
        duration: 2.8,
        repeat: -1,
        ease: "none",
        delay: 0.5,
      });

      // Shimmer bar
      gsap.to(barFillRef.current, {
        opacity: 0.35,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.4,
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  // ── Tick positions (12 marks around outer ring) ──────────────────────────────
  const ticks = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const inner = 46;
    const outer = i % 3 === 0 ? 54 : 50;
    return {
      x1: 60 + Math.cos(angle) * inner,
      y1: 60 + Math.sin(angle) * inner,
      x2: 60 + Math.cos(angle) * outer,
      y2: 60 + Math.sin(angle) * outer,
      major: i % 3 === 0,
    };
  });

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        background: "#09090b", // Pure dark background
        opacity: 0, // GSAP animates this in
        overflow: "hidden",
      }}
    >
      {/* ── Scanline sweep ── */}
      <div
        ref={scanlineRef}
        style={{
          position: "absolute",
          top: "-2px",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 40%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.03) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 100%)",
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />

      {/* ── Visual core ── */}
      <div style={{ position: "relative" }}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
        >
          {/* Ring 1 — outer */}
          <circle
            ref={ring1Ref}
            cx="60"
            cy="60"
            r="50"
            stroke="#f4f4f5" // Zinc 100
            strokeWidth="0.75"
            strokeDasharray="314"
            strokeDashoffset="314"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />

          {/* Ring 2 — middle */}
          <circle
            ref={ring2Ref}
            cx="60"
            cy="60"
            r="36"
            stroke="#f4f4f5"
            strokeWidth="0.5"
            strokeDasharray="226"
            strokeDashoffset="226"
            strokeLinecap="round"
            fill="none"
            opacity="0"
          />

          {/* Ring 3 — inner fill ring */}
          <circle
            ref={ring3Ref}
            cx="60"
            cy="60"
            r="22"
            stroke="#f4f4f5"
            strokeWidth="0.5"
            strokeDasharray="138"
            strokeDashoffset="138"
            fill="none"
            opacity="0"
          />

          {/* Tick marks */}
          <g ref={ticksRef}>
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="#f4f4f5"
                strokeWidth={t.major ? 1.5 : 0.75}
                strokeLinecap="round"
                opacity={t.major ? 0.9 : 0.4}
              />
            ))}
          </g>

          {/* ── Molecule Slot ── */}
          <g transform="translate(35, 35) scale(0.83)">
            <g ref={moleculeRef}>
              <g
                ref={connectorsRef}
                stroke="#52525b"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="25" y1="38" x2="10" y2="15" />
                <line x1="38" y1="42" x2="58" y2="30" />
                <line x1="32" y1="55" x2="25" y2="68" />
                <line x1="58" y1="30" x2="62" y2="12" />
                <line x1="60" y1="35" x2="55" y2="48" />
              </g>
              <g ref={nodesRef} fill="#fafafa">
                <circle cx="32" cy="45" r="10" />
                <circle cx="8" cy="12" r="8" />
                <circle cx="60" cy="30" r="6" />
                <circle cx="22" cy="72" r="5" />
                <circle cx="65" cy="8" r="3" />
                <circle cx="55" cy="52" r="3" />
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* ── Message + bar ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <p
          ref={labelRef}
          style={{
            margin: 0,
            opacity: 0,
            fontFamily: "monospace",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#a1a1aa", // Muted Zinc
          }}
        >
          {message}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "96px",
            height: "1px",
            background: "#27272a", // Border color
            overflow: "hidden",
          }}
        >
          <div
            ref={barFillRef}
            style={{
              width: "100%",
              height: "100%",
              background: "#fafafa",
              transformOrigin: "left center",
              transform: "scaleX(0)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
