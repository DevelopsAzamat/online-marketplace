import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("text-green-600");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setMessage("✅ Успешная регистрация");
        setMessageColor("text-green-600");
        setForm({
          first_name: "",
          last_name: "",
          phone: "",
          email: "",
          password: "",
        });
      } else {
        const error = await res.json();
        setMessage(`❌ Ошибка: ${error.detail}`);
        setMessageColor("text-red-600");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage("❌ Ошибка сети");
      setMessageColor("text-red-600");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Регистрация
        </h2>

        {message && (
          <div className={`mb-4 text-center font-medium ${messageColor}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <input
            name="first_name"
            placeholder="Имя"
            value={form.first_name}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="last_name"
            placeholder="Фамилия"
            value={form.last_name}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded hover:bg-green-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Register;
