"use strict";
import {
    createProductService,
    deleteProductService,
    getProductService,
    getProductsService,
    updateProductService
} from "../services/product.service.js";
import { productBodyValidation } from "../validations/product.validation.js";
import { handleErrorClient, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function createProduct(req,res){
    try {
        const { body } = req;
        const { error } = productBodyValidation.validate(body);
        if (error) {
            return handleErrorClient(res, 400, "Error de validación", error.message);
        }
        const [newProduct, errorNewProduct] = await createProductService(body);
        if (errorNewProduct) return handleErrorClient(res, 400, "Error creando producto", errorNewProduct);
        handleSuccess(res, 201, "Producto creado con éxito", newProduct);



    } catch (error) {
        console.error("Error al crear producto:", error);
    }
}

export async function getProduct(req,res){
    try {
        const { name } = req.query;
        const { error } = productBodyValidation.validate({ name });
        if (error) {
            return handleErrorClient(res, 400, "Error de validación", error.message);
        }
        const [product, errorProduct] = await getProductService( { name } );
        if (errorProduct) return handleErrorClient(res, 400, "Error obteniendo producto", errorProduct);
        handleSuccess(res, 200, "Producto encontrado", product);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getProducts(req,res){
    try {
        const [products, errorProducts] = await getProductsService();
        if (errorProducts) return handleErrorClient(res, 404, errorProducts);
        products.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Productos encontrados", products);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateProduct(req,res){
    try {
        const { body } = req;
        const { name } = req.query;
        const { error: queryError } = productBodyValidation.validate({ name });
        if (queryError) {
            return handleErrorClient(res, 400, "Error de validación en la consulta", queryError.message);
        }
        const { error: bodyError } = productBodyValidation.validate(body);
        if (bodyError) {
            return handleErrorClient(res, 400, "Error de validación en el cuerpo", bodyError.message);
        }
        const [updatedProduct, errorUpdatedProduct] = await updateProductService({ name }, body);
        if (errorUpdatedProduct) return handleErrorClient(res, 400, "Error actualizando producto", errorUpdatedProduct);
        handleSuccess(res, 200, "Producto actualizado con éxito", updatedProduct);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteProduct(req,res){
    try {
        const { name } = req.body;
        const { error } = productBodyValidation.validate({ name });
        if (error) {
            return handleErrorClient(res, 400, "Error de validación", error.message);
        }


        const [deletedProduct, errorDeletedProduct] = await deleteProductService({ name });
        if (errorDeletedProduct) return handleErrorClient(res, 404, errorDeletedProduct);
        handleSuccess(res, 200, "Producto eliminado con éxito", deletedProduct);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
