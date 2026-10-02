import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { RestaurantCard } from "@/components/restaurant-card";
import { Screen } from "@/components/shell";
import { DISHES, getRestaurant, RESTAURANTS, TASTE_MOODS } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/taste")({ component: TastePage });

function TastePage() {
  const [mood, setMood] = useState<string | null>(null);
  const selected = TASTE_MOODS.find((m) => m.id === mood);

  const matches = useMemo(() => {
    if (!selected) return [];
    return RESTAURANTS.filter((r) => selected.cuisines.includes(r.cuisine) && r.id !== "mercado-pediu");
  }, [selected]);

  const dishes = useMemo(() => {
    if (!selected) return [];
    return DISHES.filter((d) => {
      const hay = `${d.name} ${d.description} ${d.category}`.toLowerCase();
      return selected.tags.some((t) => hay.includes(t));
    }).slice(0, 6);
  }, [selected]);

  return (
    <Screen>
      <main className="px-4 pb-10 pt-[max(0.8rem,env(safe-area-inset-top))]">
        <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold">
          <ChevronLeft className="size-4" />
          Início
        </Link>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-none">Sabor do momento</h1>
        <p className="mt-2 text-sm text-muted">Diz como está a fome. A gente monta o cardápio.</p>

        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {TASTE_MOODS.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMood(m.id)}
              className={cn(
                "rounded-[24px] p-4 text-left shadow-card transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97]",
                mood === m.id ? "bg-primary text-primary-fg shadow-red" : i % 2 === 0 ? "bg-ink text-ink-fg" : "bg-accent text-accent-fg",
              )}
              style={{ animation: `fade-up 480ms var(--ease-out-soft) ${i * 60}ms both` }}
            >
              <p className="font-display text-base font-bold leading-tight">{m.title}</p>
              <p className={cn("mt-1 text-xs", mood === m.id ? "text-primary-fg/80" : "opacity-75")}>{m.subtitle}</p>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="mt-7 space-y-5">
            <h2 className="font-display text-lg font-bold">Pra agora · {selected.title}</h2>
            <div className="grid gap-3">
              {matches.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
            {dishes.length > 0 ? (
              <div>
                <p className="font-display text-sm font-semibold">Pratos que batem</p>
                <div className="mt-2 grid gap-2">
                  {dishes.map((d) => {
                    const rest = getRestaurant(d.restaurantId);
                    return (
                      <Link
                        key={d.id}
                        to="/restaurants/$id"
                        params={{ id: d.restaurantId }}
                        className="flex gap-3 rounded-[20px] bg-surface p-2 shadow-card"
                      >
                        <img src={d.image} alt="" className="size-16 rounded-[14px] object-cover" />
                        <div>
                          <p className="font-display text-sm font-semibold">{d.name}</p>
                          <p className="text-xs text-muted">{rest?.name}</p>
                          <p className="mt-1 text-sm font-bold tabular-nums">{formatBRL(d.price)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </main>
    </Screen>
  );
}
