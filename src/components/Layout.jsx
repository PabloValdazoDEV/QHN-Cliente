import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BannerCookies from './Modales/BannerCookies';
import RecommendModal from './Modales/RecommendationsForm'; 

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <BannerCookies />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
      <RecommendModal /> 
    </div>
  );
};

export default Layout;
