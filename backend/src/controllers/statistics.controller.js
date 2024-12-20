"use strict";
import {
    getProductsWithMostStock,
    getProductsWithLeastStock,
    getOutOfStockProducts,
    getProveedoresWithMostProducts,
    getProveedoresWithOutOfStockProducts,
    getMostSoldProducts,
    getEarningsByDateRange,
    getProveedoresWithMostSoldProducts,
    getMostRequestedServices,
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

export async function getMostSoldProductsController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const products = await getMostSoldProducts(limit);
        handleSuccess(res, 200, "Productos más vendidos obtenidos", products);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getEarnings(req, res) {
    const startDate = req.query.startDate || new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0];
    const endDate = req.query.endDate || new Date().toISOString().split('T')[0];
    if (!startDate || !endDate) {
        return res.status(400).json({ message: "se debe ingresar una fecha de inicio y de fin" });
    }

    try {
        const ganancias = await getEarningsByDateRange(startDate, endDate);
        return res.status(200).json(ganancias);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



export async function getProveedoresWithMostSoldProductsController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3; 
        const proveedores = await getProveedoresWithMostSoldProducts(limit);
        handleSuccess(res, 200, "Proveedores con más productos vendidos obtenidos", proveedores);
    } catch (error) {
        console.error("Error uniendo los productos:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export async function getMostRequestedServicesController(req, res) {
    try {
        const limit = parseInt(req.query.limit) || 3;
        const motivos = await getMostRequestedServices(limit);
        handleSuccess(res, 200, "Servicios más solicitados obtenidos", motivos);
    } catch (error) {
        console.error("Error fetching most requested services:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}