import axios from './root.service.js';
import { formatReservaData } from '@helpers/formatData.js';

export async function getReservas() {
    try {
        const { data } = await axios.get('/reserva/all');
        console.log(data);
        const formattedData = data.data.map(formatReservaData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }

}

export async function updateReserva(data, id) {
    try {
        const response = await axios.patch(`/reserva/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export async function deleteReserva(id) {
    try {
        const response = await axios.delete(`/reserva/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}