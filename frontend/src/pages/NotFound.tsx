const NotFound = () => {
  return (
    <div className="text-center text-white py-24">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Страница не найдена</p>
      <a href="/" className="text-blue-400 underline">Вернуться на главную</a>
    </div>
  );
};

export default NotFound;
