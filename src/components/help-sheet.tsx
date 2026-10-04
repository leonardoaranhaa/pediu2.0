import { Link } from "@tanstack/react-router";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Drawer } from "vaul";
import { COUPONS } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { deliveryClock, STATUS_LABEL } from "@/lib/clock";
import { usePediu } from "@/lib/store";
import { cn } from "@/lib/utils";

type Topic = { id: string; question: string; answer: string };

const TOPICS: Topic[] = [
  {
    id: "atraso",
    question: "Meu pedido está atrasando",
    answer:
      "O tempo na tela do pedido vem do prazo da loja e muda enquanto a entrega anda. Se o prazo virar e nada chegar, fale com a moto pelo chat da entrega.",
  },
  {
    id: "item",
    question: "Faltou ou veio errado um item",
    answer:
      "Abra o pedido, toque em Chat e diga o que faltou. A moto ainda está com a sacola nas etapas A caminho e Chegando.",
  },
  {
    id: "cupom",
    question: "Meu cupom não entrou",
    answer:
      "Cada cupom tem valor mínimo, e alguns valem só numa condição: PIX5 só no Pix, FLASH99 só em loja Flash. O desconto aparece na sacola quando a regra bate.",
  },
  {
    id: "pontos",
    question: "Como funcionam os pontos",
    answer:
      "Cada real pago vira 1 ponto, e 1,2 ponto a partir do Prata. No Clube, 100 pontos viram R$ 10 de desconto na próxima sacola.",
  },
  {
    id: "endereco",
    question: "Quero entregar em outro endereço",
    answer:
      "Toque no endereço no topo do início, ou em Gerenciar no perfil, e cadastre quantos quiser. O pedido usa o endereço escolhido no fechamento.",
  },
  {
    id: "pagamento",
    question: "Posso pagar na entrega",
    answer:
      "Sim. Escolha Dinheiro no fechamento. O Pix aprova na hora e ainda libera o cupom PIX5.",
  },
];

export function HelpSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const orders = usePediu((s) => s.orders);
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const last = orders[0];
  const clock = last ? deliveryClock(last) : null;
  const minCoupon = Math.min(...COUPONS.map((c) => c.min).filter((m) => m > 0));

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/50" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88dvh] max-w-phone flex-col rounded-t-3xl bg-bg px-5 pb-[max(1.2rem,env(safe-area-inset-bottom))] pt-4">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-border-strong" />
          <Drawer.Title className="mt-4 inline-flex items-center gap-2 font-display text-xl font-bold">
            <HelpCircle className="size-5 text-primary" />
            Ajuda
          </Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-muted">
            Pedidos, cupons e entregadores. Sem fila de atendimento.
          </Drawer.Description>

          <div className="mt-4 min-h-0 flex-1 overflow-y-auto pb-2">
            {last && clock ? (
              <Link
                to="/order/$id"
                params={{ id: last.id }}
                onClick={() => onOpenChange(false)}
                className="block rounded-[22px] bg-ink p-4 text-ink-fg shadow-ink"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">Último pedido</p>
                <p className="mt-1 font-display text-base font-bold">{last.restaurantName}</p>
                <p className="mt-0.5 text-xs text-ink-fg/70">
                  {STATUS_LABEL[clock.status]} · {formatBRL(last.share ?? last.total)} · {last.id}
                </p>
              </Link>
            ) : (
              <p className="rounded-[22px] bg-surface px-4 py-3 text-sm text-muted shadow-card">
                Você ainda não tem pedidos. Os cupons começam a valer a partir de {formatBRL(minCoupon)}.
              </p>
            )}

            <ul className="mt-3 grid gap-2">
              {TOPICS.map((t) => {
                const on = openTopic === t.id;
                return (
                  <li key={t.id} className="overflow-hidden rounded-[18px] bg-surface shadow-card">
                    <button
                      type="button"
                      aria-expanded={on}
                      onClick={() => setOpenTopic(on ? null : t.id)}
                      className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
                    >
                      <span className="font-display text-sm font-semibold">{t.question}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 text-subtle transition-transform duration-200",
                          on && "rotate-180",
                        )}
                      />
                    </button>
                    {on ? <p className="px-3 pb-3 text-xs leading-relaxed text-muted">{t.answer}</p> : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
