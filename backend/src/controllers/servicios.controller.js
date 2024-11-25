import {
  getAllServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from '../services/servicios.service.js';
import {
  createServicioSchema,
  updateServicioSchema,
  deleteServicioSchema,
} from '../validations/servicios.validation.js';

// Obtener todos los servicios
export async function getServicios(req, res) {
  try {
    const servicios = await getAllServicios();
    res.json(servicios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Crear un nuevo servicio
export async function addServicio(req, res) {
  try {
    const { error } = createServicioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { nombre, descripcion } = req.body;
    const newServicio = await createServicio(nombre, descripcion);
    res.json(newServicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Actualizar un servicio existente
export async function editServicio(req, res) {
  try {
    const { error } = updateServicioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { idServicio, nombre, descripcion } = req.body;
    const updatedServicio = await updateServicio(idServicio, nombre, descripcion);
    res.json(updatedServicio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Eliminar un servicio
export async function removeServicio(req, res) {
  try {
    const { error } = deleteServicioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { idServicio } = req.body;
    await deleteServicio(idServicio);
    res.send('Servicio eliminado');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
