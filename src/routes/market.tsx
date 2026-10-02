import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBasket, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { DishSheet } from "@/components/dish-sheet";
import { Screen } from "@/components/shell";
import { dishesOf, getRestaurant, type Dish, type Extra } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { usePediu } from "@/lib/store";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/market")({ component: MarketPage });

function MarketPage() {
  const restaurant = getRestaurant("mercado-pediu")!;
  const dishes = dishesOf("mercado-pediu");
  const cats = useMemo(() => ["Tudo", ...Array.from(new Set(dishes.map((d) => d.category)))], [dishes]);
  const [cat, setCat] = useState("Tudo");
  const [selected, setSelected] = useState<Dish | null>(null);
  const [conflict, setConflict] = useState<{ dishId: string; extras: Extra[]; qty: number; notes: string } | null>(null);
  const replaceCartWith = usePediu((s) => s.replaceCartWith);
  const visible = cat === "Tudo" ? dishes : dishes.filter((d) => d.category === cat);

  return (
    <Screen peek>
      <main className="pb-4">
        <header className="bg-ink px-4 pb-6 pt-[max(0.9rem,env(safe-area-inset-top))] text-ink-fg">
          <p className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg">
            <Zap className="size-3.5 fill-accent-fg" />
            Relâmpago 25 min
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold leading-none">Mercado Pediu</h1>
          <p className="mt-2 max-w-[20rem] text-sm text-ink-fg/70">
            Hortifruti, mercearia e padaria com a mesma moto que entrega o smash.
          </p>
        </header>

        <div className="no-scrollbar -mt-3 flex gap-2 overflow-x-auto px-4">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={
                cat === c
                  ? "h-9 shrink-0 rounded-full bg-primary px-3 text-xs font-semibold text-primary-fg"
                  : "h-9 shrink-0 rounded-full bg-surface px-3 text-xs font-semibold text-muted shadow-card"
              }
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 px-4">
          {visible.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setSelected(d)}
              className="overflow-hidden rounded-[22px] bg-surface text-left shadow-card"
            >
              <img src={d.image} alt="" className="h-28 w-full object-cover" />
              <div className="p-2.5">
                <p className="font-display text-sm font-semibold leading-tight">{d.name}</p>
                <p className="mt-1 font-display text-sm font-bold tabular-nums">{formatBRL(d.price)}</p>
              </div>
            </button>
          ))}
        </div>
      </main>

      <DishSheet
        dish={selected}
        restaurant={restaurant}
        open={Boolean(selected)}
        onOpenChange={(o) => !o && setSelected(null)}
        onConflict={setConflict}
      />

      <Drawer.Root open={Boolean(conflict)} onOpenChange={(o) => !o && setConflict(null)}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/50" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-phone rounded-t-[32px] bg-bg px-5 pb-8 pt-4">
            <Drawer.Title className="font-display text-xl font-bold">Trocar a sacola?</Drawer.Title>
            <Drawer.Description className="mt-2 text-sm text-muted">
              O mercado entra no lugar dos pratos que já estavam na sacola.
            </Drawer.Description>
            <Button
              className="mt-5 w-full"
              onClick={() => {
                if (!conflict) return;
                replaceCartWith(conflict);
                toast.success("Sacola do mercado");
                setConflict(null);
                setSelected(null);
              }}
            >
              <ShoppingBasket className="size-4" />
              Trocar
            </Button>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </Screen>
  );
}
