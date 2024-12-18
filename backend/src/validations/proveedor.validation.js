"use strict";
import Joi from "joi";



export const proveedorQueryValidation = Joi.object({
    idProveedor: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
    nombreProveedor: Joi.string()
        .messages({
            "string.base": "El nombre del proveedor debe ser de tipo string."
        }),
    email: Joi.string()
        .pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)   
        .messages({
            "string.base": "El email debe ser de tipo string.",
            "string.email": "El email debe ser un correo electrónico válido.",
            "string.pattern.base": "El email debe ser un correo electrónico válido."
        })
    
})
    .or("idProveedor", "nombreProveedor", "email")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
            "Debes proporcionar al menos un parámetro: idProveedor, nombre o email.",
    });

export const proveedorBodyValidation = Joi.object({
    nombreProveedor: Joi.string()
        .min(1)
        .max(100)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre no puede estar vacío.",
            "string.base": "El nombre debe ser de tipo string.",
            "string.min": "El nombre debe tener como mínimo 1 caracter.",
            "string.max": "El nombre debe tener como máximo 100 caracteres.",
            "string.pattern.base": "El nombre debe contener solo letras y numeros.",
        }),
    email: Joi.string()
        .pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)   
        .min(10)
        .max(35)
        .email()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe finalizar en @gmail.cl.",
            "string.min":
                "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max":
                "El correo electrónico debe tener como máximo 35 caracteres.",
            "string.pattern.base": "El email debe ser un correo electrónico válido."
        }),
    telefono: Joi.string()
        .min(6)
        .max(8)
        .pattern(/^\d+$/)
        .messages({
            "string.empty": "El teléfono no puede estar vacío.",
            "string.base": "El teléfono debe ser de tipo string.",
            "string.min": "El teléfono debe tener como mínimo 6 caracteres.",
            "string.max": "El teléfono debe tener como máximo 8 caracteres.",
        }),
    PaginaWeb: Joi.string()
        .max(50)
        .allow("")
        .messages({
            "string.base": "La página web debe ser de tipo string.",
            "string.max": "La página web debe tener como máximo 50 caracteres.",
        }),
    direccion: Joi.string()
        .min(5)
        .max(50)
        .allow("")
        .messages({
            "string.base": "La dirección debe ser de tipo string.",
            "string.min": "La dirección debe tener como mínimo 10 caracteres.",
            "string.max": "La dirección debe tener como máximo 50 caracteres.",
        }),

})
