import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, ScanSearch, Sparkles, Store, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { RestaurantCard } from "@/components/restaurant-card";
import { Screen } from "@/components/shell";
import { Stories } from "@/components/stories";
import {
  CATEGORIES,
  collectionsForHour,
  flashRestaurants,
  getAddress,
  RESTAURANTS,
  type Restaurant,
} from "@/lib/data";
import { greetingForHour, hungerLine } from "@/lib/format";
import { usePediu } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const addressId = usePediu((s) => s.addressId);
  const name = usePediu((s) => s.name);
  const address = getAddress(addressId);
  const hour = new Date().getHours();
  const greet = greetingForHour(hour);
  const collection = collectionsForHour(hour);
  const featured = useMemo(
    () =>
      collection.ids
        .map((id) => RESTAURANTS.find((r) => r.id === id))
        .filter((r): r is Restaurant => Boolean(r)),
    [collection.ids],
  );
  const flash = flashRestaurants();
  const [filter, setFilter] = useState<"all" | "flash" | "free" | "top">("all");

  const list = RESTAURANTS.filter((r) => {
    if (r.id === "mercado-pediu") return false;
    if (filter === "flash") return r.flash;
    if (filter === "free") return r.deliveryFee === 0;
    if (filter === "top") return r.rating >= 4.7;
    return true;
  });

  return (
    <Screen peek>
      <main className="pb-4">
        <header className="px-4 pt-[max(0.9rem,env(safe-area-inset-top))]">
          <button type="button" className="flex items-center gap-1.5 text-muted">
            <MapPin className="size-4 text-primary" />
            <span className="text-xs font-medium">{address.label}</span>
          </button>
          <p className="mt-2 font-display text-[1.65rem] font-extrabold leading-[1.1] tracking-tight">
            {greet}
            {name !== "Você" ? `, ${name.split(" ")[0]}` : ""}.
          </p>
          <p className="mt-1 text-sm text-muted">{hungerLine(hour)}</p>
        </header>

        <Link
          to="/search"
          search={{ q: undefined }}
          className="mx-4 mt-4 flex h-12 items-center gap-3 rounded-full bg-surface px-4 shadow-card"
        >
          <ScanSearch className="size-5 text-muted" />
          <span className="text-sm text-subtle">Pizza, açaí, feijoada, mercado…</span>
        </Link>

        <section className="mt-5">
          <Stories />
        </section>

        <section className="mt-5 px-4">
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/taste"
              className="relative overflow-hidden rounded-[24px] bg-primary p-4 text-primary-fg shadow-red"
            >
              <Sparkles className="size-5" />
              <p className="mt-6 font-display text-base font-bold leading-tight">O que pedir?</p>
              <p className="mt-1 text-xs text-primary-fg/80">Sabor do momento</p>
            </Link>
            <Link to="/market" className="relative overflow-hidden rounded-[24px] bg-ink p-4 text-ink-fg">
              <Store className="size-5 text-accent" />
              <p className="mt-6 font-display text-base font-bold leading-tight">Mercado Flash</p>
              <p className="mt-1 text-xs text-ink-fg/70">Até 25 min</p>
            </Link>
          </div>
        </section>

        <section className="mt-5">
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
            {CATEGORIES.map((cat) =>
              cat.special === "market" ? (
                <Link key={cat.id} to="/market" className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5">
                  <span className="size-[4.5rem] overflow-hidden rounded-[22px] shadow-card">
                    <img src={cat.image} alt="" className="size-full object-cover" />
                  </span>
                  <span className="text-center text-[11px] font-semibold">{cat.label}</span>
                </Link>
              ) : (
                <Link
                  key={cat.id}
                  to="/search"
                  search={{ q: cat.cuisine ?? "flash" }}
                  className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5"
                >
                  <span className="size-[4.5rem] overflow-hidden rounded-[22px] shadow-card">
                    <img src={cat.image} alt="" className="size-full object-cover" />
                  </span>
                  <span className="text-center text-[11px] font-semibold">{cat.label}</span>
                </Link>
              ),
            )}
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between px-4">
            <div>
              <p className="inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-fg">
                <Zap className="size-3.5 fill-accent text-accent" />
                Flash 99
              </p>
              <h2 className="font-display text-lg font-bold">Chega quase agora</h2>
            </div>
            <Link to="/search" search={{ q: "flash" }} className="text-sm font-semibold text-primary">
              Ver
            </Link>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
            {flash.map((r) => (
              <div key={r.id} className="w-[18.5rem] shrink-0">
                <RestaurantCard restaurant={r} featured />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7 px-4">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-lg font-bold">{collection.title}</h2>
            <ChevronRight className="size-5 text-subtle" />
          </div>
          <div className="grid gap-3">
            {featured.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>

        <section className="mt-7 px-4 pb-2">
          <h1 className="sr-only">Pediu</h1>
          <h2 className="font-display text-lg font-bold">Perto de você</h2>
          <div className="mt-3 flex gap-2">
            {(
              [
                ["all", "Tudo"],
                ["flash", "Flash"],
                ["free", "Entrega grátis"],
                ["top", "Nota 4.7+"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={
                  filter === id
                    ? "h-9 rounded-full bg-ink px-3 text-xs font-semibold text-ink-fg"
                    : "h-9 rounded-full bg-surface px-3 text-xs font-semibold text-muted shadow-card"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-3 grid gap-3">
            {list.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        </section>
      </main>
    </Screen>
  );
}
