const PrivacyPolicy = () => {
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
          Политика конфиденциальности
        </h1>

        <p className="mb-6 leading-relaxed">
          Мы уважаем вашу конфиденциальность и обязуемся защищать ваши персональные данные.
          Настоящая Политика конфиденциальности описывает, как мы собираем, используем и
          храним информацию, которую вы предоставляете при использовании нашего маркетплейса.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">1. Какие данные мы собираем</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Email, имя и номер телефона при регистрации</li>
          <li>Информация о заказах и действиях на сайте</li>
          <li>IP-адрес, тип устройства, браузер (для аналитики)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">2. Как мы используем данные</h2>
        <ul className="list-disc list-inside space-y-2 pl-2">
          <li>Для выполнения заказов и связи с вами</li>
          <li>Для улучшения качества сервиса</li>
          <li>Для защиты от мошенничества и нарушений</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">3. Безопасность</h2>
        <p className="mb-6 leading-relaxed">
          Все данные хранятся в зашифрованном виде и защищены от несанкционированного доступа.
          Мы применяем современные меры безопасности.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-blue-300">4. Контакты</h2>
        <p className="leading-relaxed">
          Если у вас есть вопросы, напишите:{" "}
          <a
            href="mailto:azamatkadirbergenov@gmail.com"
            className="text-blue-400 underline hover:text-blue-500"
          >
            azamatkadirbergenov@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
