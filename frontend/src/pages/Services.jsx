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
  const [darkMode, setDarkMode] = useState(false); // Estado para modo oscuro

  // Efecto para cargar y almacenar la preferencia de modo oscuro
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    if (savedMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newMode;
    });
  };

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
    <div className="main-content bg-none">
      <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
        Servicios del Taller
      </h1>

      <div className="button-container">
        <button
          className="create-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f]"
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
            className="search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert"
          />
          <button
            className="order-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f]"
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
