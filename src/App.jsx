import { Route, Routes } from "react-router";

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
      <Route path="" element={<h1>Home</h1>} />
      <Route path="login" element={<h1>Login</h1>} />
      {/* <Route path="admin" element={<PrivateRoute element={<h1>Logeado</h1>} />} /> */}

      </Route>
    </Routes>
    </>
  )
}

export default App
