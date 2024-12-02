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
    // Estilos globales para garantizar que no haya espacio en blanco
    document.documentElement.classList.add(
      "h-full",
      "w-full",
      "overflow-hidden"
    );
    document.body.classList.add("h-full", "w-full", "overflow-hidden", "m-0");

    const root = document.getElementById("root");

    if (root) {
      root.classList.add("login-root");
    }

    return () => {
      document.documentElement.classList.remove(
        "h-full",
        "w-full",
        "overflow-hidden"
      );
      document.body.classList.remove(
        "h-full",
        "w-full",
        "overflow-hidden",
        "m-0"
      );

      if (root) {
        root.classList.remove("login-root");
      }
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

const handleGoHome = () => {
    navigate("/home");
};

  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#171617_1px,#171617_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_500px,#fbfbfb4d,#0000)]"></div>
      <main className="relative flex items-center justify-center h-full">
        <div className="p-8 rounded-xl max-w-md w-full z-10">
          <h1 className="text-2xl font-bold text-center text-white mb-4">
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
              <p className="text-center text-sm text-gray-600 dark:text-white">
                ¿No tienes cuenta?{" "}
                <a
                  href="/register"
                  className="text-[#475b63] dark:text-[#bacdb0] hover:underline"
                >
                  ¡Regístrate aquí!
                </a>
              </p>
            }
          />
        </div>
      </main>
    </div>
  );
};

export default Login;
