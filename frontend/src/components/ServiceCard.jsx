import React from "react";
import updateIcon from "@assets/updateIcon.svg";
import deleteIcon from "@assets/deleteIcon.svg";

const ServiceCard = ({ servicio, onEdit, onDelete }) => {
  return (
    <div className="service-card">
      {servicio.imagen && <img src={servicio.imagen} alt={servicio.nombre} style={{ width: "100px", height: "100px" }} />}
      <h2>{servicio.nombre}</h2>
      <p>{servicio.descripcion}</p>
      <button onClick={() => onEdit(servicio)}>
        <img src={updateIcon} alt="Editar" />
      </button>
      <button onClick={() => onDelete(servicio.idServicio)}>
        <img src={deleteIcon} alt="Eliminar" />
      </button>
    </div>
  );
};

export default ServiceCard;
