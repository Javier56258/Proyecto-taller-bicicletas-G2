"use strict";
import Joi from "joi";
import moment from "moment";
import  Reserva  from "../entity/reserva.entity.js";
import { AppDataSource } from "../config/configDb.js";

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
    const selectedDate = moment(fecha).format("YYYY-MM-DD");
    const selectedTime = moment(`${selectedDate}T${value}`, "YYYY-MM-DDTHH:mm:ssZ");

    if (selectedDate === moment().format("YYYY-MM-DD") 
        && selectedTime.isBefore(moment())) {
        return helpers.message("La hora debe ser mayor a la hora actual si la fecha es para el mismo día.");
    }
    console.log("HORA RECIBIDA EN EL VALIDADOR:", value);
    return value;
};

const fueReservadaValidator = async (value, helpers) => {
    const { fecha } = helpers.state.ancestors[0];
    if (!fecha) {
        return helpers.message("La fecha es obligatoria.");
    }
    //const aux = value;
    console.log("Fecha recibida en el validador:", fecha);
    console.log("Hora recibida en el validador:", value);

    const selectedDate = moment(fecha).format("YYYY-MM-DD");
    //const selectedTime = moment(`${selectedDate}T${value}`, "HH:mm").format("HH:mm");

    console.log("Fecha formateada en el validador:", selectedDate);
    console.log("Hora value en el validador:", value);

    const reservaRepository = AppDataSource.getRepository(Reserva);

    console.log("REPOSITORIO RESERVAS: ", reservaRepository);

    const reservaExistente = await reservaRepository.findOne({
        where: {
            fecha: selectedDate,
            hora: value
        }
    });

    console.log("Reserva existente en el validador:", reservaExistente);


    if (reservaExistente) {
        console.log("Reserva duplicada encontrada");
        return { error: "Ya existe una reserva en este horario." };
    }
    //value.hora = aux;
    console.log("Value devuelto en el validador final: ", value);

    return value;
};


/*
const fueReservadaValidator = (value, helpers) => {
    const { fecha } = helpers.state.ancestors[0];
    const selectedDate = moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD");
    const selectedTime = moment(value, "HH:mm").format("HH:mm");

    return Reserva.findOne({
        where: {
            fecha: selectedDate,
            hora: selectedTime
        }
    }).then(reservaExistente => {
        if (reservaExistente) {
            return helpers.message("La hora seleccionada ya está reservada.");
        }
        return value;
    })
};
*/ 


//const horariosValidados;
//const noReservado;

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
    fecha: Joi.date().iso()
        //.min("now")
        .messages({
            "date.base": "La fecha debe ser de tipo timestamp with time zone.",
            //"date.min": "La fecha debe ser mayor o igual a la fecha actual."
        })
        .required()
        .messages({
            "any.required": "La fecha es un campo obligatorio"
        }),
    hora: Joi.string()
        .custom(horaValidator, "Validación de hora")
        .custom(async (value, helpers) => await fueReservadaValidator(value, helpers), "Validación de reserva")
        //.custom(horariosValidados, "Validación de horarios empresa")
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