"use strict";
import Joi from "joi";
import moment from "moment";
//import moment from "moment";

const domainEmailValidator = (value, helper) => {
    if (!value.endsWith("@gmail.cl") && !value.endsWith("@gmail.com")) {
      return helper.message(
        "El correo electrónico debe ser del dominio @gmail.cl o @gmail.com."
      );
    }
    return value;
  };

const horaValidator = (value, helpers) => {
    const { fecha } = helpers.state.ancestors[0];
    const selectedDate = moment(fecha);
    const currentDate = moment().startOf("day");
    const currentTime = moment();

    if (selectedDate.isSame(currentDate, "day") && moment(value, "HH:mm").isBefore(currentTime)) {
        return helpers.message("La hora debe ser mayor a la hora actual si la fecha es para el mismo día.");
    }
    return value;
};

const horarioReservaValidator = async (value, helpers) => {
    const { fecha } = helpers.state.ancestors[0];
    const selectedDate = moment.tz(fecha, "America/Santiago").format("YYYY-MM-DD");
    const selectedTime = moment.tz(value, "America/Santiago").format("HH:mm");
    
    const reservaExistente = await Reserva.findOne({
        where: {
            fecha: selectedDate,
            hora: selectedTime
        }
    });

    if (reservaExistente) {
        return helpers.message("La hora seleccionada ya está reservada.");
    }
}

export const reservaBodyValidation = Joi.object({
    nombreReservador: Joi.string()
        .min(15)
        .max(50)
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .messages({
            "string.empty": "El nombre del reservador no puede estar vacío.",
            "string.base": "El nombre del reservador debe ser de tipo string.",
            "string.min": "El nombre del reservador debe tener como mínimo 15 caracteres.",
            "string.max": "El nombre del reservador debe tener como máximo 50 caracteres.",
            "string.pattern.base": "El nombre del reservador solo puede contener letras y espacios.",
        }),
    email: Joi.string()
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
        .custom(domainEmailValidator, "Validación dominio email"),
    motivo: Joi.string()
        .min(10)
        .max(60)
        .pattern(/^[a-zA-Z0-9\s]+$/)
        .messages({
            "string.empty": "El motivo no puede estar vacío.",
            "string.base": "El motivo debe ser de tipo string.",
            "string.min": "El motivo debe tener como mínimo 10 caracteres.",
            "string.max": "El motivo debe tener como máximo 60 caracteres.",
            "string.pattern.base": "El motivo solo puede contener letras y números.",
        }),
    fecha: Joi.date()
        .min("now")
        .messages({
            "date.base": "La fecha debe ser de tipo date.",
            "date.min": "La fecha debe ser mayor o igual a la fecha actual."
        })
        .required()
        .messages({
            "any.required": "La fecha es un campo obligatorio"
        }),
    hora: Joi.string()
        .custom(horaValidator, "Validación de hora")
        .messages({
            "string.base": "La hora debe ser de tipo string.",
        }),
});
