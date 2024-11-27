"use strict";
import Joi from "joi";

export const productQueryValidation = Joi.object({
    id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.min": "El nombre debe tener como mínimo 3 caracteres.",
            "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),

})
    .or("id", "name")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: id o name.",
    });

export const productBodyValidation = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.min": "El nombre debe tener como mínimo 3 caracteres.",
            "string.max": "El nombre debe tener como máximo 50 caracteres.",
        }),
    description: Joi.string()
        .min(3)
        .max(255)
        .messages({
            "string.empty": "La descripción no puede estar vacía.",
            "string.base": "La descripción debe ser de tipo string.",
            "string.min": "La descripción debe tener como mínimo 3 caracteres.",
            "string.max": "La descripción debe tener como máximo 255 caracteres.",
        }),
    price: Joi.number()
        .positive()
        .messages({
            "number.base": "El precio debe ser un número.",
            "number.positive": "El precio debe ser un número positivo.",
        }),
    stock: Joi.number()
        .integer()
        .min(0)
        .messages({
            "number.base": "El stock debe ser un número.",
            "number.integer": "El stock debe ser un número entero.",
            "number.positive": "El stock debe ser un número positivo.",
        }),
})
    
    .or("name", "description", "price", "stock")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: name, price o stock.",
    });

