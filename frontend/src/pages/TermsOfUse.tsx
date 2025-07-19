const TermsOfUse = () => {
  return (
    <section className="min-h-screen bg-[#0b1121] text-gray-200 py-16 px-4 relative overflow-hidden">
      {/* Фон с градиентом и размытием */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at top right, #1e3a8a 0%, #0f172a 100%)",
          filter: "blur(100px)",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-blue-400">
          📜 Условия использования
        </h1>

        <p className="mb-6 leading-relaxed">
          Добро пожаловать в наш маркетплейс. Используя наш веб-сайт, вы соглашаетесь с настоящими условиями использования.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">1. Общие положения</h2>
        <p className="mb-6 leading-relaxed">
          Все пользователи обязаны соблюдать действующее законодательство и не нарушать права других пользователей.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">2. Регистрация</h2>
        <p className="mb-6 leading-relaxed">
          При регистрации вы предоставляете достоверную информацию и несете ответственность за безопасность своего аккаунта.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">3. Контент</h2>
        <p className="mb-6 leading-relaxed">
          Мы не несем ответственность за пользовательский контент, но оставляем за собой право удалять нарушающий правила.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">4. Ограничение ответственности</h2>
        <p className="mb-6 leading-relaxed">
          Мы не несем ответственность за возможный ущерб, возникший в результате использования сайта.
        </p>

        <p className="text-gray-400 text-sm mt-8">
          Последнее обновление: 10 июля 2025
        </p>
      </div>
    </section>
  );
};

export default TermsOfUse;
