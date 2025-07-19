import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ProductModal from "./ProductModal";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const ProductCard = ({ id, title, price, image, description, category }: ProductProps) => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const items = useWishlistStore((state) => state.items);
  const isFavorite = items.some((item) => item.product_id === id);

  const handleAddToCart = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      toast.error("Вы не вошли в аккаунт");
      return;
    }

    addToCart({ id, title, price, image, quantity: count });

    try {
      await fetch("/api/v1/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product_id: id, quantity: count }),
      });
    } catch (err) {
      console.error("Ошибка добавления в БД:", err);
    }

    toast.success("Товар добавлен в корзину!");
    setOpen(false);
    setCount(1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({ id, title, price, image });
    setTimeout(() => {
      const nowFavorite = useWishlistStore.getState().items.some((item) => item.product_id === id);
      toast.info(nowFavorite ? "Добавлено в избранное" : "Убрано из избранного");
    }, 50);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:scale-[1.02] hover:shadow-xl transition-transform"
      >
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 text-2xl ${
            isFavorite ? "text-red-500" : "text-gray-400"
          } transition`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <img src={image} alt={title} className="w-full h-60 object-contain p-3" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800 truncate">{title}</h4>
          <p className="text-sm text-gray-500">{category}</p>
          <p className="text-xl text-blue-600 font-bold mt-1">{price.toLocaleString()} сум</p>
          <button
            onClick={() => setOpen(true)}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Подробнее
          </button>
        </div>
      </motion.div>

      {open && (
        <ProductModal
          title={title}
          image={image}
          category={category}
          description={description}
          price={price}
          count={count}
          onClose={() => setOpen(false)}
          setCount={setCount} 
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
};

export default ProductCard;
