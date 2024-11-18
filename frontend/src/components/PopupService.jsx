import React, { useState, useEffect } from "react";
import "@styles/form.css";
import "@styles/popup.css";
import CloseIcon from "@assets/XIcon.svg";

export default function PopupService({ show, setShow, onSave, servicio }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null); // Añadido: Estado para la imagen

  useEffect(() => {
    if (show && servicio) {
      setNombre(servicio.nombre);
      setDescripcion(servicio.descripcion);
    } else if (show) {
      setNombre("");
      setDescripcion("");
    }

    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show, servicio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...servicio, nombre, descripcion });
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={handleClose}>
          <img src={CloseIcon} alt="Close" />
        </button>
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        >
          <h1>{servicio ? "Editar Servicio" : "Crear Servicio"}</h1>
          <div className="container_inputs">
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Descripción:</label>
              <textarea
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-containerForm">
            <button type="submit">{servicio ? "Guardar" : "Crear"}</button>
            <button type="button" onClick={handleClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
