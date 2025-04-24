import { Navigate, Route, Routes } from "react-router";
import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import PageAdmin from "./Page/PageAdmin";
import isAuth from "./Api/middelware";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { fetchUser, user } from "./Context/User";
import PageCollaborator from "./Page/PageCollaborator";
import { useUserRole } from "./Hooks/useUserRole";

const PublicRoute = ({ element }) => {
  const { role, loading } = useUserRole();
  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN") return <Navigate to="/admin" />
  if (role === "COLLABORATOR") return <Navigate to="/collaborator" />
  return element;
};

const AdminRouter = ({ element }) => {
  const { role, loading } = useUserRole();

  if (loading) return <div>Cargando...</div>;
  if (role === "ADMIN") return element;
  console.log(role)
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
        {/* Añadir el NavBar y el Footer cuando esten */}
        <Route path="/">
          <Route path="" element={<PageHome />} />
          <Route
            path="login"
            element={<PublicRoute element={<PageLogin />} />}
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
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
