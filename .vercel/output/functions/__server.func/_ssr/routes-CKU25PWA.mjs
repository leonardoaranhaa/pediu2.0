import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as ChevronRight, S as MapPin, c as Store, h as ScanSearch, n as X, t as Zap, u as Sparkles } from "../_libs/lucide-react.mjs";
import { c as CATEGORIES, d as RESTAURANTS, g as getAddress, h as flashRestaurants, o as usePediu, p as collectionsForHour, x as cn } from "./router-D2txYF5L.mjs";
import { a as greetingForHour, o as hungerLine, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as RestaurantCard } from "./restaurant-card-7-53oc4m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CKU25PWA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORY_IDS = [
	"smash-club",
	"napoli-di-roma",
	"acai-do-parque",
	"brasa-da-vila",
	"nikkei-88",
	"coxinha-da-esquina"
];
function Stories() {
	const stories = STORY_IDS.map((id) => RESTAURANTS.find((r) => r.id === id)).filter((r) => Boolean(r));
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "no-scrollbar flex gap-3 overflow-x-auto px-4",
		children: stories.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen(i),
			className: "flex w-[4.6rem] shrink-0 flex-col items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("relative grid size-[4.35rem] place-items-center rounded-full p-[3px]", r.flash ? "bg-[conic-gradient(from_120deg,#ffc400,#e20d2a,#ffc400)]" : "bg-[conic-gradient(from_80deg,#e20d2a,#ff8a7a,#e20d2a)]"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: r.image,
					alt: "",
					className: "size-full rounded-full object-cover outline-2 outline-bg"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-full truncate text-center text-[11px] font-medium",
				children: r.name.split(" ")[0]
			})]
		}, r.id))
	}), open !== null && stories[open] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryViewer, {
		index: open,
		onClose: () => setOpen(null),
		onNext: () => setOpen((i) => i === null ? i : i + 1 >= stories.length ? null : i + 1)
	}) : null] });
}
function StoryViewer({ index, onClose, onNext }) {
	const stories = STORY_IDS.map((id) => RESTAURANTS.find((r) => r.id === id)).filter((r) => Boolean(r));
	const r = stories[index];
	(0, import_react.useEffect)(() => {
		const t = window.setTimeout(onNext, 4200);
		return () => window.clearTimeout(t);
	}, [index, onNext]);
	if (!r) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[70] mx-auto flex max-w-phone flex-col bg-ink text-ink-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1 px-3 pt-[max(0.8rem,env(safe-area-inset-top))]",
				children: stories.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-1 flex-1 overflow-hidden rounded-full bg-ink-fg/20",
					children: [i < index ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-ink-fg" }) : null, i === index ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "story-fill h-full bg-ink-fg" }) : null]
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: r.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "grid size-10 place-items-center",
					"aria-label": "Fechar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: r.image,
						alt: "",
						className: "absolute inset-0 size-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 space-y-4 p-5 pb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-2xl font-bold leading-tight",
							children: r.story
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/restaurants/$id",
							params: { id: r.id },
							onClick: onClose,
							className: "inline-flex h-12 items-center rounded-full bg-primary px-5 font-display text-sm font-semibold text-primary-fg shadow-red",
							children: "Pedir agora"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute inset-y-0 left-0 w-1/3",
						"aria-label": "Anterior",
						onClick: onClose
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "absolute inset-y-0 right-0 w-1/3",
						"aria-label": "Próxima",
						onClick: onNext
					})
				]
			})
		]
	});
}
function Home() {
	const addressId = usePediu((s) => s.addressId);
	const name = usePediu((s) => s.name);
	const address = getAddress(addressId);
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const greet = greetingForHour(hour);
	const collection = collectionsForHour(hour);
	const featured = (0, import_react.useMemo)(() => collection.ids.map((id) => RESTAURANTS.find((r) => r.id === id)).filter((r) => Boolean(r)), [collection.ids]);
	const flash = flashRestaurants();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const list = RESTAURANTS.filter((r) => {
		if (r.id === "mercado-pediu") return false;
		if (filter === "flash") return r.flash;
		if (filter === "free") return r.deliveryFee === 0;
		if (filter === "top") return r.rating >= 4.7;
		return true;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, {
		peek: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "px-4 pt-[max(0.9rem,env(safe-area-inset-top))]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex items-center gap-1.5 text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium",
								children: address.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-[1.65rem] font-extrabold leading-[1.1] tracking-tight",
							children: [
								greet,
								name !== "Você" ? `, ${name.split(" ")[0]}` : "",
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: hungerLine(hour)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/search",
					search: { q: void 0 },
					className: "mx-4 mt-4 flex h-12 items-center gap-3 rounded-full bg-surface px-4 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanSearch, { className: "size-5 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-subtle",
						children: "Pizza, açaí, feijoada, mercado…"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stories, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-5 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/taste",
							className: "relative overflow-hidden rounded-[24px] bg-primary p-4 text-primary-fg shadow-red",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 font-display text-base font-bold leading-tight",
									children: "O que pedir?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-primary-fg/80",
									children: "Sabor do momento"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/market",
							className: "relative overflow-hidden rounded-[24px] bg-ink p-4 text-ink-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-5 text-accent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 font-display text-base font-bold leading-tight",
									children: "Mercado Flash"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-ink-fg/70",
									children: "Até 25 min"
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar flex gap-3 overflow-x-auto px-4",
						children: CATEGORIES.map((cat) => cat.special === "market" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/market",
							className: "flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-[4.5rem] overflow-hidden rounded-[22px] shadow-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cat.image,
									alt: "",
									className: "size-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-[11px] font-semibold",
								children: cat.label
							})]
						}, cat.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/search",
							search: { q: cat.cuisine ?? "flash" },
							className: "flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-[4.5rem] overflow-hidden rounded-[22px] shadow-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: cat.image,
									alt: "",
									className: "size-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-[11px] font-semibold",
								children: cat.label
							})]
						}, cat.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-end justify-between px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-1 font-display text-xs font-bold uppercase tracking-wider text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 fill-accent text-accent" }), "Flash 99"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Chega quase agora"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							search: { q: "flash" },
							className: "text-sm font-semibold text-primary",
							children: "Ver"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar flex gap-3 overflow-x-auto px-4",
						children: flash.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-[18.5rem] shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, {
								restaurant: r,
								featured: true
							})
						}, r.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-7 px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: collection.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5 text-subtle" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: featured.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, { restaurant: r }, r.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-7 px-4 pb-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "sr-only",
							children: "Pediu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-bold",
							children: "Perto de você"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex gap-2",
							children: [
								["all", "Tudo"],
								["flash", "Flash"],
								["free", "Entrega grátis"],
								["top", "Nota 4.7+"]
							].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(id),
								className: filter === id ? "h-9 rounded-full bg-ink px-3 text-xs font-semibold text-ink-fg" : "h-9 rounded-full bg-surface px-3 text-xs font-semibold text-muted shadow-card",
								children: label
							}, id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-3",
							children: list.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RestaurantCard, { restaurant: r }, r.id))
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
