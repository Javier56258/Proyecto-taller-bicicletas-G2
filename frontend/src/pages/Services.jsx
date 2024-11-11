import { useEffect, useState } from "react";
import {
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "@services/servicios.service.js"; // Ensure this path is correct
import ServicioForm from "@components/ServicioForm"; // Ensure this path is correct
import TableService from "@components/TableService"; // Ensure this path is correct

const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [editingServicio, setEditingServicio] = useState(null);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const data = await getServicios();
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
      } else {
        await createServicio(servicioData);
      }
      const data = await getServicios();
      setServicios(data);
      setEditingServicio(null);
    } catch (error) {
      console.error("Error al guardar el servicio:", error);
    }
  };

  const handleDelete = async (idServicio) => {
    try {
      console.log("Deleting service with id:", idServicio); // Debugging line
      await deleteServicio(idServicio);
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
    }
  };

  const handleEdit = (servicio) => {
    setEditingServicio(servicio);
  };

  const columns = [
    { header: "Nombre", accessor: "nombre" },
    { header: "Descripción", accessor: "descripcion" },
    {
      header: "Acciones",
      accessor: "acciones",
      Cell: ({ row }) => (
        <>
          <button onClick={() => handleEdit(row)}>Editar</button>
          <button onClick={() => handleDelete(row.idServicio)}>Eliminar</button>
        </>
      ),
    },
  ];

  return (
    <div className="main-content">
      <h1>Servicios del Taller</h1>
      <ServicioForm servicio={editingServicio} onSave={handleSave} />
      <TableService data={servicios} columns={columns} />
    </div>
  );
};

export default ServiciosList;
