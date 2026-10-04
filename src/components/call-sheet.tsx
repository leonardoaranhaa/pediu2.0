import { Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/store";

const QUICK = [
  "Pode deixar na portaria",
  "Tô descendo agora",
  "Toca o interfone, por favor",
];

/** The number is masked on purpose: a browser cannot place the call itself. */
export function CallSheet({
  order,
  open,
  onOpenChange,
  onSend,
}: {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSend: (text: string) => void;
}) {
  const firstName = order.courier.name.split(" ")[0];
  const tail = String(
    [...order.id].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 10_000,
  ).padStart(4, "0");
  const masked = `(11) 9 ••••-${tail}`;

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-phone rounded-t-3xl bg-bg px-5 pb-[max(1.2rem,env(safe-area-inset-bottom))] pt-4">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-border-strong" />
          <Drawer.Title className="mt-4 font-display text-xl font-bold">Falar com {firstName}</Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-muted">
            A linha é protegida: nem você nem {firstName} veem o número real.
          </Drawer.Description>

          <div className="mt-4 rounded-[22px] bg-surface p-4 shadow-card">
            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
              <ShieldCheck className="size-3.5 text-success" />
              Linha protegida
            </p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums">{masked}</p>
            <p className="mt-1 text-xs text-muted">
              {order.courier.vehicle} · {order.courier.plate} · {order.courier.trips.toLocaleString("pt-BR")} entregas
            </p>
          </div>

          <Button
            className="mt-3 w-full rounded-full"
            onClick={() => {
              onOpenChange(false);
              toast.message(`Chamando ${firstName}…`, {
                description: "Pelo navegador não dá para completar a ligação. Mande um recado pelo chat.",
              });
            }}
          >
            <Phone className="size-4" />
            Ligar pela linha protegida
          </Button>

          <p className="mt-5 font-display text-sm font-semibold">Ou manda um recado</p>
          <div className="mt-2 grid gap-2">
            {QUICK.map((q) => (
              <Button
                key={q}
                variant="surface"
                className="w-full justify-start"
                onClick={() => {
                  onSend(q);
                  onOpenChange(false);
                  toast.success("Recado enviado");
                }}
              >
                {q}
              </Button>
            ))}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
