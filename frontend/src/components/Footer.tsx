import { useState } from "react";
import { Instagram, Send, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom"; // ← правильный импорт

const Footer = () => {
  const [showContacts, setShowContacts] = useState(false);

  return (
    <footer className="relative bg-[#0b1121] text-gray-300 py-10 mt-12 overflow-hidden">
  <div
    className="absolute inset-0"
    style={{
      background: "radial-gradient(circle at top left, #1e3a8a 0%, #0f172a 100%)",
      filter: "blur(80px)",
      opacity: 0.2,
      zIndex: -1,
    }}
  />
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 md:flex-row md:justify-between md:items-start">
        <div className="text-sm">
          <p>© 2025 Онлайн Маркетплейс. Все права защищены.</p>
          <p className="mt-1">
            Разработано от <span className="text-white font-semibold">Azamatstln</span>
          </p>
        </div>

        <div>
          <ul className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="hover:text-white transition">
                Условия использования
              </Link>
              
            </li>
            <li>
              <button
                onClick={() => setShowContacts((prev) => !prev)}
                className="hover:text-white transition flex items-center gap-1"
              >
                Контакты <ChevronDown size={16} />
              </button>
            </li>
          </ul>

          {showContacts && (
            <div className="mt-4 space-y-2 pl-1 animate-fade-in-down">
              <a
                href="https://www.instagram.com/azamatstln/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-pink-400"
              >
                <Instagram size={16} /> @azamatstln
              </a>
              <a
                href="https://t.me/azamatstln"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-400"
              >
                <Send size={16} /> @azamatstln
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
