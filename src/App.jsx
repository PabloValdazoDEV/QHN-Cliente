import { Navigate, Route, Routes } from "react-router";
import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import PageAdmin from "./Page/PageAdmin";
import isAuth from "./Api/middelware";

const PrivateRoute = ({ element }) => {
  return isAuth() ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  return !isAuth() ? element : <Navigate to="/admin" />;
};

function App() {
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
            element={<PrivateRoute element={<PageAdmin />} />}
          />
        </Route>
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
      </Routes>
    </>
  );
}

export default App;
