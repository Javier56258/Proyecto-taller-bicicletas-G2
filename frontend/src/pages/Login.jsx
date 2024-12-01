import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "@services/auth.service.js";
import Form from "@components/Form";
import useLogin from "@hooks/auth/useLogin.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { errorEmail, errorPassword, errorData, handleInputChange } =
    useLogin();

  useEffect(() => {
    // Añadir clases para estilos y lógica específica de la página de login
    document.body.classList.add(
      "bg-gradient-to-b",
      "from-blue-800",
      "to-blue-900",
      "h-screen",
      "login-page"
    );

    return () => {
      // Limpiar estilos al desmontar
      document.body.classList.remove(
        "bg-gradient-to-b",
        "from-blue-800",
        "to-blue-900",
        "h-screen",
        "login-page"
      );
    };
  }, []);

  const loginSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response.status === "Success") {
        navigate("/home");
      } else if (response.status === "Client error") {
        errorData(response.details);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Iniciar sesión
        </h1>
        <Form
          fields={[
            {
              label: "Correo electrónico",
              name: "email",
              placeholder: "example@gmail.cl",
              fieldType: "input",
              type: "email",
              required: true,
              minLength: 15,
              maxLength: 30,
              errorMessageData: errorEmail,
              validate: {
                emailDomain: (value) =>
                  value.endsWith("@gmail.cl") ||
                  "El correo debe terminar en @gmail.cl",
              },
              onChange: (e) => handleInputChange("email", e.target.value),
            },
            {
              label: "Contraseña",
              name: "password",
              placeholder: "**********",
              fieldType: "input",
              type: "password",
              required: true,
              minLength: 8,
              maxLength: 26,
              pattern: /^[a-zA-Z0-9]+$/,
              patternMessage: "Debe contener solo letras y números",
              errorMessageData: errorPassword,
              onChange: (e) => handleInputChange("password", e.target.value),
            },
          ]}
          buttonText="Iniciar sesión"
          onSubmit={loginSubmit}
          footerContent={
            <p className="text-center text-sm text-gray-600">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                ¡Regístrate aquí!
              </a>
            </p>
          }
        />
      </div>
    </main>
  );
};

export default Login;
