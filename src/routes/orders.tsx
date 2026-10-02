import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, RotateCcw } from "lucide-react";
import { Screen } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";
import { usePediu, type Order, type OrderStatus } from "@/lib/store";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

const LABELS: Record<OrderStatus, string> = {
  received: "Recebido",
  preparing: "Preparando",
  on_the_way: "A caminho",
  arriving: "Chegando",
  delivered: "Entregue",
};

function liveStatus(order: Order): OrderStatus {
  const elapsed = Date.now() - order.createdAt;
  if (elapsed > 36_000) return "delivered";
  if (elapsed > 28_000) return "arriving";
  if (elapsed > 12_000) return "on_the_way";
  if (elapsed > 4_000) return "preparing";
  return "received";
}

function OrdersPage() {
  const orders = usePediu((s) => s.orders);
  const addToCart = usePediu((s) => s.addToCart);
  const clearCart = usePediu((s) => s.clearCart);

  const active = orders.filter((o) => liveStatus(o) !== "delivered");
  const past = orders.filter((o) => liveStatus(o) === "delivered");

  return (
    <Screen>
      <main className="px-4 pb-8 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <h1 className="font-display text-2xl font-extrabold">Pedidos</h1>
        {orders.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="font-display text-lg font-bold">Nenhum pedido ainda</p>
            <p className="mt-1 text-sm text-muted">O primeiro chega mais rápido do que parece.</p>
            <Button asChild className="mt-5">
              <Link to="/">Explorar</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-5 space-y-6">
            {active.length > 0 ? (
              <section>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Ao vivo</p>
                <div className="mt-2 grid gap-2">
                  {active.map((o) => (
                    <OrderCard key={o.id} order={o} live />
                  ))}
                </div>
              </section>
            ) : null}
            {past.length > 0 ? (
              <section>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Anteriores</p>
                <div className="mt-2 grid gap-2">
                  {past.map((o) => (
                    <div key={o.id} className="rounded-[22px] bg-surface p-3 shadow-card">
                      <OrderCard order={o} live={false} />
                      <Button
                        variant="surface"
                        size="sm"
                        className="mt-2 w-full"
                        onClick={() => {
                          clearCart();
                          o.items.forEach((item) => {
                            addToCart({
                              dishId: item.dishId,
                              extras: item.extras,
                              qty: item.qty,
                              notes: item.notes,
                            });
                          });
                        }}
                      >
                        <RotateCcw className="size-4" />
                        Pedir de novo
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </main>
    </Screen>
  );
}

function OrderCard({ order, live }: { order: Order; live: boolean }) {
  const status = liveStatus(order);
  return (
    <Link
      to="/order/$id"
      params={{ id: order.id }}
      className="flex items-center gap-3 rounded-[22px] bg-surface p-3 shadow-card"
    >
      <img src={order.restaurantImage} alt="" className="size-14 rounded-[16px] object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold">{order.restaurantName}</p>
        <p className="text-xs text-muted">
          {LABELS[status]} · {formatBRL(order.total)}
        </p>
        <p className="text-[11px] text-subtle tabular-nums">{order.id}</p>
      </div>
      {live ? <span className="size-2 rounded-full bg-primary" /> : <ChevronRight className="size-4 text-subtle" />}
    </Link>
  );
}
