import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as Copy, M as Check, P as Banknote, S as MapPin, T as CreditCard, _ as QrCode, j as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as cartTotals, o as usePediu, s as ADDRESSES, x as cn } from "./router-D2txYF5L.mjs";
import { n as formatBRL, r as formatFee, t as Screen } from "./shell-J0Dr6_x0.mjs";
import { t as Button } from "./button-0alL_lQG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-B7X9hghE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PIX_CODE = "00020126PEDIU.FLASH.99.SP6304A3F2";
function CheckoutPage() {
	const navigate = useNavigate();
	const cart = usePediu((s) => s.cart);
	const coupon = usePediu((s) => s.coupon);
	const payment = usePediu((s) => s.payment);
	const setPayment = usePediu((s) => s.setPayment);
	const addressId = usePediu((s) => s.addressId);
	const setAddress = usePediu((s) => s.setAddress);
	const cpfOnInvoice = usePediu((s) => s.cpfOnInvoice);
	const toggleCpf = usePediu((s) => s.toggleCpf);
	const placeOrder = usePediu((s) => s.placeOrder);
	const totals = cartTotals(cart, coupon, payment);
	const [placing, setPlacing] = (0, import_react.useState)(false);
	if (!cart.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Screen, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-bold",
			children: "Sacola vazia"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-3 inline-block text-sm font-semibold text-primary",
			children: "Pedir agora"
		})]
	}) });
	function pay() {
		setPlacing(true);
		window.setTimeout(() => {
			const order = placeOrder();
			setPlacing(false);
			if (!order) return;
			toast.success("Pedido no fogo");
			navigate({
				to: "/order/$id",
				params: { id: order.id }
			});
		}, 700);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		tabs: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 pb-36 pt-[max(0.8rem,env(safe-area-inset-top))]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						className: "grid size-11 place-items-center rounded-full bg-surface shadow-card",
						"aria-label": "Voltar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-bold",
						children: "Fechar pedido"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Entregar em"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2",
						children: ADDRESSES.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setAddress(a.id),
							className: cn("flex items-start gap-3 rounded-[20px] px-3 py-3 text-left shadow-card transition-[background-color] duration-150", addressId === a.id ? "bg-ink text-ink-fg" : "bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-display text-sm font-semibold",
								children: a.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: cn("text-xs", addressId === a.id ? "text-ink-fg/70" : "text-muted"),
								children: [
									a.street,
									" · ",
									a.neighborhood,
									a.complement ? ` · ${a.complement}` : ""
								]
							})] })]
						}, a.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-semibold",
						children: "Pagar com"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayOption, {
								active: payment === "pix",
								onClick: () => setPayment("pix"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-5" }),
								title: "Pix",
								subtitle: "Aprovação na hora · cupom PIX5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayOption, {
								active: payment === "card",
								onClick: () => setPayment("card"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-5" }),
								title: "Cartão •••• 4412",
								subtitle: "Crédito em até 3x"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayOption, {
								active: payment === "cash",
								onClick: () => setPayment("cash"),
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-5" }),
								title: "Dinheiro",
								subtitle: "Pagar na entrega"
							})
						]
					})]
				}),
				payment === "pix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-[22px] bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted",
							children: "Copia e cola"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 break-all font-display text-xs",
							children: PIX_CODE
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "surface",
							size: "sm",
							className: "mt-3",
							onClick: () => {
								navigator.clipboard?.writeText(PIX_CODE);
								toast.success("Pix copiado");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copiar código"]
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: toggleCpf,
					className: "mt-5 flex w-full items-center justify-between rounded-[18px] bg-surface px-3 py-3 text-sm shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CPF na nota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-6 place-items-center rounded-full", cpfOnInvoice ? "bg-success text-success-fg" : "bg-border"),
						children: cpfOnInvoice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : null
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [
								totals.itemCount,
								" itens · ",
								totals.restaurant?.name
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums text-fg",
								children: formatBRL(totals.subtotal)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Entrega" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: totals.deliveryFee === 0 ? "font-semibold text-success" : "tabular-nums text-fg",
								children: formatFee(totals.deliveryFee)
							})]
						}),
						totals.discount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "Cupom" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "tabular-nums",
								children: ["− ", formatBRL(totals.discount)]
							})]
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed bottom-0 left-1/2 z-40 w-full max-w-phone -translate-x-1/2 bg-gradient-to-t from-bg via-bg to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full rounded-full",
				size: "lg",
				onClick: pay,
				disabled: placing,
				children: placing ? "Confirmando…" : `Pedir · ${formatBRL(totals.total)}`
			})
		})]
	});
}
function PayOption({ active, onClick, icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("flex items-center gap-3 rounded-[20px] px-3 py-3 text-left shadow-card", active ? "bg-accent text-accent-fg" : "bg-surface"),
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block font-display text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-xs", active ? "text-accent-fg/80" : "text-muted"),
			children: subtitle
		})] })]
	});
}
//#endregion
export { CheckoutPage as component };
