import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Heart, HelpCircle, MapPin, Ticket, UserRound } from "lucide-react";
import { useState } from "react";
import { RestaurantRow } from "@/components/restaurant-card";
import { Screen } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { ADDRESSES, COUPONS, getRestaurant } from "@/lib/data";
import { usePediu } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const name = usePediu((s) => s.name);
  const setName = usePediu((s) => s.setName);
  const addressId = usePediu((s) => s.addressId);
  const favorites = usePediu((s) => s.favorites);
  const [draft, setDraft] = useState(name);
  const favRestaurants = favorites.map(getRestaurant).filter((r) => Boolean(r));

  return (
    <Screen>
      <main className="px-4 pb-10 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <div className="grid size-14 place-items-center rounded-[20px] bg-primary text-primary-fg">
            <UserRound className="size-7" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold leading-tight">{name}</h1>
            <p className="text-sm text-muted">Clube Pediu · 1.2x pontos Flash</p>
          </div>
        </div>

        <label className="mt-5 block rounded-[22px] bg-surface p-4 shadow-card">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">Como te chamamos</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => setName(draft)}
            className="mt-1 w-full bg-transparent font-display text-lg font-semibold outline-none"
          />
        </label>

        <section className="mt-5">
          <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
            <MapPin className="size-4 text-primary" />
            Endereços
          </p>
          <div className="mt-2 grid gap-2">
            {ADDRESSES.map((a) => (
              <div
                key={a.id}
                className={
                  addressId === a.id
                    ? "rounded-[18px] bg-ink px-3 py-3 text-ink-fg"
                    : "rounded-[18px] bg-surface px-3 py-3 shadow-card"
                }
              >
                <p className="font-display text-sm font-semibold">{a.label}</p>
                <p className={addressId === a.id ? "text-xs text-ink-fg/70" : "text-xs text-muted"}>
                  {a.street} · {a.neighborhood}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
            <Ticket className="size-4 text-primary" />
            Cupons
          </p>
          <div className="mt-2 grid gap-2">
            {COUPONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(c.code);
                  toast.success(`${c.code} copiado`);
                }}
                className="flex items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-left shadow-card"
              >
                <span>
                  <span className="block font-display text-sm font-bold">{c.code}</span>
                  <span className="text-xs text-muted">{c.description}</span>
                </span>
                <span className="text-xs font-semibold text-primary">{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5">
          <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
            <Heart className="size-4 text-primary" />
            Favoritos
          </p>
          {favRestaurants.length === 0 ? (
            <p className="mt-2 text-sm text-muted">Nada salvo ainda. Toque no coração na loja.</p>
          ) : (
            <div className="mt-2 grid gap-2">
              {favRestaurants.map((r) => (r ? <RestaurantRow key={r.id} restaurant={r} /> : null))}
            </div>
          )}
        </section>

        <button
          type="button"
          onClick={() => toast.message("Central de ajuda · pedidos, cupons e entregadores.")}
          className="mt-5 flex w-full items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-sm font-semibold shadow-card"
        >
          <span className="inline-flex items-center gap-2">
            <HelpCircle className="size-4" />
            Ajuda
          </span>
          <ChevronRight className="size-4 text-subtle" />
        </button>

        <p className="mt-6 text-center text-xs text-subtle">Pediu · comida e mercado · São Paulo</p>
        <Button asChild variant="ghost" className="mx-auto mt-1">
          <Link to="/taste">Sabor do momento</Link>
        </Button>
      </main>
    </Screen>
  );
}
