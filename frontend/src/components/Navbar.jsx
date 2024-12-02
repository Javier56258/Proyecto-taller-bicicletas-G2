import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { logout } from "@services/auth.service.js";
import "@styles/navbar.css";
import { useState, useEffect, useRef } from "react";
import { useAuth } from '@context/AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const userRole = user?.rol;
  const [menuOpen, setMenuOpen] = useState(false);
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

    return () => {
      if (rootRef.current) {
        observer.unobserve(rootRef.current);
      }
    };
  }, []);

  const logoutSubmit = () => {
    try {
      const confirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
      if (confirmed) {
        logout();
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const removeActiveClass = () => {
    const activeLinks = document.querySelectorAll(".nav-menu ul li a.active");
    activeLinks.forEach((link) => link.classList.remove("active"));
  };

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
      <nav className="navbar" ref={navbarRef}>
        <div className={`nav-menu ${menuOpen ? "activado" : ""}`}>
          <ul>
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
            {(userRole === "usuario") && (
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
            <li>
              {isAuthenticated ? (
                <NavLink
                  to="/home"
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