import { Minus, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import type { Dish, Extra, Restaurant } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { usePediu } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function DishSheet({
  dish,
  restaurant,
  open,
  onOpenChange,
  onConflict,
}: {
  dish: Dish | null;
  restaurant: Restaurant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConflict: (payload: { dishId: string; extras: Extra[]; qty: number; notes: string }) => void;
}) {
  const addToCart = usePediu((s) => s.addToCart);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [extras, setExtras] = useState<Extra[]>([]);

  const unit = useMemo(() => {
    if (!dish) return 0;
    return dish.price + extras.reduce((s, e) => s + e.price, 0);
  }, [dish, extras]);

  function reset() {
    setQty(1);
    setNotes("");
    setExtras([]);
  }

  function toggleExtra(extra: Extra) {
    setExtras((cur) => (cur.some((e) => e.id === extra.id) ? cur.filter((e) => e.id !== extra.id) : [...cur, extra]));
  }

  function add() {
    if (!dish) return;
    const payload = { dishId: dish.id, extras, qty, notes };
    const result = addToCart(payload);
    if (result === "conflict") {
      onConflict(payload);
      return;
    }
    toast.success("Entrou na sacola", { description: dish.name });
    onOpenChange(false);
    reset();
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) reset();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-phone flex-col rounded-t-[32px] bg-bg outline-none">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-border-strong" />
          {dish ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="relative h-44 shrink-0">
                <img src={dish.image} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-ink/55 text-ink-fg"
                  aria-label="Fechar"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">{restaurant?.name}</p>
                <Drawer.Title className="mt-1 font-display text-2xl font-bold leading-tight">{dish.name}</Drawer.Title>
                <Drawer.Description className="mt-2 text-sm leading-relaxed text-muted">
                  {dish.description}
                </Drawer.Description>
                <p className="mt-3 font-display text-lg font-bold tabular-nums">{formatBRL(dish.price)}</p>

                {dish.extras.length > 0 ? (
                  <div className="mt-5">
                    <p className="font-display text-sm font-semibold">Leva junto</p>
                    <ul className="mt-2 space-y-2">
                      {dish.extras.map((extra) => {
                        const on = extras.some((e) => e.id === extra.id);
                        return (
                          <li key={extra.id}>
                            <button
                              type="button"
                              onClick={() => toggleExtra(extra)}
                              className={cn(
                                "flex w-full items-center justify-between rounded-[16px] px-3 py-3 text-left shadow-card transition-[background-color,transform] duration-150 ease-out active:scale-[0.98]",
                                on ? "bg-accent text-accent-fg" : "bg-surface",
                              )}
                            >
                              <span className="text-sm font-medium">{extra.name}</span>
                              <span className="text-sm tabular-nums">
                                {extra.price === 0 ? "Grátis" : `+ ${formatBRL(extra.price)}`}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ) : null}

                <label className="mt-5 block">
                  <span className="font-display text-sm font-semibold">Observação</span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Sem cebola, ponto da carne, toque na porta…"
                    className="mt-2 h-20 w-full resize-none rounded-[16px] bg-surface px-3 py-2.5 text-sm shadow-card outline-none placeholder:text-subtle"
                  />
                </label>
              </div>
              <div className="flex items-center gap-3 border-t border-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="flex h-12 items-center rounded-full bg-surface px-2 shadow-card">
                  <button
                    type="button"
                    className="grid size-10 place-items-center"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Diminuir"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center font-display font-bold tabular-nums">{qty}</span>
                  <button
                    type="button"
                    className="grid size-10 place-items-center"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Aumentar"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button className="h-12 flex-1 rounded-full" onClick={add}>
                  Adicionar · {formatBRL(unit * qty)}
                </Button>
              </div>
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
