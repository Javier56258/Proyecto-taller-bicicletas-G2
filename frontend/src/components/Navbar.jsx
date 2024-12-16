import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import "@styles/navbar.css";
import { useState, useEffect, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importamos los íconos de react-icons
import { useAuth } from '@context/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Estado para el modo oscuro
  const navbarRef = useRef(null);
  const rootRef = useRef(null);
  const { isAuthenticated } = useAuth();


  const handleLoginClick = () => {
    navigate("/auth");
  };

  useEffect(() => {
    const makeNavbarSticky = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) {
        navbarRef.current.classList.add("sticky");
      } else {
        navbarRef.current.classList.remove("sticky");
      }

    };
    
    const observer = new IntersectionObserver(makeNavbarSticky, {
      root: null,
      threshold: 0,
    });

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    // Al cargar, establecemos el modo oscuro en base al estado guardado
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark"); // Añadir clase al <html>
    }

    return () => {
      if (rootRef.current) {
        observer.unobserve(rootRef.current);
      }
    };
  }, []);

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

  const logoutSubmit = () => {
    try {
      const confirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
      if (confirmed) {
        logout();
        navigate("/home");
        //window.location.reload();
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /*
  const removeActiveClass = () => {
    const activeLinks = document.querySelectorAll(".nav-menu ul li a.active");
    activeLinks.forEach((link) => link.classList.remove("active"));
  };
  */
  

  const addActiveClass = () => {
    const links = document.querySelectorAll(".nav-menu ul li a");
    links.forEach((link) => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("active");
      }
    });
  };

  return (
    <div ref={rootRef}>
      <nav className="navbar dark:bg-[#2e2c2f]" ref={navbarRef}>
        <div
          className={`nav-menu dark:bg-[#2e2c2f] ${menuOpen ? "activado" : ""}`}
        >
          <ul className="dark:bg-[#2e2c2f]">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
                onClick={() => {
                  setMenuOpen(false);
                  addActiveClass();
                }}
              >
                Inicio
              </NavLink>
            </li>

            {userRole === "administrador" && (
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Usuarios
                </NavLink>
              </li>
            )}
            {(userRole === "administrador" || userRole === "usuario") && (
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Productos
                </NavLink>
              </li>
            )}
            {(userRole === "administrador" || userRole === "usuario") && (
              <li>
                <NavLink
                  to="/ventas"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Ventas
                </NavLink>
              </li>
            )}
            {(userRole === "administrador") && (
              <li>
                <NavLink
                  to="/proveedores"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Proveedores
                </NavLink>
              </li>
            )}

            {(userRole === "administrador" || userRole === "usuario") && (
              <li>
                <NavLink
                  to="/servicios"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Servicios
                </NavLink>
              </li>
            )}

            {(userRole === "administrador" || userRole === "usuario") && (
              <li>
                <NavLink
                  to="/reservas"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Reservas
                </NavLink>
              </li>
            )}

            {(userRole === "administrador") && (
              <li>
                <NavLink
                  to="/horarios"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Horarios
                </NavLink>
              </li>
            )}
            {(userRole === "administrador") && (
              <li>
                <NavLink
                  to="/statistics"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    setMenuOpen(false);
                    addActiveClass();
                  }}
                >
                  Estadísticas
                </NavLink>
              </li>
            )}

            <li>
              {isAuthenticated ? (
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    logoutSubmit();
                    setMenuOpen(false);
                  }}
                >
                  Cerrar Sesión
                </NavLink>
            ) : (
                <NavLink
                  to="/auth"
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={() => {
                    handleLoginClick();
                    setMenuOpen(false);
                  }}
                >
                  Iniciar Sesión
                </NavLink>
              )}
        </li>
        <button
              onClick={() => setDarkMode(!darkMode)} // Cambiar entre modo oscuro y claro
              className="p-3 mr-0 md:mr-6 bg-[#729B79] dark:bg-[#BACDB0] text-[#F3E8EE] dark:text-[#475B63] rounded-md transition"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5" /> // Ícono de sol para modo claro
              ) : (
                <FaMoon className="w-5 h-5" /> // Ícono de luna para modo oscuro
              )}
            </button>
          </ul>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
