import { useEffect, useState } from "react";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "@services/servicios.service.js";
import ServiceCard from "@components/ServiceCard";
import PopupService from "@components/PopupService";
import "@styles/service_form.css";
import "@styles/services.css";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "@helpers/sweetAlert.js";

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [editingServicio, setEditingServicio] = useState(null);
  const [filter, setFilter] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const data = await getServicios();
        data.sort((a, b) => b.idServicio - a.idServicio);
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      }
    }
    fetchServicios();
  }, []);

  const handleSave = async (servicioData) => {
    try {
      if (editingServicio) {
        await updateServicio(editingServicio.idServicio, servicioData);
        showSuccessAlert(
          "¡Actualizado!",
          "El servicio ha sido actualizado correctamente."
        );
        const updatedServicios = servicios.map((servicio) =>
          servicio.idServicio === editingServicio.idServicio
            ? servicioData
            : servicio
        );
        setServicios(updatedServicios);
      } else {
        showSuccessAlert(
          "¡Creado!",
          "El servicio ha sido creado correctamente."
        );
        const newServicio = await createServicio(servicioData);
        setServicios([newServicio, ...servicios]);
      }
      setEditingServicio(null);
    } catch (error) {
      console.error("Error al guardar el servicio:", error);
      showErrorAlert(
        "Cancelado",
        "Ocurrió un error al actualizar el servicio."
      );
    }
  };

  const handleDelete = async (idServicio) => {
    try {
      const result = await deleteDataAlert();
      if (result.isConfirmed) {
        await deleteServicio(idServicio);
        showSuccessAlert(
          "¡Eliminado!",
          "El servicio ha sido eliminado correctamente."
        );
        const data = await getServicios();
        data.sort((a, b) => b.idServicio - a.idServicio);
        setServicios(data);
      } else {
        showErrorAlert("Cancelado", "La operación ha sido cancelada.");
      }
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      showErrorAlert("Cancelado", "Ocurrió un error al eliminar el servicio.");
    }
  };

  const handleEdit = (servicio) => {
    setEditingServicio(servicio);
    setIsPopupOpen(true);
  };

  const filteredServicios = servicios.filter((servicio) =>
    servicio.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  const displayedServicios = isReversed
    ? [...filteredServicios].reverse()
    : filteredServicios;

  return (
    <div className="main-content">
      <div className="centered-h1">
        <h1>Servicios del Taller</h1>
      </div>
      <div className="button-container">
        <button
          className="create-button"
          onClick={() => {
            setEditingServicio(null);
            setIsPopupOpen(true);
          }}
        >
          Crear Servicio
        </button>
        <div className="right-buttons">
          <input
            type="text"
            placeholder="Filtrar por nombre"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input-table"
          />
          <button
            className="order-button"
            onClick={() => setIsReversed(!isReversed)}
          >
            {isReversed ? "Orden: Más antiguo" : "Orden: Más reciente"}
          </button>
        </div>
      </div>
      <PopupService
        show={isPopupOpen}
        setShow={setIsPopupOpen}
        onSave={handleSave}
        servicio={editingServicio}
      />
      <div className="services-grid">
        {displayedServicios.map((servicio) => (
          <ServiceCard
            key={servicio.idServicio}
            servicio={servicio}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiciosList;
