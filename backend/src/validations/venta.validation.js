"use strict";
import Joi from "joi";

export const ventaBodyValidation = Joi.object({
    nombreProducto: Joi.string()
        .min(1)
        .max(50)
        .messages({
            "string.empty": "El nombre del producto no puede estar vacío.",
            "string.base": "El nombre del producto debe ser de tipo string.",
            "string.min": "El nombre del producto debe tener como mínimo 1 caracter.",
            "string.max": "El nombre del producto debe tener como máximo 50 caracteres.",
        }),
    fecha: Joi.date()
        .messages({
            "date.base": "La fecha debe ser de tipo date.",
        }),
    cantidad: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "La cantidad debe ser un número.",
            "number.integer": "La cantidad debe ser un número entero.",
            "number.positive": "La cantidad debe ser un número positivo.",
        }),
    total: Joi.number()
        .messages({
            "number.base": "El total debe ser un número.",
        }),
    idProducto: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id del producto debe ser un número.",
            "number.integer": "El id del producto debe ser un número entero.",
            "number.positive": "El id del producto debe ser un número positivo.",
        }),
})
    .unknown(false)
    .messages({
        "object.missing":
            "Debes proporcionar al menos un parámetro: idProducto.",
});
