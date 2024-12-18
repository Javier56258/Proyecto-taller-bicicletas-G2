import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "@pages/Login";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Register from "@pages/Register";
import Error404 from "@pages/Error404";
import Root from "@pages/Root";
import ProtectedRoute from "@components/ProtectedRoute";
import "@styles/styles.css";
import Products from "./pages/Products";
import Proveedores from "./pages/Proveedores";
import Services from "./pages/Services";
import Reservas from "./pages/Reserva";
import Horarios from "./pages/Horarios";
import "@styles/tailwind.css";
import StatisticsPage from './pages/StatisticsPage';
import Ventas from './pages/Ventas.jsx';

  

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "usuario"]}>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "/proveedores",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "usuario"]}>
            <Proveedores />
          </ProtectedRoute>
        ),
      },
      {
        path: "/servicios",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "usuario"]}>
            <Services />
          </ProtectedRoute>
        ),
      },
      {
        path: "/reservas",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "usuario"]}>
            <Reservas />
          </ProtectedRoute>
        )
      },
      {
        path: '/ventas',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'usuario']}>
            <Ventas />
          </ProtectedRoute>
        ),
      },
      {
        path: "/horarios",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <Horarios />
          </ProtectedRoute>
        )
      },
      {
        path: "/statistics",
        element: (
          <ProtectedRoute allowedRoles={["administrador"]}>
            <StatisticsPage />
          </ProtectedRoute>
        )
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
