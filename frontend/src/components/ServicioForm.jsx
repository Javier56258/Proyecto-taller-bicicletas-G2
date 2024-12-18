import React, { useState } from "react";
import axios from "axios";

const CrearServicioForm = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar desde form:", { nombre, descripcion, imagen });

    const formData = new FormData();
    formData.append("nombre", nombre); // Asegúrate de agregar los datos correctos
    formData.append("descripcion", descripcion);
    if (imagen) {
      formData.append("imagen", imagen);
    }

    try {
      const response = await axios.post("/servicios/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido correcto
        },
      });
      console.log("Servicio creado con éxito", response.data);
    } catch (error) {
      console.error("Error al crear el servicio", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="imagen">Imagen</label>
        <input type="file" id="imagen" onChange={handleImageChange} />
      </div>

      <button type="submit">Crear Servicio</button>
    </form>
  );
};

export default CrearServicioForm;
