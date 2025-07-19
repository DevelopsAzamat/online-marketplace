import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

const categories = ["Все", "Электроника", "Аксессуары", "Игры"];

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [searchParams] = useSearchParams();
  const searchFromURL = searchParams.get("search") || "";

  useEffect(() => {
    if (searchFromURL) {
      setSearch(searchFromURL);
    }
  }, [searchFromURL]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {
          search,
          category,
          sort,
        };

        const res = await axios.get("/api/v1/products/", { params });
        setProducts(res.data);
        setCurrentPage(1);
      } catch (err) {
        console.error("Ошибка при загрузке товаров:", err);
        setError("Не удалось загрузить товары");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, sort]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="relative py-20 px-6 text-black text-center overflow-hidden shadow-md bg-[#0a0f2c]">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">🛍 Каталог товаров</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg w-64"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="default">Без сортировки</option>
          <option value="asc">Сначала дешёвые</option>
          <option value="desc">Сначала дорогие</option>
        </select>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-black" >
        {loading && (
          <p className="text-center col-span-full text-black">Загрузка товаров...</p>
        )}

        {error && (
          <p className="text-center col-span-full text-red-500">{error}</p>
        )}

        {!loading && !error && currentProducts.length > 0 ? (
          currentProducts.map((p) => <ProductCard key={p.id} {...p} />)
        ) : (
          !loading &&
          !error && (
            <p className="text-center col-span-full text-black">
              Нет товаров по выбранным параметрам.
            </p>
          )
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border ${
                currentPage === i + 1
                  ? "bg-blue-600 text-black"
                  : "bg-white text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
