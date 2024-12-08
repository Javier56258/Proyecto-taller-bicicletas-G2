"use strict";
import {
    createProveedorService,
    getProveedorService,
    getProveedoresService,
    updateProveedorService,
    deleteProveedorService,
    assignProductsToProveedorService,
    } from "../services/proveedor.service.js";
import {
    proveedorBodyValidation,
    proveedorQueryValidation,
    } from "../validations/proveedor.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
    } from "../handlers/responseHandlers.js";

export async function createProveedor(req, res) {
    try {

        const { body } = req;
        const { error } = proveedorBodyValidation.validate(body);

        if (error) { 
            return res.status(400).json({
                message: error.message
            });
        }

        //vemos si ya existe un producto con el mismo nombre
        const existingProveedor = await getProveedorService({ nombreProveedor: body.nombreProveedor });

        if (existingProveedor[0]) {
            return res.status(400).json({
            message: "Ya existe un proveedor con ese nombre"
            });
         }

        const proveedorSaved = await createProveedorService(body);

        res.status(201).json({
            message: "Proveedor creado exitosamente",
            data: proveedorSaved
        });
    } catch (error) {
        console.error("Error al crear el proveedor, el error es: ", error);
    }
}

export async function getProveedor(req, res) {
    try {
        const { idProveedor, nombreProveedor } = req.query;

        const { error } = proveedorQueryValidation.validate({ idProveedor, nombreProveedor });

        if (error) return handleErrorClient(res, 400, error.message);

        const [proveedor, errorProveedor] = await getProveedorService({ idProveedor, nombreProveedor });

        if (errorProveedor) return handleErrorClient(res, 404, errorProveedor);

        handleSuccess(res, 200, "Proveedor encontrado", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProveedores(req, res) {
    try {
        const [proveedores, errorProveedores] = await getProveedoresService();

        if (errorProveedores) return handleErrorClient(res, 404, errorProveedores);

        proveedores.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Proveedores encontrados", proveedores);
    } catch (error) {
        handleErrorServer(
            res,
            500,
            error.message,
        );
    }
}

export async function updateProveedor(req, res) {
    try {
        const { idProveedor } = req.query;
        const { body } = req;

        const { error: queryError } = proveedorQueryValidation.validate({
            idProveedor,
            
        });

        if (queryError) return handleErrorClient(res, 400, queryError.message);

        const { error: bodyError } = proveedorBodyValidation.validate(body);

        if (bodyError) return handleErrorClient(res, 400, bodyError.message);

        const [updatedProveedor, errorUpdate] = await updateProveedorService({ idProveedor }, body);

        if (errorUpdate) return handleErrorClient(res, 404, errorUpdate);

        handleSuccess(res, 200, "Proveedor actualizado", updatedProveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProveedor(req, res) {
    try {
        const { idProveedor, nombreProveedor } = req.query;

        const { error } = proveedorQueryValidation.validate({ 
            idProveedor: Number(idProveedor), 
            nombreProveedor 
        });

        

        if (error) return handleErrorClient(res, 400, error.message);

        const [deletedProveedor, errorDelete] = await deleteProveedorService({ 
            idProveedor, 
            nombreProveedor 
        });

        if (errorDelete) return handleErrorClient(res, 404, errorDelete);

        handleSuccess(res, 200, "Proveedor eliminado", deletedProveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function assignProductsToProveedor(req, res) {
    try {
        const { idProveedor, productIds } = req.body;

        const proveedor = await assignProductsToProveedorService({ idProveedor, productIds });

        handleSuccess(res, 200, "Productos asignados al proveedor exitosamente", proveedor);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
