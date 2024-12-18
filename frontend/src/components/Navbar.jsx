import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import { useState, useEffect } from "react";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaBicycle,
  FaUser,
  FaTools,
} from "react-icons/fa";
import { MdSell, MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoIosStats, IoIosNotifications } from "react-icons/io";
import { AiFillProduct, AiFillHome } from "react-icons/ai";
import { RiBookMarkedFill } from "react-icons/ri";
import { FaTruck } from "react-icons/fa6";
import { TbLogout, TbLogin } from "react-icons/tb";

import { useAuth } from "@context/AuthContext.jsx";

import NotifyProduct from "@components/NotifyProduct.jsx";

const Navbar = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;
  const { isAuthenticated } = useAuth();

  const [notifyPopupOpen, setNotifyPopupOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    async function fetchProductos() {
      try {
        const data = await getProducts();
        data.sort((a, b) => b.id - a.id);
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }
    fetchProductos();
  }, []);

  // Verificar el modo oscuro en el inicio
  useEffect(() => {
    // Al cambiar el estado de darkMode, actualizamos la clase global
    if (darkMode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark"); // También en el <html>
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark"); // También en el <html>
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const logoutSubmit = () => {
    if (isAuthenticated) {
      logout();
      navigate("/home");
      window.location.reload();
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#475B63] dark:bg-[#2e2c2f] text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold flex items-center">
        <NavLink
          to="/home"
          className="block hover:text-gray-400 flex items-center"
        >
          <FaBicycle className="mr-2" />
          Taller de bicicletas
        </NavLink>
      </div>

      <div className="ml-auto pr-4 mt-1.5">
        <button onClick={() => setNotifyPopupOpen(true)}>
          <IoIosNotifications className="text-2xl hover:text-gray-400 " />
        </button>

        <NotifyProduct
          show={notifyPopupOpen}
          setShow={setNotifyPopupOpen}
          data={productos}
        />
      </div>

      {/* Icono Hamburguesa */}
      <button
        className="text-2xl focus:outline-none hover:text-gray-400"
        onClick={toggleMenu}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Menú deslizable */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-[#475B63] dark:bg-[#2e2c2f] text-white z-50 shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ marginTop: "60px" }}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-2xl font-bold">Menú</span>
        </div>

        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink
              to="/home"
              onClick={toggleMenu}
              className="block hover:text-gray-400 flex items-center"
            >
              <AiFillHome className="mr-2" />
              Inicio
            </NavLink>
          </li>
          {userRole === "administrador" && (
            <>
              <li>
                <NavLink
                  to="/users"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <FaUser className="mr-2" />
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/proveedores"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <FaTruck className="mr-2" />
                  Proveedores
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/horarios"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <MdOutlineAccessTimeFilled className="mr-2" />
                  Horarios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/statistics"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <IoIosStats className="mr-2" />
                  Estadísticas
                </NavLink>
              </li>
            </>
          )}
          {(userRole === "administrador" || userRole === "usuario") && (
            <>
              <li>
                <NavLink
                  to="/servicios"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <FaTools className="mr-2" />
                  Servicios
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <AiFillProduct className="mr-2" />
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ventas"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <MdSell className="mr-2" />
                  Ventas
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reservas"
                  onClick={toggleMenu}
                  className="block hover:text-gray-400 flex items-center"
                >
                  <RiBookMarkedFill className="mr-2" />
                  Reservas
                </NavLink>
              </li>
            </>
          )}
          <li>
            {isAuthenticated ? (
              <button
                onClick={logoutSubmit}
                className="block hover:text-gray-400 flex items-center"
              >
                <TbLogout className="mr-2" />
                Cerrar Sesión
              </button>
            ) : (
              <NavLink
                to="/auth"
                onClick={toggleMenu}
                className="block hover:text-gray-400 flex items-center"
              >
                <TbLogin className="mr-2" />
                Iniciar Sesión
              </NavLink>
            )}
          </li>
        </ul>

        {/* Botón Tema Oscuro/Claro */}
        <div className="absolute bottom-20 left-0 w-full flex justify-center">
          <button
            onClick={toggleDarkMode}
            className="flex items-center border-2 border-[#bacdb09e] space-x-2 px-4 py-2 rounded-lg bg-[#bacdb09e] hover:bg-[#475B63] dark:hover:bg-[#2e2c2f] transition"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            <span>{darkMode ? "Modo Claro" : "Modo Oscuro"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
