import { create } from "zustand";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  setCartItems: (items: CartItem[]) => void;
}

const loadFromLocalStorage = (): CartItem[] => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch {
    // ignore
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadFromLocalStorage(),

  addToCart: (item) => {
    const state = get();
    const existing = state.items.find(i => i.id === item.id);
    let updatedItems;

    if (existing) {
      updatedItems = state.items.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedItems = [...state.items, item];
    }

    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
  },

  removeFromCart: (id) => {
    const updatedItems = get().items.filter(i => i.id !== id);
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
  },

  clearCart: () => {
    saveToLocalStorage([]);
    set({ items: [] });
  },

  increaseQuantity: (id) => {
    const updatedItems = get().items.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
  },

  decreaseQuantity: (id) => {
    const updatedItems = get().items
      .map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0);
    saveToLocalStorage(updatedItems);
    set({ items: updatedItems });
  },

  setCartItems: (items) => {
    saveToLocalStorage(items);
    set({ items });
  },
}));
