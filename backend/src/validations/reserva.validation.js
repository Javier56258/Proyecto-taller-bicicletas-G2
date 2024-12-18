"use strict";
import Joi from "joi";
import moment from "moment";

const domainEmailValidator = (value, helper) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
        return helper.message("El correo electrónico no tiene un formato válido.");
    }
    return value;
};

const horaValidator = (value, helpers) => {
    const { fecha } = helpers.state.ancestors[0];
    const selectedDate = moment(fecha).format("YYYY-MM-DD");
    const selectedTime = moment(`${selectedDate}T${value}`, "YYYY-MM-DDTHH:mm:ssZ");
    const fechaMoment = moment(fecha);
    const fechaActual = moment();
    if (selectedDate === moment().format("YYYY-MM-DD") 
        && selectedTime.isBefore(moment())) {
        return helpers.message("La hora debe ser mayor a la hora actual si la fecha es para el mismo día.");
    }
    if (fechaMoment.isBefore(fechaActual, "day")) {
        return helpers.message("La fecha debe ser mayor a la fecha actual.");
    }
    //
    return value;
};

export const reservaBodyValidation = Joi.object({
    nombreReservador: Joi.string()
        .min(7)
        .max(60)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del reservador no puede estar vacío.",
            "string.base": "El nombre del reservador debe ser de tipo string.",
            "string.min": "El nombre del reservador debe tener como mínimo 7 caracteres.",
            "string.max": "El nombre del reservador debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El nombre del reservador solo puede contener letras y espacios.",
        }),
    email: Joi.string()
        .min(15)
        .max(64)
        .email()
        .messages({
            "string.empty": "El correo electrónico no puede estar vacío.",
            "string.base": "El correo electrónico debe ser de tipo string.",
            "string.email": "El correo electrónico debe finalizar en @gmail.cl o en @gmail.com.",
            "string.min": "El correo electrónico debe tener como mínimo 15 caracteres.",
            "string.max": "El correo electrónico debe tener como máximo 35 caracteres.",
        })
        .custom(domainEmailValidator, "Validación dominio email"),
        motivo: Joi.string()
        .min(5)
        .max(60)
        .pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s,]+$/)
        .messages({
            "string.empty": "El motivo de servicio no puede estar vacío.",
            "string.base": "El motivo de servicio debe ser de tipo string.",
            "string.min": "El motivo de servicio debe tener como mínimo 5 caracteres.",
            "string.max": "El motivo de servicio debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El motivo de servicio solo puede contener letras, números, tildes y comas.",
        }),
    
    fecha: Joi.date().iso()
        .max(moment().add(1, "month").toISOString()) 
        .messages({
            "date.base": "La fecha debe ser de tipo timestamp with time zone.",
            "date.max": "La fecha no puede ser mayor a un mes desde la fecha actual.",
        })
        .required()
        .messages({
            "any.required": "La fecha es un campo obligatorio"
        }),
    hora: Joi.string()
        .custom(horaValidator, "Validación de hora")
        .messages({
            "string.base": "La hora debe ser de tipo string.",
        })
        .required()
        .messages({
            "any.required": "La hora es un campo obligatorio."
        }),
});


export const reservaQueryValidation = Joi.object({
    fechaInicio: Joi.date().iso().required().messages({
        "any.required": "La fecha de inicio es obligatoria",
        "date.base": "La fecha de inicio debe ser una fecha válida",
      }),
      fechaFin: Joi.date().iso().required().messages({
      "any.required": "La fecha de fin es obligatoria",
      "date.base": "La fecha de fin debe ser una fecha válida",
    })
  });

export const reservaUpdateQueryValidation = Joi.object({
    idreserva: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id debe ser un número.",
      "number.integer": "El id debe ser un número entero.",
      "number.positive": "El id debe ser un número positivo.",
    })
});