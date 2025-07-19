import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import SearchBar from "./SearchBar";
import {
  Home,
  ShoppingCart,
  User,
  Heart,
  ListOrdered,
  ShieldCheck,
  LogIn,
  UserPlus,
  LayoutGrid,
  Search,
} from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user } = useUserStore();
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="bg-[#011944] backdrop-blur-md shadow-lg border-b border-white/10 px-6 py-4 w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Логотип */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Логотип"
            className="h-20 w-auto object-contain transition duration-300 group-hover:scale-105 
              rounded-xl border-2 border-transparent group-hover:border-orange-500 
              group-hover:shadow-[0_0_25px_5px_rgba(255,100,0,0.5)] animate-pulse"
          />
        </Link>

        {/* Навигация (только если не /login и не /register) */}
        {!isAuthPage && (
          <ul className="flex flex-wrap gap-4 items-center text-white font-medium text-[17px]">
            <li>
              <Link to="/" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <Home size={20} /> Главная
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <LayoutGrid size={20} /> Каталог
              </Link>
            </li>
            <li>
              <Link to="/cart" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <ShoppingCart size={20} /> Корзина
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <Heart size={20} /> Избранное
              </Link>
            </li>
            <li>
              <Link to="/orderspage" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <ListOrdered size={20} /> Мои заказы
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600 px-3 py-1.5 rounded-md transition">
                <User size={20} /> Профиль
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="flex items-center gap-1 text-white/40 hover:text-blue-600 px-3 py-1.5 rounded-md transition"
              >
                <Search size={20} /> Поиск
              </button>
            </li>
            {user?.is_admin && (
              <li>
                <Link
                  to="/admin"
                  className="flex items-center gap-1 text-red-600 hover:text-white hover:bg-red-600 px-3 py-1.5 rounded-md font-semibold transition"
                >
                  <ShieldCheck size={20} /> Админ
                </Link>
              </li>
            )}
          </ul>
        )}

        {/* Кнопки Вход / Регистрация (если пользователь не залогинен) */}
        {!user && (
          <ul className="flex gap-3 items-center text-gray-300 font-medium text-[17px]">
            <li>
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-400 px-3 py-1.5 rounded-md transition">
                <LogIn size={20} /> Вход
              </Link>
            </li>
            <li>
              <Link to="/register" className="flex items-center gap-1 hover:text-blue-400 px-3 py-1.5 rounded-md transition">
                <UserPlus size={20} /> Регистрация
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Поиск — только вне auth страниц */}
      {showSearch && !isAuthPage && (
        <div className="max-w-7xl mx-auto mt-4">
          <SearchBar />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
