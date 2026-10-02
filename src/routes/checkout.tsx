import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, Check, ChevronLeft, Copy, CreditCard, MapPin, QrCode } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Screen } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { ADDRESSES } from "@/lib/data";
import { formatBRL, formatFee } from "@/lib/format";
import { cartTotals, usePediu } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

const PIX_CODE = "00020126PEDIU.FLASH.99.SP6304A3F2";

function CheckoutPage() {
  const navigate = useNavigate();
  const cart = usePediu((s) => s.cart);
  const coupon = usePediu((s) => s.coupon);
  const payment = usePediu((s) => s.payment);
  const setPayment = usePediu((s) => s.setPayment);
  const addressId = usePediu((s) => s.addressId);
  const setAddress = usePediu((s) => s.setAddress);
  const cpfOnInvoice = usePediu((s) => s.cpfOnInvoice);
  const toggleCpf = usePediu((s) => s.toggleCpf);
  const placeOrder = usePediu((s) => s.placeOrder);
  const totals = cartTotals(cart, coupon, payment);
  const [placing, setPlacing] = useState(false);

  if (!cart.length) {
    return (
      <Screen>
        <div className="px-6 py-24 text-center">
          <p className="font-display text-xl font-bold">Sacola vazia</p>
          <Link to="/" className="mt-3 inline-block text-sm font-semibold text-primary">
            Pedir agora
          </Link>
        </div>
      </Screen>
    );
  }

  function pay() {
    setPlacing(true);
    window.setTimeout(() => {
      const order = placeOrder();
      setPlacing(false);
      if (!order) return;
      toast.success("Pedido no fogo");
      void navigate({ to: "/order/$id", params: { id: order.id } });
    }, 700);
  }

  return (
    <Screen tabs={false}>
      <div className="px-4 pb-36 pt-[max(0.8rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-3">
          <Link to="/cart" className="grid size-11 place-items-center rounded-full bg-surface shadow-card" aria-label="Voltar">
            <ChevronLeft className="size-5" />
          </Link>
          <h1 className="font-display text-xl font-bold">Fechar pedido</h1>
        </div>

        <section className="mt-5">
          <p className="font-display text-sm font-semibold">Entregar em</p>
          <div className="mt-2 grid gap-2">
            {ADDRESSES.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setAddress(a.id)}
                className={cn(
                  "flex items-start gap-3 rounded-[20px] px-3 py-3 text-left shadow-card transition-[background-color] duration-150",
                  addressId === a.id ? "bg-ink text-ink-fg" : "bg-surface",
                )}
              >
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  <span className="block font-display text-sm font-semibold">{a.label}</span>
                  <span className={cn("text-xs", addressId === a.id ? "text-ink-fg/70" : "text-muted")}>
                    {a.street} · {a.neighborhood}
                    {a.complement ? ` · ${a.complement}` : ""}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="font-display text-sm font-semibold">Pagar com</p>
          <div className="mt-2 grid gap-2">
            <PayOption
              active={payment === "pix"}
              onClick={() => setPayment("pix")}
              icon={<QrCode className="size-5" />}
              title="Pix"
              subtitle="Aprovação na hora · cupom PIX5"
            />
            <PayOption
              active={payment === "card"}
              onClick={() => setPayment("card")}
              icon={<CreditCard className="size-5" />}
              title="Cartão •••• 4412"
              subtitle="Crédito em até 3x"
            />
            <PayOption
              active={payment === "cash"}
              onClick={() => setPayment("cash")}
              icon={<Banknote className="size-5" />}
              title="Dinheiro"
              subtitle="Pagar na entrega"
            />
          </div>
        </section>

        {payment === "pix" ? (
          <div className="mt-3 rounded-[22px] bg-surface p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Copia e cola</p>
            <p className="mt-1 break-all font-display text-xs">{PIX_CODE}</p>
            <Button
              variant="surface"
              size="sm"
              className="mt-3"
              onClick={() => {
                void navigator.clipboard?.writeText(PIX_CODE);
                toast.success("Pix copiado");
              }}
            >
              <Copy className="size-4" />
              Copiar código
            </Button>
          </div>
        ) : null}

        <button
          type="button"
          onClick={toggleCpf}
          className="mt-5 flex w-full items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-sm shadow-card"
        >
          <span>CPF na nota</span>
          <span
            className={cn(
              "grid size-6 place-items-center rounded-full",
              cpfOnInvoice ? "bg-success text-success-fg" : "bg-border",
            )}
          >
            {cpfOnInvoice ? <Check className="size-3.5" /> : null}
          </span>
        </button>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between text-muted">
            <dt>
              {totals.itemCount} itens · {totals.restaurant?.name}
            </dt>
            <dd className="tabular-nums text-fg">{formatBRL(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-muted">
            <dt>Entrega</dt>
            <dd className={totals.deliveryFee === 0 ? "font-semibold text-success" : "tabular-nums text-fg"}>
              {formatFee(totals.deliveryFee)}
            </dd>
          </div>
          {totals.discount > 0 ? (
            <div className="flex justify-between text-success">
              <dt>Cupom</dt>
              <dd className="tabular-nums">− {formatBRL(totals.discount)}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-phone -translate-x-1/2 bg-gradient-to-t from-bg via-bg to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <Button className="w-full rounded-full" size="lg" onClick={pay} disabled={placing}>
          {placing ? "Confirmando…" : `Pedir · ${formatBRL(totals.total)}`}
        </Button>
      </div>
    </Screen>
  );
}

function PayOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-[20px] px-3 py-3 text-left shadow-card",
        active ? "bg-accent text-accent-fg" : "bg-surface",
      )}
    >
      {icon}
      <span>
        <span className="block font-display text-sm font-semibold">{title}</span>
        <span className={cn("text-xs", active ? "text-accent-fg/80" : "text-muted")}>{subtitle}</span>
      </span>
    </button>
  );
}
