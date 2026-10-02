import { createFileRoute, Link } from "@tanstack/react-router";
import { Search as SearchIcon, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { useMemo, useState } from "react";
import { RestaurantRow } from "@/components/restaurant-card";
import { Screen } from "@/components/shell";
import { CATEGORIES, flashRestaurants, getRestaurant, searchAll } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { usePediu } from "@/lib/store";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: qParam } = Route.useSearch();
  const [q, setQ] = useState(qParam ?? "");
  const addSearch = usePediu((s) => s.addSearch);
  const recent = usePediu((s) => s.recentSearches);
  const flashHint = q.trim().toLowerCase() === "flash";
  const results = useMemo(() => {
    if (flashHint) return { restaurants: flashRestaurants(), dishes: [] };
    return searchAll(q);
  }, [q, flashHint]);
  const hasQuery = q.trim().length > 0;

  return (
    <Screen>
      <main className="px-4 pb-8 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2">
          <label className="flex h-12 flex-1 items-center gap-2 rounded-full bg-surface px-4 shadow-card">
            <SearchIcon className="size-5 text-muted" />
            <input
              value={q}
              autoFocus
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addSearch(q);
              }}
              placeholder="O que você quer comer?"
              className="h-full w-full bg-transparent text-sm outline-none placeholder:text-subtle"
            />
            {q ? (
              <button type="button" onClick={() => setQ("")} aria-label="Limpar" className="grid size-8 place-items-center">
                <X className="size-4" />
              </button>
            ) : null}
          </label>
          <Link
            to="/taste"
            className="grid size-12 place-items-center rounded-full bg-accent text-accent-fg"
            aria-label="Sabor do momento"
          >
            <Sparkles className="size-5" />
          </Link>
        </div>

        {!hasQuery ? (
          <div className="stagger-in mt-6 space-y-6">
            <div>
              <p className="font-display text-sm font-semibold">Buscas recentes</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {recent.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQ(s)}
                    className="h-9 rounded-full bg-surface px-3 text-sm font-medium shadow-card"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
                <SlidersHorizontal className="size-4" />
                Cozinhas
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {CATEGORIES.filter((c) => c.cuisine).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setQ(c.cuisine ?? c.label)}
                    className="overflow-hidden rounded-[20px] bg-surface text-left shadow-card"
                  >
                    <img src={c.image} alt="" className="h-16 w-full object-cover" />
                    <p className="px-2 py-2 text-xs font-semibold">{c.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {flashHint ? (
              <p className="rounded-[18px] bg-accent px-3 py-2 text-sm font-semibold text-accent-fg">
                Flash 99 — entrega em até 22 minutos.
              </p>
            ) : null}
            {results.restaurants.length > 0 ? (
              <section>
                <h2 className="font-display text-base font-bold">Restaurantes</h2>
                <div className="mt-2 grid gap-2">
                  {results.restaurants.map((r) => (
                    <RestaurantRow key={r.id} restaurant={r} />
                  ))}
                </div>
              </section>
            ) : null}
            {results.dishes.length > 0 ? (
              <section>
                <h2 className="font-display text-base font-bold">Pratos</h2>
                <div className="mt-2 grid gap-2">
                  {results.dishes.slice(0, 12).map((d) => {
                    const rest = getRestaurant(d.restaurantId);
                    return (
                      <Link
                        key={d.id}
                        to="/restaurants/$id"
                        params={{ id: d.restaurantId }}
                        className="flex gap-3 rounded-[20px] bg-surface p-2 shadow-card"
                      >
                        <img src={d.image} alt="" className="size-16 rounded-[14px] object-cover" />
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-semibold">{d.name}</p>
                          <p className="text-xs text-muted">{rest?.name}</p>
                          <p className="mt-1 font-display text-sm font-bold tabular-nums">{formatBRL(d.price)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}
            {results.restaurants.length === 0 && results.dishes.length === 0 ? (
              <div className="rounded-[24px] bg-surface px-5 py-10 text-center shadow-card">
                <p className="font-display text-lg font-bold">Nada com esse nome</p>
                <p className="mt-1 text-sm text-muted">Tenta pizza, açaí, ramen ou mercado.</p>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </Screen>
  );
}
