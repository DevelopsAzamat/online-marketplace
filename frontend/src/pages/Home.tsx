import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCarousel from "../components/ProductCarousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useWishlistStore } from "../store/wishlistStore";
import BannerCarousel from "../components/BannerCarousel";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  useEffect(() => {
    fetch("/api/v1/products/")
      .then(async (res) => {
        if (!res.ok) throw new Error(`Ошибка HTTP: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке продуктов:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1121] font-sans">
      {/* Hero-блок */}
      <section className="relative py-20 px-6 text-white text-center overflow-hidden shadow-md bg-[#0a0f2c]">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 100%)",
            filter: "blur(60px)",
            opacity: 0.4,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Добро пожаловать в Маркетплейс
          </h1>
          <p className="text-xl sm:text-2xl mt-6 text-blue-100 font-light max-w-3xl mx-auto">
            🔥 Огромный выбор товаров, надёжная доставка и доступные цены — начните покупки уже сейчас!
          </p>
          <button
            onClick={() => navigate("/catalog")}
            className="mt-8 px-8 py-3 bg-white text-blue-700 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg"
          >
            Перейти к каталогу
          </button>
<BannerCarousel />
          {/* Автосмена товаров */}
          {!loading && products.length > 0 && (
            <div className="mt-10">
              <ProductCarousel products={products.slice(0, 5)} />
            </div>
          )}
        </div>
      </section>

      {/* Популярные товары */}
      <main className="flex-1 px-6 py-16 bg-[#0b1121] relative text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(circle at top left, #1e3a8a 0%, #0f172a 100%)",
            filter: "blur(80px)",
            opacity: 0.3,
          }}
        />
        
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-white-800 relative after:content-[''] after:absolute after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1.5 after:bg-indigo-600 after:rounded-full">
          Популярные товары
        </h2>
          
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-md p-4 animate-pulse">
                    <Skeleton height={180} />
                    <Skeleton height={30} className="mt-4" />
                    <Skeleton width={100} height={25} className="mt-2" />
                    <Skeleton height={40} className="mt-4 rounded-lg" />
                  </div>
                ))
            : products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
