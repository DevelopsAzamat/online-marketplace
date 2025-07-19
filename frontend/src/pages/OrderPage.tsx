// src/pages/OrderPage.tsx
import { useState } from "react";
import LocationPicker from "../components/LocationPicker";
import OrderModal from "../components/OrderModal";

const OrderPage = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    delivery: "home",
    payment: "cash",
    address: "",
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = async (lat: number, lng: number, address: string) => {
    setLocation({ lat, lng });
    setForm((prev) => ({ ...prev, address }));
    setShowMap(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.delivery === "home" && (!location || !form.address)) {
      alert("Пожалуйста, выберите место на карте");
      return;
    }

    setShowModal(true);
  };

  const confirmOrder = () => {
    setShowModal(false);
    alert("Заказ отправлен!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Оформление заказа</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="Имя"
            value={form.first_name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Фамилия"
            value={form.last_name}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        </div>

        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={form.phone}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />

        <select
          name="delivery"
          value={form.delivery}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="home">Доставка на дом</option>
          <option value="pickup">Пункт выдачи</option>
        </select>

        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="cash">Оплата наличными</option>
          <option value="card">Оплата картой</option>
        </select>

        {form.delivery === "home" && (
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Адрес доставки:</label>
            {showMap ? (
              <LocationPicker onSelect={handleLocationSelect} />
            ) : (
              <>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  placeholder="Введите адрес вручную"
                />
                <button
                  type="button"
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => setShowMap(true)}
                >
                  Переопределить адрес на карте
                </button>
              </>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
        >
          Подтвердить заказ
        </button>
      </form>

      {showModal && (
        <OrderModal
          form={form}
          onConfirm={confirmOrder}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default OrderPage;
