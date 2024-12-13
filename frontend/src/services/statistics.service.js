import axios from './root.service.js'

export async function getProductsWithMostStock(limit) {
    const response = await axios.get(`/statistics/products/most-stock?limit=${limit}`);
    return response.data;
}

export async function getProductsWithLeastStock(limit) {
    const response = await axios.get(`/statistics/products/least-stock?limit=${limit}`);
    return response.data.data;
}

export async function getOutOfStockProducts() {
    const response = await axios.get(`/statistics/products/out-of-stock`);
    return response.data.data;
}

export async function getProveedoresWithMostProducts() {
    const response = await axios.get(`/statistics/proveedores/most-products`);
    return response.data.data;
}

export async function getProveedoresWithOutOfStockProducts() {
    const response = await axios.get(`/statistics/proveedores/out-of-stock-products`);
    return response.data.data;
}