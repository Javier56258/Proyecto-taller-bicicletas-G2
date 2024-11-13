"use strict";
import Joi from "joi";

//Pense aqui crear una funcion para los horarios pero suena más
// a una descripcion posible en el frontend que algo usable aquí.
// A lo más puede servir para explicar que las horas agendables sean en 
// un horario que este delimitado. Pero es posible que no atiendan como 
// tienda y si agenden o viseversa.

const domainHorasValidator=(value, helpers) => {
    const [hours, minutes] = value.split(":").map(Number);
    if (minutes !== 0 && minutes !== 30) {
        return helpers.message("Las reservas deben estar separadas por una hora o media hora terminando en :00 o :30.");
    }
    if (hours < 0 || hours > 23) {
        return helpers.message("Las horas deben estar entre 0 y 23.");
    }
    return value;
};

const domainDiasValidator=(value, helpers) => {
    const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    if (!dias.includes(value.toLowerCase())) {
        return helpers.message("Los días deben ser lunes, martes, miercoles, jueves, viernes, sabado o domingo.");
    }
    return value;
};

export const horarioBodyValidation = Joi.object({
    dia: Joi.string()
        .min(5)
        .max(10)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/)
        .messages({
            "string.empty": "El horario no puede estar vacío.",
            "string.base": "El día ingresado debe ser de tipo string.",
            "string.min": "El dia ingresado debe tener como mínimo 5 caracteres.",
            "string.max": "El dia ingresado debe tener como máximo 10 caracteres.",
            "string.pattern.base": "El día ingresado solo puede contener letras.",
        })
        .custom(domainDiasValidator, "Validacion de dias de la semana"),/*
    horasAtencion: Joi.string()
        .min(15)
        .max(35)
        .email()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe finalizar en @gmail.cl o en @gmail.com.",
            "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
        })
        .custom(domainEmailValidator, "Validación dominio email"),*/
    hora: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
            "string.empty": "El horario no puede estar vacío.",
            "string.base": "El horario debe ser de tipo string.",
            "string.pattern.base": "El horario debe ser en formato HH:MM.",
        })
        .custom(domainHorasValidator, "Validación separacion de horas")
});

export const horarioQueryValidation = Joi.object({
    dia: Joi.string()
        .min(5)
        .max(10)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/)
        .messages({
            "string.empty": "El día no puede estar vacío.",
            "string.base": "El día ingresado debe ser de tipo string.",
            "string.min": "El dia ingresado debe tener como mínimo 5 caracteres.",
            "string.max": "El dia ingresado debe tener como máximo 10 caracteres.",
            "string.pattern.base": "El día ingresado solo puede contener letras.",
        }),
        id: Joi.number()
        .integer()
        .positive()
        .messages({
            "number.base": "El id debe ser un número.",
            "number.integer": "El id debe ser un número entero.",
            "number.positive": "El id debe ser un número positivo.",
        }),
}).or("dia", "id")
    .unknown(false)
    .messages({
        "object.unknown": "No se permiten propiedades adicionales.",
        "object.missing":
        "Debes proporcionar al menos un parámetro: id o dia.",
  });