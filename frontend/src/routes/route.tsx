import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Catalog from "../pages/Catalog";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import WishlistPage from "../pages/WishlistPage";
import AdminPanel from "../pages/AdminPanel";
import OrdersPage from "../pages/OrdersPage";
import OrderPage from "../pages/OrderPage";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse";
import NotFound from "../pages/NotFound"; // обязательно добавь эту страницу
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#0b1121]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Публичные страницы */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />

            {/* Защищённые маршруты */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/orderspage" element={<OrdersPage />} />

              {/* Админ-маршрут */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
            </Route>

            {/* ⛔ Страница 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRoutes;
