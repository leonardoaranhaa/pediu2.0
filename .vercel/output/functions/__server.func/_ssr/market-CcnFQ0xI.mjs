import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ShoppingBasket, t as Zap } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as getRestaurant, m as dishesOf, o as usePediu } from "./router-D2txYF5L.mjs";
import { n as formatBRL, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as DishSheet } from "./dish-sheet-r-g9Sn7U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-CcnFQ0xI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MarketPage() {
	const restaurant = getRestaurant("mercado-pediu");
	const dishes = dishesOf("mercado-pediu");
	const cats = (0, import_react.useMemo)(() => ["Tudo", ...Array.from(new Set(dishes.map((d) => d.category)))], [dishes]);
	const [cat, setCat] = (0, import_react.useState)("Tudo");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [conflict, setConflict] = (0, import_react.useState)(null);
	const replaceCartWith = usePediu((s) => s.replaceCartWith);
	const visible = cat === "Tudo" ? dishes : dishes.filter((d) => d.category === cat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		peek: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "bg-ink px-4 pb-6 pt-[max(0.9rem,env(safe-area-inset-top))] text-ink-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 fill-accent-fg" }), "Relâmpago 25 min"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-3xl font-extrabold leading-none",
								children: "Mercado Pediu"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-[20rem] text-sm text-ink-fg/70",
								children: "Hortifruti, mercearia e padaria com a mesma moto que entrega o smash."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar -mt-3 flex gap-2 overflow-x-auto px-4",
						children: cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCat(c),
							className: cat === c ? "h-9 shrink-0 rounded-full bg-primary px-3 text-xs font-semibold text-primary-fg" : "h-9 shrink-0 rounded-full bg-surface px-3 text-xs font-semibold text-muted shadow-card",
							children: c
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-2 gap-2.5 px-4",
						children: visible.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelected(d),
							className: "overflow-hidden rounded-[22px] bg-surface text-left shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.image,
								alt: "",
								className: "h-28 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-semibold leading-tight",
									children: d.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-sm font-bold tabular-nums",
									children: formatBRL(d.price)
								})]
							})]
						}, d.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishSheet, {
				dish: selected,
				restaurant,
				open: Boolean(selected),
				onOpenChange: (o) => !o && setSelected(null),
				onConflict: setConflict
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
				open: Boolean(conflict),
				onOpenChange: (o) => !o && setConflict(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
					className: "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-phone rounded-t-[32px] bg-bg px-5 pb-8 pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
							className: "font-display text-xl font-bold",
							children: "Trocar a sacola?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
							className: "mt-2 text-sm text-muted",
							children: "O mercado entra no lugar dos pratos que já estavam na sacola."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-5 w-full",
							onClick: () => {
								if (!conflict) return;
								replaceCartWith(conflict);
								toast.success("Sacola do mercado");
								setConflict(null);
								setSelected(null);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBasket, { className: "size-4" }), "Trocar"]
						})
					]
				})] })
			})
		]
	});
}
//#endregion
export { MarketPage as component };
