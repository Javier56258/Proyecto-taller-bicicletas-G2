"use strict";
import {
    getProductsWithMostStock,
    getProductsWithLeastStock,
    getOutOfStockProducts,
    getProveedoresWithMostProducts,
    getProveedoresWithOutOfStockProducts
} from "../services/statistics.service.js";
import { handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function getProductsWithMostStockController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const products = await getProductsWithMostStock(limit);
        handleSuccess(res, 200, "Productos con más stock", products);
    } catch (error) {
        handleErrorServer(res, 500, "Error al obtener los productos con más stock");
    }
}

export async function getProductsWithLeastStockController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const products = await getProductsWithLeastStock(limit);
        handleSuccess(res, 200, "Productos con menos stock obtenidos", products);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getOutOfStockProductsController(req, res) {
    try {
        const products = await getOutOfStockProducts();
        handleSuccess(res, 200, "Productos agotados obtenidos", products);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedoresWithMostProductsController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const proveedores = await getProveedoresWithMostProducts(limit);
        handleSuccess(res, 200, "Proveedores con más productos obtenidos", proveedores);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedoresWithOutOfStockProductsController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const proveedores = await getProveedoresWithOutOfStockProducts(limit);
        handleSuccess(res, 200, "Proveedores con productos agotados obtenidos", proveedores);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}