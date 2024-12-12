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
        .leftJoin("proveedor.productos", "producto")
        .select("proveedor.idProveedor", "idProveedor")
        .addSelect("proveedor.nombreProveedor", "nombreProveedor")
        .addSelect("COUNT(producto.id) AS Cantidad_de_productos")
        .groupBy("proveedor.idProveedor")
        .addGroupBy("proveedor.nombreProveedor")
        .orderBy("Cantidad_de_productos", "DESC")
        .limit(limit) // Utiliza take en lugar de limit
        .getRawMany();
    return proveedores;
}

export async function getProveedoresWithOutOfStockProducts(limit = 3) {
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
        .limit(limit) 
    .getRawMany();
    return proveedores;
}