"use strict";
import Venta from "../entity/venta.entity.js";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { Between } from "typeorm";


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
            productos: product,
            total,
            cantidad: dataVenta.cantidad,
            nombreProducto: product.name,            
        });
        console.log("Venta creada:", newVenta); // Agregar log para verificar los datos de la venta

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

export async function getVentasByDateService(startDate, endDate) {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        console.log("Fecha de inicio:", startDate);
        console.log("Fecha de fin:", endDate);

        const start = new Date(startDate);
        const end = new Date(endDate);
        

        const ventas = await ventaRepository.find({
             where: { 
                fecha: Between(start.toISOString(), end.toISOString())
            }, 
            relations: ["producto"] 
        });
        console.log("Ventas encontradas:", ventas);
        return [ventas, null];
    } catch (error) {
        console.error("Error al obtener ventas por fecha:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function delVentasService() {
    try {
        const ventaRepository = AppDataSource.getRepository(Venta);
        const ventas = await ventaRepository.find();
        await ventaRepository.remove(ventas);
        return [ventas, null];
    } catch (error) {
        console.error("Error al eliminar ventas:", error);
        return [null, "Error interno del servidor"];
    }
}