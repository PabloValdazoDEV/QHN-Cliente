import { Route, Routes } from "react-router";
import PageHome from "./Page/PageHome";
import PageLogin from "./Page/PageLogin";
import "/.global.css";

// Componentes principales
import Footer from "./Components/Footer";
import CardVertical from "./Components/Cards/CardVertical";
import CardVertical from "./Components/Cards/CardHorizontal";
import SectionNews from "./Components/Blocks/SectionNews";

// Banners
import BannerVertical from "./Components/Banners/BannerVertical";
import BannerHorizontal from "./Components/Banners/BannerHorizontal";

// Botones
import ButtonGeneral from "./Components/Buttons/ButtonGeneral";



// const PrivateRoute = ({ element }) => {
//   return isAuth() ? element : <Navigate to="/" />;
// };

// const PublicRoute = ({ element }) => {
//   return !isAuth() ? element : <Navigate to="/home" />;
// };

function App() {

  return (
    <>
    <Routes>
      {/* Añadir el NavBar y el Footer cuando esten */}
      <Route path="/"> 
      <Route path="" element={<PageHome/>} />
      <Route path="login" element={<PageLogin/>} />
      {/* <Route path="admin" element={<PrivateRoute element={<h1>Logeado</h1>} />} /> */}

      </Route>
    </Routes>
    </>
  )
}

export default App
