"use strict";

//import { AppDataSource } from "../config/configDb";
//import { Reserva } from "../entity/reserva.entity.js";
//import configDb from "../config/configDb.js";
import { reservaBodyValidation, 
        reservaQueryValidation, 
        reservaUpdateQueryValidation } from "../validations/reserva.validation.js";
import { createReservaService, 
        deleteReservaService,
        getReservasService,
        updateReservaService 
         } from "../services/reserva.service.js"; 
import moment from "moment";
import { handleErrorReserva, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";


export async function createReserva(req, res) {
    try {
        const reserva = req.body;
        console.log("Reserva recibida en el controlador:", reserva);  //Recuerda borrar

        if (reserva.fecha) {
            reserva.fecha = moment(reserva.fecha, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
          }
          if (!reserva.hora) {
            return res.status(400).json({ error: "El campo 'hora' es obligatorio" });
        }

        console.log("Reserva antes de la validación:", reserva);   //Recuerda borrar


        const { value, error } = reservaBodyValidation.validate(reserva); 
        //Falta validar que el dueño pueda ingresar horarios posibles de la tienda y agregarlos a validacion

        if (error) {
            console.log("Error de validación:", error.message);
            return res.status(400).json({ message: error.message });
        }

        console.log("Reserva después de la validación:", value);

        const reservaSaved = await createReservaService(value); 
        reservaSaved.fecha = moment(reservaSaved.fecha).format("DD-MM-YYYY");


        res.status(201).json({
            message: "Reserva creada exitosamente",
            data: reservaSaved
        });
    } catch (error) {
        console.error("Error al crear la reserva, el error es: ", error);
    }
}

export async function getReservas(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      console.log("Está en el archivo de controlador de reservas, en especifico obtener reservas");
        console.log("Fecha inicio: ", fechaInicio);
        console.log("Fecha fin: ", fechaFin);

      const formattedFechaInicio = moment(fechaInicio, "DD-MM-YYYY").toDate();
      const formattedFechaFin = moment(fechaFin, "DD-MM-YYYY").toDate();

      console.log("Fecha inicio formateada:", formattedFechaInicio);
      console.log("Fecha fin formateada:", formattedFechaFin);

      const { error } = reservaQueryValidation.validate({ 
        fechaInicio: formattedFechaInicio, fechaFin: formattedFechaFin });
      if (error) {return handleErrorReserva(res, 400, error.details[0].context.message);}
    
      const [reservas, errorReservas] = await getReservasService(formattedFechaInicio, formattedFechaFin);
  
      if (errorReservas) return handleErrorReserva(res, 404, errorReservas);
  
      res.json(reservas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor");
    }
  }

export async function updateReserva(req, res) {
    try{
        const { idreserva } = req.query;
        const { body } = req;
        //No se si poner previamente el buscar a un grupo entre fechas y por filtro
        const { error: queryError } = reservaUpdateQueryValidation.validate({ idreserva });
        if (queryError) return handleErrorReserva( res, 400, "Error de validación en la consulta", queryError.message); 
        
        console.log("Body recibido en el controlador de actualización de reserva:", body);
        const { error: bodyError } = reservaBodyValidation.validate(body);
        if (bodyError) return handleErrorReserva(res, 400, "Error de validación en datos enviados", bodyError.message);
        
        const [reserva, reservaError] = await updateReservaService({ idreserva }, body);
        
        if (reservaError) return handleErrorReserva(res, 400, "Error al modificar la reserva", reservaError);

        handleSuccess(res, 200, "Reserva modificada correctamente", reserva);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}
  
export async function deleteReserva(req, res) {
    try {
      const { idreserva } = req.query;
  
      const { error: queryError } = reservaUpdateQueryValidation.validate({ idreserva });
  
      if (queryError) {
        return handleErrorReserva( res, 400, "Error de validación en la consulta", queryError.message );
      }
  
      const [reservaDelete, errorReservaDelete] = await deleteReservaService({ idreserva });
  
      if (errorReservaDelete) return handleErrorClient(res, 404, "Error eliminado al usuario", errorReservaDelete);
  
      handleSuccess(res, 200, "Usuario eliminado correctamente", reservaDelete);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }