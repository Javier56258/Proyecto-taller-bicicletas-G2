import axios from './root.service.js';
import { formatProveedorData } from '@helpers/formatData.js';

export async function getProveedores() {
    try {
        const { data } = await axios.get('/proveedor/all');
        console.log(data);
        const formattedData = data.data.map(formatProveedorData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }
} 

export async function updateProveedor(data, idProveedor) {
    try {
        const response = await axios.patch(`/proveedor/detail/?idProveedor=${idProveedor}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export async function deleteProveedor(idProveedor) {
    try {
        const response = await axios.delete(`/proveedor/detail/?idProveedor=${idProveedor}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}