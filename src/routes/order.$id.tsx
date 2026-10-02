import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { CourierMap } from "@/components/courier-map";
import { Screen } from "@/components/shell";
import { getAddress } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { usePediu, type OrderStatus } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/order/$id")({ component: OrderTracking });

const STEPS: { id: OrderStatus; label: string }[] = [
  { id: "received", label: "Recebido" },
  { id: "preparing", label: "Preparando" },
  { id: "on_the_way", label: "Saiu" },
  { id: "arriving", label: "Chegando" },
  { id: "delivered", label: "Entregue" },
];

function statusFromElapsed(ms: number): OrderStatus {
  if (ms > 36_000) return "delivered";
  if (ms > 28_000) return "arriving";
  if (ms > 12_000) return "on_the_way";
  if (ms > 4_000) return "preparing";
  return "received";
}

function OrderTracking() {
  const { id } = Route.useParams();
  const order = usePediu((s) => s.orders.find((o) => o.id === id));
  const [, tick] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => tick((n) => n + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  if (!order) {
    return (
      <Screen>
        <div className="px-6 py-24 text-center">
          <p className="font-display text-xl font-bold">Pedido não encontrado</p>
          <Link to="/orders" className="mt-3 inline-block text-sm font-semibold text-primary">
            Ver pedidos
          </Link>
        </div>
      </Screen>
    );
  }

  const elapsed = Date.now() - order.createdAt;
  const status = statusFromElapsed(elapsed);
  const moving = status === "on_the_way" || status === "arriving";
  const stepIndex = STEPS.findIndex((s) => s.id === status);
  const address = getAddress(order.addressId);
  const remain = Math.max(0, Math.ceil((order.etaMins * 60_000 - elapsed) / 60_000));

  return (
    <Screen tabs={false}>
      <div className="bg-ink pb-4 text-ink-fg">
        <div className="flex items-center gap-3 px-4 pt-[max(0.8rem,env(safe-area-inset-top))]">
          <Link to="/orders" className="grid size-11 place-items-center rounded-full bg-ink-fg/10" aria-label="Voltar">
            <ChevronLeft className="size-5" />
          </Link>
          <div>
            <p className="font-display text-sm font-bold">{order.flash ? "Flash 99" : "Entrega Pediu"}</p>
            <p className="text-xs text-ink-fg/60 tabular-nums">{order.id}</p>
          </div>
        </div>
        <div className="px-4 pt-4">
          <p className="font-display text-3xl font-extrabold leading-none tabular-nums">
            {status === "delivered" ? "Chegou." : `${remain} min`}
          </p>
          <p className="mt-1 text-sm text-ink-fg/70">
            {status === "delivered"
              ? "Bom apetite."
              : moving
                ? `${order.courier.name} · ${order.courier.vehicle}`
                : "A cozinha pegou o seu pedido."}
          </p>
        </div>
        <div className="mt-4 px-4">
          <CourierMap moving={moving} />
        </div>
      </div>

      <div className="-mt-4 rounded-t-[28px] bg-bg px-4 pb-10 pt-5">
        <ol className="flex justify-between">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={cn(
                  "grid size-7 place-items-center rounded-full text-[10px] font-bold",
                  i <= stepIndex ? "bg-primary text-primary-fg" : "bg-surface text-subtle shadow-card",
                )}
              >
                {i < stepIndex ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cn("text-[10px] font-semibold", i <= stepIndex ? "text-fg" : "text-subtle")}>
                {s.label}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-5 rounded-[22px] bg-surface p-4 shadow-card">
          <p className="font-display text-sm font-semibold">{order.restaurantName}</p>
          <p className="mt-1 text-xs text-muted">
            {address.street} · {address.neighborhood}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {order.items.map((item) => (
              <li key={item.key} className="flex justify-between gap-3">
                <span className="min-w-0 truncate">
                  {item.qty}× {item.name}
                </span>
                <span className="tabular-nums">{formatBRL(item.unitPrice * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between font-display text-sm font-bold">
            <span>Total</span>
            <span className="tabular-nums">{formatBRL(order.total)}</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => toast.message("Ligando para o entregador…")}
            className="flex h-12 items-center justify-center gap-2 rounded-[16px] bg-surface text-sm font-semibold shadow-card"
          >
            <Phone className="size-4" />
            Ligar
          </button>
          <button
            type="button"
            onClick={() => toast.message("Chat com o entregador em breve.")}
            className="flex h-12 items-center justify-center gap-2 rounded-[16px] bg-surface text-sm font-semibold shadow-card"
          >
            <MessageCircle className="size-4" />
            Chat
          </button>
        </div>
      </div>
    </Screen>
  );
}
