import React, { useState, useEffect } from 'react';

const ServicioForm = ({ servicio, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    if (servicio) {
      setNombre(servicio.nombre);
      setDescripcion(servicio.descripcion);
    } else {
      setNombre('');
      setDescripcion('');
    }
  }, [servicio]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nombre, descripcion });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Descripción:
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </label>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ServicioForm;
