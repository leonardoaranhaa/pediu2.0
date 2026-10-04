import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type DeliveryStatus } from "@/lib/clock";
import {
  applyCoupon,
  COURIERS,
  dishesOf,
  earnedPoints,
  getAddress,
  getDish,
  getRestaurant,
  REDEEM_BRL,
  REDEEM_POINTS,
  clubTier,
  type Extra,
} from "@/lib/data";

export type { DeliveryStatus };
export { deliveryClock, STATUS_LABEL, useNow } from "@/lib/clock";
export type OrderStatus = DeliveryStatus;

export type CartItem = {
  key: string;
  dishId: string;
  restaurantId: string;
  name: string;
  image: string;
  unitPrice: number;
  extras: Extra[];
  qty: number;
  notes: string;
};

export type PaymentMethod = "pix" | "card" | "cash";

export type ChatMsg = {
  id: string;
  from: "me" | "courier";
  text: string;
  at: number;
};

export type Notif = {
  id: string;
  title: string;
  body: string;
  at: number;
  read: boolean;
  to?: "/" | "/search" | "/market" | "/taste" | "/club" | "/orders";
  q?: string;
};

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tip: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  etaMins: number;
  payment: PaymentMethod;
  addressId: string;
  coupon?: string;
  courier: { name: string; vehicle: string; plate: string; rating: number; trips: number; hue: number };
  flash: boolean;
  scheduled?: string;
  junto?: boolean;
  rating?: number;
  /** What this person pays. Equals total unless Pediu Junto splits the table. */
  share?: number;
  cpfOnInvoice?: boolean;
  pointsEarned?: number;
};

type AddPayload = {
  dishId: string;
  extras: Extra[];
  qty: number;
  notes: string;
};

type PediuState = {
  name: string;
  addressId: string;
  favorites: string[];
  cart: CartItem[];
  coupon: string | null;
  payment: PaymentMethod;
  cpfOnInvoice: boolean;
  orders: Order[];
  recentSearches: string[];
  seenSplash: boolean;
  points: number;
  tip: number;
  schedule: string | null;
  junto: boolean;
  chats: Record<string, ChatMsg[]>;
  notifications: Notif[];
  /** BRL already redeemed, waiting on the next bag. */
  pointsCredit: number;
  /** Latest star rating this person gave each restaurant. */
  ratings: Record<string, number>;
  setName: (name: string) => void;
  setAddress: (id: string) => void;
  setPayment: (p: PaymentMethod) => void;
  toggleCpf: () => void;
  toggleFavorite: (id: string) => void;
  setCoupon: (code: string | null) => void;
  setTip: (n: number) => void;
  setSchedule: (s: string | null) => void;
  toggleJunto: () => void;
  addToCart: (payload: AddPayload) => "ok" | "conflict";
  replaceCartWith: (payload: AddPayload) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  addSearch: (q: string) => void;
  markSplashSeen: () => void;
  placeOrder: () => Order | null;
  orderById: (id: string) => Order | undefined;
  rateOrder: (id: string, rating: number) => void;
  redeemPoints: () => boolean;
  sendChat: (orderId: string, text: string, from?: ChatMsg["from"]) => void;
  seedCourierChat: (orderId: string, text: string) => void;
  markNotifsRead: () => void;
};

function itemKey(dishId: string, extras: Extra[], notes: string) {
  const extraIds = extras
    .map((e) => e.id)
    .sort()
    .join(",");
  return `${dishId}|${extraIds}|${notes.trim().toLowerCase()}`;
}

function extraSum(extras: Extra[]) {
  return extras.reduce((s, e) => s + e.price, 0);
}

function roundMoney(n: number) {
  return Math.round(n * 100) / 100;
}

export function chargeOf(foodTotal: number, tip: number, junto: boolean) {
  const grand = roundMoney(foodTotal + tip);
  const share = junto ? roundMoney(grand / 3) : grand;
  return { grand, share };
}

