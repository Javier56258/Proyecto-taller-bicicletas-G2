"use strict";
import Product from "../entity/product.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createProductService(product){
    try {
        const productRepository = AppDataSource.getRepository(Product);
        const { name, price, description,stock } = product;
        const createErrorMessage = (dataInfo, message) => ({
            dataInfo,
            message
          });
          //vemos si ya existe un producto con el mismo nombre
          const existingNameProduct = await productRepository.findOne({
            where: { name }
          });
          if (existingNameProduct) {
            return [null, createErrorMessage("name", "El nombre del producto ya existe")];

          }
          //creamos el nuevo producto
          const newProduct = productRepository.create({
            name,
            description,
            price,
            stock,
          });
          await productRepository.save(newProduct);
          return [newProduct, null];
    } catch (error) {
        console.error("Error al crear producto:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProductService(query){
  
    try {
      const { name } = query;
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOne({
        where: { name: name }
      });
      if (!product) {
        return [null, "Producto no encontrado"];
      }
      return [product, null];
        
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function getProductsService(){
    try {
      const productRepository = AppDataSource.getRepository(Product);
      const products = await productRepository.find();
      if (!products || products.length === 0) return [null, "No hay productos"];
      const productsData = products.map(({ ...product }) => product);
      return [productsData, null];
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateProductService(query,body){
    try {
        const { name } = query;
        const productRepository = AppDataSource.getRepository(Product);
        const productFound = await productRepository.findOne({
          where:{ name: name }
        });
        if (!productFound) {
          return [null, "Producto no encontrado"];
        }

    const existingProduct = await productRepository.findOne({
      where: [{ name: body.name }],
    });
    if (existingProduct && existingProduct.id !== productFound.id) {
      return [null, "Ya existe un producto con el mismo nombre"]
    }
   

    
    const dataProductUpdate = {
      name: body.name,
      description: body.description,
      price: body.price,
      stock: body.stock,
      updatedAt: new Date(),
    };
    await productRepository.update({ id: productFound.id }, dataProductUpdate);
    const updatedProduct = await productRepository.findOne({ 
      where: { id: productFound.id }
    });
    if(!updatedProduct){
      return [null, "Producto no encontrado despues de actualizar"];
    }
    return [updatedProduct, null];
        
    } catch (error) {
        
    }
}

export async function deleteProductService(query){
    try {
        const { name } = query;	
        const productRepository = AppDataSource.getRepository(Product);
        const productFound = await productRepository.findOne({
          where: { name: name }
        });
        if (!productFound) {
          return [null, "Producto no encontrado"];
        }
        const productDeleted= await productRepository.delete({ id: productFound.id });
        return [productDeleted, null];
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return [null, "Error interno del servidor"];
    }
}