import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Clock, l as Star, t as Zap, w as Heart } from "../_libs/lucide-react.mjs";
import { o as usePediu, x as cn } from "./router-D2txYF5L.mjs";
import { i as formatRange, r as formatFee } from "./shell-J0Dr6_x0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/restaurant-card-7-53oc4m.js
var import_jsx_runtime = require_jsx_runtime();
function RestaurantCard({ restaurant, featured = false }) {
	const fav = usePediu((s) => s.favorites.includes(restaurant.id));
	const toggle = usePediu((s) => s.toggleFavorite);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/restaurants/$id",
		params: { id: restaurant.id },
		className: cn("group relative block overflow-hidden bg-surface shadow-card transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]", featured ? "rounded-[28px]" : "rounded-[24px]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative overflow-hidden", featured ? "h-44" : "h-36"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: restaurant.image,
					alt: "",
					className: "size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/10" }),
				restaurant.flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 fill-accent-fg" }),
						"Flash ",
						restaurant.deliveryMax,
						" min"
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": fav ? "Remover dos favoritos" : "Favoritar",
					onClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
						toggle(restaurant.id);
					},
					className: "absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-ink/45 text-ink-fg backdrop-blur-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-4", fav && "fill-primary text-primary") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-3 right-3 text-ink-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg font-bold leading-tight",
						children: restaurant.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-ink-fg/80",
						children: [
							restaurant.cuisine,
							" · ",
							restaurant.neighborhood
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 px-3 py-3 text-xs font-medium text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 text-fg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-accent text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-display font-semibold",
							children: restaurant.rating.toFixed(1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-subtle",
							children: [
								"(",
								restaurant.reviewCount.toLocaleString("pt-BR"),
								")"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), formatRange(restaurant.deliveryMin, restaurant.deliveryMax)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("ml-auto", restaurant.deliveryFee === 0 && "text-success font-semibold"),
					children: formatFee(restaurant.deliveryFee)
				})
			]
		})]
	});
}
function RestaurantRow({ restaurant }) {
	const fav = usePediu((s) => s.favorites.includes(restaurant.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/restaurants/$id",
		params: { id: restaurant.id },
		className: "flex gap-3 rounded-[22px] bg-surface p-2 shadow-card transition-transform duration-150 ease-out active:scale-[0.98]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: restaurant.image,
			alt: "",
			className: "size-20 shrink-0 rounded-[16px] object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 flex-1 py-0.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold leading-tight",
						children: restaurant.name
					}), fav ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3.5 fill-primary text-primary" }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 truncate text-xs text-muted",
					children: [
						restaurant.cuisine,
						" · ",
						restaurant.neighborhood
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2 text-[11px] text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-0.5 font-display font-semibold text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-accent text-accent" }), restaurant.rating.toFixed(1)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatRange(restaurant.deliveryMin, restaurant.deliveryMax) }),
						restaurant.flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-accent px-1.5 py-0.5 font-display text-[10px] font-bold text-accent-fg",
							children: "Flash"
						}) : null
					]
				})
			]
		})]
	});
}
//#endregion
export { RestaurantRow as n, RestaurantCard as t };
