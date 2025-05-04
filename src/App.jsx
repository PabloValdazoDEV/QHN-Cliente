import { Navigate, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { fetchUser } from "./Context/User";
import { useUserRole } from "./Hooks/useUserRole";

import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";

import PageAdmin from "./Page/PageAdmin";
import PageCollaborator from "./Page/PageDashboard";
import PageCategory from "./Page/PageCategory";
import PageCity from "./Page/PageCity";

import Layout from "./Components/Layout";

import "./global.css";
import PageAbout from "./Page/PageAbout";
import PageContact from "./Page/PageContact";
import PagePost from "./Page/PagePost";
import PageEvento from "./Page/PageEvento";
import PageCreateEvent from "./Page/PageCreateEvent";
import PageDashBoardEventos from "./Page/PageDashBoardEventos";
import PageEditarEvent from "./Page/PageEditarEvent";
import PageDashboard from "./Page/PageDashboard";

const PublicRoute = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN" || role === "COLLABORATOR") return <Navigate to="/dashboard" />;
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
        <Route path="/">
          <Route element={<Layout />}>
            <Route index element={<PageHome />} />

            <Route path="ciudades/:city" element={<PageCity />} />
            {/* <Route path="ciudades/:city/:category" element={} /> */} Crear página

            <Route path="categorias/:category" element={<PageCategory />} />

            <Route path="sobre-nosotros" element={<PageAbout />} />
            <Route path="contacto" element={<PageContact />} />

            <Route path="post/:postTitle" element={<PagePost />} />

            <Route path="eventos" element={<PageEvento />} />
            {/* <Route path="crear-evento" element={<PageCreateEvent />} /> */}

            <Route
              path="politica-privacidad-&-cookies"
              element={<h1>cookies</h1>}
            />
            <Route
              path="login"
              element={<PublicRoute element={<PageLogin />} />}
            />
            <Route
              path="dashboard/eventos"
              element={<CollaboratorAndAdminRouter element={<PageDashBoardEventos />} />}
            />
            <Route
              path="dashboard/evento/:id"
              element={<AdminRouter element={<PageEditarEvent />} />}
            />
            <Route
              path="dashboard"
              element={<CollaboratorAndAdminRouter element={<PageDashboard />} />}
            />

            <Route
              path="crear-evento"
              element={<CollaboratorAndAdminRouter element={<PageCreateEvent />} />}
            />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