export function cartTotals(
  cart: CartItem[],
  coupon: string | null,
  payment: PaymentMethod,
  loyalty: { points?: number; pointsCredit?: number } = {},
) {
  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const restaurantId = cart[0]?.restaurantId;
  const restaurant = restaurantId ? getRestaurant(restaurantId) : undefined;
  const baseFee = restaurant?.deliveryFee ?? 0;
  const applied = applyCoupon(coupon, subtotal, baseFee, Boolean(restaurant?.flash), payment);
  const tier = clubTier(loyalty.points ?? 0);
  const clubFree = tier.id === "flash" && Boolean(restaurant?.flash) && applied.deliveryFee > 0;
  const deliveryFee = clubFree ? 0 : applied.deliveryFee;
  const room = Math.max(0, subtotal - applied.discount);
  const pointsCredit = Math.min(loyalty.pointsCredit ?? 0, room);
  const total = Math.max(0, roundMoney(subtotal + deliveryFee - applied.discount - pointsCredit));
  return {
    subtotal,
    deliveryFee,
    discount: applied.discount,
    pointsCredit,
    clubFree,
    total,
    restaurant,
    couponLabel: applied.label,
    itemCount: cart.reduce((s, i) => s + i.qty, 0),
  };
}

function buildItem(payload: AddPayload): CartItem | null {
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
    notes: payload.notes.trim(),
  };
}

const STARTER_NOTIFS: Notif[] = [
  {
    id: "n-flash",
    title: "Flash 99 na Augusta",
    body: "Cinco motos livres a menos de 1 km. Smash e coxinha saem agora.",
    at: Date.now() - 42 * 60_000,
    read: false,
    to: "/search",
    q: "flash",
  },
  {
    id: "n-cupom",
    title: "PEDIU10 te espera",
    body: "10% na sacola acima de R$ 40. Vale hoje.",
    at: Date.now() - 5 * 3600_000,
    read: false,
    to: "/search",
  },
];

