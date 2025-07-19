import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

interface Props {
  products: Product[];
}

const ProductCarousel = ({ products }: Props) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <div className="relative w-full max-w-3xl h-[400px] mx-auto overflow-hidden rounded-2xl shadow-lg bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={products[index].id}
          className="absolute w-full h-full flex flex-col items-center justify-center text-center p-6"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={products[index].image}
            alt={products[index].title}
            className="h-52 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold text-gray-800">{products[index].title}</h3>
          <p className="text-lg text-blue-600 font-bold mt-2">{products[index].price} сум</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProductCarousel;
