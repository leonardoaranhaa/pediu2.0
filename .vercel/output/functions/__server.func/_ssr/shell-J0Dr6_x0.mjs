import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as House, O as ClipboardList, m as Search, p as ShoppingBag, r as User } from "../_libs/lucide-react.mjs";
import { a as cartTotals, o as usePediu, x as cn } from "./router-D2txYF5L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-J0Dr6_x0.js
var import_jsx_runtime = require_jsx_runtime();
function formatBRL(value) {
	return value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function formatFee(value) {
	return value <= 0 ? "Grátis" : formatBRL(value);
}
function formatRange(min, max) {
	return `${min}–${max} min`;
}
function greetingForHour(hour) {
	if (hour < 5) return "Boa madrugada";
	if (hour < 12) return "Bom dia";
	if (hour < 18) return "Boa tarde";
	return "Boa noite";
}
function hungerLine(hour) {
	if (hour < 5) return "O Pediu Flash ainda está na rua.";
	if (hour < 11) return "Pão de queijo ou açaí — você escolhe.";
	if (hour < 15) return "Almoço com cara de fim de semana.";
	if (hour < 18) return "Um lanche agora muda o dia.";
	if (hour < 23) return "Jantar sem fila, sem dúvida.";
	return "Madruga pede Flash. A gente corre.";
}
var TABS = [
	{
		to: "/",
		label: "Início",
		icon: House,
		match: (p) => p === "/"
	},
	{
		to: "/search",
		label: "Busca",
		icon: Search,
		match: (p) => p.startsWith("/search") || p.startsWith("/taste")
	},
	{
		to: "/orders",
		label: "Pedidos",
		icon: ClipboardList,
		match: (p) => p.startsWith("/orders") || p.startsWith("/order")
	},
	{
		to: "/profile",
		label: "Perfil",
		icon: User,
		match: (p) => p.startsWith("/profile")
	}
];
function PhoneFrame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto min-h-dvh w-full max-w-phone overflow-x-hidden bg-bg text-fg shadow-ink",
			children
		})
	});
}
function TabBar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const itemCount = usePediu((s) => s.cart).reduce((n, i) => n + i.qty, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "pointer-events-none sticky bottom-0 z-40 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto mx-auto flex h-16 items-center justify-around rounded-[28px] bg-ink px-2 text-ink-fg shadow-float",
			children: [TABS.map((tab) => {
				const active = tab.match(pathname);
				const Icon = tab.icon;
				const className = cn("relative flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 rounded-full px-3 transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]", active ? "bg-primary text-primary-fg" : "text-ink-fg/55");
				if (tab.to === "/search") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/search",
					search: { q: void 0 },
					"aria-label": tab.label,
					className,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.4 : 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[10px] font-semibold tracking-wide",
						children: tab.label
					})]
				}, tab.to);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: tab.to,
					"aria-label": tab.label,
					className,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "size-5",
						strokeWidth: active ? 2.4 : 2
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[10px] font-semibold tracking-wide",
						children: tab.label
					})]
				}, tab.to);
			}), itemCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/cart",
				"aria-label": "Sacola",
				className: "relative flex h-12 min-w-12 flex-col items-center justify-center gap-0.5 rounded-full bg-accent px-3 text-accent-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
						className: "size-5",
						strokeWidth: 2.4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[10px] font-semibold",
						children: "Sacola"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary font-display text-[10px] font-bold text-primary-fg tabular-nums",
						children: itemCount
					})
				]
			}) : null]
		})
	});
}
function CartPeek() {
	const cart = usePediu((s) => s.cart);
	const coupon = usePediu((s) => s.coupon);
	const payment = usePediu((s) => s.payment);
	const totals = cartTotals(cart, coupon, payment);
	if (!totals.itemCount) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky bottom-20 z-30 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/cart",
			className: "flex items-center justify-between rounded-[22px] bg-primary px-4 py-3 text-primary-fg shadow-red transition-transform duration-150 ease-out active:scale-[0.96]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-9 place-items-center rounded-full bg-primary-fg/15 font-display text-sm font-bold tabular-nums",
					children: totals.itemCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: "Ver sacola"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-primary-fg/80",
					children: totals.restaurant?.name
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-bold tabular-nums",
				children: formatBRL(totals.total)
			})]
		})
	});
}
function Screen({ children, tabs = true, peek = false, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex min-h-dvh flex-col", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			peek ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPeek, {}) : null,
			tabs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabBar, {}) : null
		]
	}) });
}
//#endregion
export { greetingForHour as a, formatRange as i, formatBRL as n, hungerLine as o, formatFee as r, Screen as t };
