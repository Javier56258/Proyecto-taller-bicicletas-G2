import React, { useState, useEffect } from "react";
import CloseIcon from "@assets/XIcon.svg";
import "@styles/Popup.css";

export default function PopupService({ show, setShow, onSave, servicio }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [errors, setErrors] = useState({}); // Manejo de errores

  useEffect(() => {
    if (show && servicio) {
      // Si el popup es para editar, asignar los valores existentes
      setNombre(servicio.nombre);
      setDescripcion(servicio.descripcion);

      if (servicio.imagen) {
        setImagenPreview(`http://localhost:3000/uploads/${servicio.imagen}`);
      } else {
        setImagenPreview(null);
      }
    } else if (show) {
      // Si el popup es nuevo, limpiar los valores
      setNombre("");
      setDescripcion("");
      setImagenPreview(null);
    }

    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show, servicio]);

  const validate = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio.";
    } else if (nombre.length < 5 || nombre.length > 50) {
      newErrors.nombre = "El nombre debe tener entre 5 y 50 caracteres.";
    }

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria.";
    } else if (descripcion.length < 10) {
      newErrors.descripcion =
        "La descripción debe tener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los campos
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Mostrar los errores
      return;
    }

    // Preparar datos para enviar al backend
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (imagen) formData.append("imagen", imagen);

    onSave(formData);
    setShow(false); // Cerrar el popup después de guardar
    setErrors({}); // Limpiar errores después de guardar
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setShow(false); // Cerrar el popup
    setErrors({}); // Limpiar los errores
    setNombre(""); // Limpiar el campo nombre
    setDescripcion(""); // Limpiar el campo descripción
    setImagenPreview(null); // Limpiar la imagen previa
    setImagen(null); // Limpiar la imagen
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="prov-popup dark:bg-[#2e2c2f] mt-20 h-570">
        <button className="close" onClick={handleClose}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h1 className="h1-form dark:text-[#fff]">
          {servicio ? "Editar Servicio" : "Crear Servicio"}
        </h1>
        <div className="proovedores-form-container">
          <form onSubmit={handleSubmit} className="form">
            <div className="container_inputs">
              <label className="title">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese nombre del servicio"
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {errors.nombre && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.nombre}
                </p>
              )}
            </div>
            <div className="container_inputs">
              <label className="title">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Ingrese descripción del servicio"
                className="textarea dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {errors.descripcion && (
                <p className="error-message dark:text-red-400 visible">
                  {errors.descripcion}
                </p>
              )}
            </div>
            <div className="container_inputs">
              <label className="title">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input dark:bg-[#1f1e20] dark:text-[#fff]"
              />
              {imagenPreview && (
                <div className="preview-container">
                  <h3 className="title dark:text-[#fff]">Vista previa:</h3>
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    className="preview-image"
                  />
                </div>
              )}
            </div>
            <div className="button-containerForm">
              <button
                type="submit"
                className="button-save dark:bg-[#5f5ac4] dark:text-[#fff]"
              >
                {servicio ? "Guardar Cambios" : "Crear Servicio"}
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
