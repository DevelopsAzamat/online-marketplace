import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import ChangePasswordModal from "../components/ChangePasswordModal";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="p-8 text-center text-red-500 text-xl font-semibold">
        Пользователь не авторизован.
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-[#0b1121] text-gray-200 py-16 px-4 relative overflow-hidden flex items-center justify-center">
        {/* Фон с градиентом и размытием */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at top right, #1e3a8a 0%, #0f172a 100%)",
            filter: "blur(100px)",
            opacity: 0.2,
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 bg-white/10 backdrop-blur-lg shadow-2xl border border-white/10 rounded-2xl p-10 w-full max-w-xl"
        >
          <h2 className="text-4xl font-bold mb-6 text-blue-400 text-center">
            Профиль
          </h2>

          <div className="space-y-4 text-[17px] text-gray-100">
            <div>
              <span className="font-semibold text-blue-300">Имя:</span>{" "}
              {user.first_name}
            </div>
            <div>
              <span className="font-semibold text-blue-300">Фамилия:</span>{" "}
              {user.last_name}
            </div>
            <div>
              <span className="font-semibold text-blue-300">Email:</span>{" "}
              {user.email}
            </div>
            <div>
              <span className="font-semibold text-blue-300">Телефон:</span>{" "}
              {user.phone}
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <button
              onClick={() => setShowPasswordModal(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded"
            >
              Изменить пароль
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded"
            >
              Выйти
            </button>
          </div>
        </motion.div>
      </section>

      <ChangePasswordModal
        email={user.email}
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
};

export default Profile;
