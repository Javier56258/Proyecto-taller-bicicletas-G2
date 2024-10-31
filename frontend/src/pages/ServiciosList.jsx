import { useEffect, useState } from 'react';
import { getServicios, createServicio, updateServicio, deleteServicio } from '@services/servicios.service.js';
import ServicioForm from '@components/ServicioForm';
const ServiciosList = () => {
  const [servicios, setServicios] = useState([]);
  const [editingServicio, setEditingServicio] = useState(null);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    }
    fetchServicios();
  }, []);

  const handleSave = async (servicioData) => {
    try {
      if (editingServicio) {
        await updateServicio(editingServicio.id, servicioData);
      } else {
        await createServicio(servicioData);
      }
      const data = await getServicios();
      setServicios(data);
      setEditingServicio(null);
    } catch (error) {
      console.error('Error al guardar el servicio:', error);
    }
  };

  const handleDelete = async (idServicio) => {
    try {
      await deleteServicio(idServicio);
      const data = await getServicios();
      setServicios(data);
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
    }
  };

  return (
    <div>
      <h1>Servicios del Taller</h1>
      <ul>
        {servicios.map((servicio) => (
          <li key={servicio.id}>
            {servicio.nombre} - {servicio.descripcion}
            <button onClick={() => setEditingServicio(servicio)}>Editar</button>
            <button onClick={() => handleDelete(servicio.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <ServicioForm servicio={editingServicio} onSave={handleSave} />
    </div>
  );
};

export default ServiciosList;
