import { Bike, House, Store } from "lucide-react";

export function CourierMap({ moving }: { moving: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#14110d]">
      <svg viewBox="0 0 390 260" className="block w-full" aria-hidden="true">
        <defs>
          <linearGradient id="night" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1812" />
            <stop offset="100%" stopColor="#0c0b09" />
          </linearGradient>
        </defs>
        <rect width="390" height="260" fill="url(#night)" />
        <g stroke="#2a241c" strokeWidth="10" fill="none">
          <path d="M0 70 H390" />
          <path d="M0 140 H390" />
          <path d="M0 200 H390" />
          <path d="M70 0 V260" />
          <path d="M160 0 V260" />
          <path d="M250 0 V260" />
          <path d="M330 0 V260" />
        </g>
        <g stroke="#3d3428" strokeWidth="2" strokeDasharray="6 10" fill="none">
          <path d="M0 70 H390" />
          <path d="M0 140 H390" />
          <path d="M160 0 V260" />
        </g>
        <rect x="86" y="84" width="52" height="38" rx="6" fill="#1f3d2a" opacity="0.9" />
        <rect x="268" y="154" width="46" height="32" rx="6" fill="#1f3d2a" opacity="0.85" />
        <circle cx="210" cy="48" r="16" fill="#ffc400" opacity="0.12" />
        <circle cx="44" cy="176" r="10" fill="#ffc400" opacity="0.16" />
        <path
          d="M 36 210 C 90 180, 70 120, 130 110 S 210 70, 250 96 S 310 150, 348 86"
          fill="none"
          stroke="#ffc400"
          strokeWidth="3"
          strokeDasharray="6 8"
          opacity="0.85"
        />
        <path
          d="M 36 210 C 90 180, 70 120, 130 110 S 210 70, 250 96 S 310 150, 348 86"
          fill="none"
          stroke="#e20d2a"
          strokeWidth="3"
          strokeDasharray="220"
          strokeDashoffset="220"
          style={{ animation: moving ? "dash-draw 7.5s var(--ease-out-soft) infinite alternate" : undefined }}
        />
        {moving ? (
          <g className="courier-ride">
            <circle r="13" fill="#ffc400" />
            <circle r="18" fill="#ffc400" opacity="0.2" />
          </g>
        ) : (
          <circle cx="36" cy="210" r="10" fill="#ffc400" />
        )}
      </svg>
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-ink-fg backdrop-blur-sm">
        <Store className="size-3.5 text-primary" />
        Loja
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-ink-fg backdrop-blur-sm">
        <House className="size-3.5 text-accent" />
        Você
      </div>
      {moving ? (
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-6 items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg">
          <Bike className="size-3.5" />
          a caminho
        </div>
      ) : null}
    </div>
  );
}
