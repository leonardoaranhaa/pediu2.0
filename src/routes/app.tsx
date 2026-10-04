import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Download, ShieldCheck, Smartphone, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/logo";
import { Screen } from "@/components/shell";
import { androidApp } from "@/lib/android-app";

export const Route = createFileRoute("/app")({ component: AndroidPage });

const STEPS = [
  {
    title: "Baixe o instalador",
    body: "O arquivo tem cerca de 2 MB. O Android avisa que é de fora da Play Store — é esperado.",
  },
  {
    title: "Toque em abrir e confirme",
    body: "Se o celular pedir, libere “instalar apps desconhecidos” para o navegador e volte ao arquivo.",
  },
  {
    title: "Pediu na tela inicial",
    body: "Abre em tela cheia, sem barra de endereço, e atualiza junto com o app — nada para reinstalar.",
  },
];

/** Android is the only platform that can sideload this; iOS gets the PWA route. */
function useIsAndroid() {
  const [android, setAndroid] = useState<boolean | null>(null);
  useEffect(() => {
    setAndroid(/android/i.test(navigator.userAgent));
  }, []);
  return android;
}

function AndroidPage() {
  const android = useIsAndroid();
  const megabytes = (androidApp.bytes / 1024 / 1024).toFixed(1).replace(".", ",");

  return (
    <Screen>
      <main className="px-4 pb-10 pt-[max(0.8rem,env(safe-area-inset-top))]">
        <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold">
          <ChevronLeft className="size-4" />
          Perfil
        </Link>

        <div className="mt-4 overflow-hidden rounded-[28px] bg-ink p-5 text-ink-fg shadow-ink">
          <div className="flex items-center gap-3">
            <LogoMark className="size-12 text-primary" />
            <div>
              <p className="font-display text-[11px] font-bold uppercase tracking-wider text-accent">
                Android · versão {androidApp.version}
              </p>
              <h1 className="font-display text-2xl font-extrabold leading-tight">
                Pediu no seu celular
              </h1>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-fg/70">
            Um atalho de verdade: ícone na tela inicial, tela cheia e sem barra de navegador. O
            conteúdo continua vindo do Pediu publicado, então toda novidade aparece sozinha.
          </p>

          <a
            href={androidApp.file}
            download="pediu.apk"
            className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary font-display text-sm font-bold text-primary-fg shadow-red transition-transform duration-150 ease-out active:scale-[0.98]"
          >
            <Download className="size-4" />
            Baixar instalador · {megabytes} MB
          </a>

          {android === false ? (
            <p className="mt-3 inline-flex items-start gap-1.5 text-xs text-ink-fg/60">
              <Smartphone className="mt-0.5 size-3.5 shrink-0" />
              Você não está num Android. No iPhone, use Compartilhar · Adicionar à Tela de Início —
              o resultado é o mesmo.
            </p>
          ) : null}
        </div>

        <ol className="mt-5 grid gap-2">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3 rounded-[20px] bg-surface px-4 py-3 shadow-card">
              <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink font-display text-xs font-bold text-ink-fg">
                {i + 1}
              </span>
              <span>
                <span className="block font-display text-sm font-semibold">{step.title}</span>
                <span className="mt-0.5 block text-xs text-muted">{step.body}</span>
              </span>
            </li>
          ))}
        </ol>

        <section className="mt-5 rounded-[22px] bg-surface-2 px-4 py-4 shadow-card">
          <p className="inline-flex items-center gap-1.5 font-display text-sm font-semibold">
            <ShieldCheck className="size-4 text-success" />
            O que está dentro
          </p>
          <dl className="mt-3 grid gap-2 text-xs">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-muted">Abre</dt>
              <dd className="text-right font-semibold tabular-nums">
                {androidApp.host}
                {androidApp.startPath}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-muted">Identificador</dt>
              <dd className="text-right font-semibold">{androidApp.packageId}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <dt className="text-muted">Assinatura</dt>
              <dd className="break-all text-right font-mono text-[10px] leading-snug text-muted">
                {androidApp.fingerprint}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-muted">
            A mesma assinatura está publicada em{" "}
            <span className="font-mono text-[10px]">/.well-known/assetlinks.json</span>, e é isso
            que faz o Android confiar no app e esconder a barra de endereço.
          </p>
        </section>

        <p className="mt-4 inline-flex items-start gap-1.5 text-xs text-subtle">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
          Instalador para uso direto, fora da Play Store. Precisa de internet para funcionar, como
          qualquer app de delivery.
        </p>
      </main>
    </Screen>
  );
}
