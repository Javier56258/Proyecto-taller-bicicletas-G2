import axios from "./root.service.js";
import { formatProveedorData } from "@helpers/formatData.js";

export async function createProveedor(data) {
  try {
    const response = await axios.post("/proveedor", data);
    console.log(data);
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
}

export async function getProveedores() {
  try {
    const { data } = await axios.get("/proveedor/all");
    console.log(data);
    const formattedData = data.data.map(formatProveedorData);
    return formattedData;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateProveedor(data, idProveedor) {
  try {
    const response = await axios.patch(
      `/proveedor/detail/?idProveedor=${idProveedor}`, // idProveedor en la query
      data // Los datos en el cuerpo de la solicitud
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response
      ? error.response.data
      : { status: "Error", details: "Error desconocido" };
  }
}

export async function deleteProveedor(idProveedor) {
  try {
    console.log("Solicitando eliminación para ID:", idProveedor); // Verifica el ID
    const response = await axios.delete(
      `/proveedor/detail/?idProveedor=${idProveedor}`
    );
    console.log("Respuesta del backend:", response.data); // Muestra la respuesta del backend
    return response.data;
  } catch (error) {
    console.error("Error en deleteProveedor:", error); // Registra cualquier error
    return error.response
      ? error.response.data
      : { status: "Error", details: "Error desconocido" };
  }
}
