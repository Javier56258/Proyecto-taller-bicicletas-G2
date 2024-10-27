"use strict";

//import User from "../entity/user.entity.js";
import Reserva from "../entity/reserva.entity.js";
import { AppDataSource } from "../config/configDb.js";
//import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";
//import { formatToLocalTime } from '../utils/formatDate.js'

export async function createReservaService(dataReserva) {
    dataReserva.hora = await dataReserva.hora;
    if (dataReserva.hora.error) {
        return { error: dataReserva.hora.error };
    }
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

//tal vez agregar un tercer paramentro filtro que puede estar nulo
export async function getReservasService(fechaInicio, fechaFin) { 
    try {
        const reservaRepository = AppDataSource.getRepository(Reserva);
        
        const reservas = await reservaRepository.createQueryBuilder("reserva")
      .where("reserva.fecha BETWEEN :fechaInicio AND :fechaFin", { fechaInicio, fechaFin })
      .getMany();

        if (!reservas || reservas.length === 0) return [null, "No hay reservas"];
        return[reservas, null];
    }catch (error) {
        console.error("Error al obtener las reservas:", error);
        return [null, "Error interno del servidor"];
    }

}