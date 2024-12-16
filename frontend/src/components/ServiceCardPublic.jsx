import React, { useState } from "react";
import PropTypes from "prop-types";

const ServiceCardPublic = ({ servicio }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const MAX_DESCRIPTION_LENGTH = 100; // Límite de caracteres visibles
  const descripcionCompleta = servicio.descripcion || ""; // Aseguramos que exista una descripción
  const isTruncated = descripcionCompleta.length > MAX_DESCRIPTION_LENGTH; // Verifica si se necesita truncar

  const handleToggleDescription = () => {
    setShowFullDescription((prev) => !prev);
  };

  const imageUrl = `http://localhost:3000/uploads/${servicio.imagen}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 dark:bg-gray-800 dark:shadow-lg max-w-xs w-full mx-auto">
      {servicio.imagen && (
        <img
          src={imageUrl}
          alt={servicio.nombre}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {servicio.nombre}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {showFullDescription
            ? descripcionCompleta
            : `${descripcionCompleta.slice(0, MAX_DESCRIPTION_LENGTH)}${
                isTruncated ? "..." : ""
              }`}
        </p>
        {isTruncated && (
          <button
            className="text-blue-500 dark:text-blue-400 font-medium mt-3 hover:underline"
            onClick={handleToggleDescription}
          >
            {showFullDescription ? "Ver menos" : "Ver más"}
          </button>
        )}
      </div>
    </div>
  );
};

ServiceCardPublic.propTypes = {
  servicio: PropTypes.shape({
    idServicio: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string, // Es opcional para evitar errores si no está definido
    imagen: PropTypes.string, // También opcional
  }).isRequired,
};

export default ServiceCardPublic;
