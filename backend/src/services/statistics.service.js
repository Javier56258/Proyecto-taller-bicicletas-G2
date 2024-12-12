"use strict"
import { AppDataSource } from "../config/configDb.js";
import Product from "../entity/product.entity.js";
import Proveedor from "../entity/proveedor.entity.js";

//productos con más stock
export async function getProductsWithMostStock(limit = 3) {
    const productRepository = AppDataSource.getRepository(Product);
    const productos = await productRepository.find({ 
        order: { stock: "DESC" },
        take: limit
    });
    return productos;
}

// Obtener productos con menos stock
export async function getProductsWithLeastStock(limit = 3) {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
        order: { stock: "ASC" },
        take: limit
    });
    return products;
}

// Obtener productos agotados
export async function getOutOfStockProducts(limit = 3) {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
        where: { stock: 0 }
    });
    return products;
}

// Obtener proveedores con más productos
export async function getProveedoresWithMostProducts(limit = 3) {
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    const proveedores = await proveedorRepository
        .createQueryBuilder("proveedor")
        .leftJoinAndSelect("proveedor.productos", "producto")
        .groupBy("proveedor.idProveedor")
        .orderBy("COUNT(producto.id)", "DESC")
        .take(limit) 
        .getMany();
    return proveedores;
}

export async function getProveedoresWithOutOfStockProducts(limit = 3) {
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    const proveedores = await proveedorRepository
        .createQueryBuilder("proveedor")
        .leftJoinAndSelect("proveedor.productos", "producto")
        .addSelect("COUNT(producto.id) AS productCount")
        .where("producto.stock = 0")
        .groupBy("proveedor.idProveedor")
        .addGroupBy("proveedor.nombreProveedor")
        .addGroupBy("producto.id") // Asegúrate de agrupar por todas las columnas seleccionadas
        .addGroupBy("producto.name") // Asegúrate de agrupar por todas las columnas seleccionadas
        .orderBy("productCount", "DESC")
        .take(limit)
        .getRawMany();
    return proveedores;
}