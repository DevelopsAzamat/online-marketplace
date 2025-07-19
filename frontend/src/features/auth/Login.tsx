import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      // Ожидается: { access_token, token_type, user: { ... } }
      const { access_token, user } = res.data;

      if (!access_token || !user) {
        setError("Неверный ответ от сервера");
        return;
      }

      // Сохраняем пользователя + токен
      setUser({
        ...user,
        access_token, // ⬅️ обязательно
      });

      // Перенаправление: если админ — в /admin, иначе на главную
      navigate(user.is_admin ? "/admin" : "/");

    } catch (err) {
      console.error("Ошибка логина:", err);
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
