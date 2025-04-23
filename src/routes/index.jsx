import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHome from '../pages/PageHome';
import PageLogin from '../pages/PageLogin';
import UserRegister from '../pages/UserRegister';
import AdminRegister from '../pages/AdminRegister';
import CompanyRegister from '../pages/CompanyRegister';
import Cities from '../pages/Cities';
import Categories from '../pages/Categories';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Madrid from '../pages/Madrid';
import Malaga from '../pages/Malaga';
import Valencia from '../pages/Valencia';
import Barcelona from '../pages/Barcelona';
import Sevilla from '../pages/Sevilla';
import Zaragoza from '../pages/Zaragoza';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PageHome />,
      },
      {
        path: 'login',
        element: <PageLogin />,
      },
      {
        path: 'registro/usuario',
        element: <UserRegister />,
      },
      {
        path: 'registro/administrador',
        element: <AdminRegister />,
      },
      {
        path: 'registro/empresa',
        element: <CompanyRegister />,
      },
      {
        path: 'ciudades',
        element: <Cities />,
      },
      {
        path: 'ciudades/madrid',
        element: <Madrid />,
      },
      {
        path: 'ciudades/malaga',
        element: <Malaga />,
      },
      {
        path: 'ciudades/valencia',
        element: <Valencia />,
      },
      {
        path: 'ciudades/barcelona',
        element: <Barcelona />,
      },
      {
        path: 'ciudades/sevilla',
        element: <Sevilla />,
      },
      {
        path: 'ciudades/zaragoza',
        element: <Zaragoza />,
      },
      {
        path: 'categorias',
        element: <Categories />,
      },
      {
        path: 'sobre-nosotros',
        element: <About />,
      },
      {
        path: 'contacto',
        element: <Contact />,
      },
    ],
  },
]); 