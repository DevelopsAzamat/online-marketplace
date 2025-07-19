// src/components/OrderModal.tsx
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { useState } from "react";

interface FormData {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  payment: string; // ⬅️ добавлено
}

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  form: FormData;
}

const OrderModal = ({ onConfirm, onCancel, form }: Props) => {
  const { items, clearCart } = useCartStore();
  const user = useUserStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirm = async () => {
    if (!user) return;

    const orderPayload = {
      user_email: user.email,
      full_name: `${form.first_name} ${form.last_name}`,
      phone: form.phone,
      address: form.address,
      payment_method: form.payment, // ⬅️ исправлено было payment ❌
      total,
      items: items.map(({ id, title, price, quantity, image }) => ({
        product_id: id,
        title,
        price,
        quantity,
        image,
      })),
    };

    setLoading(true);
    try {
      const res = await fetch("/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (!res.ok) {
        console.error("Ошибка при отправке заказа:", await res.text());
        return;
      }

      clearCart();
      onConfirm();
    } catch (err) {
      console.error("Ошибка при оформлении:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-left">
        <h2 className="text-xl font-semibold mb-4">Подтверждение заказа</h2>

        <ul className="mb-4 max-h-60 overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between mb-2 text-sm">
              <span>{item.title} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} сум</span>
            </li>
          ))}
        </ul>

        <div className="text-right font-bold text-lg mb-4">
          Итого: {total.toLocaleString()} сум
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Отправка..." : "Подтвердить"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
