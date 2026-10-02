import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as Minus, n as X, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as usePediu, x as cn } from "./router-D2txYF5L.mjs";
import { n as formatBRL } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dish-sheet-r-g9Sn7U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DishSheet({ dish, restaurant, open, onOpenChange, onConflict }) {
	const addToCart = usePediu((s) => s.addToCart);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [notes, setNotes] = (0, import_react.useState)("");
	const [extras, setExtras] = (0, import_react.useState)([]);
	const unit = (0, import_react.useMemo)(() => {
		if (!dish) return 0;
		return dish.price + extras.reduce((s, e) => s + e.price, 0);
	}, [dish, extras]);
	function reset() {
		setQty(1);
		setNotes("");
		setExtras([]);
	}
	function toggleExtra(extra) {
		setExtras((cur) => cur.some((e) => e.id === extra.id) ? cur.filter((e) => e.id !== extra.id) : [...cur, extra]);
	}
	function add() {
		if (!dish) return;
		const payload = {
			dishId: dish.id,
			extras,
			qty,
			notes
		};
		if (addToCart(payload) === "conflict") {
			onConflict(payload);
			return;
		}
		toast.success("Entrou na sacola", { description: dish.name });
		onOpenChange(false);
		reset();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange: (v) => {
			onOpenChange(v);
			if (!v) reset();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-phone flex-col rounded-t-[32px] bg-bg outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2 h-1.5 w-12 rounded-full bg-border-strong" }), dish ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 flex-col overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-44 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: dish.image,
							alt: "",
							className: "size-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onOpenChange(false),
							className: "absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-ink/55 text-ink-fg",
							"aria-label": "Fechar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-h-0 flex-1 overflow-y-auto px-5 pb-4 pt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted",
								children: restaurant?.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
								className: "mt-1 font-display text-2xl font-bold leading-tight",
								children: dish.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: dish.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-lg font-bold tabular-nums",
								children: formatBRL(dish.price)
							}),
							dish.extras.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-sm font-semibold",
									children: "Leva junto"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-2",
									children: dish.extras.map((extra) => {
										const on = extras.some((e) => e.id === extra.id);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => toggleExtra(extra),
											className: cn("flex w-full items-center justify-between rounded-[16px] px-3 py-3 text-left shadow-card transition-[background-color,transform] duration-150 ease-out active:scale-[0.98]", on ? "bg-accent text-accent-fg" : "bg-surface"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: extra.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm tabular-nums",
												children: extra.price === 0 ? "Grátis" : `+ ${formatBRL(extra.price)}`
											})]
										}) }, extra.id);
									})
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-5 block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-sm font-semibold",
									children: "Observação"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "Sem cebola, ponto da carne, toque na porta…",
									className: "mt-2 h-20 w-full resize-none rounded-[16px] bg-surface px-3 py-2.5 text-sm shadow-card outline-none placeholder:text-subtle"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 border-t border-border px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex h-12 items-center rounded-full bg-surface px-2 shadow-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-10 place-items-center",
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									"aria-label": "Diminuir",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-6 text-center font-display font-bold tabular-nums",
									children: qty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid size-10 place-items-center",
									onClick: () => setQty((q) => q + 1),
									"aria-label": "Aumentar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-12 flex-1 rounded-full",
							onClick: add,
							children: ["Adicionar · ", formatBRL(unit * qty)]
						})]
					})
				]
			}) : null]
		})] })
	});
}
//#endregion
export { DishSheet as t };
