import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as House, M as Check, N as Bike, c as Store, j as ChevronLeft, x as MessageCircle, y as Phone } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as getAddress, o as usePediu, r as Route$1, x as cn } from "./router-D2txYF5L.mjs";
import { n as formatBRL, t as Screen } from "./shell-J0Dr6_x0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._id-D1sxjag4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CourierMap({ moving }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-[28px] bg-[#14110d]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 390 260",
				className: "block w-full",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "night",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#1c1812"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#0c0b09"
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "390",
						height: "260",
						fill: "url(#night)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						stroke: "#2a241c",
						strokeWidth: "10",
						fill: "none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 70 H390" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 140 H390" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 200 H390" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M70 0 V260" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 0 V260" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M250 0 V260" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M330 0 V260" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						stroke: "#3d3428",
						strokeWidth: "2",
						strokeDasharray: "6 10",
						fill: "none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 70 H390" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M0 140 H390" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 0 V260" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "86",
						y: "84",
						width: "52",
						height: "38",
						rx: "6",
						fill: "#1f3d2a",
						opacity: "0.9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "268",
						y: "154",
						width: "46",
						height: "32",
						rx: "6",
						fill: "#1f3d2a",
						opacity: "0.85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "210",
						cy: "48",
						r: "16",
						fill: "#ffc400",
						opacity: "0.12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "44",
						cy: "176",
						r: "10",
						fill: "#ffc400",
						opacity: "0.16"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 36 210 C 90 180, 70 120, 130 110 S 210 70, 250 96 S 310 150, 348 86",
						fill: "none",
						stroke: "#ffc400",
						strokeWidth: "3",
						strokeDasharray: "6 8",
						opacity: "0.85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 36 210 C 90 180, 70 120, 130 110 S 210 70, 250 96 S 310 150, 348 86",
						fill: "none",
						stroke: "#e20d2a",
						strokeWidth: "3",
						strokeDasharray: "220",
						strokeDashoffset: "220",
						style: { animation: moving ? "dash-draw 7.5s var(--ease-out-soft) infinite alternate" : void 0 }
					}),
					moving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "courier-ride",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "13",
							fill: "#ffc400"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "18",
							fill: "#ffc400",
							opacity: "0.2"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "36",
						cy: "210",
						r: "10",
						fill: "#ffc400"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-ink-fg backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-3.5 text-primary" }), "Loja"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold text-ink-fg backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5 text-accent" }), "Você"]
			}),
			moving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-6 items-center gap-1 rounded-full bg-accent px-2.5 py-1 font-display text-[11px] font-bold text-accent-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { className: "size-3.5" }), "a caminho"]
			}) : null
		]
	});
}
var STEPS = [
	{
		id: "received",
		label: "Recebido"
	},
	{
		id: "preparing",
		label: "Preparando"
	},
	{
		id: "on_the_way",
		label: "Saiu"
	},
	{
		id: "arriving",
		label: "Chegando"
	},
	{
		id: "delivered",
		label: "Entregue"
	}
];
function statusFromElapsed(ms) {
	if (ms > 36e3) return "delivered";
	if (ms > 28e3) return "arriving";
	if (ms > 12e3) return "on_the_way";
	if (ms > 4e3) return "preparing";
	return "received";
}
function OrderTracking() {
	const { id } = Route$1.useParams();
	const order = usePediu((s) => s.orders.find((o) => o.id === id));
	const [, tick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const t = window.setInterval(() => tick((n) => n + 1), 1e3);
		return () => window.clearInterval(t);
	}, []);
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-bold",
			children: "Pedido não encontrado"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/orders",
			className: "mt-3 inline-block text-sm font-semibold text-primary",
			children: "Ver pedidos"
		})]
	}) });
	const elapsed = Date.now() - order.createdAt;
	const status = statusFromElapsed(elapsed);
	const moving = status === "on_the_way" || status === "arriving";
	const stepIndex = STEPS.findIndex((s) => s.id === status);
	const address = getAddress(order.addressId);
	const remain = Math.max(0, Math.ceil((order.etaMins * 6e4 - elapsed) / 6e4));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		tabs: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-ink pb-4 text-ink-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 px-4 pt-[max(0.8rem,env(safe-area-inset-top))]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						className: "grid size-11 place-items-center rounded-full bg-ink-fg/10",
						"aria-label": "Voltar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold",
						children: order.flash ? "Flash 99" : "Entrega Pediu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-ink-fg/60 tabular-nums",
						children: order.id
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl font-extrabold leading-none tabular-nums",
						children: status === "delivered" ? "Chegou." : `${remain} min`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-ink-fg/70",
						children: status === "delivered" ? "Bom apetite." : moving ? `${order.courier.name} · ${order.courier.vehicle}` : "A cozinha pegou o seu pedido."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourierMap, { moving })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "-mt-4 rounded-t-[28px] bg-bg px-4 pb-10 pt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex justify-between",
					children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-1 flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("grid size-7 place-items-center rounded-full text-[10px] font-bold", i <= stepIndex ? "bg-primary text-primary-fg" : "bg-surface text-subtle shadow-card"),
							children: i < stepIndex ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px] font-semibold", i <= stepIndex ? "text-fg" : "text-subtle"),
							children: s.label
						})]
					}, s.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-[22px] bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: order.restaurantName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								address.street,
								" · ",
								address.neighborhood
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1.5 text-sm",
							children: order.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 truncate",
									children: [
										item.qty,
										"× ",
										item.name
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: formatBRL(item.unitPrice * item.qty)
								})]
							}, item.key))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex justify-between font-display text-sm font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums",
								children: formatBRL(order.total)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toast.message("Ligando para o entregador…"),
						className: "flex h-12 items-center justify-center gap-2 rounded-[16px] bg-surface text-sm font-semibold shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Ligar"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toast.message("Chat com o entregador em breve."),
						className: "flex h-12 items-center justify-center gap-2 rounded-[16px] bg-surface text-sm font-semibold shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), "Chat"]
					})]
				})
			]
		})]
	});
}
//#endregion
export { OrderTracking as component };
