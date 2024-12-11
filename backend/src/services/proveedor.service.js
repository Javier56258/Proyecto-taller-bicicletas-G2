"use strict";
import { In } from "typeorm";
import Proveedor from "../entity/proveedor.entity.js";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProveedorService(dataProveedor) {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);

        const newProveedor = proveedorRepository.create({
            nombreProveedor: dataProveedor.nombreProveedor,
            email: dataProveedor.email,
            telefono: dataProveedor.telefono,
            PaginaWeb: dataProveedor.PaginaWeb,
            direccion: dataProveedor.direccion,
        });

        await proveedorRepository.save(newProveedor);

        return [newProveedor, null];
    } catch (error) {
        console.error("Error al crear un proveedor: ", error);
    }
}

export async function getProveedorService(query) {
    try {
        const { idProveedor, nombreProveedor } = query;

        const proveedorRepository = AppDataSource.getRepository(Proveedor);

        const proveedorFound = await proveedorRepository.findOne({
            where: [{ idProveedor: idProveedor }, { nombreProveedor: nombreProveedor }],
            relations: ["productos"],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al obtener el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProveedoresService() {
    try {
        const proveedorRepository = AppDataSource.getRepository(Proveedor);

        const proveedores = await proveedorRepository.find({
            relations: ["productos"],
        });

        if (!proveedores || proveedores.length === 0) return [null, "No hay proveedores"];

        return [proveedores, null];
    } catch (error) {
        console.error("Error al obtener a los proveedores:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateProveedorService(query, body) {
    try {
        const { idProveedor, nombreProveedor } = query;

        const userRepository = AppDataSource.getRepository(Proveedor);

        const proveedorFound = await userRepository.findOne({
            where: [{ idProveedor: idProveedor }],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        const existingProveedor = await userRepository.findOne({
            where: [{ nombreProveedor: body.nombreProveedor }, { email: body.email }],
        });

        if (existingProveedor && existingProveedor.idProveedor !== proveedorFound.idProveedor) {
            return [null, "Ya existe un proveedor con el mismo nombre o email"];
        }

        const dataProveedorUpdated = {
            nombreProveedor: body.nombreProveedor,
            PaginaWeb: body.PaginaWeb,
            telefono: body.telefono,
            email: body.email,
            direccion: body.direccion,
        };

        await userRepository.update(proveedorFound.idProveedor, dataProveedorUpdated);
        
        const proveedorData = await userRepository.findOne({
            where: {idProveedor: proveedorFound.idProveedor},
        });
    
        if (!proveedorData) return [null, "Proveedor no encontrado"];

        const { ProveedorUpdated } = proveedorData;
        return [ProveedorUpdated, null];

    } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteProveedorService(query) {
    try {
        const { idProveedor, nombreProveedor } = query;

        const proveedorRepository = AppDataSource.getRepository(Proveedor);

        const proveedorFound = await proveedorRepository.findOne({
            where: [{ idProveedor: idProveedor }, { nombreProveedor: nombreProveedor }],
        });

        if (!proveedorFound) return [null, "Proveedor no encontrado"];

        await proveedorRepository.delete(proveedorFound.idProveedor);

        return [proveedorFound, null];
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function assignProductsToProveedorService({ idProveedor, productIds }) {
    const proveedorRepository = AppDataSource.getRepository(Proveedor);
    const productRepository = AppDataSource.getRepository(Product);

    const proveedor = await proveedorRepository.findOne({ where: { idProveedor }, relations: ["productos"] });
    if (!proveedor) throw new Error("Proveedor no encontrado");

    const products = await productRepository.find({
        where: {
            id: In(productIds)
        }
    });
    if (products.length !== productIds.length) throw new Error("Uno o más productos no encontrados");

    proveedor.productos = [...proveedor.productos, ...products];
    await proveedorRepository.save(proveedor);

    return proveedor;
}