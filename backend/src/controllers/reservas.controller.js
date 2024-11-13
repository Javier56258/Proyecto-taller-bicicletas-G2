"use strict";

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
        if (reserva.fecha) {
            reserva.fecha = moment(reserva.fecha, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
        }

        const { value, error } = reservaBodyValidation.validate(reserva); 
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const [reservaSaved, errorReservaSaved] = await createReservaService(value); 
        if (errorReservaSaved) {
          return handleErrorReserva(res, 400, "Error al crear reserva", errorReservaSaved);
        }
        reservaSaved.fecha = moment(reservaSaved.fecha).format("DD-MM-YYYY");
        handleSuccess(res, 201, "Reserva creada exitosamente", reservaSaved);

    } catch (error) {
        handleErrorReserva(res, 500, error.message);
    }
}

export async function getReservas(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      

      const formattedFechaInicio = moment(fechaInicio, "DD-MM-YYYY").toDate();
      const formattedFechaFin = moment(fechaFin, "DD-MM-YYYY").toDate();

      const { error } = reservaQueryValidation.validate({ 
        fechaInicio: formattedFechaInicio, fechaFin: formattedFechaFin });
      if (error) {return handleErrorReserva(res, 400, error.details[0].context.message);}
    
      const [reservas, errorReservas] = await getReservasService(formattedFechaInicio, formattedFechaFin);
  
      if (errorReservas) return handleErrorReserva(res, 404, errorReservas);
      const formattedReservas = reservas.map(reserva => ({
        ...reserva,
        fecha: moment(reserva.fecha).format("DD-MM-YYYY")
    }));
      res.json(formattedReservas);
    } catch (error) {
        handleErrorServer(res, 500, "Error interno del servidor");
    }
  }

export async function updateReserva(req, res) {
    try{
        const { idreserva } = req.query;
        const { body } = req;

        const { error: queryError } = reservaUpdateQueryValidation.validate({ idreserva });
        if (queryError) return handleErrorReserva( res, 400, "Error de validación en la consulta", queryError.message); 
        if (body.fecha) {
            body.fecha = moment(body.fecha, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
        }
        const { error: bodyError } = reservaBodyValidation.validate(body);
        if (bodyError) {
          console.error("Error de validación en datos enviados:", bodyError.details);
          return handleErrorReserva(res, 400, "Error de validación en datos enviados", bodyError.message);
      }
        //if (bodyError) return handleErrorReserva(res, 400, "Error de validación en datos enviados", bodyError.message);
        
        const [reserva, reservaError] = await updateReservaService({ idreserva }, body);
        
        if (reservaError) return handleErrorReserva(res, 400, "Error al modificar la reserva", reservaError);
        reserva.fecha = moment(reserva.fecha).format("DD-MM-YYYY");
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
  
      if (errorReservaDelete) return handleErrorReserva(res, 404, "Error eliminado al reserva", errorReservaDelete);
      
      if (reservaDelete && reservaDelete.fecha) {
        reservaDelete.fecha = moment(reservaDelete.fecha).format("DD-MM-YYYY");
      }

      handleSuccess(res, 200, "Reserva eliminado correctamente", reservaDelete);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }