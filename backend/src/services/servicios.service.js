import { AppDataSource } from "../config/configDb.js";
import ServicioSchema from "../entity/servicios.entity.js";

// Obtener todos los servicios
export async function getAllServicios() {
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  return await servicioRepository.find();
}

// Crear un nuevo servicio
export async function createServicio(nombre, descripcion) {
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const newServicio = servicioRepository.create({ nombre, descripcion });
  return await servicioRepository.save(newServicio);
}

// Actualizar un servicio existente
export async function updateServicio(idServicio, nombre, descripcion) {
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const servicio = await servicioRepository.findOneBy({ idServicio });
  if (servicio) {
    servicio.nombre = nombre;
    servicio.descripcion = descripcion;
    return await servicioRepository.save(servicio);
  }
  throw new Error("Servicio no encontrado");
}

// Eliminar un servicio
export async function deleteServicio(idServicio) {
  const servicioRepository = AppDataSource.getRepository(ServicioSchema);
  const servicio = await servicioRepository.findOneBy({ idServicio });
  if (servicio) {
    await servicioRepository.remove(servicio);
  } else {
    throw new Error("Servicio no encontrado");
  }
}
