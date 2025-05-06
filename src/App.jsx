import { Navigate, Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { fetchUser } from "./Context/User";
import { useUserRole } from "./Hooks/useUserRole";
import "./global.css";

import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import RegisterPage from "./Page/RegisterPage";

import PageCategory from "./Page/PageCategory";
import PageCity from "./Page/PageCity";
import PageCityCategory from "./Page/PageCityCategory";

import Layout from "./Components/Layout";

import PageAbout from "./Page/PageAbout";
import PageContact from "./Page/PageContact";
import PagePost from "./Page/PagePost";
import PageEvento from "./Page/PageEvento";
import PageEditarEvent from "./Page/PageEditarEvent";
import PageDashboard from "./Page/PageDashboard";
import PagePrivacy from "./Page/PagePrivacy";

const PublicRoute = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN" || role === "COLLABORATOR")
    return <Navigate to="/dashboard" />;
  return element;
};

const AdminRouter = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN") return element;
  return <Navigate to="/" />;
};

// const CollaboratorRouter = ({ element }) => {
//   const { role, loading } = useUserRole();
//   if (loading) return <div>Cargando...</div>;
//   if (role === "COLLABORATOR") return element;
//   return <Navigate to="/" />;
// };

const CollaboratorAndAdminRouter = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "COLLABORATOR" || role === "ADMIN") return element;
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
        <Route element={<Layout />}>
          <Route path="/">
            <Route index element={<PageHome />} />
            <Route path="ciudades/:city" element={<PageCity />} />
            <Route path="ciudades/:city/:category" element={<PageCityCategory />} />
            <Route path="categorias/:category" element={<PageCategory />} />
            <Route path="sobre-nosotros" element={<PageAbout />} />
            <Route path="contacto" element={<PageContact />} />
            <Route path="post/:city/:category/:name" element={<PagePost />} />
            <Route path="eventos" element={<PageEvento />} />
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
              path="dashboard/evento/:id"
              element={
                <CollaboratorAndAdminRouter element={<PageEditarEvent />} />
              }
            />
            <Route
              path="dashboard"
              element={
                <CollaboratorAndAdminRouter element={<PageDashboard />} />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
