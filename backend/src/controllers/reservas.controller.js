"use strict";

import { reservaBodyValidation, 
        reservaQueryValidation, 
        reservaUpdateQueryValidation } from "../validations/reserva.validation.js";
import { createReservaService, 
        deleteReservaService,
        getAllReservasService,
        getReservasService,
        updateReservaService 
         } from "../services/reserva.service.js"; 
import moment from "moment";
import { handleErrorReserva, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";
import { sendEmail } from "../services/email.service.js";


export async function createReserva(req, res) {
    try {
        const reserva = req.body;
        if (reserva.fecha) {
            reserva.fecha = moment(reserva.fecha, "DD-MM-YYYY").format("YYYY-MM-DDTHH:mm:ssZ");
        }

        const { value, error } = reservaBodyValidation.validate(reserva); 
        if (error) {
            return handleErrorReserva(res, 400, "Error de validación en datos enviados", error.message);
        }

        const [reservaSaved, errorReservaSaved] = await createReservaService(value); 
        if (errorReservaSaved) {
          return handleErrorReserva(res, 400, "Error al crear reserva", errorReservaSaved);
        }
        reservaSaved.fecha = moment(reservaSaved.fecha).format("DD-MM-YYYY");
        handleSuccess(res, 201, "Reserva creada exitosamente", reservaSaved);
        const asunto = "Confirmación de reserva";
        const mensaje = `
                        Su reserva para el ${reservaSaved.fecha} a las ${reservaSaved.hora} ha sido confirmada.<br>
                        Detalle:<br>
                        Nombre: ${reservaSaved.nombreReservador}<br>
                        Email: ${reservaSaved.email}<br>
                        Servicio: ${reservaSaved.motivo}<br>
                        Fecha: ${reservaSaved.fecha}<br>
                        Hora: ${reservaSaved.hora}<br><br>

                        Gracias por elegirnos.<br>
                      `;
        const htmlMessage = `<p>${mensaje}</p>`;
        await sendEmail(reservaSaved.email, asunto, mensaje, htmlMessage);

        
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
      if (error) {return handleErrorReserva(res, 400,"Error en el query reserva" , error.details[0].context.message);}
    
      const [reservas, errorReservas] = await getReservasService(formattedFechaInicio, formattedFechaFin);
  
      if (errorReservas) return handleErrorReserva(res, 404,"Error al encontrar reservas", errorReservas);
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
        const asunto = "Confirmación de edición de reserva";
        const mensaje = `
                        Su reserva ha sido actualizado.<br>
                        Detalle:<br>
                        Nombre: ${reserva.nombreReservador}<br>
                        Email: ${reserva.email}<br>
                        Servicio: ${reserva.motivo}<br>
                        Fecha: ${reserva.fecha}<br>
                        Hora: ${reserva.hora}<br><br>

                        Gracias por elegirnos.<br>
                      `;
        const htmlMessage = `<p>${mensaje}</p>`;
        await sendEmail(reserva.email, asunto, mensaje, htmlMessage);
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
            // Enviar correo de confirmación
            const asunto = "Confirmación de eliminación de reserva";
            const mensaje = `
                Su reserva para el ${reservaDelete.fecha} a las ${reservaDelete.hora} ha sido eliminada.
                Detalle:
                Nombre: ${reservaDelete.nombreReservador}
                Email: ${reservaDelete.email}
                Servicio: ${reservaDelete.motivo}
                Fecha: ${reservaDelete.fecha}
                Hora: ${reservaDelete.hora}
                
                Gracias por elegirnos.
            `;
    
            const htmlMessage = `
                <p>Su reserva para el ${reservaDelete.fecha} a las ${reservaDelete.hora} ha sido eliminada.</p>
                <p><strong>Detalle:</strong></p>
                <ul>
                    <li><strong>Nombre:</strong> ${reservaDelete.nombreReservador}</li>
                    <li><strong>Email:</strong> ${reservaDelete.email}</li>
                    <li><strong>Servicio:</strong> ${reservaDelete.motivo}</li>
                    <li><strong>Fecha:</strong> ${reservaDelete.fecha}</li>
                    <li><strong>Hora:</strong> ${reservaDelete.hora}</li>
                </ul>
                <p>Gracias por elegirnos.</p>
            `;
    
            await sendEmail(reservaDelete.email, asunto, mensaje, htmlMessage);
    } catch (error) {
      handleErrorServer(res, 500, error.message);
    }
  }

  export async function getallReservas(req, res) {
    try {
      const [reservas, errorReservas] = await getAllReservasService();
      if (errorReservas) {
        if (errorReservas === "No hay reservas") {
          return handleSuccess(res, 204, "No hay reservas");
        }
        return handleErrorReserva(res, 404, "Error al encontrar reservas", errorReservas);
      }       
      reservas.length === 0
          ? handleSuccess(res, 204)
          : handleSuccess(res, 200, "Reservas encontradas", reservas);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
  }