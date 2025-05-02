import { Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { fetchUser } from "./Context/User";
import { useUserRole } from "./Hooks/useUserRole";

import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import RegisterPage from "./Page/RegisterPage";
import CompanyRegister from "./Page/CompanyRegister";

import PageAdmin from "./Page/PageAdmin";
import PageCollaborator from "./Page/PageCollaborator";
import PageCategory from "./Page/PageCategory";
import PageCity from "./Page/PageCity";

import Layout from "./Components/Layout";

import "./global.css";
import PageCategories from "./Page/PageCategories";
import PageCities from "./Page/PageCities";
import PageAbout from "./Page/PageAbout";
import PageContact from "./Page/PageContact";
import PagePost from "./Page/PagePost";
import PagePrivacy from "./Page/PagePrivacy";
const PublicRoute = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN") return <Navigate to="/admin" />;
  if (role === "COLLABORATOR") return <Navigate to="/collaborator" />;
  return element;
};

const AdminRouter = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN") return element;
  return <Navigate to="/" />;
};

const CollaboratorRouter = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "COLLABORATOR") return element;
  return <Navigate to="/" />;
};

function App() {
  const fetchUserContext = useSetAtom(fetchUser);

  useEffect(() => {
    fetchUserContext();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<PageHome />} />

            <Route path="ciudades/:city" element={<PageCity />} />
            {/* <Route path="ciudades/:city/:category" element={} /> */} Crear página

            <Route path="categorias/:category" element={<PageCategory />} />

            <Route path="sobre-nosotros" element={<PageAbout />} />
            <Route path="contacto" element={<PageContact />} />

            <Route path="post/:postTitle" element={<PagePost />} />

            <Route
              path="politica-privacidad-cookies"
              element={<PagePrivacy />}
            />
            <Route
              path="login"
              element={<PublicRoute element={<PageLogin />} />}
            />
            <Route
              path="registro"
              element={<PublicRoute element={<RegisterPage />} />}
            />
            <Route
              path="company-register"
              element={<CompanyRegister />}
            />
            <Route
              path="admin"
              element={<AdminRouter element={<PageAdmin />} />}
            />
            <Route
              path="collaborator"
              element={<CollaboratorRouter element={<PageCollaborator />} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
