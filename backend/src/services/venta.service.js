"use strict";
import Venta from "../entity/venta.entity.js";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";


export async function createVentaService(dataVenta) {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({
            where: {
                id: dataVenta.idProducto
            }
        });

        if (!product) {
            return [null, "Producto no encontrado"];
        }
        if (product.stock < dataVenta.cantidad) {
            return [null, "Stock insuficiente"];
        }

        const total = product.price * dataVenta.cantidad;
        const newVenta = ventaRepository.create({
            producto: product,
            total,
            cantidad: dataVenta.cantidad,
            nombreProducto: product.name,
            
        });

        await ventaRepository.save(newVenta);

        // Actualizar el stock usando el método update
        await productRepository.update(product.id, { stock: product.stock - dataVenta.cantidad });

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