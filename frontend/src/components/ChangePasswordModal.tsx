import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ email, isOpen, onClose }: Props) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/v1/auth/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          old_password: password,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const data: { detail?: string } = await res.json();
        throw new Error(data.detail ?? "Ошибка при смене пароля");
      }

      setSuccess("Пароль успешно изменён");
      setError("");
      setPassword("");
      setNewPassword("");
      setTimeout(() => {
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Неизвестная ошибка");
      setSuccess("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="relative py-20 px-6 text-white text-center overflow-hidden shadow-md bg-[#0a0f2c] w-[90%] max-w-md rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Смена пароля</h3>

            <input
              type="password"
              placeholder="Старый пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 rounded text-black"
            />
            <input
              type="password"
              placeholder="Новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 rounded text-black"
            />

            {error && <p className="text-red-400 mb-3">{error}</p>}
            {success && <p className="text-green-400 mb-3">{success}</p>}

            <div className="flex justify-between">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
              >
                Сохранить
              </button>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
