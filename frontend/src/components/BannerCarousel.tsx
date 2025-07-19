import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    image: "/assets/banner1.png",
    title: "Набор посуды на 6 персон",
    subtitle: "При покупке в рассрочку",
    price: "233 000 сум / 3 мес",
  },
  {
    image: "/assets/banner2.png",
    title: "Смартфоны и гаджеты",
    subtitle: "Скидки до 25%",
    price: "От 999 000 сум",
  },
];

const BannerCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl mt-10">
      {/* Фон Radial Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-blue-800 via-indigo-900 to-[#0f172a] opacity-40 blur-[60px]" />
      </div>

      {/* Контент */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col md:flex-row items-center bg-[#0f172a] rounded-3xl"
        >
          {/* Левая часть */}
          <div className="flex-1 p-8 md:p-12 text-white flex flex-col justify-center">
            <h4 className="text-sm md:text-lg lg:text-xl font-medium text-indigo-300 mb-2">
              {slides[index].subtitle}
            </h4>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              {slides[index].price}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-[90%] break-words">
              {slides[index].title}
            </p>
          </div>

          {/* Правая часть */}
          <div className="flex-1 flex justify-center items-center p-4 md:p-6 bg-white rounded-l-3xl h-[280px] md:h-[320px]">
            <img
              src={slides[index].image}
              alt="Slide"
              className="h-full object-contain w-auto drop-shadow-lg"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Навигация */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-800 p-2 rounded-full z-20 shadow"
      >
        ❮
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-800 p-2 rounded-full z-20 shadow"
      >
        ❯
      </button>

      {/* Точки */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;
