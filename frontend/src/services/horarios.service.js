import axios from "./root.service.js"; 
import { formatHorarioData } from '@helpers/formatData.js';

// Obtener todos los horarios
export async function getHorarios() {
  try {
    const { data } = await axios.get('/horarios/all');
    console.log(data);
    const formattedData = data.data.map(formatHorarioData);
    return formattedData;
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    return error.response.data;
  }
}

// Crear un nuevo horario
export async function createHorario(horarioData) {
  console.log("Pasando por createHorario horarios.service.js");
  console.log(horarioData);
  try {
    const response = await axios.post("/horarios", horarioData);
    console.log("Response ", response);
    //const formattedData = response.data.map(formatHorarioData);
    //console.log("formattedData ", formattedData);
    return response;
  } catch (error) {
    console.error("Error al crear el horario:", error);
    return error.response.data;
  }
}

// Actualizar un horario existente
export async function updateHorario(id, data) {
  try {
    const response = await axios.patch(`/horarios?id=${id}`, data, {
      id,
      ...data,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    return error.response.data;
  }
}

// Eliminar un horario
export async function deleteHorario(id) {
  try {
    const response = await axios.delete(`/horarios?id=${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el horario:", error);
    return error.response.data;
  }
}