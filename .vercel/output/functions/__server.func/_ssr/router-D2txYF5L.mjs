import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as TriangleAlert } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D2txYF5L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "10",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.2 8.4h7.1c3.3 0 5.4 1.9 5.4 4.8 0 3.1-2.2 4.9-5.5 4.9h-3.3V23.2H10.2V8.4Zm3.7 3.1v3.4h3.1c1.5 0 2.3-.8 2.3-1.7 0-1-.8-1.7-2.3-1.7h-3.1Z",
				fill: "var(--color-primary-fg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "24.2",
				cy: "7.6",
				r: "3.1",
				fill: "var(--color-accent)"
			})
		]
	});
}
function Wordmark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("font-display text-[1.35rem] font-extrabold tracking-tight", className),
		children: "Pediu"
	});
}
var DRINK = {
	id: "refri",
	name: "Refrigerante lata",
	price: 7.9
};
var CUTLERY = {
	id: "talher",
	name: "Talher",
	price: 0
};
var SAUCE = {
	id: "molho",
	name: "Molho extra",
	price: 3.5
};
var DESSERT = {
	id: "doce",
	name: "Doce da casa",
	price: 9.9
};
function dish(restaurantId, slug, name, description, price, image, category, popular = false, extras = [DRINK]) {
	return {
		id: `${restaurantId}-${slug}`,
		restaurantId,
		name,
		description,
		price,
		image,
		category,
		popular,
		extras
	};
}
var ADDRESSES = [
	{
		id: "augusta",
		label: "Casa",
		street: "Rua Augusta, 1508",
		neighborhood: "Consolação",
		city: "São Paulo",
		complement: "Apto 72"
	},
	{
		id: "paulista",
		label: "Trabalho",
		street: "Av. Paulista, 1578",
		neighborhood: "Bela Vista",
		city: "São Paulo",
		complement: "Conj. 1204"
	},
	{
		id: "harmonia",
		label: "Galera",
		street: "Rua Harmonia, 88",
		neighborhood: "Vila Madalena",
		city: "São Paulo"
	}
];
var COUPONS = [
	{
		code: "PEDIU10",
		label: "10% na sacola",
		description: "Válido acima de R$ 40",
		type: "percent",
		value: 10,
		min: 40
	},
	{
		code: "FLASH99",
		label: "Entrega grátis",
		description: "Em qualquer restaurante Flash",
		type: "delivery",
		value: 1,
		min: 0
	},
	{
		code: "FOME20",
		label: "R$ 20 off",
		description: "Pedidos a partir de R$ 59",
		type: "fixed",
		value: 20,
		min: 59
	},
	{
		code: "PIX5",
		label: "R$ 5 no Pix",
		description: "Só no pagamento via Pix",
		type: "fixed",
		value: 5,
		min: 25
	}
];
var CATEGORIES = [
	{
		id: "flash",
		label: "Flash 99",
		image: "/food/burger.jpg",
		special: "flash"
	},
	{
		id: "pizza",
		label: "Pizza",
		image: "/food/pizza.jpg",
		cuisine: "Pizza"
	},
	{
		id: "burger",
		label: "Burger",
		image: "/food/burger.jpg",
		cuisine: "Lanches"
	},
	{
		id: "japa",
		label: "Japonesa",
		image: "/food/sushi.jpg",
		cuisine: "Japonesa"
	},
	{
		id: "br",
		label: "Brasileira",
		image: "/food/feijoada.jpg",
		cuisine: "Brasileira"
	},
	{
		id: "churras",
		label: "Churrasco",
		image: "/food/churrasco.jpg",
		cuisine: "Churrasco"
	},
	{
		id: "saude",
		label: "Saudável",
		image: "/food/acai.jpg",
		cuisine: "Saudável"
	},
	{
		id: "massas",
		label: "Massas",
		image: "/food/pasta.jpg",
		cuisine: "Italiana"
	},
	{
		id: "thai",
		label: "Thai",
		image: "/food/thai.jpg",
		cuisine: "Tailandesa"
	},
	{
		id: "poke",
		label: "Poke",
		image: "/food/poke.jpg",
		cuisine: "Poke"
	},
	{
		id: "cafe",
		label: "Café",
		image: "/food/cafe.jpg",
		cuisine: "Padaria"
	},
	{
		id: "market",
		label: "Mercado",
		image: "/food/feijoada.jpg",
		special: "market"
	}
];
var RESTAURANTS = [
	{
		id: "brasa-da-vila",
		name: "Brasa da Vila",
		cuisine: "Churrasco",
		image: "/food/churrasco.jpg",
		rating: 4.8,
		reviewCount: 3120,
		deliveryMin: 28,
		deliveryMax: 42,
		deliveryFee: 7.99,
		distanceKm: 2.4,
		flash: false,
		tags: [
			"picanha",
			"família",
			"fim de semana"
		],
		about: "Fogo de chão em cubas de ferro. A picanha sai com a capa crocante e o chimichurri da casa.",
		neighborhood: "Vila Madalena",
		story: "Picanha no ponto com farofa crocante. Hoje a costela está no forno há 8 horas."
	},
	{
		id: "napoli-di-roma",
		name: "Napoli di Roma",
		cuisine: "Pizza",
		image: "/food/pizza.jpg",
		rating: 4.7,
		reviewCount: 5488,
		deliveryMin: 25,
		deliveryMax: 40,
		deliveryFee: 5.9,
		distanceKm: 1.8,
		flash: false,
		tags: ["forno a lenha", "massa 48h"],
		about: "Massa fermentada 48h, forno 450 °C, mozzarella de búfala. A borda é o evento.",
		neighborhood: "Pinheiros",
		story: "A margherita de búfala acaba sempre. Forno aceso até meia-noite."
	},
	{
		id: "nikkei-88",
		name: "Nikkei 88",
		cuisine: "Japonesa",
		image: "/food/sushi.jpg",
		rating: 4.9,
		reviewCount: 1904,
		deliveryMin: 32,
		deliveryMax: 48,
		deliveryFee: 8.9,
		distanceKm: 3.1,
		flash: false,
		tags: ["omakase", "salmão"],
		about: "Cortes limpos, arroz temperado no ponto, combinados que não parecem delivery.",
		neighborhood: "Itaim Bibi",
		story: "O salmão da manhã chegou agora. Combinado 88 por tempo limitado."
	},
	{
		id: "smash-club",
		name: "Smash Club",
		cuisine: "Lanches",
		image: "/food/burger.jpg",
		rating: 4.6,
		reviewCount: 8210,
		deliveryMin: 12,
		deliveryMax: 18,
		deliveryFee: 0,
		distanceKm: .7,
		flash: true,
		tags: ["smash", "flash"],
		about: "Blend 80/20, smash na chapa de ferro, molho secreto. Sai em minutos, chega quente.",
		neighborhood: "Consolação",
		story: "Double smash + batata crocante. Flash 99: na sua mão em 15 minutos."
	},
	{
		id: "acai-do-parque",
		name: "Açaí do Parque",
		cuisine: "Saudável",
		image: "/food/acai.jpg",
		rating: 4.8,
		reviewCount: 2640,
		deliveryMin: 10,
		deliveryMax: 16,
		deliveryFee: 0,
		distanceKm: .5,
		flash: true,
		tags: ["açaí", "flash"],
		about: "Açaí batido na hora, granola da casa, zero xarope. Tigelas que pesam na mão.",
		neighborhood: "Jardins",
		story: "Tigela 500 ml com granola crocante. Flash: sai gelado, chega gelado."
	},
	{
		id: "padaria-lume",
		name: "Padaria Lume",
		cuisine: "Padaria",
		image: "/food/cafe.jpg",
		rating: 4.7,
		reviewCount: 1560,
		deliveryMin: 14,
		deliveryMax: 22,
		deliveryFee: 3.9,
		distanceKm: 1.1,
		flash: true,
		tags: ["café", "pão de queijo"],
		about: "Pão de queijo de minas, croissant de manteiga, espresso curto. Manhã inteira no ponto.",
		neighborhood: "Bela Vista",
		story: "O croissant saiu do forno agora. Combo café + pão de queijo até as 11h."
	},
	{
		id: "thai-siam",
		name: "Thai Siam",
		cuisine: "Tailandesa",
		image: "/food/thai.jpg",
		rating: 4.6,
		reviewCount: 980,
		deliveryMin: 30,
		deliveryMax: 45,
		deliveryFee: 6.9,
		distanceKm: 2.8,
		flash: false,
		tags: ["picante", "pad thai"],
		about: "Pad thai na wok quente, curry vermelho, lima e amendoim. Combina o fogo com o doce.",
		neighborhood: "Brooklin",
		story: "Pad thai de camarão no wok. Peça o nível de pimenta — a casa não recua."
	},
	{
		id: "nonna-rosa",
		name: "Nonna Rosa",
		cuisine: "Italiana",
		image: "/food/pasta.jpg",
		rating: 4.8,
		reviewCount: 2211,
		deliveryMin: 26,
		deliveryMax: 38,
		deliveryFee: 6.5,
		distanceKm: 2,
		flash: false,
		tags: ["massa fresca", "nonna"],
		about: "Tagliatelle fresco, carbonara sem creme, ragu que cozinha desde as 7h.",
		neighborhood: "Bela Vista",
		story: "Carbonara da nonna — pecorino, pimenta, gema. Sem atalhos."
	},
	{
		id: "poke-wave",
		name: "Poke Wave",
		cuisine: "Poke",
		image: "/food/poke.jpg",
		rating: 4.5,
		reviewCount: 1744,
		deliveryMin: 15,
		deliveryMax: 22,
		deliveryFee: 0,
		distanceKm: 1.3,
		flash: true,
		tags: ["poke", "almoço"],
		about: "Arroz de sushi, atum fresco, manga, crispy. Monte o bowl ou pegue o da casa.",
		neighborhood: "Vila Olímpia",
		story: "Bowl de atum com manga. Flash no almoço — 18 minutos ou a taxa some."
	},
	{
		id: "casa-do-feijao",
		name: "Casa do Feijão",
		cuisine: "Brasileira",
		image: "/food/feijoada.jpg",
		rating: 4.9,
		reviewCount: 4302,
		deliveryMin: 35,
		deliveryMax: 50,
		deliveryFee: 4.9,
		distanceKm: 3.4,
		flash: false,
		tags: ["feijoada", "almoço"],
		about: "Feijoada completa de quarta a sábado, torresmo, couve fina, laranja. Comida de vó.",
		neighborhood: "Liberdade",
		story: "Feijoada completa com laranja e couve. Quarta e sábado a casa inteira pede."
	},
	{
		id: "ramen-do-tigre",
		name: "Ramen do Tigre",
		cuisine: "Japonesa",
		image: "/food/sushi.jpg",
		rating: 4.7,
		reviewCount: 1333,
		deliveryMin: 24,
		deliveryMax: 36,
		deliveryFee: 6.9,
		distanceKm: 2.2,
		flash: false,
		tags: ["ramen", "caldo 18h"],
		about: "Tonkotsu de 18 horas, chashu lacrado, ovo ajitsuke. O caldo chega selado.",
		neighborhood: "Pinheiros",
		story: "Tonkotsu selado — o vapor fica no pote até abrir. Peça o extra chashu."
	},
	{
		id: "cacau-canela",
		name: "Cacau & Canela",
		cuisine: "Doces",
		image: "/food/cafe.jpg",
		rating: 4.8,
		reviewCount: 2888,
		deliveryMin: 20,
		deliveryMax: 30,
		deliveryFee: 4.5,
		distanceKm: 1.6,
		flash: false,
		tags: ["brigadeiro", "bolo"],
		about: "Brigadeiro de 70%, bolo de leite ninho, sobremesa que merece um pedido só dela.",
		neighborhood: "Jardins",
		story: "Caixa de brigadeiros da casa. O de pistache acaba antes das 20h."
	},
	{
		id: "arabesco",
		name: "Arabesco",
		cuisine: "Árabe",
		image: "/food/thai.jpg",
		rating: 4.6,
		reviewCount: 1090,
		deliveryMin: 22,
		deliveryMax: 34,
		deliveryFee: 5.5,
		distanceKm: 1.9,
		flash: false,
		tags: ["esfiha", "wrap"],
		about: "Esfiha aberta no forno, wrap de falafel, homus com azeite sírio.",
		neighborhood: "Paraíso",
		story: "Combo wrap + homus. O pão sai do saj na hora do pedido."
	},
	{
		id: "coxinha-da-esquina",
		name: "Coxinha da Esquina",
		cuisine: "Salgados",
		image: "/food/burger.jpg",
		rating: 4.5,
		reviewCount: 6401,
		deliveryMin: 12,
		deliveryMax: 18,
		deliveryFee: 0,
		distanceKm: .4,
		flash: true,
		tags: ["coxinha", "flash"],
		about: "Coxinha de frango com catupiry, massa fina, óleo trocado. Bar da esquina, padrão de padaria fina.",
		neighborhood: "Consolação",
		story: "Kit 6 coxinhas crocantes. Flash 99 — chega ainda quente."
	},
	{
		id: "mercado-pediu",
		name: "Mercado Pediu",
		cuisine: "Mercado",
		image: "/food/feijoada.jpg",
		rating: 4.7,
		reviewCount: 920,
		deliveryMin: 15,
		deliveryMax: 25,
		deliveryFee: 3.9,
		distanceKm: .9,
		flash: true,
		tags: ["mercado", "relâmpago"],
		about: "Hortifruti, mercearia e laticínios em até 25 minutos. O mercado que corre como moto da 99.",
		neighborhood: "Consolação",
		story: "Banana, leite e pão na sua porta. Mercado relâmpago o dia inteiro."
	}
];
var DISHES = [
	dish("brasa-da-vila", "picanha", "Picanha fatiada 400g", "Capa crocante, ponto mal, chimichurri e farofa de ovos.", 89.9, "/food/churrasco.jpg", "Cortes", true, [
		DRINK,
		SAUCE,
		{
			id: "farofa",
			name: "Farofa extra",
			price: 8.9
		}
	]),
	dish("brasa-da-vila", "costela", "Costela 8 horas", "Desfia no garfo, vinagrete e mandioca frita.", 79.9, "/food/churrasco.jpg", "Cortes", false, [DRINK]),
	dish("brasa-da-vila", "maminha", "Maminha na faca", "Grelha alta, sal grosso, molho da casa.", 69.9, "/food/churrasco.jpg", "Cortes"),
	dish("brasa-da-vila", "combo", "Combo brasa pra 2", "Picanha, linguiça, arroz, vinagrete e farofa.", 149, "/food/churrasco.jpg", "Combos", true, [DRINK, DESSERT]),
	dish("brasa-da-vila", "alcatra", "Alcatra acebolada", "Cebola queimada na chapa, arroz soltinho.", 62.9, "/food/churrasco.jpg", "Cortes"),
	dish("napoli-di-roma", "margherita", "Margherita di bufala", "San Marzano, búfala, manjericão, azeite siciliano.", 64.9, "/food/pizza.jpg", "Pizzas", true, [DRINK, {
		id: "borda",
		name: "Borda de catupiry",
		price: 12
	}]),
	dish("napoli-di-roma", "diavola", "Diavola", "Salame picante, mozzarella, mel de pimenta.", 69.9, "/food/pizza.jpg", "Pizzas", true, [DRINK, {
		id: "borda",
		name: "Borda de catupiry",
		price: 12
	}]),
	dish("napoli-di-roma", "funghi", "Funghi porcini", "Cogumelos, tomilho, parmesão 24 meses.", 72, "/food/pizza.jpg", "Pizzas"),
	dish("napoli-di-roma", "calabresa", "Calabresa da casa", "Calabresa artesanal, cebola roxa, azeitona.", 59.9, "/food/pizza.jpg", "Pizzas"),
	dish("napoli-di-roma", "cannoli", "Cannoli de pistache", "Dois cannoli crocantes, creme de pistache.", 24.9, "/food/cafe.jpg", "Doces", false, []),
	dish("nikkei-88", "combo88", "Combinado 88", "24 peças: salmão, atum, peixe branco e hot philadelphia.", 98, "/food/sushi.jpg", "Combinados", true, [DRINK, {
		id: "gyoza",
		name: "Gyoza (4un)",
		price: 18
	}]),
	dish("nikkei-88", "sashimi", "Sashimi de salmão 12un", "Corte alto, wasabi fresco, gengibre.", 72, "/food/sushi.jpg", "Sashimi", true),
	dish("nikkei-88", "hot", "Hot roll especial", "Empanado, cream cheese, tarê e crispy.", 42.9, "/food/sushi.jpg", "Hot"),
	dish("nikkei-88", "temaki", "Temaki de salmão", "Folha crocante, arroz morno, salmão fresco.", 28.9, "/food/sushi.jpg", "Temaki"),
	dish("nikkei-88", "ceviche", "Ceviche nikkei", "Peixe branco, leite de tigre, pimenta, milho.", 46, "/food/poke.jpg", "Entradas"),
	dish("smash-club", "double", "Double smash", "Dois smash, cheddar, picles, molho secreto, brioche.", 38.9, "/food/burger.jpg", "Burgers", true, [
		DRINK,
		{
			id: "bacon",
			name: "Bacon extra",
			price: 6
		},
		{
			id: "batata",
			name: "Batata smash",
			price: 14.9
		}
	]),
	dish("smash-club", "triple", "Triple smash", "Três carnes, queijo americano, onion crunch.", 46.9, "/food/burger.jpg", "Burgers", true, [DRINK, {
		id: "batata",
		name: "Batata smash",
		price: 14.9
	}]),
	dish("smash-club", "chicken", "Chicken smash", "Frango empanado, picles agridoce, maionese de alho.", 34.9, "/food/burger.jpg", "Burgers"),
	dish("smash-club", "fries", "Batata smash", "Frita duas vezes, parmesão e páprica.", 16.9, "/food/burger.jpg", "Acompanhamentos", false, [SAUCE]),
	dish("smash-club", "shake", "Shake de doce de leite", "Sorvete, doce de leite, flor de sal.", 18.9, "/food/cafe.jpg", "Sobremesas", false, []),
	dish("acai-do-parque", "tigela500", "Tigela 500ml", "Açaí, banana, morango, granola da casa, mel.", 28.9, "/food/acai.jpg", "Tigelas", true, [{
		id: "leite",
		name: "Leite ninho",
		price: 3.5
	}, {
		id: "pacoca",
		name: "Paçoca",
		price: 3
	}]),
	dish("acai-do-parque", "tigela700", "Tigela 700ml", "Açaí puro, frutas da estação, coco, mel.", 36.9, "/food/acai.jpg", "Tigelas", true),
	dish("acai-do-parque", "bowl", "Bowl proteína", "Açaí, pasta de amendoim, whey, banana, cacau.", 32.9, "/food/acai.jpg", "Tigelas"),
	dish("acai-do-parque", "smoothie", "Smoothie de morango", "Morango, banana, leite vegetal.", 18, "/food/acai.jpg", "Bebidas", false, []),
	dish("acai-do-parque", "salad", "Salada citrus", "Folhas, feta, semente, molho de laranja.", 29.9, "/food/poke.jpg", "Saladas"),
	dish("padaria-lume", "combo-manha", "Combo manhã", "Pão de queijo, croissant e espresso.", 24.9, "/food/cafe.jpg", "Combos", true, [{
		id: "suco",
		name: "Suco de laranja",
		price: 9.9
	}]),
	dish("padaria-lume", "pao-queijo", "Pão de queijo (6un)", "Mineiro, elástico, queijo meia-cura.", 16.9, "/food/cafe.jpg", "Salgados", true),
	dish("padaria-lume", "croissant", "Croissant de manteiga", "Folhado 36 camadas, ainda quente.", 14.9, "/food/cafe.jpg", "Folhados"),
	dish("padaria-lume", "espresso", "Espresso curto", "Blend da casa, extração 26s.", 7.5, "/food/cafe.jpg", "Cafés", false, []),
	dish("padaria-lume", "misto", "Misto quente de padaria", "Pão de forma, queijo, presunto, manteiga na chapa.", 18.9, "/food/cafe.jpg", "Lanches"),
	dish("thai-siam", "padthai", "Pad thai de camarão", "Wok quente, tamarindo, amendoim, lima.", 54.9, "/food/thai.jpg", "Wok", true, [DRINK, {
		id: "pimenta",
		name: "Pimenta extra",
		price: 0
	}]),
	dish("thai-siam", "curry", "Curry vermelho", "Leite de coco, basilicão thai, arroz jasmim.", 49.9, "/food/thai.jpg", "Currys", true),
	dish("thai-siam", "somtam", "Som tam", "Salada de mamão verde, pimenta, amendoim.", 32, "/food/thai.jpg", "Entradas"),
	dish("thai-siam", "satay", "Satay de frango", "Espetinhos, molho de amendoim.", 36.9, "/food/thai.jpg", "Entradas"),
	dish("thai-siam", "mango", "Mango sticky rice", "Manga madura, arroz doce, leite de coco.", 22.9, "/food/acai.jpg", "Doces", false, []),
	dish("nonna-rosa", "carbonara", "Tagliatelle carbonara", "Gema, guanciale, pecorino, pimenta do reino.", 58.9, "/food/pasta.jpg", "Massas", true, [DRINK, CUTLERY]),
	dish("nonna-rosa", "ragu", "Pappardelle ao ragu", "Ragu de costela 7 horas, massa fresca.", 62.9, "/food/pasta.jpg", "Massas", true),
	dish("nonna-rosa", "pomodoro", "Spaghetti pomodoro", "Tomate pelado, manjericão, azeite.", 44.9, "/food/pasta.jpg", "Massas"),
	dish("nonna-rosa", "gnocchi", "Gnocchi de batata", "Manteiga de sálvia, parmesão.", 52, "/food/pasta.jpg", "Massas"),
	dish("nonna-rosa", "tiramisu", "Tiramisù da nonna", "Café, mascarpone, cacau.", 24.9, "/food/cafe.jpg", "Doces", false, []),
	dish("poke-wave", "atum", "Poke de atum", "Atum, manga, avocado, crispy, gergelim.", 42.9, "/food/poke.jpg", "Bowls", true, [{
		id: "spicy",
		name: "Molho spicy extra",
		price: 2.5
	}]),
	dish("poke-wave", "salmao", "Poke de salmão", "Salmão, edamame, pepino, tarê.", 44.9, "/food/poke.jpg", "Bowls", true),
	dish("poke-wave", "veg", "Poke veg", "Tofu grelhado, manga, kale, gergelim.", 36.9, "/food/poke.jpg", "Bowls"),
	dish("poke-wave", "monte", "Monte o seu", "Base + 1 proteína + 4 toppings da casa.", 46, "/food/poke.jpg", "Bowls"),
	dish("poke-wave", "cha", "Chá gelado de lychee", "Lychee, hortelã, gelo.", 12.9, "/food/acai.jpg", "Bebidas", false, []),
	dish("casa-do-feijao", "feijoada", "Feijoada completa", "Feijão, carnes, arroz, couve, laranja, farofa, torresmo.", 54.9, "/food/feijoada.jpg", "Pratos", true, [
		DRINK,
		DESSERT,
		CUTLERY
	]),
	dish("casa-do-feijao", "pf", "PF do dia", "Arroz, feijão, bife, ovo, salada, farofa.", 32.9, "/food/feijoada.jpg", "Pratos", true),
	dish("casa-do-feijao", "strogonoff", "Strogonoff de frango", "Arroz, batata palha, molho cremoso.", 36.9, "/food/feijoada.jpg", "Pratos"),
	dish("casa-do-feijao", "virado", "Virado à paulista", "Tutu, bisteca, ovo, banana, couve.", 38.9, "/food/feijoada.jpg", "Pratos"),
	dish("casa-do-feijao", "pudim", "Pudim de leite", "Fatia alta, calda de caramelo.", 14.9, "/food/cafe.jpg", "Doces", false, []),
	dish("ramen-do-tigre", "tonkotsu", "Tonkotsu clássico", "Caldo 18h, chashu, ovo, nori, cebolinha.", 52.9, "/food/sushi.jpg", "Ramen", true, [{
		id: "chashu",
		name: "Chashu extra",
		price: 12
	}, {
		id: "ovo",
		name: "Ovo extra",
		price: 6
	}]),
	dish("ramen-do-tigre", "spicy", "Spicy miso", "Miso picante, carne moída, milho, manteiga.", 54.9, "/food/sushi.jpg", "Ramen", true),
	dish("ramen-do-tigre", "shoyu", "Shoyu ramen", "Caldo claro, menma, alga, ovo.", 48.9, "/food/sushi.jpg", "Ramen"),
	dish("ramen-do-tigre", "gyoza", "Gyoza (6un)", "Porco e alho-poró, molho ponzu.", 28.9, "/food/sushi.jpg", "Entradas"),
	dish("ramen-do-tigre", "edamame", "Edamame com flor de sal", "Vagem quente, sal defumado.", 16.9, "/food/poke.jpg", "Entradas", false, []),
	dish("cacau-canela", "brigadeiro", "Caixa 8 brigadeiros", "70% cacau, pistache, ninho e tradicional.", 36.9, "/food/cafe.jpg", "Doces", true, []),
	dish("cacau-canela", "ninho", "Bolo de leite ninho", "Fatia alta, creme de ninho, raspas.", 22.9, "/food/cafe.jpg", "Bolos", true),
	dish("cacau-canela", "brownie", "Brownie com sorvete", "Meio amargo, sorvete de baunilha.", 24.9, "/food/cafe.jpg", "Doces"),
	dish("cacau-canela", "pudim-choco", "Pudim de chocolate", "Creme alto, calda amarga.", 18.9, "/food/cafe.jpg", "Doces"),
	dish("cacau-canela", "cafe", "Café com petit gateau", "Petit quente, bola de creme, espresso.", 27.9, "/food/cafe.jpg", "Combos"),
	dish("arabesco", "wrap", "Wrap de falafel", "Homus, picles, tomate, tahine, pão saj.", 34.9, "/food/thai.jpg", "Wraps", true, [DRINK, SAUCE]),
	dish("arabesco", "esfiha", "Esfiha aberta (3un)", "Carne com limão, tomate, hortelã.", 29.9, "/food/thai.jpg", "Esfihas", true),
	dish("arabesco", "kibe", "Kibe frito (4un)", "Trigo, carne, hortelã, coalhada.", 26.9, "/food/burger.jpg", "Salgados"),
	dish("arabesco", "homus", "Homus com pão", "Grão-de-bico, azeite, páprica, saj.", 22.9, "/food/thai.jpg", "Entradas"),
	dish("arabesco", "baklava", "Baklava (3un)", "Nozes, pistache, calda de flor de laranjeira.", 19.9, "/food/cafe.jpg", "Doces", false, []),
	dish("coxinha-da-esquina", "kit6", "Kit 6 coxinhas", "Frango com catupiry, massa fina.", 27.9, "/food/burger.jpg", "Salgados", true, [DRINK, SAUCE]),
	dish("coxinha-da-esquina", "kit12", "Kit 12 coxinhas", "A clássica da esquina, pra galera.", 49.9, "/food/burger.jpg", "Salgados", true, [DRINK]),
	dish("coxinha-da-esquina", "bolinho", "Bolinho de bacalhau (6un)", "Crocante por fora, alho e salsa.", 32.9, "/food/burger.jpg", "Salgados"),
	dish("coxinha-da-esquina", "enroladinho", "Enroladinho de salsicha (8un)", "Massa de padaria, mostarda.", 24.9, "/food/burger.jpg", "Salgados"),
	dish("coxinha-da-esquina", "caldo", "Caldo de pinhão", "Copo 400ml, inverno o ano inteiro.", 14.9, "/food/feijoada.jpg", "Caldos", false, []),
	dish("mercado-pediu", "banana", "Banana prata 1kg", "Madura no ponto de vitamina.", 8.9, "/food/acai.jpg", "Hortifruti", true, []),
	dish("mercado-pediu", "tomate", "Tomate italiano 500g", "Para molho ou salada.", 7.5, "/food/feijoada.jpg", "Hortifruti", false, []),
	dish("mercado-pediu", "alface", "Alface americana", "Hidropônica, crocante.", 5.9, "/food/poke.jpg", "Hortifruti", false, []),
	dish("mercado-pediu", "leite", "Leite integral 1L", "Caixinha, validade longa.", 5.49, "/food/cafe.jpg", "Laticínios", true, []),
	dish("mercado-pediu", "queijo", "Queijo minas 400g", "Fresco, meia-cura leve.", 18.9, "/food/cafe.jpg", "Laticínios", false, []),
	dish("mercado-pediu", "pao", "Pão de forma", "12 fatias, fermentação longa.", 9.9, "/food/cafe.jpg", "Padaria", true, []),
	dish("mercado-pediu", "ovos", "Ovos caipira (12un)", "Gema alta, caixa fechada.", 16.9, "/food/cafe.jpg", "Mercearia", false, []),
	dish("mercado-pediu", "cafe-grao", "Café em grãos 250g", "Torra média, notes de cacau.", 28.9, "/food/cafe.jpg", "Mercearia", false, []),
	dish("mercado-pediu", "refri", "Refrigerante 2L", "Gelado no centro de distribuição.", 10.9, "/food/burger.jpg", "Bebidas", false, []),
	dish("mercado-pediu", "chocolate", "Chocolate 70% 80g", "Amargo, origin Brazil.", 12.5, "/food/cafe.jpg", "Mercearia", false, [])
];
var COURIERS = [
	{
		name: "Camila Souza",
		vehicle: "Moto Flash"
	},
	{
		name: "Rafael Lima",
		vehicle: "Moto 99"
	},
	{
		name: "Thiago Alves",
		vehicle: "Bike Flash"
	},
	{
		name: "Jéssica Rocha",
		vehicle: "Moto Flash"
	},
	{
		name: "Bruno Nunes",
		vehicle: "Moto 99"
	}
];
var TASTE_MOODS = [
	{
		id: "braba",
		title: "Fome braba",
		subtitle: "Prato fundo, sem enrolação.",
		tags: [
			"feijoada",
			"picanha",
			"strogonoff"
		],
		cuisines: [
			"Brasileira",
			"Churrasco",
			"Lanches"
		]
	},
	{
		id: "conforto",
		title: "Conforto",
		subtitle: "Massa, caldo, abraço.",
		tags: [
			"massa",
			"ramen",
			"pudim"
		],
		cuisines: [
			"Italiana",
			"Japonesa",
			"Brasileira"
		]
	},
	{
		id: "leve",
		title: "Leve",
		subtitle: "Tigela, folha, frescor.",
		tags: [
			"poke",
			"açaí",
			"salada"
		],
		cuisines: ["Saudável", "Poke"]
	},
	{
		id: "festa",
		title: "Pra galera",
		subtitle: "Pizza, kit, combo.",
		tags: [
			"pizza",
			"coxinha",
			"combo"
		],
		cuisines: [
			"Pizza",
			"Salgados",
			"Lanches"
		]
	},
	{
		id: "madruga",
		title: "Madrugada",
		subtitle: "Flash, smash, coxinha.",
		tags: [
			"smash",
			"coxinha",
			"pizza"
		],
		cuisines: [
			"Lanches",
			"Salgados",
			"Pizza"
		]
	},
	{
		id: "doce",
		title: "Só um doce",
		subtitle: "Brigadeiro resolve.",
		tags: [
			"brigadeiro",
			"bolo",
			"açaí"
		],
		cuisines: [
			"Doces",
			"Saudável",
			"Padaria"
		]
	}
];
function getRestaurant(id) {
	return RESTAURANTS.find((r) => r.id === id);
}
function getDish(id) {
	return DISHES.find((d) => d.id === id);
}
function dishesOf(restaurantId) {
	return DISHES.filter((d) => d.restaurantId === restaurantId);
}
function getAddress(id) {
	return ADDRESSES.find((a) => a.id === id) ?? ADDRESSES[0];
}
function getCoupon(code) {
	return COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
}
function popularDishes() {
	return DISHES.filter((d) => d.popular);
}
function flashRestaurants() {
	return RESTAURANTS.filter((r) => r.flash);
}
function searchAll(query) {
	const q = query.trim().toLowerCase();
	if (!q) return {
		restaurants: [],
		dishes: []
	};
	return {
		restaurants: RESTAURANTS.filter((r) => {
			return `${r.name} ${r.cuisine} ${r.neighborhood} ${r.tags.join(" ")}`.toLowerCase().includes(q);
		}),
		dishes: DISHES.filter((d) => {
			return `${d.name} ${d.description} ${d.category}`.toLowerCase().includes(q);
		})
	};
}
function collectionsForHour(hour) {
	if (hour < 11) return {
		title: "Café da manhã",
		ids: [
			"padaria-lume",
			"acai-do-parque",
			"cacau-canela"
		]
	};
	if (hour < 15) return {
		title: "Almoço na hora",
		ids: [
			"casa-do-feijao",
			"poke-wave",
			"thai-siam",
			"nonna-rosa"
		]
	};
	if (hour < 18) return {
		title: "Lanche da tarde",
		ids: [
			"acai-do-parque",
			"coxinha-da-esquina",
			"padaria-lume"
		]
	};
	if (hour < 23) return {
		title: "Jantar sem fila",
		ids: [
			"napoli-di-roma",
			"nikkei-88",
			"brasa-da-vila",
			"ramen-do-tigre"
		]
	};
	return {
		title: "Madruga Flash",
		ids: [
			"smash-club",
			"coxinha-da-esquina",
			"napoli-di-roma"
		]
	};
}
function applyCoupon(code, subtotal, deliveryFee, isFlash, payment) {
	if (!code) return {
		discount: 0,
		deliveryFee,
		label: null
	};
	const coupon = getCoupon(code);
	if (!coupon || subtotal < coupon.min) return {
		discount: 0,
		deliveryFee,
		label: null
	};
	if (coupon.code === "PIX5" && payment !== "pix") return {
		discount: 0,
		deliveryFee,
		label: null
	};
	if (coupon.type === "delivery") {
		if (coupon.code === "FLASH99" && !isFlash) return {
			discount: 0,
			deliveryFee,
			label: null
		};
		return {
			discount: 0,
			deliveryFee: 0,
			label: coupon.label
		};
	}
	if (coupon.type === "percent") return {
		discount: Math.round(subtotal * (coupon.value / 100) * 100) / 100,
		deliveryFee,
		label: coupon.label
	};
	return {
		discount: Math.min(coupon.value, subtotal),
		deliveryFee,
		label: coupon.label
	};
}
function reviewsFor(id) {
	return {
		"brasa-da-vila": [{
			name: "Marina",
			text: "Picanha no ponto. Parecia restaurante, não delivery.",
			rating: 5
		}, {
			name: "Leo",
			text: "Farofa de ovos absurda. Só atrasou 8 minutos.",
			rating: 4
		}],
		"napoli-di-roma": [{
			name: "Giulia",
			text: "A borda é o motivo de pedir. Massa leve.",
			rating: 5
		}, {
			name: "Pedro",
			text: "Chegou quente, manjericão ainda vivo.",
			rating: 5
		}],
		"smash-club": [{
			name: "Caio",
			text: "15 minutos. Carne com borda crocante de verdade.",
			rating: 5
		}, {
			name: "Bia",
			text: "Melhor smash da Augusta. Batata precisa de mais sal.",
			rating: 4
		}]
	}[id] ?? [{
		name: "Ana",
		text: "Pedido certo, embalagem boa, sabor no ponto.",
		rating: 5
	}, {
		name: "Rafa",
		text: "Virou o padrão da casa. Sempre peço de novo.",
		rating: 5
	}];
}
function itemKey(dishId, extras, notes) {
	return `${dishId}|${extras.map((e) => e.id).sort().join(",")}|${notes.trim().toLowerCase()}`;
}
function extraSum(extras) {
	return extras.reduce((s, e) => s + e.price, 0);
}
function cartTotals(cart, coupon, payment) {
	const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
	const restaurantId = cart[0]?.restaurantId;
	const restaurant = restaurantId ? getRestaurant(restaurantId) : void 0;
	const applied = applyCoupon(coupon, subtotal, restaurant?.deliveryFee ?? 0, Boolean(restaurant?.flash), payment);
	const total = Math.max(0, subtotal + applied.deliveryFee - applied.discount);
	return {
		subtotal,
		deliveryFee: applied.deliveryFee,
		discount: applied.discount,
		total,
		restaurant,
		couponLabel: applied.label,
		itemCount: cart.reduce((s, i) => s + i.qty, 0)
	};
}
function buildItem(payload) {
	const dish = getDish(payload.dishId);
	if (!dish) return null;
	const extras = payload.extras;
	return {
		key: itemKey(payload.dishId, extras, payload.notes),
		dishId: dish.id,
		restaurantId: dish.restaurantId,
		name: dish.name,
		image: dish.image,
		unitPrice: dish.price + extraSum(extras),
		extras,
		qty: payload.qty,
		notes: payload.notes.trim()
	};
}
var usePediu = create()(persist((set, get) => ({
	name: "Você",
	addressId: "augusta",
	favorites: ["smash-club", "napoli-di-roma"],
	cart: [],
	coupon: null,
	payment: "pix",
	cpfOnInvoice: false,
	orders: [],
	recentSearches: [
		"pizza",
		"açaí",
		"flash"
	],
	seenSplash: false,
	setName: (name) => set({ name: name.trim() || "Você" }),
	setAddress: (id) => set({ addressId: id }),
	setPayment: (p) => set({ payment: p }),
	toggleCpf: () => set({ cpfOnInvoice: !get().cpfOnInvoice }),
	toggleFavorite: (id) => set({ favorites: get().favorites.includes(id) ? get().favorites.filter((f) => f !== id) : [...get().favorites, id] }),
	setCoupon: (code) => set({ coupon: code }),
	addToCart: (payload) => {
		const next = buildItem(payload);
		if (!next) return "ok";
		const { cart } = get();
		const currentRest = cart[0]?.restaurantId;
		if (currentRest && currentRest !== next.restaurantId) return "conflict";
		set({ cart: cart.find((i) => i.key === next.key) ? cart.map((i) => i.key === next.key ? {
			...i,
			qty: i.qty + next.qty
		} : i) : [...cart, next] });
		return "ok";
	},
	replaceCartWith: (payload) => {
		const next = buildItem(payload);
		if (!next) return;
		set({
			cart: [next],
			coupon: null
		});
	},
	updateQty: (key, qty) => set({ cart: qty <= 0 ? get().cart.filter((i) => i.key !== key) : get().cart.map((i) => i.key === key ? {
		...i,
		qty
	} : i) }),
	clearCart: () => set({
		cart: [],
		coupon: null
	}),
	addSearch: (q) => {
		const t = q.trim();
		if (!t) return;
		set({ recentSearches: [t, ...get().recentSearches.filter((s) => s.toLowerCase() !== t.toLowerCase())].slice(0, 8) });
	},
	markSplashSeen: () => set({ seenSplash: true }),
	placeOrder: () => {
		const { cart, coupon, payment, addressId, orders } = get();
		if (!cart.length) return null;
		const totals = cartTotals(cart, coupon, payment);
		const restaurant = totals.restaurant;
		if (!restaurant) return null;
		const courier = COURIERS[Math.floor(Math.random() * COURIERS.length)];
		const order = {
			id: `PD-${Date.now().toString(36).toUpperCase()}`,
			restaurantId: restaurant.id,
			restaurantName: restaurant.name,
			restaurantImage: restaurant.image,
			items: cart,
			subtotal: totals.subtotal,
			deliveryFee: totals.deliveryFee,
			discount: totals.discount,
			total: totals.total,
			status: "received",
			createdAt: Date.now(),
			etaMins: restaurant.flash ? restaurant.deliveryMax : restaurant.deliveryMax,
			payment,
			addressId,
			coupon: coupon ?? void 0,
			courier,
			flash: restaurant.flash
		};
		set({
			orders: [order, ...orders],
			cart: [],
			coupon: null
		});
		return order;
	},
	orderById: (id) => get().orders.find((o) => o.id === id)
}), {
	name: "pediu-v1",
	skipHydration: true
}));
function Splash() {
	const seen = usePediu((s) => s.seenSplash);
	const mark = usePediu((s) => s.markSplashSeen);
	(0, import_react.useEffect)(() => {
		if (seen) return;
		const t = window.setTimeout(mark, 1700);
		return () => window.clearTimeout(t);
	}, [seen, mark]);
	if (seen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-primary",
		initial: { opacity: 1 },
		exit: {
			opacity: 0,
			filter: "blur(4px)"
		},
		transition: {
			duration: .28,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		onClick: mark,
		role: "button",
		tabIndex: 0,
		onKeyDown: (e) => {
			if (e.key === "Enter" || e.key === " ") mark();
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 bg-ink",
			style: { animation: "splash-wipe 900ms var(--ease-out-soft) both" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-col items-center gap-4 text-ink-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					scale: .7,
					opacity: 0,
					filter: "blur(8px)"
				},
				animate: {
					scale: 1,
					opacity: 1,
					filter: "blur(0px)"
				},
				transition: {
					type: "spring",
					duration: .7,
					bounce: .18
				},
				className: "text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "size-16" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					y: 12,
					opacity: 0,
					filter: "blur(6px)"
				},
				animate: {
					y: 0,
					opacity: 1,
					filter: "blur(0px)"
				},
				transition: {
					delay: .18,
					duration: .45,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, { className: "text-3xl text-ink-fg" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-sans text-sm text-ink-fg/70",
					children: "Pediu, chegou."
				})]
			})]
		})]
	});
}
var styles_default = "/assets/styles-DcmGAz49.css";
var APP_NAME = "Pediu";
function Hydrate() {
	(0, import_react.useEffect)(() => {
		usePediu.persist.rehydrate();
	}, []);
	return null;
}
function RootChrome() {
	const seen = usePediu((s) => s.seenSplash);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hydrate, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: seen ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Splash, {}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-center",
			toastOptions: {
				className: "font-sans",
				style: {
					background: "#111111",
					color: "#fff4e8",
					border: "none",
					borderRadius: "18px"
				}
			}
		})
	] });
}
var Route$10 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#E20D2A"
			},
			{
				name: "description",
				content: "Pediu — delivery de comida e mercado. Pediu, chegou."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RootChrome, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$9 = () => import("./routes-CKU25PWA.mjs");
var Route$9 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./cart-rT3qoOnV.mjs");
var Route$8 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./checkout-B7X9hghE.mjs");
var Route$7 = createFileRoute("/checkout")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./market-CcnFQ0xI.mjs");
var Route$6 = createFileRoute("/market")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./orders-BOlZjfiz.mjs");
var Route$5 = createFileRoute("/orders")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-CAyevDHX.mjs");
var Route$4 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./search-B6818lcx.mjs");
var Route$3 = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./taste-BQPfRjdL.mjs");
var Route$2 = createFileRoute("/taste")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./order._id-D1sxjag4.mjs");
var Route$1 = createFileRoute("/order/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./restaurants._id-DaNlb6rw.mjs");
var Route = createFileRoute("/restaurants/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	CartRoute: Route$8.update({
		id: "/cart",
		path: "/cart",
		getParentRoute: () => Route$10
	}),
	CheckoutRoute: Route$7.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$10
	}),
	MarketRoute: Route$6.update({
		id: "/market",
		path: "/market",
		getParentRoute: () => Route$10
	}),
	OrdersRoute: Route$5.update({
		id: "/orders",
		path: "/orders",
		getParentRoute: () => Route$10
	}),
	ProfileRoute: Route$4.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$10
	}),
	SearchRoute: Route$3.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$10
	}),
	TasteRoute: Route$2.update({
		id: "/taste",
		path: "/taste",
		getParentRoute: () => Route$10
	}),
	OrderIdRoute: Route$1.update({
		id: "/order/$id",
		path: "/order/$id",
		getParentRoute: () => Route$10
	}),
	RestaurantsIdRoute: Route.update({
		id: "/restaurants/$id",
		path: "/restaurants/$id",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { getRestaurant as _, cartTotals as a, searchAll as b, CATEGORIES as c, RESTAURANTS as d, TASTE_MOODS as f, getAddress as g, flashRestaurants as h, Route$3 as i, COUPONS as l, dishesOf as m, Route as n, usePediu as o, collectionsForHour as p, Route$1 as r, ADDRESSES as s, router_exports as t, DISHES as u, popularDishes as v, cn as x, reviewsFor as y };
