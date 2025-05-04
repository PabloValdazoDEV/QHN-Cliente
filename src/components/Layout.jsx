<<<<<<< HEAD
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BannerCookies from './Modales/BannerCookies';
import RecommendModal from './Modales/RecommendationsForm'; 
=======
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BannerCookies from "./Modales/BannerCookies";
>>>>>>> 3a58af5bec06a3fd4ef0ee1ab5cb9ff75c70ee8e

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <BannerCookies />
<<<<<<< HEAD
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
      <RecommendModal /> 
=======
      <main className="flex-grow container mx-auto w-full max-w-5xl">
        <main className="flex-grow container mx-auto px-6 py-8 w-full bg-white rounded-lg shadow-md my-5">
          <Outlet />
        </main>
      </main>
      <Footer />
>>>>>>> 3a58af5bec06a3fd4ef0ee1ab5cb9ff75c70ee8e
    </div>
  );
};

export default Layout;
