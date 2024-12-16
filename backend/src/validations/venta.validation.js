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


export const ventaQueryValidation = Joi.object({
    startDate: Joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "La fecha de inicio debe ser una fecha válida.",
            "date.format": "La fecha de inicio debe estar en formato ISO.",
            "any.required": "La fecha de inicio es requerida.",
        }),
    endDate: Joi.date()
        .iso()
        .required()
        .messages({
            "date.base": "La fecha de fin debe ser una fecha válida.",
            "date.format": "La fecha de fin debe estar en formato ISO.",
            "any.required": "La fecha de fin es requerida.",
        }),
});