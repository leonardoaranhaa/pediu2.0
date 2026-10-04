import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Ticket, Zap } from "lucide-react";
import { toast } from "sonner";
import { Screen } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { clubTier, pointsMultiplier, REDEEM_BRL, REDEEM_POINTS } from "@/lib/data";
import { formatBRL } from "@/lib/format";
import { usePediu } from "@/lib/store";

export const Route = createFileRoute("/club")({ component: ClubPage });

const PERKS = [
  { title: "Pontos em todo pedido", body: "R$ 1 vira 1 ponto. No Prata, 1,2×." },
  { title: "Flash na frente", body: "Pedidos Flash 99 pulam a fila da moto." },
  { title: "Cupom de aniversário", body: "FOME20 no mês do seu Pediu." },
  { title: "Mercado relâmpago", body: "Taxa menor no Mercado Pediu depois das 22h." },
];

function ClubPage() {
  const points = usePediu((s) => s.points);
  const credit = usePediu((s) => s.pointsCredit);
  const redeem = usePediu((s) => s.redeemPoints);
  const orders = usePediu((s) => s.orders);
  const name = usePediu((s) => s.name);
  const tier = clubTier(points);
  const afterRedeem = clubTier(points - REDEEM_POINTS);
  const progress = tier.next ? Math.min(1, points / tier.next) : 1;
  const spent = orders.reduce((s, o) => s + (o.share ?? o.total), 0);
  const mult = pointsMultiplier(points);
  const canRedeem = points >= REDEEM_POINTS;

  return (
    <Screen>
      <main className="px-4 pb-10 pt-[max(0.8rem,env(safe-area-inset-top))]">
        <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold">
          <ChevronLeft className="size-4" />
          Perfil
        </Link>
        <div className="mt-4 overflow-hidden rounded-[28px] bg-ink p-5 text-ink-fg shadow-ink">
          <p className="inline-flex items-center gap-1 font-display text-[11px] font-bold uppercase tracking-wider text-accent">
            <Zap className="size-3.5 fill-accent" />
            Clube Pediu · {tier.name}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tabular-nums leading-none">{points}</h1>
          <p className="mt-2 text-sm text-ink-fg/70">pontos de {name === "Você" ? "sua fome" : name.split(" ")[0]}</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-ink-fg/15">
            <div className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-ink-fg/60">
            {tier.next ? `Faltam ${tier.next - points} pts para o próximo nível` : "Você está no topo Flash 99"}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-[22px] bg-surface p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Pedidos</p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums">{orders.length}</p>
          </div>
          <div className="rounded-[22px] bg-surface p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Já pediu</p>
            <p className="mt-1 font-display text-2xl font-bold tabular-nums">{formatBRL(spent)}</p>
          </div>
        </div>

        <h2 className="mt-7 font-display text-lg font-bold">Vantagens</h2>
        <ul className="mt-3 grid gap-2">
          {PERKS.map((p) => (
            <li key={p.title} className="rounded-[20px] bg-surface px-4 py-3 shadow-card">
              <p className="font-display text-sm font-semibold">{p.title}</p>
              <p className="mt-0.5 text-xs text-muted">{p.body}</p>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm text-muted">
          {tier.id === "flash"
            ? "Entrega Flash sai grátis, e cada real ainda vale 1,2 ponto."
            : tier.id === "prata"
              ? `Cada real deste nível vira ${mult.toLocaleString("pt-BR")} ponto.`
              : "Cada real vira 1 ponto. No Prata, passa a 1,2×."}
        </p>

        <Button
          className="mt-5 w-full rounded-full"
          disabled={!canRedeem}
          onClick={() => {
            if (redeem()) toast.success(`${formatBRL(REDEEM_BRL)} entraram na próxima sacola`);
          }}
        >
          <Ticket className="size-4" />
          {canRedeem ? `Trocar ${REDEEM_POINTS} pontos · ${formatBRL(REDEEM_BRL)}` : `Faltam ${REDEEM_POINTS - points} pts para trocar`}
        </Button>
        {canRedeem && afterRedeem.id !== tier.id ? (
          <p className="mt-2 text-center text-xs text-muted">Essa troca muda seu nível para {afterRedeem.name}.</p>
        ) : null}
        <p className="mt-2 text-center text-xs text-muted">
          {credit > 0 ? `${formatBRL(credit)} já estão na sacola. 10 pontos viram R$ 1.` : "10 pontos viram R$ 1 no próximo pedido."}
        </p>
      </main>
    </Screen>
  );
}
