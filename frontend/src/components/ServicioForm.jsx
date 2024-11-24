import React, { useState, useEffect } from "react";

const ServicioForm = ({ servicio, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (servicio) {
      setNombre(servicio.nombre);
      setDescripcion(servicio.descripcion);
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [servicio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nombre, descripcion });
    setNombre("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="input-field"
        />
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="input-field"
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ServicioForm;
