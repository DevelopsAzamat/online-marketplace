import { create } from "zustand";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  is_admin: boolean;
  access_token: string; // ⬅️ добавляем токен сюда
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

const loadUserFromStorage = (): User | null => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
};

export const useUserStore = create<UserStore>((set) => ({
  user: loadUserFromStorage(),
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
