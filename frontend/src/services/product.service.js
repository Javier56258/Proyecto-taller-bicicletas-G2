import axios from './root.service.js';
import { formatProductData } from '@helpers/formatData.js';

export async function getProducts() {
    try {
        const { data } = await axios.get('/product/all');
        console.log(data);
        const formattedData = data.data.map(formatProductData);
        return formattedData;
    } catch (error) {
        return error.response.data;
    }

}

export async function updateProduct(data,id) {
    try {
        const response = await axios.patch(`/product/detail/?id=${id}`, data);
        console.log(response);
        return response.data.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export async function deleteProduct(id) {
    try {
        const response = await axios.delete(`/product/detail/?id=${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function createProduct(data) {
    try {
        console.log(data);
        const response = await axios.post('/product/', data);
        return response.data.data;
    } catch (error) {
        return error.response.data;
    }
}
