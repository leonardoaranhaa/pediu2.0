import type { DeliveryStatus } from "@/lib/clock";

type Rule = { match: RegExp; reply: string };

/** Topic rules win over the status fallback, so an answer addresses what was asked. */
const RULES: Rule[] = [
  { match: /portaria|porteiro|recep/i, reply: "Fechado, deixo na portaria e mando foto." },
  { match: /portão|portao|descendo|desço|desco|já vou|ja vou/i, reply: "Boa, te espero no portão." },
  { match: /apto|apartamento|andar|\b\d{1,3}[ºo]?\s?(and|andar)?\b/i, reply: "Anotei o andar. Subo direto." },
  { match: /cachorro|cão|cao|dog/i, reply: "Valeu pelo aviso do cachorro. Toco a campainha e espero." },
  { match: /campainha|interfone|toca|não toca|nao toca/i, reply: "Combinado, uso o interfone quando chegar." },
  { match: /demora|atras|quanto tempo|tá onde|ta onde|onde (você|voce|vc)/i, reply: "Tô no trajeto. O app mostra meu tempo certinho." },
  { match: /troco|dinheiro|pix|cart[ãa]o/i, reply: "O pagamento está no app, não preciso de troco." },
  { match: /gelad|quente|frio/i, reply: "Vem na bag térmica, chega na temperatura." },
  { match: /obrigad|valeu|vlw|brigad/i, reply: "Nós que agradecemos. Bom apetite!" },
  { match: /\?$/, reply: "Pode mandar. Respondo no farol." },
];

const BY_STATUS: Record<DeliveryStatus, string> = {
  received: "Tô indo buscar na loja, já aviso quando sair.",
  preparing: "A loja ainda está montando. Saio assim que sair do balcão.",
  on_the_way: "Combinado. Já estou na rua com o seu pedido.",
  arriving: "Combinado. Te aviso na porta.",
  delivered: "Pedido já entregue. Qualquer coisa, fala com a central.",
};

export function courierReply(text: string, status: DeliveryStatus) {
  const rule = RULES.find((r) => r.match.test(text.trim()));
  if (rule) return rule.reply;
  return BY_STATUS[status];
}
