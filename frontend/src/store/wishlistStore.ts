import { create } from "zustand";
import axios from "axios";
import { useUserStore } from "./userStore";

// То, что хранится в Zustand
interface WishlistItem {
  id: number;
  product_id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistResponseItem {
  id: number;
  email: string;
  product_id: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

interface WishlistStore {
  items: WishlistItem[];
  fetchWishlist: () => void;
  toggleWishlist: (item: {
    id: number;
    title: string;
    price: number;
    image: string;
  }) => void;
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],

  fetchWishlist: async () => {
    try {
      const user = useUserStore.getState().user;
      if (!user || !user.email) return; // ✅ Проверка перед запросом

      const res = await axios.get(`/api/v1/wishlists/?email=${user.email}`);
      const data = res.data.wishlist ?? res.data;

      if (!Array.isArray(data)) {
        console.error("Ожидался массив wishlist, получено:", res.data);
        return;
      }

      const items = data.map((entry: WishlistResponseItem) => ({
        id: entry.id,
        product_id: entry.product.id,
        title: entry.product.title,
        price: entry.product.price,
        image: entry.product.image,
      }));

      set({ items });
    } catch (err) {
      console.error("Ошибка при загрузке wishlist:", err);
    }
  },

  toggleWishlist: async (item) => {
    const state = get();
    const user = useUserStore.getState().user;
    if (!user || !user.email) return;

    const exists = state.items.find((i) => i.product_id === item.id);

    if (exists) {
      try {
        await axios.delete(`/api/v1/wishlists/`, {
          data: { email: user.email, product_id: item.id },
        });

        set({
          items: state.items.filter((i) => i.product_id !== item.id),
        });
      } catch (err) {
        console.error("Ошибка при удалении из избранного:", err);
      }
    } else {
      try {
        const res = await axios.post(`/api/v1/wishlists/`, {
          email: user.email,
          product_id: item.id,
        });

        const newItem: WishlistItem = {
          id: res.data.id || Math.random(),
          product_id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
        };

        set({ items: [...state.items, newItem] });
      } catch (err) {
        console.error("Ошибка при добавлении в избранное:", err);
      }
    }
  },
}));
