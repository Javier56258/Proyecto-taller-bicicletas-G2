"use strict";

import Reserva from "../entity/reserva.entity.js";
import { AppDataSource } from "../config/configDb.js";
import Horario from "../entity/horario.entity.js";
import moment from "moment";

export async function createReservaService(dataReserva) {
    try {
        const reservaRepository = AppDataSource.getRepository(Reserva);   
        const { nombreReservador, email, motivo, fecha, hora } = dataReserva;

        let dia = moment(fecha).format("dddd"); 
        if (dia === "Monday")  dia = "Lunes";
        if (dia === "Tuesday")  dia = "Martes";
        if (dia === "Wednesday")  dia = "Miercoles";
        if (dia === "Thursday")  dia = "Jueves";
        if (dia === "Friday")  dia = "Viernes";
        if (dia === "Saturday")  dia = "Sabado";
        if (dia === "Sunday")  dia = "Domingo";

        const horarioRepository = AppDataSource.getRepository(Horario);

        const horarioExistente = await horarioRepository.findOne({
            where: {
                dia: dia,
                hora: hora
            }
        });
    
        if (!horarioExistente) {
            return [null, "Horario inexistente"];
        }
        
        const reservaExistente = await reservaRepository.findOne({
            where: { fecha, hora }
        });
        if (reservaExistente) {
            return [null, "Ya existe una reserva en esa fecha y hora"];
        }
        const newReserva = reservaRepository.create({
            nombreReservador: nombreReservador,
            email: email,
            motivo: motivo,
            fecha: fecha,
            hora: hora,
            horario: horarioExistente,
        });
        await reservaRepository.save(newReserva);
        return [newReserva, null];
    } catch (error) {
        console.error("Error al crear una reserva: ", error);
        return [null, "Error interno del servidor"];
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

export async function updateReservaService(query, body) {
    try {
        const { idreserva } = query;

        const reservaRepository = AppDataSource.getRepository(Reserva);
        const horarioRepository = AppDataSource.getRepository(Horario);
        //Comprobar que el horario en el que se quiere hacer la reserva existe
        let dia = moment(body.fecha).format("dddd"); 
        if (dia === "Monday")  dia = "Lunes";
        if (dia === "Tuesday")  dia = "Martes";
        if (dia === "Wednesday")  dia = "Miercoles";
        if (dia === "Thursday")  dia = "Jueves";
        if (dia === "Friday")  dia = "Viernes";
        if (dia === "Saturday")  dia = "Sabado";
        if (dia === "Sunday")  dia = "Domingo";

        const horarioExistente = await horarioRepository.findOne({
            where: [{
                dia: dia,
                hora: body.hora
            }]
        });
        
        if (!horarioExistente) {
            console.log("Horario inexistente");
            return [null, "Horario inexistente, ingrese hora presentada por el local"];
        }
        
        const reservaFound = await reservaRepository.findOne({
            where: { idreserva: idreserva },
        });

        if (!reservaFound) return [null, "Reserva no encontrada"];

        const reservaAactualizar = await reservaRepository.findOne({
            where: { fecha: body.fecha  ,  hora: body.hora } , 
        });

        if (reservaAactualizar && reservaAactualizar.idreserva !== reservaFound.idreserva) {
            return [null, "Reserva con los mismos datos ya existe"];
        }    
        const dataUpdatedReserva = {
            nombreReservador: body.nombreReservador,
            email: body.email,
            motivo: body.motivo,
            fecha: body.fecha,
            hora: body.hora,
            updatedAt: new Date(),
        }
        
        await reservaRepository.update({ idreserva: reservaFound.idreserva }, dataUpdatedReserva);

        const reservaData = await reservaRepository.findOne({
            where: [{ idreserva: reservaFound.idreserva }],
        });

        if (!reservaData) {
            return [null, "Reserva no encontrada post actualización"];
        }

        return [reservaData, null];

    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function deleteReservaService(query) {
    try {
        const { idreserva } = query;
    
        const reservaRepository = AppDataSource.getRepository(Reserva);
    
        const reservaFound = await reservaRepository.findOne({
            where: [{ idreserva: idreserva }],
        });
    
        if (!reservaFound) return [null, "Reserva no encontrada"];
    
        const reservaDeleted = await reservaRepository.remove(reservaFound);
    
        return [reservaDeleted, null];
        
      } catch (error) {
        console.error("Error al eliminar reserva:", error);
        return [null, "Error interno del servidor"];
    }
}