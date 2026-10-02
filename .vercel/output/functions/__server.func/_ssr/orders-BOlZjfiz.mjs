import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ChevronRight, g as RotateCcw } from "../_libs/lucide-react.mjs";
import { o as usePediu } from "./router-D2txYF5L.mjs";
import { n as formatBRL, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BOlZjfiz.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	received: "Recebido",
	preparing: "Preparando",
	on_the_way: "A caminho",
	arriving: "Chegando",
	delivered: "Entregue"
};
function liveStatus(order) {
	const elapsed = Date.now() - order.createdAt;
	if (elapsed > 36e3) return "delivered";
	if (elapsed > 28e3) return "arriving";
	if (elapsed > 12e3) return "on_the_way";
	if (elapsed > 4e3) return "preparing";
	return "received";
}
function OrdersPage() {
	const orders = usePediu((s) => s.orders);
	const addToCart = usePediu((s) => s.addToCart);
	const clearCart = usePediu((s) => s.clearCart);
	const active = orders.filter((o) => liveStatus(o) !== "delivered");
	const past = orders.filter((o) => liveStatus(o) === "delivered");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-[max(0.9rem,env(safe-area-inset-top))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-extrabold",
			children: "Pedidos"
		}), orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-bold",
					children: "Nenhum pedido ainda"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "O primeiro chega mais rápido do que parece."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Explorar"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-6",
			children: [active.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-wider text-primary",
				children: "Ao vivo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-2",
				children: active.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
					order: o,
					live: true
				}, o.id))
			})] }) : null, past.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-bold uppercase tracking-wider text-muted",
				children: "Anteriores"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 grid gap-2",
				children: past.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[22px] bg-surface p-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
						order: o,
						live: false
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "surface",
						size: "sm",
						className: "mt-2 w-full",
						onClick: () => {
							clearCart();
							o.items.forEach((item) => {
								addToCart({
									dishId: item.dishId,
									extras: item.extras,
									qty: item.qty,
									notes: item.notes
								});
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "Pedir de novo"]
					})]
				}, o.id))
			})] }) : null]
		})]
	}) });
}
function OrderCard({ order, live }) {
	const status = liveStatus(order);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/order/$id",
		params: { id: order.id },
		className: "flex items-center gap-3 rounded-[22px] bg-surface p-3 shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: order.restaurantImage,
				alt: "",
				className: "size-14 rounded-[16px] object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-sm font-semibold",
						children: order.restaurantName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							LABELS[status],
							" · ",
							formatBRL(order.total)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-subtle tabular-nums",
						children: order.id
					})
				]
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })
		]
	});
}
//#endregion
export { OrdersPage as component };
