"use strict";
import {
    createHorarioService,
    deleteHorarioService,
    getHorariosService,
    updateHorariosService
} from "../services/horarios.service.js";
import { horarioBodyValidation, horarioQueryValidation } from "../validations/horario.validation.js";
import { handleErrorHorario, handleErrorServer, handleSuccess } from "../handlers/responseHandlers.js";

export async function createHorario( req, res ){
    try {
        const horario = req.body;
        const { value, error } = horarioBodyValidation.validate(horario);
        if (error) {
            return handleErrorHorario(res, 400, "Error de validación", error.message);
        }
        const [horarioSaved, errorCreate] = await createHorarioService(value);
        if (errorCreate) return handleErrorHorario(res, 400, "Error al crear horario", errorCreate);
        
        handleSuccess(res, 201, "Horario creado con éxito", horarioSaved);

    } catch (error) {
        console.error("Error al crear horario: ", error);
    }
}

export async function getHorarios( req, res ){
    try {
        const { dia } = req.query;
        const { error } = horarioQueryValidation.validate({ dia: dia });
        if (error) {
            return handleErrorHorario(res, 400, "Error de validacion de ruta", error.details[0].context.message);
        }
        const [horarios, errorHorarios] = await getHorariosService( dia );
        if (errorHorarios) return handleErrorHorario(res, 404, errorHorarios);
        horarios.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Horarios encontrados", horarios);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function updateHorarios( req, res ){
    try {
        const { id } = req.query;
        const { body } = req;
        const { error: queryError } = horarioQueryValidation.validate({ id });
        if (queryError) {
            return handleErrorHorario(res, 400, "Error de validación en la ruta de consulta", queryError.message);
        }
        const { error: bodyError } = horarioBodyValidation.validate(body);
        if (bodyError) {
            return handleErrorHorario(res, 400, "Error de validación en el cuerpo", bodyError.message);
        }
        const [updatedHorario, errorUpdatedHorario] = await updateHorariosService({ id }, body);
        if (errorUpdatedHorario) return handleErrorHorario(res, 400, "Error actualizando horario", errorUpdatedHorario);
        handleSuccess(res, 200, "Horario actualizado con éxito", updatedHorario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function deleteHorario( req, res ){
    try {
        const { id } = req.query;
        const { error } = horarioQueryValidation.validate({ id });
        if (error) {
            return handleErrorHorario(res, 400, "Error de validación de query", error.message);
        }
        //La impresión (response o res) no muestra el horario borrado como en otros delete. Lo borra pero no lo muestra
        const [deletedHorario, errorDeletedHorario] = await deleteHorarioService({ id });

        if (errorDeletedHorario) return handleErrorHorario(res, 404, "Error al borrar horario", errorDeletedHorario);
        handleSuccess(res, 200, "Horario eliminado con éxito", deletedHorario);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getAllHorarios(req, res) {
    try {
        const [horarios, errorHorarios] = await getHorariosService();
        if (errorHorarios) return handleErrorHorario(res, 404, "Error al obtener horarios", errorHorarios);
        horarios.length === 0
            ? handleSuccess(res, 204)
            : handleSuccess(res, 200, "Horarios encontrados", horarios);
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}