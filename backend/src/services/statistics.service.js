"use strict"

import { Between } from "typeorm";
import { AppDataSource } from "../config/configDb.js";
import Product from "../entity/product.entity.js";
import Proveedor from "../entity/proveedor.entity.js";
import Venta from "../entity/venta.entity.js"; 
import Reserva from "../entity/reserva.entity.js";

//productos con más stock
export async function getProductsWithMostStock(limit) {
    const productRepository = AppDataSource.getRepository(Product);
    const productos = await productRepository.find({ 
        order: { stock: "DESC" },
        take: limit
    });
    return productos;
}

// Obtener productos con menos stock
export async function getProductsWithLeastStock(limit) {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
        order: { stock: "ASC" },
        take: limit
    });
    return products;
}

// Obtener productos agotados
export async function getOutOfStockProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
        where: { stock: 0 }
    });
    return products;
}

// Obtener proveedores con más productos
export async function getProveedoresWithMostProducts() {
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    const proveedores = await proveedorRepository
        .createQueryBuilder("proveedor")
        .leftJoin("proveedor.productos", "producto")
        .select("proveedor.idProveedor", "idProveedor")
        .addSelect("proveedor.nombreProveedor", "nombreProveedor")
        .addSelect("COUNT(producto.id) AS Cantidad_de_productos")
        .groupBy("proveedor.idProveedor")
        .addGroupBy("proveedor.nombreProveedor")
        .orderBy("Cantidad_de_productos", "DESC")
        .getRawMany();
    return proveedores;
}

export async function getProveedoresWithOutOfStockProducts() {
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    const proveedores = await proveedorRepository
        .createQueryBuilder("proveedor")
        .leftJoin("proveedor.productos", "producto")
        .select("proveedor.idProveedor", "idProveedor")
        .addSelect("proveedor.nombreProveedor", "nombreProveedor")
        .addSelect("COUNT(producto.id) AS Cantidad_de_productos_agotados")
        .where("producto.stock = 0")
        .groupBy("proveedor.idProveedor")
        .addGroupBy("proveedor.nombreProveedor")
        .orderBy("Cantidad_de_productos_agotados", "DESC")
    .getRawMany();
    return proveedores;
}

export async function getMostSoldProducts(limit) {
    const ventaRepository = AppDataSource.getRepository(Venta);
    const productos = await ventaRepository
        .createQueryBuilder("venta")
        .select("venta.idProducto", "idProducto")
        .addSelect("venta.nombreProducto", "nombre_producto")
        .addSelect("SUM(venta.cantidad) AS totalVentas")
        .groupBy("venta.idProducto")
        .addGroupBy("venta.nombreProducto")
        .orderBy("totalVentas", "DESC")
        .take(limit)
        .getRawMany();
    return productos;
}

export async function getEarningsByDateRange(startDate, endDate) {
    const ventaRepository = AppDataSource.getRepository(Venta);
    const ganancias = await ventaRepository
        .createQueryBuilder("venta")
        .select("SUM(venta.total) AS totalGanancias")
        .where("venta.fecha BETWEEN :startDate AND :endDate", { startDate, endDate })
        .getRawOne();
    return ganancias;
}

export async function getProveedoresWithMostSoldProducts(limit) {
    const ventaRepository = AppDataSource.getRepository(Venta);
    
    const proveedores = await ventaRepository
        .createQueryBuilder("venta")
        .innerJoin("venta.productos", "producto")
        .innerJoin("producto.proveedores", "proveedor")
        .select("proveedor.idProveedor", "idProveedor")
        .addSelect("proveedor.nombreProveedor", "nombreProveedor")
        .addSelect("SUM(venta.cantidad) AS totalVentasProveedor")
        .groupBy("proveedor.idProveedor")
        .addGroupBy("proveedor.nombreProveedor")
        .orderBy("totalVentasProveedor", "DESC")
        .limit(limit)
        .getRawMany();
    return proveedores;
}

export async function getMostRequestedServices(limit) {
    const reservaRepository = AppDataSource.getRepository(Reserva);
    const motivos = await reservaRepository
        .createQueryBuilder("reserva")
        .select("reserva.motivo, COUNT(reserva.idreserva) AS totalSolicitudes")
        .groupBy("reserva.motivo")
        .orderBy("totalSolicitudes", "DESC")
        .limit(limit)
        .getRawMany();
    return motivos;
}
