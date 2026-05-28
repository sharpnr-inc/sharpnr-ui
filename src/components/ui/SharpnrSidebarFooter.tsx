import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "./sidebar";
import { SidebarFooter } from "./sidebar";

const NAVY = "#0B0D2E";
const NAVY_MID = "#141741";
const NAVY_BRIGHT = "#1E2260";
const WHITE = "#F0F2F7";
const WHITE_DIM = "rgba(240,242,247,0.55)";

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

export function SharpnrSidebarFooter() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarFooter className="">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ background: NAVY }}
        className={`relative overflow-hidden rounded-xl ${isCollapsed ? "p-2" : "p-3"}`}
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
          animate={{
            background: [
              `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
              `radial-gradient(ellipse at 90% 10%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
              `radial-gradient(ellipse at 10% 90%, ${NAVY_BRIGHT} 0%, transparent 55%)`,
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── White dot constellation grid ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${WHITE} 1px, transparent 1px)`,
            backgroundSize: "14px 14px",
          }}
          animate={{ opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Floating white particles (expanded only) ── */}
        <AnimatePresence>
          {!isCollapsed && PARTICLES.map((p, i) => <Particle key={i} {...p} />)}
        </AnimatePresence>

        {/* ── Top shimmer line (white) ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${WHITE}, transparent)`,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Content row ── */}
        <div
          className={`relative flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
        >
          {/* Logo + spinning white conic ring */}
          <motion.div
            layout
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative shrink-0 w-8 h-8"
          >
            {/* Logo image inside ring */}
            <div
              className="absolute inset-[1.5px] rounded-[8px] overflow-hidden z-10"
              style={{ background: NAVY_MID }}
            >
              <img
                src="https://cdn.sharpnr.com/shicon.svg"
                alt="Sharpnr"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text — expanded only */}
          <AnimatePresence mode="wait">
            {!isCollapsed && (
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
                  Powered by
                </span>

                <motion.span
                  className="text-sm font-bold leading-tight tracking-tight truncate"
                  style={{ color: WHITE }}
                  whileHover={{ letterSpacing: "0.03em" }}
                  transition={{ duration: 0.2 }}
                >
                  Sharpnr
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Bottom shimmer line (expanded only) ── */}
        <AnimatePresence>
          {!isCollapsed && (
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
          )}
        </AnimatePresence>
      </motion.div>
    </SidebarFooter>
  );
}
