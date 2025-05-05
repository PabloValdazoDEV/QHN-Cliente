import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BannerCookies from "./Modales/BannerCookies";
import RecommendModal from "./Modales/RecommendationsForm";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";


const Layout = () => {

  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Qué Hacer con los Niños";

   if (path === "/") {
      title = "Inicio - Qué Hacer con los Niños";
    } else if (path.startsWith("/ciudades/")) {
      const ciudad = path.split("/")[2];
      title = `Planes en ${capitalize(ciudad)} - Qué Hacer con los Niños`;
    } else if (path.startsWith("/categorias/")) {
      const categoria = path.split("/")[2];
      title = `Categoría: ${capitalize(categoria)} - Qué Hacer con los Niños`;
    } else if (path === "/sobre-nosotros") {
      title = "Sobre Nosotros - Qué Hacer con los Niños";
    } else if (path === "/contacto") {
      title = "Contacto - Qué Hacer con los Niños";
    }

    document.title = title;
  }, [location]);



  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <BannerCookies />
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl bg-white rounded-lg shadow-md my-5">
        <Outlet />
      </main>
      <Footer />
      <RecommendModal />
    </div>
  );
};

export default Layout;
