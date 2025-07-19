// src/components/ProductModal.tsx
import { motion } from "framer-motion";

type Props = {
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onAddToCart: () => void;
};

const ProductModal = ({
  title,
  price,
  image,
  description,
  category,
  count,
  setCount,
  onClose,
  onAddToCart,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  className="bg-white p-6 rounded-xl w-[90%] max-w-md relative shadow-xl text-left" // ← добавлено text-left
>
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <img src={image} alt={title} className="w-full h-60 object-contain p-2" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-lg text-blue-700 font-semibold mb-4">
          {price.toLocaleString()} сум
        </p>
        <p className="text-sm text-gray-500 mb-1">Категория: {category}</p>
        <p className="text-sm text-gray-600 mb-4">Описание: {description}</p>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setCount((c) => Math.max(1, c - 1))}
            className="px-3 py-1 text-red-500 bg-gray-200 text-xl rounded"
          >
            −
          </button>
          <span className="text-lg  text-black font-semibold">{count}</span>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-3 py-1 text-green-500 bg-gray-200 text-xl rounded"
          >
            +
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onAddToCart}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            В корзину
          </button>
          <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg">
            Купить сейчас
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
