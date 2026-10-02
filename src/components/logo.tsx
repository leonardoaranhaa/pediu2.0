import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect width="32" height="32" rx="10" fill="currentColor" />
      <path
        d="M10.2 8.4h7.1c3.3 0 5.4 1.9 5.4 4.8 0 3.1-2.2 4.9-5.5 4.9h-3.3V23.2H10.2V8.4Zm3.7 3.1v3.4h3.1c1.5 0 2.3-.8 2.3-1.7 0-1-.8-1.7-2.3-1.7h-3.1Z"
        fill="var(--color-primary-fg)"
      />
      <circle cx="24.2" cy="7.6" r="3.1" fill="var(--color-accent)" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.35rem] font-extrabold tracking-tight", className)}>
      Pediu
    </span>
  );
}
