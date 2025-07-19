import { create } from "zustand";
import { type CartItem } from "./cartStore";

interface Order {
  email: string;
  total: number;
  items: CartItem[];
}

interface OrderStore {
  currentOrder: Order | null;
  setOrder: (order: Order) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  currentOrder: null,

  setOrder: (order) => set({ currentOrder: order }),

  clearOrder: () => set({ currentOrder: null }),
}));
