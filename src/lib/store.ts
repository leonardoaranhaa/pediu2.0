import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  applyCoupon,
  COURIERS,
  dishesOf,
  getAddress,
  getDish,
  getRestaurant,
  type Extra,
} from "@/lib/data";

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

export type OrderStatus = "received" | "preparing" | "on_the_way" | "arriving" | "delivered";

export type Order = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  createdAt: number;
  etaMins: number;
  payment: PaymentMethod;
  addressId: string;
  coupon?: string;
  courier: { name: string; vehicle: string };
  flash: boolean;
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
  setName: (name: string) => void;
  setAddress: (id: string) => void;
  setPayment: (p: PaymentMethod) => void;
  toggleCpf: () => void;
  toggleFavorite: (id: string) => void;
  setCoupon: (code: string | null) => void;
  addToCart: (payload: AddPayload) => "ok" | "conflict";
  replaceCartWith: (payload: AddPayload) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  addSearch: (q: string) => void;
  markSplashSeen: () => void;
  placeOrder: () => Order | null;
  orderById: (id: string) => Order | undefined;
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

export function cartTotals(cart: CartItem[], coupon: string | null, payment: PaymentMethod) {
  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const restaurantId = cart[0]?.restaurantId;
  const restaurant = restaurantId ? getRestaurant(restaurantId) : undefined;
  const baseFee = restaurant?.deliveryFee ?? 0;
  const applied = applyCoupon(coupon, subtotal, baseFee, Boolean(restaurant?.flash), payment);
  const total = Math.max(0, subtotal + applied.deliveryFee - applied.discount);
  return {
    subtotal,
    deliveryFee: applied.deliveryFee,
    discount: applied.discount,
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
        const { cart, coupon, payment, addressId, orders } = get();
        if (!cart.length) return null;
        const totals = cartTotals(cart, coupon, payment);
        const restaurant = totals.restaurant;
        if (!restaurant) return null;
        const courier = COURIERS[Math.floor(Math.random() * COURIERS.length)]!;
        const order: Order = {
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
          coupon: coupon ?? undefined,
          courier,
          flash: restaurant.flash,
        };
        set({ orders: [order, ...orders], cart: [], coupon: null });
        return order;
      },
      orderById: (id) => get().orders.find((o) => o.id === id),
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
