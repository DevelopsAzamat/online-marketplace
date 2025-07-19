import { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  items: OrderItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`/api/v1/orders/orderspage?email=${user.email}`);
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Ошибка при загрузке заказов:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <section className="min-h-screen bg-[#0b1121] text-gray-200 py-16 px-4 relative overflow-hidden">
      {/* Фон с градиентом и размытием */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at top right, #1e3a8a 0%, #0f172a 100%)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-blue-400 text-center">Мои заказы</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-400">Вы пока не сделали ни одного заказа.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/10 backdrop-blur rounded-xl p-6 shadow border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-lg font-semibold text-gray-200">Заказ №{order.id}</p>
                    <p className="text-sm text-gray-400">от {order.date}</p>
                  </div>
                  <p className="text-blue-400 font-bold">{order.total.toLocaleString()} сум</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {order.items.map((item, index) => (
                    <div key={`${order.id}-${index}`} className="flex gap-4 items-center">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-contain rounded bg-white/20" />
                      <div>
                        <p className="text-gray-100 font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">
                          {item.quantity} × {item.price.toLocaleString()} сум
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
