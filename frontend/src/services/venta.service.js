// frontend/src/services/venta.service.js
import axios from './root.service.js';

export async function createVenta(data) {
  try {
    const response = await axios.post('/ventas', data);
    return response.data;
  } catch (error) {
    console.error('Error al crear la venta:', error);
    throw error;
  }
}

export async function getVentas() {
  try {
    const response = await axios.get('/ventas/all');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
    throw error;
  }
}

export async function getVentasByDate(startDate, endDate) {
  try {
    const response = await axios.get('/ventas/by-date', { params: { startDate, endDate } });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las ventas por fecha:', error);
    throw error;
  }
}

export async function delVentas() {
  try {
    const response = await axios.delete('/ventas');
    return response.data;
  } catch (error) {
    console.error('Error al eliminar las ventas:', error);
    throw error;
  }
}