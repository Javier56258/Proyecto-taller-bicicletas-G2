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
    console.log("Servicio Data en Frontend:", servicioData);

    let formData;

    // Si servicioData es un FormData, lo usamos directamente
    if (servicioData instanceof FormData) {
      formData = servicioData;
    } else {
      // Si no, creamos uno nuevo
      formData = new FormData();
      formData.append("nombre", servicioData.nombre);
      formData.append("descripcion", servicioData.descripcion);
      if (servicioData.imagen) {
        formData.append("imagen", servicioData.imagen);
      } else {
        formData.append("imagen", null);
      }
    }

    // Verificar FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post("/servicios/create", servicioData, {
      headers: {
        "Content-Type": "multipart/form-data", // Importante para enviar archivos
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    throw error;
  }
}

// Actualizar un servicio existente
export async function updateServicio(idServicio, servicioData) {
  try {
    let formData;

    // Si servicioData es un FormData, lo usamos directamente
    if (servicioData instanceof FormData) {
      formData = servicioData;
      formData.append("idServicio", idServicio);
    } else {
      // Si no, creamos uno nuevo
      formData = new FormData();
      formData.append("nombre", servicioData.nombre);
      formData.append("descripcion", servicioData.descripcion);
      if (servicioData.imagen) {
        formData.append("imagen", servicioData.imagen);
      }
    }

    const response = await axios.patch("/servicios/detail", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Importante para manejar archivos
      },
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
