import axios from "./root.service.js"; // Asegúrate de que la ruta sea correcta

// Obtener todos los servicios
export async function getServicios() {
  try {
    const response = await axios.get("/servicios/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    throw error;
  }
}

// Crear un nuevo servicio
export async function createServicio(servicioData) {
  try {
    const response = await axios.post("/servicios/create", servicioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error;
  }
}

// Actualizar un servicio existente
export async function updateServicio(idServicio, servicioData) {
  try {
    const response = await axios.patch(`/servicios/detail`, {
      idServicio,
      ...servicioData,
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el servicio:", error);
    throw error;
  }
}

// Eliminar un servicio
export async function deleteServicio(idServicio) {
  try {
    const response = await axios.delete("/servicios/detail", {
      data: { idServicio },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el servicio:", error);
    throw error;
  }
}
