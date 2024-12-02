import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {logout as logoutService} from "../services/auth.service";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("usuario")) || "";
  const isAuthenticated = user ? true : false;

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/home") {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
