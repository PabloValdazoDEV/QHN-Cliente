import { Route, Routes } from "react-router";
import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import Navbar from "./components/Navbar";
import "./global.css";
// const PrivateRoute = ({ element }) => {
//   return isAuth() ? element : <Navigate to="/" />;
// };

// const PublicRoute = ({ element }) => {
//   return !isAuth() ? element : <Navigate to="/home" />;
// };

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Routes>
          {/* Añadir el NavBar y el Footer cuando esten */}
          <Route path="/">
            <Route index element={<PageHome />} />
            <Route path="login" element={<PageLogin />} />
            {/* <Route path="admin" element={<PrivateRoute element={<h1>Logeado</h1>} />} /> */}
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
