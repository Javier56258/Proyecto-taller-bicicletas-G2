"use strict";
import Venta from "../entity/venta.entity.js";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createVentaService(venta) {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        const productRepository = AppDataSource.getRepository(Product);

        const products = await productRepository.findByIds(dataVenta.productIds);
        if (products.length !== dataVenta.productIds.length) throw new Error("Uno o más productos no encontrados");

        const total = products.reduce((sum, product) => sum + product.price, 0);

        const newVenta = ventaRepository.create({
            productos: products,
            total,
        });

        await ventaRepository.save(newVenta);

        return [newVenta, null];
    } catch (error) {
        console.error("Error al crear una venta:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getVentasService() {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        const ventas = await ventaRepository.find();
        return [ventas, null];
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getVentaByDateService(date) {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        const ventas = await ventaRepository.find({
             where: { 
                fecha: date 
            }, 
            relations: ["productos"] 
        });
        return [ventas, null];
    } catch (error) {
        console.error("Error al obtener ventas por fecha:", error);
        return [null, "Error interno del servidor"];
    }
}