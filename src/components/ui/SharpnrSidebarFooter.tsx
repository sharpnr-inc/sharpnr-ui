import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSidebar, SidebarFooter } from "./sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { cn } from "@/lib/utils";

const NAVY = "#0B0D2E";
const NAVY_MID = "#141741";
const NAVY_BRIGHT = "#1E2260";
const WHITE = "#F0F2F7";
const WHITE_DIM = "rgba(240,242,247,0.55)";

const DEFAULT_LOGO = "https://cdn.sharpnr.com/shicon.svg";

export interface SharpnrSidebarFooterProps {
  /** Where the badge links to. Pass `null` to render a non-interactive badge. */
  href?: string | null;
  /** Small uppercase eyebrow text shown above the brand name. */
  label?: string;
  /** Brand name shown in bold. */
  brand?: string;
  /** Logo image source. */
  logoSrc?: string;
  /** Extra classes applied to the footer wrapper. */
  className?: string;
}

function Particle({
  x,
  y,
  size,
  duration,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: WHITE,
      }}
      animate={{
        y: [0, -14, 0],
        x: [0, 3, -3, 0],
        opacity: [0, 0.55, 0],
        scale: [0.4, 1, 0.4],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

const PARTICLES = [
  { x: 8, y: 82, size: 2.5, duration: 3.4, delay: 0 },
  { x: 28, y: 65, size: 1.8, duration: 2.9, delay: 0.6 },
  { x: 55, y: 75, size: 3, duration: 3.7, delay: 1.2 },
  { x: 78, y: 55, size: 2, duration: 2.6, delay: 0.2 },
  { x: 48, y: 88, size: 2.5, duration: 3.1, delay: 1.9 },
  { x: 92, y: 70, size: 1.8, duration: 3.0, delay: 0.9 },
];

/** The logo tile — fixed 32px so it fits inside the collapsed icon rail. */
function Logo({ logoSrc }: { logoSrc: string }) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="relative shrink-0 size-8"
    >
      <div
        className="absolute inset-[1.5px] rounded-[8px] overflow-hidden z-10"
        style={{ background: NAVY_MID }}
      >
        <img
          src={logoSrc}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}

export function SharpnrSidebarFooter({
  href = "https://sharpnr.com",
  label = "Powered by",
  brand = "Sharpnr",
  logoSrc = DEFAULT_LOGO,
  className,
}: SharpnrSidebarFooterProps = {}) {
  const { state, isMobile } = useSidebar();
  const reduceMotion = useReducedMotion();
  // On mobile the sidebar renders as a full-width sheet, so even though
  // `state` reports "collapsed" we want the full expanded layout there.
  const isCollapsed = state === "collapsed" && !isMobile;
  const animate = !reduceMotion;

  // ── Collapsed: a compact navy brand badge sized to the icon rail ──
  // Mirrors the expanded card's identity (deep navy + living glow) so the
  // footer still reads as "Sharpnr" instead of a washed-out logo chip.
  if (isCollapsed) {
    return (
      <SidebarFooter className={cn("p-0", className)}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.a
                href={href ?? undefined}
                target={href ? "_blank" : undefined}
                rel={href ? "noopener noreferrer" : undefined}
                aria-label={`${label} ${brand}`}
                whileHover={animate ? { scale: 1.08 } : undefined}
                whileTap={animate ? { scale: 0.94 } : undefined}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "relative mx-auto flex size-8 items-center justify-center overflow-hidden rounded-[10px] outline-none",
                  "focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                  href ? "cursor-pointer" : "cursor-default",
                )}
                style={{ background: NAVY }}
                onClick={href ? undefined : (e) => e.preventDefault()}
              >
                {/* living navy glow */}
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={
                    reduceMotion
                      ? {
                          background: `radial-gradient(circle at 30% 80%, ${NAVY_BRIGHT} 0%, transparent 70%)`,
                        }
                      : undefined
                  }
                  animate={
                    animate
                      ? {
                          background: [
                            `radial-gradient(circle at 30% 80%, ${NAVY_BRIGHT} 0%, transparent 70%)`,
                            `radial-gradient(circle at 70% 20%, ${NAVY_BRIGHT} 0%, transparent 70%)`,
                            `radial-gradient(circle at 30% 80%, ${NAVY_BRIGHT} 0%, transparent 70%)`,
                          ],
                        }
                      : undefined
                  }
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* inner border */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-[10px] pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1px rgba(240,242,247,0.12), inset 0 1px 0 rgba(240,242,247,0.20)`,
                  }}
                />
                {/* logo chip, framed by the navy badge */}
                <img
                  src={logoSrc}
                  alt=""
                  aria-hidden="true"
                  className="relative z-10 size-5 rounded-[5px] object-contain"
                />
              </motion.a>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              <span className="font-medium">{brand}</span>
              <span className="opacity-60"> · {label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarFooter>
    );
  }

  // ── Expanded: full animated card ──
  const Wrapper = href ? motion.a : motion.div;
  const wrapperLinkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer", "aria-label": `${label} ${brand}` }
    : {};

  return (
    <SidebarFooter className={className}>
      <Wrapper
        {...wrapperLinkProps}
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ background: NAVY }}
        className="relative block overflow-hidden rounded-xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
      >
        {/* ── Deep navy base + subtle inner border ── */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px rgba(240,242,247,0.10), inset 0 1px 0 rgba(240,242,247,0.18)`,
          }}
        />

        {/* ── Aurora sweep: navy → brighter navy blob ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={
            reduceMotion
              ? {
                  background: `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                }
              : undefined
          }
          animate={
            animate
              ? {
                  background: [
                    `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                    `radial-gradient(ellipse at 90% 10%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                    `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
                  ],
                }
              : undefined
          }
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── White dot constellation grid ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${WHITE} 1px, transparent 1px)`,
            backgroundSize: "14px 14px",
            opacity: reduceMotion ? 0.05 : undefined,
          }}
          animate={animate ? { opacity: [0.03, 0.07, 0.03] } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Floating white particles ── */}
        {animate && (
          <AnimatePresence>
            {PARTICLES.map((p, i) => (
              <Particle key={i} {...p} />
            ))}
          </AnimatePresence>
        )}

        {/* ── Top shimmer line (white) ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${WHITE}, transparent)`,
            opacity: reduceMotion ? 0.4 : undefined,
          }}
          animate={animate ? { opacity: [0.2, 0.6, 0.2] } : undefined}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Content row ── */}
        <div className="relative flex items-center gap-3">
          <Logo logoSrc={logoSrc} />

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key="footer-text"
              initial={{ opacity: 0, x: -10, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col min-w-0"
            >
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.18em] leading-none mb-1"
                style={{ color: WHITE_DIM }}
              >
                {label}
              </span>

              <motion.span
                className="text-sm font-bold leading-tight tracking-tight truncate"
                style={{ color: WHITE }}
                whileHover={animate ? { letterSpacing: "0.03em" } : undefined}
                transition={{ duration: 0.2 }}
              >
                {brand}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom shimmer line ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          className="absolute bottom-0 left-4 right-4 h-px origin-left pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${WHITE_DIM}, transparent)`,
          }}
        />
      </Wrapper>
    </SidebarFooter>
  );
}
