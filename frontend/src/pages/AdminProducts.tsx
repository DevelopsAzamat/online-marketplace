import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/v1/products/");
      setProducts(res.data);
    } catch (err) {
      console.error("Ошибка при загрузке товаров:", err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("");
    setEditId(null);
  };

  const handleAddOrUpdateProduct = async () => {
  if (!title || !price || !image || !description || !category) return;

  const payload = {
    title,
    price: parseFloat(price),
    image,
    description,
    category,
  };

  try {
    if (editId !== null) {
      const res = await axios.put(`http://localhost:8000/api/v1/products/${editId}`, payload);
      setProducts((prev) => prev.map((p) => (p.id === editId ? res.data : p)));
      toast.success("Товар успешно обновлён");
    } else {
      const res = await axios.post("http://localhost:8000/api/v1/products/", payload);
      setProducts((prev) => [...prev, res.data]);
      toast.success("Товар успешно добавлен");
    }

    resetForm();
  } catch (err) {
    console.error("Ошибка при добавлении/обновлении товара:", err);
    toast.error("Ошибка при сохранении товара");
  }
};

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении товара:", err);
    }
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setTitle(product.title);
    setPrice(product.price.toString());
    setImage(product.image);
    setDescription(product.description);
    setCategory(product.category);
  };

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        {editId ? "Редактировать товар" : "Добавить товар"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Название"
          className="border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Цена"
          className="border rounded px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ссылка на изображение"
          className="border rounded px-3 py-2"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Категория"
          className="border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          className="border rounded px-3 py-2 col-span-full"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleAddOrUpdateProduct}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {editId ? "Сохранить изменения" : "Добавить товар"}
        </button>
        {editId && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Отмена
          </button>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Список товаров:</h3>
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-3 rounded bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{product.title}</p>
                <p className="text-sm text-gray-600">{product.category}</p>
                <p className="text-sm text-gray-600">
                  {product.price.toLocaleString()} сум
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Изменить
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Удалить
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminProducts;
