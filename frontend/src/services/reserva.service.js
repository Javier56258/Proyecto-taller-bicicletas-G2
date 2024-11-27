import axios from './root.service.js';
import { formatReservaData } from '@helpers/formatData.js';
console.log("Pasando por reserva.service.js");  

export async function getReservas() {
    try {
        const { data } = await axios.get('/reservas/all');
        console.log(data);
        const formattedData = data.data.map(formatReservaData);
        console.log("Pasando por getReservas formattedData");
        console.log(formattedData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }

}

export async function updateReserva(data, idreserva) {
    try {
        console.log("Pasando por updateReserva en reserva.service.js del front");
        const response = await axios.patch(`/reservas/detail/?idreserva=${idreserva}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export async function deleteReserva(idreserva) {
    try {
        const response = await axios.delete(`/reservas?idreserva=${idreserva}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}