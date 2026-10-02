import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { j as ChevronLeft } from "../_libs/lucide-react.mjs";
import { _ as getRestaurant, d as RESTAURANTS, f as TASTE_MOODS, u as DISHES, x as cn } from "./router-D2txYF5L.mjs";
import { n as formatBRL, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as RestaurantCard } from "./restaurant-card-7-53oc4m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/taste-BQPfRjdL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TastePage() {
	const [mood, setMood] = (0, import_react.useState)(null);
	const selected = TASTE_MOODS.find((m) => m.id === mood);
	const matches = (0, import_react.useMemo)(() => {
		if (!selected) return [];
		return RESTAURANTS.filter((r) => selected.cuisines.includes(r.cuisine) && r.id !== "mercado-pediu");
	}, [selected]);
	const dishes = (0, import_react.useMemo)(() => {
		if (!selected) return [];
		return DISHES.filter((d) => {
			const hay = `${d.name} ${d.description} ${d.category}`.toLowerCase();
			return selected.tags.some((t) => hay.includes(t));
		}).slice(0, 6);
	}, [selected]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 pb-10 pt-[max(0.8rem,env(safe-area-inset-top))]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex items-center gap-1 text-sm font-semibold",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Início"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl font-extrabold leading-none",
				children: "Sabor do momento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Diz como está a fome. A gente monta o cardápio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-2 gap-2.5",
				children: TASTE_MOODS.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMood(m.id),
					className: cn("rounded-[24px] p-4 text-left shadow-card transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97]", mood === m.id ? "bg-primary text-primary-fg shadow-red" : i % 2 === 0 ? "bg-ink text-ink-fg" : "bg-accent text-accent-fg"),
					style: { animation: `fade-up 480ms var(--ease-out-soft) ${i * 60}ms both` },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-base font-bold leading-tight",
						children: m.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-1 text-xs", mood === m.id ? "text-primary-fg/80" : "opacity-75"),
						children: m.subtitle
					})]
				}, m.id))
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-lg font-bold",
						children: ["Pra agora · ", selected.title]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: matches.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, { restaurant: r }, r.id))
					}),
					dishes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Pratos que batem"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2",
						children: dishes.map((d) => {
							const rest = getRestaurant(d.restaurantId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/restaurants/$id",
								params: { id: d.restaurantId },
								className: "flex gap-3 rounded-[20px] bg-surface p-2 shadow-card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: d.image,
									alt: "",
									className: "size-16 rounded-[14px] object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm font-semibold",
										children: d.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: rest?.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-bold tabular-nums",
										children: formatBRL(d.price)
									})
								] })]
							}, d.id);
						})
					})] }) : null
				]
			}) : null
		]
	}) });
}
//#endregion
export { TastePage as component };
