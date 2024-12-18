import { useState } from "react";
import "@styles/popup_filtrosRes.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from './Form';

export default function PopupFiltrosRes({ show, onClose, filters, setFilters, applyFilters }) {
  if(!show) return null;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      fechaInicio: "",
      fechaFin: "",
      nombre: "",
      correo: "",
      servicio: "",
    });
  };
  const [filtros, setFiltros] = useState({ fechaInicio: null });
  const defaultValue = null;
  const fechaInicio = filtros?.fechaInicio || defaultValue;
  const fechaFin = filtros?.fechaFin || defaultValue;

  const handleApply = () => {
    if (typeof applyFilters === "function") {
      applyFilters();
    } else {
      console.error("applyFilters no es una función");
    }
    onClose();
  };

  return (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={ onClose }>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <div className="filtros-form-container">
          <Form
            title="Filtros para reserva"
            fields={[
              {
                label: "Fecha de inicio",
                name: "fechaInicio",
                placeholder: "Fecha de inicio",
                fieldType: "input",
                type: "date",
                required: false,
                value: filters.fechaInicio,
                onChange: handleFilterChange,
              },
              {
                label: "Fecha de fin",
                name: "fechaFin",
                placeholder: "Fecha de fin",
                fieldType: "input",
                type: "date",
                required: false,
                value: filters.fechaFin,
                onChange: handleFilterChange,
              },
              {
                label: "Nombre del reservador",
                name: "nombreReservador",
                placeholder: "Nombre del reservador",
                fieldType: "input",
                type: "text",
                required: false,
                value: filters.nombre,
                onChange: handleFilterChange,
              },
              {
                label: "Correo electrónico",
                name: "email",
                placeholder: "Correo electrónico",
                fieldType: "input",
                type: "text",
                required: false,
                value: filters.correo,
                onChange: handleFilterChange,
              },
              {
                label: "Servicio",
                name: "motivo",
                placeholder: "Selección de servicio",
                fieldType: "select",
                options: [
                  { value: "", label: "Selección de servicio" },
                  { value: "Limpieza de bicicleta", label: "Limpieza de bicicleta" },
                  // Agregar más opciones de servicios si es necesario
                  ],
                required: false,
                value: filters.servicio,
                onChange: handleFilterChange,
              },
            ]}
            
          />
          <button onClick={handleApply}>Aplicar filtros</button>

          <button className="reset-button" onClick={resetFilters}>
            Restablecer filtros
          </button>
        </div>
      </div>
    </div>
  );
}