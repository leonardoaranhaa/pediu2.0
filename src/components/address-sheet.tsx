import { Check, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { ADDRESSES } from "@/lib/data";
import { useAddresses, usePediu } from "@/lib/store";
import { cn } from "@/lib/utils";

const SHIPPED = new Set(ADDRESSES.map((a) => a.id));

export function AddressSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const addressId = usePediu((s) => s.addressId);
  const setAddress = usePediu((s) => s.setAddress);
  const addAddress = usePediu((s) => s.addAddress);
  const removeAddress = usePediu((s) => s.removeAddress);
  const addresses = useAddresses();
  const [adding, setAdding] = useState(false);
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [complement, setComplement] = useState("");

  function reset() {
    setAdding(false);
    setLabel("");
    setStreet("");
    setNeighborhood("");
    setComplement("");
  }

  function save() {
    if (!street.trim() || !neighborhood.trim()) {
      toast.error("Rua e bairro são obrigatórios");
      return;
    }
    addAddress({
      label: label.trim() || "Novo endereço",
      street: street.trim(),
      neighborhood: neighborhood.trim(),
      city: "São Paulo",
      complement: complement.trim() || undefined,
    });
    toast.success("Endereço salvo");
    reset();
    onOpenChange(false);
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
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[88dvh] max-w-phone overflow-y-auto rounded-t-3xl bg-bg px-5 pb-[max(1.2rem,env(safe-area-inset-bottom))] pt-4">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-border-strong" />
          <Drawer.Title className="mt-4 font-display text-xl font-bold">Onde entrega?</Drawer.Title>
          <Drawer.Description className="mt-1 text-sm text-muted">
            Troca o endereço e o Flash 99 recalcula na hora.
          </Drawer.Description>
          <ul className="mt-4 grid gap-2">
            {addresses.map((a) => {
              const on = addressId === a.id;
              return (
                <li key={a.id} className="flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAddress(a.id);
                      onOpenChange(false);
                    }}
                    className={cn(
                      "flex min-w-0 flex-1 items-start gap-3 rounded-2xl px-3 py-3 text-left transition-[background-color,transform] duration-150 ease-out active:scale-[0.98]",
                      on ? "bg-ink text-ink-fg" : "bg-surface shadow-card",
                    )}
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-sm font-semibold">{a.label}</span>
                      <span className={cn("text-xs", on ? "text-ink-fg/70" : "text-muted")}>
                        {a.street} · {a.neighborhood}
                        {a.complement ? ` · ${a.complement}` : ""}
                      </span>
                    </span>
                    {on ? (
                      <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-fg">
                        <Check className="size-3.5" />
                      </span>
                    ) : null}
                  </button>
                  {SHIPPED.has(a.id) ? null : (
                    <button
                      type="button"
                      onClick={() => {
                        removeAddress(a.id);
                        toast.success("Endereço removido");
                      }}
                      aria-label={`Remover ${a.label}`}
                      className="grid w-11 shrink-0 place-items-center rounded-2xl bg-surface text-muted shadow-card"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {adding ? (
            <div className="mt-4 grid gap-2 rounded-2xl bg-surface p-3 shadow-card">
              <Field label="Nome" value={label} onChange={setLabel} placeholder="Casa da vó" />
              <Field label="Rua e número" value={street} onChange={setStreet} placeholder="Rua Augusta, 1508" />
              <Field label="Bairro" value={neighborhood} onChange={setNeighborhood} placeholder="Consolação" />
              <Field label="Complemento" value={complement} onChange={setComplement} placeholder="Apto 72" />
              <div className="mt-1 grid grid-cols-2 gap-2">
                <Button variant="surface" onClick={reset}>
                  Cancelar
                </Button>
                <Button onClick={save}>Salvar</Button>
              </div>
            </div>
          ) : (
            <Button variant="surface" className="mt-4 w-full" onClick={() => setAdding(true)}>
              <Plus className="size-4" />
              Novo endereço
            </Button>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 h-11 w-full rounded-[14px] bg-bg px-3 text-sm outline-none placeholder:text-subtle"
      />
    </label>
  );
}
