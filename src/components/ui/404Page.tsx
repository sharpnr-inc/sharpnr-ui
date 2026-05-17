import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft } from "lucide-react";

export function NotFound() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {/* Animated Background "Smoke" - Matching your KDS/Header style */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute h-screen w-4xl rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Large 404 with floating animation */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-[12rem] font-black leading-none tracking-tighter text-white/5"
        >
          404
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="-mt-20 space-y-4"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            You've drifted off course.
          </h2>
          <p className="mx-auto max-w-md text-zinc-400">
            The module or page you are looking for doesn't exist or has been
            moved to another station.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="outline"
            className="h-12 border-white/10 bg-white/5 px-6 hover:bg-white/10"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            asChild
            className="h-12 bg-blue-600 px-8 font-semibold hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
          >
            <Button>
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </Button>
        </motion.div>
      </div>

      {/* Decorative Grid - Gives it the Orchestrator/Infra feel */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
