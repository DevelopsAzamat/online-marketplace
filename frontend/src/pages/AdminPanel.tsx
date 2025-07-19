import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import AdminUsers from "./AdminUsers";
import AdminProducts from "./AdminProducts";
import { motion, AnimatePresence } from "framer-motion";
import welcomeAudio from "../assets/welcome.mp3";

const AdminPanel = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"products" | "orders" | "users">("products");
  const [showGreeting, setShowGreeting] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!user || user.email !== "admin@gmail.com") {
      navigate("/");
      return;
    }

    audioRef.current?.play().catch(() => {});
    const timer = setTimeout(() => setShowGreeting(false), 2500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center z-50"
          >
            <h1 className="text-white text-5xl font-bold animate-pulse text-center px-4">
              👑 Добро пожаловать, Великий Босс!
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src={welcomeAudio} />

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 pt-12">
        Панель Администратора
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        {["products", "orders", "users"].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item as typeof tab)}
            className={`px-5 py-2 rounded font-medium ${
              tab === item
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            {item === "products" && "Товары"}
            {item === "orders" && "Заказы"}
            {item === "users" && "Пользователи"}
          </button>
        ))}
      </div>

      <div className="px-4 pb-12">
        {tab === "products" && <AdminProducts />}
        {tab === "orders" && (
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl font-bold mb-4">Заказы</h2>
            <p>Здесь будет список заказов и их статусы.</p>
          </div>
        )}
        {tab === "users" && <AdminUsers />}
      </div>
    </div>
  );
};

export default AdminPanel;
