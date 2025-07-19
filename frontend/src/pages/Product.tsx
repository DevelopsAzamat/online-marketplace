import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-4">Детали товара</h2>
      <p className="text-gray-600">ID товара: {id}</p>
      {/* Здесь можно сделать fetch по id и показать инфу */}
    </div>
  );
};

export default Product;
