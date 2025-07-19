import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

interface ServerCartItem {
  product_id: number;
  quantity: number;
  total_price: number;
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

const Cart = () => {
  const {
    items,
    setCartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const res = await fetch(`/api/v1/cart?email=${email}`);
        if (!res.ok) throw new Error("Ошибка загрузки корзины");

        const data: ServerCartItem[] = await res.json();
        const formatted = data.map((entry) => ({
          id: entry.product.id,
          title: entry.product.title,
          price: entry.product.price,
          image: entry.product.image,
          quantity: entry.quantity,
        }));

        setCartItems(formatted);
      } catch (err) {
        console.error("Ошибка загрузки корзины:", err);
      }
    };

    if (email) fetchUserCart();
  }, [email, setCartItems]);

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    if (!email) return;
    try {
      await fetch(`/api/v1/cart/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, quantity }),
      });
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
    }
  };

  const handleRemove = async (id: number) => {
    try {
      await fetch(`/api/v1/cart/${id}?email=${email}`, { method: "DELETE" });
      removeFromCart(id);
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await fetch(`/api/v1/cart?email=${email}`, { method: "DELETE" });
      clearCart();
    } catch (err) {
      console.error("Ошибка очистки корзины:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1121] text-white font-sans">
      <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-10 text-center">🛒 Ваша корзина</h1>

        {items.length === 0 ? (
          <div className="text-center mt-20 text-lg">
            Корзина пуста. Добавьте товары из каталога.
          </div>
        ) : (
          <div className="space-y-8">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 text-gray-800 rounded-xl shadow-md flex flex-col md:flex-row items-center p-4 md:p-6 gap-6"
              >
                <div className="w-40 h-40 flex items-center justify-center bg-white rounded-lg border">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>

                <div className="flex-1 text-left">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    {item.price.toLocaleString()} сум × {item.quantity}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        if (item.quantity > 1) {
                          decreaseQuantity(item.id);
                          handleUpdateQuantity(item.id, item.quantity - 1);
                        }
                      }}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
                    >
                      −
                    </button>
                    <span className="px-2 text-lg font-medium text-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        increaseQuantity(item.id);
                        handleUpdateQuantity(item.id, item.quantity + 1);
                      }}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  ✕ Удалить
                </button>
              </div>
            ))}

            <div className="text-right space-y-4">
              <p className="text-2xl font-bold">Итого: {total.toLocaleString()} сум</p>
              <div className="flex justify-end gap-4 flex-wrap">
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                >
                  Очистить корзину
                </button>
                <button
                  onClick={() => navigate("/order")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold"
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
