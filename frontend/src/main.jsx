<<<<<<< HEAD
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Register from "@pages/Register";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import ServiciosList from '@pages/ServiciosList';
import ProtectedRoute from "@components/ProtectedRoute";
import "@styles/styles.css";

const router = createBrowserRouter([
  {
    path: "/",
=======
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import Root from '@pages/Root';
import Proveedores from '@pages/Proveedores';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import Products from './pages/Products';

const router = createBrowserRouter([
  {
    path: '/',
>>>>>>> 807463b1d1a8404db1362c5a17a1a988667bf4a9
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
<<<<<<< HEAD
        path: "/",
        element: <Navigate to="/home" replace />,
      },
      {
        path: "/home",
        element: <Home />,
=======
        path: '/home',
        element: <Home />
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        ),
>>>>>>> 807463b1d1a8404db1362c5a17a1a988667bf4a9
      },
      {
        path: "/servicios",
        element: <ServiciosList />,
      },
      {
        path: "/users",
        element: (
<<<<<<< HEAD
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
=======
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <Proveedores />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products',
        element: (
          <ProtectedRoute allowedRoles ={['administrador', 'usuario']}  >
            <Products />
          </ProtectedRoute>
        ),
      }

    ]
  },
  {
    path: '/auth',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

>>>>>>> 807463b1d1a8404db1362c5a17a1a988667bf4a9
