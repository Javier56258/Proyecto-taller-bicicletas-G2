"use strict";

//import { AppDataSource } from "../config/configDb";
//import { Reserva } from "../entity/reserva.entity.js";
//import configDb from "../config/configDb.js";
import { reservaBodyValidation } from "../validations/reserva.validation.js";
import { createReservaService } from "../services/reserva.service.js"; 
import moment from "moment";


export async function createReserva(req, res) {
    try {
        const reserva = req.body;
        if (req.body.fecha) {
            req.body.fecha = moment(req.body.fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
          }
        const { value, error } = reservaBodyValidation.validate(reserva); 
        //Falta validar que el dueño pueda ingresar horarios posibles de la tienda y agregarlos a validacion

        if(error) return res.status(400).json({
            message: error.message
        })

        const reservaSaved = await createReservaService(value); 
        reservaSaved.fecha = moment(reservaSaved.fecha).format("DD-MM-YYYY");


        res.status(201).json({
            message: "Reserva creada exitosamente",
            data: reservaSaved
        })
    } catch (error) {
        console.error("Error al crear la reserva, el error es: ", error);
    }
}