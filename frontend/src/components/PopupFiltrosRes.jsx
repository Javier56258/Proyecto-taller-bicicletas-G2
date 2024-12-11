import { useState } from "react";
import "@styles/popup_filtrosRes.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from './Form';

export default function ReservaPopup({ show, setShow, action }) {
  // Estado para los filtros
  const [filters, setFilters] = useState({
    fechaInicio: "",
    fechaFin: "",
    nombre: "",
    correo: "",
    servicio: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que al menos un filtro tenga datos
    const hasFilters = Object.values(filters).some((value) => value.trim() !== "");
    if (!hasFilters) {
      alert("Debes seleccionar o ingresar al menos un filtro.");
      return;
    }
    action(filters); // Pasar los filtros seleccionados
    setShow(false); // Cerrar el popup
  };

  if (!show) return null; // No renderizar el popup si no está activo

  return (
    <div>
      {show && (
    <div className="bg">
      <div className="popup">
        <button className="close" onClick={() => setShow(false)}>
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
              onChange: handleInputChange,
            },
            {
              label: "Fecha de fin",
              name: "fechaFin",
              placeholder: "Fecha de fin",
              fieldType: "input",
              type: "date",
              required: false,
              value: filters.fechaFin,
              onChange: handleInputChange,
            },
            {
              label: "Nombre del reservador",
              name: "nombre",
              placeholder: "Nombre del reservador",
              fieldType: "input",
              type: "text",
              required: false,
              value: filters.nombre,
              onChange: handleInputChange,
            },
            {
              label: "Correo electrónico",
              name: "correo",
              placeholder: "Correo electrónico",
              fieldType: "input",
              type: "email",
              required: false,
              value: filters.correo,
              onChange: handleInputChange,
            },
            {
              label: "Servicio",
              name: "servicio",
              placeholder: "Selección de servicio",
              fieldType: "select",
              options: [
                { value: "", label: "Selección de servicio" },
                { value: "Limpieza de bicicleta", label: "Limpieza de bicicleta" },
                // Agregar más opciones de servicios si es necesario
              ],
              required: false,
              value: filters.servicio,
              onChange: handleInputChange,
            },
          ]}
          onSubmit={handleSubmit}
          buttonText={"Aplicar filtros"}
      
        
        />
        </div>
        </div>
        </div>)}
    </div>
  );

}



        

     
