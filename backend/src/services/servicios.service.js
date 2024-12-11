import { AppDataSource } from "../config/configDb.js";
import ServicioSchema from "../entity/servicios.entity.js";

// Obtener todos los servicios
export async function getAllServicios() {
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const servicios = await servicioRepository.find();
  console.log("Servicios obtenidos desde la base de datos:", servicios); // Log de los servicios obtenidos
  return servicios;
}

// Crear un nuevo servicio
export async function createServicio(nombre, descripcion, imagenPath) {
  console.log("Creando servicio con los siguientes datos:"); // Log de inicio de creación de servicio
  console.log("Nombre:", nombre);
  console.log("Descripción:", descripcion);
  console.log("Ruta de la imagen:", imagenPath); // Log para verificar la ruta de la imagen

  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const newServicio = servicioRepository.create({
    nombre,
    descripcion,
    imagen: imagenPath, // Guardar la ruta de la imagen
  });

  // Log del nuevo servicio antes de guardarlo en la base de datos
  console.log("Nuevo servicio a guardar:", newServicio);

  const savedServicio = await servicioRepository.save(newServicio);
  console.log("Servicio creado y guardado:", savedServicio); // Log después de guardar el servicio en la base de datos

  return savedServicio;
}

// Actualizar un servicio existente
export async function updateServicio(
  idServicio,
  nombre,
  descripcion,
  imagenPath,
) {
  console.log("Actualizando servicio con ID:", idServicio); // Log para verificar el ID del servicio a actualizar
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const servicio = await servicioRepository.findOneBy({ idServicio });

  if (servicio) {
    console.log("Servicio encontrado:", servicio); // Log para verificar el servicio que se va a actualizar

    servicio.nombre = nombre;
    servicio.descripcion = descripcion;
    if (imagenPath) {
      console.log("Actualizando imagen con ruta:", imagenPath); // Log si se va a actualizar la imagen
      servicio.imagen = imagenPath; // Actualizar la imagen si se proporciona
    }

    const updatedServicio = await servicioRepository.save(servicio);
    console.log("Servicio actualizado:", updatedServicio); // Log después de actualizar el servicio
    return updatedServicio;
  }
  throw new Error("Servicio no encontrado");
}

// Eliminar un servicio
export async function deleteServicio(idServicio) {
  console.log("Eliminando servicio con ID:", idServicio); // Log para verificar el ID del servicio a eliminar
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const servicio = await servicioRepository.findOneBy({ idServicio });

  if (servicio) {
    console.log("Servicio encontrado para eliminar:", servicio); // Log para verificar el servicio que se va a eliminar
    await servicioRepository.remove(servicio);
    console.log("Servicio eliminado exitosamente.");
  } else {
    throw new Error("Servicio no encontrado");
  }
}
