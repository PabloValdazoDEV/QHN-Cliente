import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, user } from "../Context/User";
import { tryLogout } from "../Api/Auth";

const Navbar = () => {
  const navegate = useNavigate();
  const [userContext] = useAtom(user);
  const refetchUser = useSetAtom(fetchUser);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCitiesOpen, setIsCitiesOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const cities = [
    { name: "Madrid", path: "/ciudades/madrid" },
    { name: "Málaga", path: "/ciudades/malaga" },
    { name: "Valencia", path: "/ciudades/valencia" },
    { name: "Barcelona", path: "/ciudades/barcelona" },
    { name: "Sevilla", path: "/ciudades/sevilla" },
    { name: "Zaragoza", path: "/ciudades/zaragoza" },
  ];

  const categories = [
    { name: "Ocio", path: "/categorias/ocio" },
    { name: "Viajes", path: "/categorias/viajes" },
    { name: "Shopping", path: "/categorias/shopping" },
    { name: "Educación", path: "/categorias/educacion" },
    { name: "Salud", path: "/categorias/salud" },
    { name: "Estilo de vida", path: "/categorias/estilo-de-vida" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.webp"
                alt="QHN Logo"
                className="h-12 w-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/logo-placeholder.png";
                }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Cities Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => {
                  setIsCitiesOpen(!isCitiesOpen);
                  setIsCategoriesOpen(false);
                }}
                onClick={() => {
                  navegate("/ciudades");
                  setIsCitiesOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <span>Ciudades</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isCitiesOpen && (
                <div
                  className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  onMouseLeave={() => {
                    setIsCitiesOpen(false);
                  }}
                >
                  <div className="py-1">
                    {cities.map((city) => (
                      <Link
                        key={city.name}
                        to={city.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setIsCitiesOpen(false);
                        }}
                      >
                        {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => {
                  setIsCategoriesOpen(!isCategoriesOpen);
                  setIsCitiesOpen(false);
                }}
                onClick={() => {
                  navegate("/categorias");
                  setIsCategoriesOpen(false);
                }}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <span>Categorías</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                onMouseLeave={() => {
                  setIsCategoriesOpen(false);
                }}>
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        onClick={() => {
                          setIsCategoriesOpen(false);
                        }}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              to="/sobre-nosotros"
              className="text-gray-700 hover:text-blue-600"
            >
              Sobre Nosotros
            </Link>

            {/* Contact */}
            <Link to="/contacto" className="text-gray-700 hover:text-blue-600">
              Contacto
            </Link>

            {/* Login */}

            {userContext && (
              <Link
                to={`/${userContext.role.toLowerCase()}`}
                className="text-gray-700 hover:text-blue-600"
              >
                DashBoard
              </Link>
            )}

            {userContext === null ? (
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Iniciar Sesión
              </Link>
            ) : (
              <Link
                onClick={() => {
                  tryLogout();
                  navigate("/");
                  refetchUser();
                }}
                className="text-gray-700 hover:text-blue-600"
              >
                Cerrar Sesión
              </Link>
            )}

            {/* Register Buttons */}
            {/* <div className="flex space-x-4">
              <Link
                to="/registro/usuario"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </div> */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Cities Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCitiesOpen(!isCitiesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                <span>Ciudades</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isCitiesOpen && (
                <div className="pl-4">
                  {cities.map((city) => (
                    <Link
                      key={city.name}
                      to={city.path}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                <span>Categorías</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isCategoriesOpen && (
                <div className="pl-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      to={category.path}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Other Links */}
            <Link
              to="/sobre-nosotros"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Sobre Nosotros
            </Link>

            <Link
              to="/contacto"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
            >
              Contacto
            </Link>

            {userContext && (
              <Link
                to={`/${userContext.role.toLowerCase()}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                DashBoard
              </Link>
            )}

            {userContext === null ? (
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Iniciar Sesión
              </Link>
            ) : (
              <Link
                onClick={() => {
                  tryLogout();
                  navigate("/");
                  refetchUser();
                }}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Cerrar Sesión
              </Link>
            )}

            {/* Register Buttons */}
            {/* <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  to="/registro/usuario"
                  className="block w-full px-4 py-2 text-base font-medium text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
