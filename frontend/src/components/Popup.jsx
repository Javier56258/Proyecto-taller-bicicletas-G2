import React, { useState, useEffect } from "react";
import CloseIcon from "@assets/XIcon.svg";
import QuestionIcon from "@assets/QuestionCircleIcon.svg";
import "@styles/popup.css";
import { set } from "lodash";

export default function Popup({ show, setShow, data, action }) {
  const userData = data && data.length > 0 ? data[0] : {};
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [rut, setRut] = useState("");
  const [rol, setRol] = useState("null");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const patternRut = new RegExp(
    /^(?:(?:[1-9]\d{0}|[1-2]\d{1})(\.\d{3}){2}|[1-9]\d{6}|[1-2]\d{7}|29\.999\.999|29999999)-[\dkK]$/
  );

  useEffect(() => {
    if (userData) {
      setNombreCompleto(userData.nombreCompleto || "");
      setEmail(userData.email || "");
      setRut(userData.rut || "");
      setRol(userData.rol || "");
      setNewPassword("");
    }

    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  // Función para formatear el RUT
  const formatRut = (inputRut) => {
    let cleanRut = inputRut.replace(/[^0-9kK]/g, ""); // Solo números y 'K'

    if (cleanRut.length <= 1) return cleanRut; // Evitar formatear si hay menos de 2 caracteres

    const dv = cleanRut.slice(-1).toUpperCase(); // Último carácter (dígito verificador en mayúsculas)
    let cuerpo = cleanRut.slice(0, -1); // Todo menos el último carácter

    // Agregar puntos cada 3 dígitos al cuerpo
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return cuerpo ? `${cuerpo}-${dv}` : "";
  };

  // Manejador de cambio de entrada
  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "rut") {
      formattedValue = formatRut(value); // Formatear el RUT en tiempo real
    }

    // Actualizar el estado de los campos
    if (field === "nombreCompleto") setNombreCompleto(formattedValue);
    if (field === "email") setEmail(formattedValue);
    if (field === "rut") setRut(formattedValue);
    if (field === "rol") setRol(formattedValue);
    if (field === "newPassword") setNewPassword(formattedValue);

    // Limpiar errores al modificar el input
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: null,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Validación del nombre completo
    if (!nombreCompleto.trim()) {
      newErrors.nombreCompleto = "El nombre completo es obligatorio.";
    } else if (nombreCompleto.length < 15 || nombreCompleto.length > 50) {
      newErrors.nombreCompleto =
        "El nombre debe tener entre 15 y 50 caracteres.";
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreCompleto)) {
      newErrors.nombreCompleto =
        "El nombre debe contener solo letras y espacios.";
    }

    // Validación del correo electrónico
    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    }

    // Validación del RUT
    if (!rut.trim()) {
      newErrors.rut = "El RUT es obligatorio.";
    } else if (!patternRut.test(rut)) {
      newErrors.rut = "Debe ser xx.xxx.xxx-x o xxxxxxxx-x";
    }

    // Validación del rol
    if (!rol.trim()) {
      if (rol === "Nulo") {
        newErrors.rol = "Seleccione un rol.";
      }
      newErrors.rol = "El rol es obligatorio.";
    }

    // Validación de la nueva contraseña
    if (
      newPassword &&
      (newPassword.length < 8 ||
        newPassword.length > 26 ||
        !/^[a-zA-Z0-9]+$/.test(newPassword))
    ) {
      newErrors.newPassword =
        "La nueva contraseña debe tener entre 8 y 26 caracteres y contener solo letras y números.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = {
      nombreCompleto,
      email,
      rut,
      rol,
      newPassword: newPassword || undefined,
    };

    action(formData);
    setShow(false);
    setErrors({});
  };

  const handleClose = () => {
    setShow(false);
    setErrors({});
    setNombreCompleto("");
    setEmail("");
    setRut("");
    setRol("");
    setNewPassword("");
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="prov-popup dark:bg-[#2e2c2f] mt-20 h-570 ">
        <button className="close" onClick={handleClose}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h1 className="h1-form dark:text-[#fff]">Editar Usuario</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="container_inputs">
              <label className="title">Nombre completo</label>
              <input
                type="text"
                value={nombreCompleto}
                onChange={(e) =>
                  handleInputChange("nombreCompleto", e.target.value)
                }
                placeholder="Nombre Completo"
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {errors.nombreCompleto && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.nombreCompleto}
                </p>
              )}
            </div>

            <div className="container_inputs">
              <label className="title">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="example@gmail.cl"
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {errors.email && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="container_inputs">
              <label className="title">Rut</label>
              <input
                type="text"
                value={rut}
                onChange={(e) => handleInputChange("rut", e.target.value)}
                placeholder="11.111.111-1"
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
                maxLength={12}
              />
              {errors.rut && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.rut}
                </p>
              )}
            </div>

            <div className="container_inputs">
              <label className="title">Rol</label>
              <select
                value={rol}
                onChange={(e) => handleInputChange("rol", e.target.value)}
                className="select-user !bg-[#fff] dark:!bg-[#1f1e20] dark:text-[#fff] !p-0"
              >
                <option value="">Seleccione un rol</option>
                <option value="administrador">Administrador</option>
                <option value="usuario">Usuario</option>
              </select>
              {errors.rol && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.rol}
                </p>
              )}
            </div>

            <div className="container_inputs">
              <label className="title">
                Nueva contraseña
                <span className="tooltip-icon">
                  <img src={QuestionIcon} alt="tooltip" />
                  <span className="tooltip-text">Este campo es opcional</span>
                </span>
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                placeholder="**********"
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {errors.newPassword && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.newPassword}
                </p>
              )}
            </div>

            <div className="button-containerForm">
              <button
                type="submit"
                className="button-save dark:bg-[#5f5ac4] dark:text-[#fff]"
              >
                Editar Usuario
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="button-cancel dark:bg-[#403d40] dark:text-[#fff]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
