import { useEffect } from "react";
import { motion } from "motion/react";
import { LogoMark, Wordmark } from "@/components/logo";
import { usePediu } from "@/lib/store";

export function Splash() {
  const seen = usePediu((s) => s.seenSplash);
  const mark = usePediu((s) => s.markSplashSeen);

  useEffect(() => {
    if (seen) return;
    const t = window.setTimeout(mark, 1700);
    return () => window.clearTimeout(t);
  }, [seen, mark]);

  if (seen) return null;

  return (
    <motion.div
      className="fixed inset-y-0 left-1/2 z-[80] flex w-full max-w-phone -translate-x-1/2 items-center justify-center overflow-hidden bg-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(4px)" }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={mark}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") mark();
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-ink"
        style={{ animation: "splash-wipe 900ms var(--ease-out-soft) both" }}
      />
      <div className="relative flex flex-col items-center gap-4 text-ink-fg">
        <motion.div
          initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ type: "spring", duration: 0.7, bounce: 0.18 }}
          className="text-primary"
        >
          <LogoMark className="size-16" />
        </motion.div>
        <motion.div
          initial={{ y: 12, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <Wordmark className="text-3xl text-ink-fg" />
          <p className="mt-1 font-sans text-sm text-ink-fg/70">Pediu, chegou.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
