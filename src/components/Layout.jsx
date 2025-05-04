import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BannerCookies from "./Modales/BannerCookies";
import RecommendModal from "./Modales/RecommendationsForm";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [ciudad, setCiudad] = useState(null);

  const rawBreadcrumb = location.pathname
    .replace(/^\/|\/$/g, "")
    .replace("post/", "")
    .split("/");

  useEffect(() => {
    if (rawBreadcrumb.length > 0) {
      setCiudad(rawBreadcrumb[0]);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <BannerCookies />
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl bg-white rounded-lg shadow-md my-5">
        {/* Breadcrumb con / */}
        {rawBreadcrumb.length >= 3 && (
          <div className="mb-4 text-sm text-gray-500 flex flex-wrap items-center gap-1">
            {rawBreadcrumb.map((page, index) => {
              const linkPath =
                index !== 0 ? `/${ciudad}/${page}` : `/${page}`;
              return (
                <span key={index} className="flex items-center gap-1">
                  {index !== 0 && <span className="text-gray-400">/</span>}
                  <Link
                    to={linkPath}
                    className="no-underline hover:underline text-blue-600"
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </Link>
                </span>
              );
            })}
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
      <RecommendModal />
    </div>
  );
};

export default Layout;
