import axios from './root.service.js'

export async function getProductsWithMostStock(limit) {
    const response = await axios.get(`/statistics/products/most-stock?limit=${limit}`);
    return response.data;
}

export async function getProductsWithLeastStock(limit) {
    const response = await axios.get(`/statistics/products/least-stock?limit=${limit}`);
    return response.data.data;
}

export async function getOutOfStockProducts(limit) {
    const response = await axios.get(`/statistics/products/out-of-stock?limit=${limit}`);
    return response.data.data;
}

export async function getProveedoresWithMostProducts(limit) {
    const response = await axios.get(`/statistics/proveedores/most-products?limit=${limit}`);
    return response.data.data;
}

export async function getProveedoresWithOutOfStockProducts(limit) {
    const response = await axios.get(`/statistics/proveedores/out-of-stock-products?limit=${limit}`);
    return response.data.data;
}