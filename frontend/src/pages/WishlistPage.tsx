import { useEffect } from "react";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const items = useWishlistStore((state) => state.items);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    useWishlistStore.getState().fetchWishlist();
  }, []);

  const handleAddToCart = (item: {
    product_id: number;
    title: string;
    price: number;
    image: string;
  }) => {
    addToCart({
      id: item.product_id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    toast.success("Товар добавлен в корзину!");
  };

  return (
    <section className="min-h-screen bg-[#0b1121] text-gray-200 py-16 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at top right, #1e3a8a 0%, #0f172a 100%)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-400 mb-10 text-center">
          Избранные товары
        </h1>

        {items.length === 0 ? (
          <p className="text-center text-gray-400">Нет избранных товаров.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <div
                key={item.product_id}
                className="bg-white/10 backdrop-blur p-4 rounded-xl relative shadow border border-white/10"
              >
                <button
                  onClick={() =>
                    toggleWishlist({
                      id: item.product_id,
                      title: item.title,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="absolute top-2 right-2 text-red-400 text-xl hover:scale-110 transition-transform"
                >
                  ♥
                </button>

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-contain mb-4 rounded bg-white/10"
                />

                <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>

                <p className="text-blue-400 font-bold text-md mt-1">
                  {typeof item.price === "number"
                    ? `${item.price.toLocaleString()} сум`
                    : "Цена не указана"}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    В корзину
                  </button>

                  <Link
                    to="/cart"
                    className="flex-1 bg-white/20 text-gray-100 text-center py-2 rounded hover:bg-white/30"
                  >
                    Перейти
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