export const usePediu = create<PediuState>()(
  persist(
    (set, get) => ({
      name: "Você",
      addressId: "augusta",
      favorites: ["smash-club", "napoli-di-roma"],
      cart: [],
      coupon: null,
      payment: "pix",
      cpfOnInvoice: false,
      orders: [],
      recentSearches: ["pizza", "açaí", "flash"],
      seenSplash: false,
      points: 268,
      tip: 2,
      schedule: null,
      junto: false,
      chats: {},
      notifications: STARTER_NOTIFS,
      pointsCredit: 0,
      ratings: {},
      setName: (name) => set({ name: name.trim() || "Você" }),
      setAddress: (id) => set({ addressId: id }),
      setPayment: (p) => set({ payment: p }),
      toggleCpf: () => set({ cpfOnInvoice: !get().cpfOnInvoice }),
      toggleFavorite: (id) =>
        set({
          favorites: get().favorites.includes(id)
            ? get().favorites.filter((f) => f !== id)
            : [...get().favorites, id],
        }),
      setCoupon: (code) => set({ coupon: code }),
      setTip: (n) => set({ tip: n }),
      setSchedule: (s) => set({ schedule: s }),
      toggleJunto: () => set({ junto: !get().junto }),
      addToCart: (payload) => {
        const next = buildItem(payload);
        if (!next) return "ok";
        const { cart } = get();
        const currentRest = cart[0]?.restaurantId;
        if (currentRest && currentRest !== next.restaurantId) return "conflict";
        const existing = cart.find((i) => i.key === next.key);
        set({
          cart: existing
            ? cart.map((i) => (i.key === next.key ? { ...i, qty: i.qty + next.qty } : i))
            : [...cart, next],
        });
        return "ok";
      },
      replaceCartWith: (payload) => {
        const next = buildItem(payload);
        if (!next) return;
        set({ cart: [next], coupon: null });
      },
      updateQty: (key, qty) =>
        set({
          cart: qty <= 0 ? get().cart.filter((i) => i.key !== key) : get().cart.map((i) => (i.key === key ? { ...i, qty } : i)),
        }),
      clearCart: () => set({ cart: [], coupon: null }),
      addSearch: (q) => {
        const t = q.trim();
        if (!t) return;
        set({
          recentSearches: [t, ...get().recentSearches.filter((s) => s.toLowerCase() !== t.toLowerCase())].slice(0, 8),
        });
      },
      markSplashSeen: () => set({ seenSplash: true }),
      placeOrder: () => {
        const {
          cart,
          coupon,
          payment,
          addressId,
          orders,
          tip,
          schedule,
          junto,
          points,
          pointsCredit,
          notifications,
          cpfOnInvoice,
        } = get();
        if (!cart.length) return null;
        const totals = cartTotals(cart, coupon, payment, { points, pointsCredit });
        const restaurant = totals.restaurant;
        if (!restaurant) return null;
        const courier = COURIERS[Math.floor(Math.random() * COURIERS.length)]!;
        const { grand, share } = chargeOf(totals.total, tip, junto);
        const earned = earnedPoints(share, points);
        const order: Order = {
          id: `PD-${Date.now().toString(36).toUpperCase()}`,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantImage: restaurant.image,
          items: cart,
          subtotal: totals.subtotal,
          deliveryFee: totals.deliveryFee,
          discount: totals.discount,
          tip,
          total: grand,
          share,
          status: "received",
          createdAt: Date.now(),
          etaMins: restaurant.deliveryMax,
          payment,
          addressId,
          coupon: coupon ?? undefined,
          courier,
          flash: restaurant.flash,
          scheduled: schedule ?? undefined,
          junto,
          cpfOnInvoice,
          pointsEarned: earned,
        };
        const hello: ChatMsg = {
          id: `${order.id}-hi`,
          from: "courier",
          text: `Oi, aqui é ${courier.name.split(" ")[0]}. Peguei seu Pediu.`,
          at: Date.now(),
        };
        set({
          orders: [order, ...orders],
          cart: [],
          coupon: null,
          schedule: null,
          junto: false,
          points: points + earned,
          pointsCredit: roundMoney(Math.max(0, pointsCredit - totals.pointsCredit)),
          chats: { ...get().chats, [order.id]: [hello] },
          notifications: [
            {
              id: `n-${order.id}`,
              title: junto ? "Pediu Junto no fogo" : "Pedido no fogo",
              body: `${restaurant.name} · ${earned} pontos no Clube`,
              at: Date.now(),
              read: false,
              to: "/orders" as const,
            },
            ...notifications,
          ].slice(0, 12),
        });
        return order;
      },
      orderById: (id) => get().orders.find((o) => o.id === id),
      rateOrder: (id, rating) => {
        const order = get().orders.find((o) => o.id === id);
        if (!order) return;
        set({
          orders: get().orders.map((o) => (o.id === id ? { ...o, rating } : o)),
          ratings: { ...(get().ratings ?? {}), [order.restaurantId]: rating },
        });
      },
      redeemPoints: () => {
        const { points, pointsCredit } = get();
        if (points < REDEEM_POINTS) return false;
        set({
          points: points - REDEEM_POINTS,
          pointsCredit: roundMoney((pointsCredit ?? 0) + REDEEM_BRL),
        });
        return true;
      },
      sendChat: (orderId, text, from = "me") => {
        const t = text.trim();
        if (!t) return;
        const prev = get().chats[orderId] ?? [];
        const msg: ChatMsg = { id: `${orderId}-${Date.now()}`, from, text: t, at: Date.now() };
        set({ chats: { ...get().chats, [orderId]: [...prev, msg] } });
      },
      seedCourierChat: (orderId, text) => {
        const prev = get().chats[orderId] ?? [];
        if (prev.some((m) => m.from === "courier" && m.text === text)) return;
        const msg: ChatMsg = { id: `${orderId}-c-${Date.now()}`, from: "courier", text, at: Date.now() };
        set({ chats: { ...get().chats, [orderId]: [...prev, msg] } });
      },
      markNotifsRead: () =>
        set({
          notifications: get().notifications.map((n) => ({ ...n, read: true })),
        }),
    }),
    { name: "pediu-v1", skipHydration: true },
  ),
);

export function useHydratePediu() {
  if (typeof window === "undefined") return;
  if (!usePediu.persist.hasHydrated()) {
    void usePediu.persist.rehydrate();
  }
}

export { getAddress, dishesOf };
