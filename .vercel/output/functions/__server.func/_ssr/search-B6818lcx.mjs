import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as SlidersHorizontal, m as Search, n as X, u as Sparkles } from "../_libs/lucide-react.mjs";
import { _ as getRestaurant, b as searchAll, c as CATEGORIES, h as flashRestaurants, i as Route$3, o as usePediu } from "./router-D2txYF5L.mjs";
import { n as formatBRL, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { n as RestaurantRow } from "./restaurant-card-7-53oc4m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-B6818lcx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const { q: qParam } = Route$3.useSearch();
	const [q, setQ] = (0, import_react.useState)(qParam ?? "");
	const addSearch = usePediu((s) => s.addSearch);
	const recent = usePediu((s) => s.recentSearches);
	const flashHint = q.trim().toLowerCase() === "flash";
	const results = (0, import_react.useMemo)(() => {
		if (flashHint) return {
			restaurants: flashRestaurants(),
			dishes: []
		};
		return searchAll(q);
	}, [q, flashHint]);
	const hasQuery = q.trim().length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-8 pt-[max(0.9rem,env(safe-area-inset-top))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex h-12 flex-1 items-center gap-2 rounded-full bg-surface px-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 text-muted" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						autoFocus: true,
						onChange: (e) => setQ(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") addSearch(q);
						},
						placeholder: "O que você quer comer?",
						className: "h-full w-full bg-transparent text-sm outline-none placeholder:text-subtle"
					}),
					q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQ(""),
						"aria-label": "Limpar",
						className: "grid size-8 place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/taste",
				className: "grid size-12 place-items-center rounded-full bg-accent text-accent-fg",
				"aria-label": "Sabor do momento",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" })
			})]
		}), !hasQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in mt-6 space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-sm font-semibold",
				children: "Buscas recentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: recent.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setQ(s),
					className: "h-9 rounded-full bg-surface px-3 text-sm font-medium shadow-card",
					children: s
				}, s))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "inline-flex items-center gap-1.5 font-display text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), "Cozinhas"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: CATEGORIES.filter((c) => c.cuisine).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setQ(c.cuisine ?? c.label),
					className: "overflow-hidden rounded-[20px] bg-surface text-left shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: c.image,
						alt: "",
						className: "h-16 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-2 text-xs font-semibold",
						children: c.label
					})]
				}, c.id))
			})] })]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 space-y-5",
			children: [
				flashHint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-[18px] bg-accent px-3 py-2 text-sm font-semibold text-accent-fg",
					children: "Flash 99 — entrega em até 22 minutos."
				}) : null,
				results.restaurants.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold",
					children: "Restaurantes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: results.restaurants.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantRow, { restaurant: r }, r.id))
				})] }) : null,
				results.dishes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-base font-bold",
					children: "Pratos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: results.dishes.slice(0, 12).map((d) => {
						const rest = getRestaurant(d.restaurantId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/restaurants/$id",
							params: { id: d.restaurantId },
							className: "flex gap-3 rounded-[20px] bg-surface p-2 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.image,
								alt: "",
								className: "size-16 rounded-[14px] object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-sm font-semibold",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: rest?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-sm font-bold tabular-nums",
										children: formatBRL(d.price)
									})
								]
							})]
						}, d.id);
					})
				})] }) : null,
				results.restaurants.length === 0 && results.dishes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-surface px-5 py-10 text-center shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-bold",
						children: "Nada com esse nome"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Tenta pizza, açaí, ramen ou mercado."
					})]
				}) : null
			]
		})]
	}) });
}
//#endregion
export { SearchPage as component };
