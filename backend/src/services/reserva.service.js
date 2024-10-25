"use strict";

//import User from "../entity/user.entity.js";
import Reserva from "../entity/reserva.entity.js";
import { AppDataSource } from "../config/configDb.js";
//import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
//import { formatToLocalTime } from '../utils/formatDate.js'

export async function createReservaService(dataReserva) {
    try {
        const reservaRepository = AppDataSource.getRepository(Reserva);   

        const newReserva = reservaRepository.create({
            nombreReservador: dataReserva.nombreReservador,
            email: dataReserva.email,
            motivo: dataReserva.motivo,
            fecha: dataReserva.fecha,
            hora: dataReserva.hora,
        });

        const reservaSaved = await reservaRepository.save(newReserva);

        return reservaSaved;
    } catch (error) {
        console.error("Error al crear una reserva: ", error);
    }
}