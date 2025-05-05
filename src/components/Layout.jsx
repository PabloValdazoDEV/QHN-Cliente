import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BannerCookies from "./Modales/BannerCookies";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <BannerCookies />
      <main className="flex-grow container mx-auto w-full max-w-5xl">
        <main className="flex-grow container mx-auto px-6 py-8 w-full bg-white rounded-lg shadow-md my-5">
          <Outlet />
        </main>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
