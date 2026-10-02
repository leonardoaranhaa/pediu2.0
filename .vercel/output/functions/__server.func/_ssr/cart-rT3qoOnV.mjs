import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as Minus, j as ChevronLeft, o as Trash2, s as Ticket, v as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as cartTotals, l as COUPONS, o as usePediu, v as popularDishes } from "./router-D2txYF5L.mjs";
import { n as formatBRL, r as formatFee, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-rT3qoOnV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const cart = usePediu((s) => s.cart);
	const coupon = usePediu((s) => s.coupon);
	const payment = usePediu((s) => s.payment);
	const updateQty = usePediu((s) => s.updateQty);
	const clearCart = usePediu((s) => s.clearCart);
	const setCoupon = usePediu((s) => s.setCoupon);
	const addToCart = usePediu((s) => s.addToCart);
	const totals = cartTotals(cart, coupon, payment);
	const [code, setCode] = (0, import_react.useState)(coupon ?? "");
	const restaurant = totals.restaurant;
	const suggestions = restaurant ? popularDishes().filter((d) => d.restaurantId === restaurant.id && !cart.some((c) => c.dishId === d.id)) : [];
	if (!cart.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 pb-8 pt-[max(1rem,env(safe-area-inset-top))]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "inline-flex items-center gap-1 text-sm font-semibold",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Início"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-extrabold",
					children: "Sacola vazia"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Pede um Flash 99 ou deixa o Sabor do momento escolher."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Ver restaurantes"
						})
					})
				})
			]
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		tabs: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-36 pt-[max(0.8rem,env(safe-area-inset-top))]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [
						restaurant ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/restaurants/$id",
							params: { id: restaurant.id },
							className: "grid size-11 place-items-center rounded-full bg-surface shadow-card",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "grid size-11 place-items-center rounded-full bg-surface shadow-card",
							"aria-label": "Voltar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-base font-bold",
								children: "Sacola"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: restaurant?.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearCart,
							className: "grid size-11 place-items-center rounded-full bg-surface shadow-card",
							"aria-label": "Esvaziar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2",
					children: cart.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 rounded-[22px] bg-surface p-2 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.image,
								alt: "",
								className: "size-16 rounded-[16px] object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm font-semibold leading-tight",
										children: item.name
									}),
									item.extras.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 truncate text-[11px] text-muted",
										children: item.extras.map((e) => e.name).join(" · ")
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-sm font-bold tabular-nums",
										children: formatBRL(item.unitPrice * item.qty)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 self-end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-9 place-items-center",
										onClick: () => updateQty(item.key, item.qty - 1),
										"aria-label": "Diminuir",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-5 text-center font-display text-sm font-bold tabular-nums",
										children: item.qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid size-9 place-items-center",
										onClick: () => updateQty(item.key, item.qty + 1),
										"aria-label": "Aumentar",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
									})
								]
							})
						]
					}, item.key))
				}),
				suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Leva mais um?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto",
						children: suggestions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								addToCart({
									dishId: d.id,
									extras: [],
									qty: 1,
									notes: ""
								});
								toast.success("Adicionado");
							},
							className: "w-36 shrink-0 overflow-hidden rounded-[20px] bg-surface text-left shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: d.image,
								alt: "",
								className: "h-20 w-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "line-clamp-2 font-display text-xs font-semibold",
									children: d.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-bold tabular-nums",
									children: formatBRL(d.price)
								})]
							})]
						}, d.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6 rounded-[24px] bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-1.5 font-display text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4 text-primary" }), "Cupom"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: code,
								onChange: (e) => setCode(e.target.value.toUpperCase()),
								placeholder: "PEDIU10",
								className: "h-11 flex-1 rounded-[14px] bg-bg px-3 text-sm font-semibold uppercase outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ink",
								onClick: () => {
									const found = COUPONS.find((c) => c.code === code.trim().toUpperCase());
									if (!found) {
										toast.error("Cupom inválido");
										return;
									}
									setCoupon(found.code);
									toast.success(found.label);
								},
								children: "Aplicar"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: COUPONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCode(c.code);
									setCoupon(c.code);
								},
								className: coupon === c.code ? "rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-fg" : "rounded-full bg-bg px-2.5 py-1 text-[11px] font-semibold text-muted",
								children: c.code
							}, c.code))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-5 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Subtotal"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatBRL(totals.subtotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: "Entrega"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: totals.deliveryFee === 0 ? "font-semibold text-success" : "tabular-nums",
								children: formatFee(totals.deliveryFee)
							})]
						}),
						totals.discount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: totals.couponLabel }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "tabular-nums",
								children: ["− ", formatBRL(totals.discount)]
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-display text-base font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: formatBRL(totals.total)
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed bottom-0 left-1/2 z-40 w-full max-w-phone -translate-x-1/2 bg-gradient-to-t from-bg via-bg to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "w-full rounded-full",
				size: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/checkout",
					children: ["Continuar · ", formatBRL(totals.total)]
				})
			})
		})]
	});
}
//#endregion
export { CartPage as component };
