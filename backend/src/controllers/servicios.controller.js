import {
  getAllServicios,
  createServicio,
  updateServicio,
  deleteServicio,
} from "../services/servicios.service.js";
import {
  createServicioSchema,
  updateServicioSchema,
  deleteServicioSchema,
} from "../validations/servicios.validation.js";
import fs from "fs";
import path from "path";

// Obtener todos los servicios
export async function getServicios(req, res) {
  try {
    const servicios = await getAllServicios();
    console.log("Servicios obtenidos:", servicios); // Verificar los servicios obtenidos
    res.json(servicios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

// Crear un nuevo servicio

// Crear un nuevo servicio
export const addServicio = async (req, res) => {
  try {
    req.body.imagen = req.file?.filename || null; // Agrega el nombre de la imagen al cuerpo
    console.log("Datos del formulario:", req.body); // Verificar los datos del formulario
    const { error } = createServicioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Llamar a la función de servicio para crear el servicio en la base de datos
    const { nombre, descripcion, imagen } = req.body;
    const savedServicio = await createServicio(nombre, descripcion, imagen);

    console.log("Servicio creado:", savedServicio);

    res
      .status(201)
      .json({ message: "Servicio creado exitosamente", savedServicio });
  } catch (err) {
    console.error("Error al crear servicio:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un servicio existente
export async function editServicio(req, res) {
  try {
    // Validación de los datos
    const { error } = updateServicioSchema.validate(req.body);
    if (error) {
      console.log("Error en la validación:", error.message); // Log de error en la validación
      return res.status(400).json({ message: error.message });
    }

    const { idServicio, nombre, descripcion } = req.body;
    console.log("Datos recibidos para editar el servicio:", {
      idServicio,
      nombre,
      descripcion,
    }); // Verificar los datos para edición

    let imagen = req.file ? req.file.filename : null;
    console.log("Imagen recibida para actualizar:", imagen); // Verificar si hay nueva imagen

    // Actualizar el servicio en la base de datos
    const updatedServicio = await updateServicio(
      idServicio,
      nombre,
      descripcion,
      imagen,
    );
    console.log("Servicio actualizado:", updatedServicio); // Verificar el servicio actualizado
    res.json(updatedServicio);
  } catch (err) {
    console.error("Error al actualizar el servicio:", err.message);
    res.status(500).send("Server Error");
  }
}

export async function removeServicio(req, res) {
  try {
    const { error } = deleteServicioSchema.validate(req.body);
    if (error) {
      console.log("Error en la validación:", error.message);
      return res.status(400).json({ message: error.message });
    }

    const { idServicio } = req.body;
    console.log("ID del servicio a eliminar:", idServicio);

    const servicios = await getAllServicios();
    const servicioActual = servicios.find(
      (servicio) => servicio.idServicio === idServicio,
    );
    console.log("Servicio actual a eliminar:", servicioActual);

    if (!servicioActual) {
      return res.status(404).json({ message: "Servicio no encontrado" });
    }

    // Eliminar la imagen asociada
    if (servicioActual?.imagen) {
      const imagePath = path.join("./uploads/", servicioActual.imagen);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("Imagen eliminada:", imagePath);
      }
    }

    // Eliminar el servicio de la base de datos
    await deleteServicio(idServicio);
    console.log("Servicio eliminado con éxito.");
    res.send("Servicio eliminado");
  } catch (err) {
    console.error("Error al eliminar el servicio:", err.message);
    res.status(500).send("Server Error");
  }
}
