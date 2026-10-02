import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Clock, S as MapPin, j as ChevronLeft, l as Star, t as Zap, w as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as getRestaurant, m as dishesOf, n as Route, o as usePediu, x as cn, y as reviewsFor } from "./router-D2txYF5L.mjs";
import { i as formatRange, n as formatBRL, r as formatFee, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
import { t as DishSheet } from "./dish-sheet-r-g9Sn7U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/restaurants._id-DaNlb6rw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RestaurantPage() {
	const { id } = Route.useParams();
	const restaurant = getRestaurant(id);
	const dishes = dishesOf(id);
	const fav = usePediu((s) => s.favorites.includes(id));
	const toggleFav = usePediu((s) => s.toggleFavorite);
	const replaceCartWith = usePediu((s) => s.replaceCartWith);
	const [activeCat, setActiveCat] = (0, import_react.useState)("Tudo");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [conflict, setConflict] = (0, import_react.useState)(null);
	const categories = (0, import_react.useMemo)(() => {
		return ["Tudo", ...Array.from(new Set(dishes.map((d) => d.category)))];
	}, [dishes]);
	const visible = activeCat === "Tudo" ? dishes : dishes.filter((d) => d.category === activeCat);
	if (!restaurant) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
		tabs: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-6 py-24 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl font-bold",
				children: "Restaurante sumiu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-4 inline-block text-sm font-semibold text-primary",
				children: "Voltar ao início"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		peek: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-56",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: restaurant.image,
						alt: "",
						className: "size-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-ink/25" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-3 top-[max(0.7rem,env(safe-area-inset-top))] flex w-[calc(100%-1.5rem)] items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "grid size-11 place-items-center rounded-full bg-surface text-fg shadow-card",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleFav(id),
							className: "grid size-11 place-items-center rounded-full bg-surface shadow-card",
							"aria-label": "Favoritar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: cn("size-5", fav && "fill-primary text-primary") })
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mt-8 rounded-t-[32px] bg-bg px-4 pb-6 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-[1.7rem] font-extrabold leading-tight",
							children: restaurant.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }),
								restaurant.cuisine,
								" · ",
								restaurant.neighborhood,
								" · ",
								restaurant.distanceKm.toFixed(1),
								" km"
							]
						})] }), restaurant.flash ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 fill-accent-fg" }), "Flash"]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 font-display font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-accent text-accent" }),
									restaurant.rating.toFixed(1),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-sans font-medium text-muted",
										children: [
											"(",
											restaurant.reviewCount.toLocaleString("pt-BR"),
											")"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }), formatRange(restaurant.deliveryMin, restaurant.deliveryMax)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: restaurant.deliveryFee === 0 ? "font-semibold text-success" : "text-muted",
								children: formatFee(restaurant.deliveryFee)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: restaurant.about
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2",
						children: reviewsFor(restaurant.id).map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[18px] bg-surface px-3 py-2.5 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 text-xs font-semibold",
								children: [
									rev.name,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-accent text-accent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums",
										children: rev.rating.toFixed(1)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-sm text-muted",
								children: rev.text
							})]
						}, rev.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar sticky top-0 z-10 -mx-4 mt-5 flex gap-2 overflow-x-auto bg-bg/95 px-4 py-2 backdrop-blur-sm",
						children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveCat(cat),
							className: cn("h-9 shrink-0 rounded-full px-3 text-xs font-semibold transition-[background-color,color] duration-150", activeCat === cat ? "bg-ink text-ink-fg" : "bg-surface text-muted shadow-card"),
							children: cat
						}, cat))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-1 divide-y divide-border",
						children: visible.map((dish) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelected(dish),
							className: "flex w-full gap-3 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-[15px] font-semibold leading-tight",
											children: dish.name
										}), dish.popular ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary",
											children: "popular"
										}) : null]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-xs leading-relaxed text-muted",
										children: dish.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-sm font-bold tabular-nums",
										children: formatBRL(dish.price)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: dish.image,
								alt: "",
								className: "size-[5.5rem] shrink-0 rounded-[18px] object-cover"
							})]
						}) }, dish.id))
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DishSheet, {
				dish: selected,
				restaurant,
				open: Boolean(selected),
				onOpenChange: (o) => {
					if (!o) setSelected(null);
				},
				onConflict: (payload) => setConflict(payload)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
				open: Boolean(conflict),
				onOpenChange: (o) => !o && setConflict(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-ink/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
					className: "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-phone rounded-t-[32px] bg-bg px-5 pb-[max(1.2rem,env(safe-area-inset-bottom))] pt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-1.5 w-12 rounded-full bg-border-strong" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
							className: "mt-4 font-display text-xl font-bold",
							children: "Trocar de restaurante?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Description, {
							className: "mt-2 text-sm text-muted",
							children: "A sacola hoje é de outro lugar. Se continuar, a gente esvazia ela e começa este pedido."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => {
									if (!conflict) return;
									replaceCartWith(conflict);
									toast.success("Sacola trocada");
									setConflict(null);
									setSelected(null);
								},
								children: "Trocar e adicionar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "surface",
								onClick: () => setConflict(null),
								children: "Manter sacola"
							})]
						})
					]
				})] })
			})
		]
	});
}
//#endregion
export { RestaurantPage as component };
