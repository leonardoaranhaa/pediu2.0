import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ChevronRight, S as MapPin, i as UserRound, k as CircleHelp, s as Ticket, w as Heart } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as getRestaurant, l as COUPONS, o as usePediu, s as ADDRESSES } from "./router-D2txYF5L.mjs";
import { t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
import { n as RestaurantRow } from "./restaurant-card-7-53oc4m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CAyevDHX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const name = usePediu((s) => s.name);
	const setName = usePediu((s) => s.setName);
	const addressId = usePediu((s) => s.addressId);
	const favorites = usePediu((s) => s.favorites);
	const [draft, setDraft] = (0, import_react.useState)(name);
	const favRestaurants = favorites.map(getRestaurant).filter((r) => Boolean(r));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-10 pt-[max(0.9rem,env(safe-area-inset-top))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid size-14 place-items-center rounded-[20px] bg-primary text-primary-fg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-7" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-extrabold leading-tight",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Clube Pediu · 1.2x pontos Flash"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-5 block rounded-[22px] bg-surface p-4 shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted",
					children: "Como te chamamos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					onBlur: () => setName(draft),
					className: "mt-1 w-full bg-transparent font-display text-lg font-semibold outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 font-display text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }), "Endereços"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: ADDRESSES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: addressId === a.id ? "rounded-[18px] bg-ink px-3 py-3 text-ink-fg" : "rounded-[18px] bg-surface px-3 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: a.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: addressId === a.id ? "text-xs text-ink-fg/70" : "text-xs text-muted",
							children: [
								a.street,
								" · ",
								a.neighborhood
							]
						})]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 font-display text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4 text-primary" }), "Cupons"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: COUPONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							navigator.clipboard?.writeText(c.code);
							toast.success(`${c.code} copiado`);
						},
						className: "flex items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-left shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-sm font-bold",
							children: c.code
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: c.description
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-primary",
							children: c.label
						})]
					}, c.code))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex items-center gap-1.5 font-display text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4 text-primary" }), "Favoritos"]
				}), favRestaurants.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Nada salvo ainda. Toque no coração na loja."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-2",
					children: favRestaurants.map((r) => r ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantRow, { restaurant: r }, r.id) : null)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toast.message("Central de ajuda · pedidos, cupons e entregadores."),
				className: "mt-5 flex w-full items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-sm font-semibold shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }), "Ajuda"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-xs text-subtle",
				children: "Pediu · comida e mercado · São Paulo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				className: "mx-auto mt-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/taste",
					children: "Sabor do momento"
				})
			})
		]
	}) });
}
//#endregion
export { ProfilePage as component };
