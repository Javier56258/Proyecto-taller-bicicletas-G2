"use strict";
import Horario from "../entity/horario.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function createHorarioService(horario) {
    horario.hora = await horario.hora;
    if (horario.hora.error) {
        return { error: horario.hora.error };
    }
    try {
    const horarioRepository = AppDataSource.getRepository(Horario);
    const newHorario = horarioRepository.create({
      dia: horario.dia,
      hora: horario.hora,
    });
    await horarioRepository.save(newHorario);
    return [newHorario, null];
  } catch (error) {
    console.error("Error al crear horario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getHorariosService(dia) {
    try {
        const horarioRepository = AppDataSource.getRepository(Horario);
        const horarios = await horarioRepository.find({ where: { dia } });


        if (!horarios || horarios.length === 0) return [null, "No hay horarios en ese dia"];
        return[horarios, null];
    }catch (error) {
        console.error("Error al obtener las horarios:", error);
        return [null, "Error interno del servidor"];
    }
}

export async function updateHorariosService(query, body) {
  try {
    const { id } = query;
    const horarioRepository = AppDataSource.getRepository(Horario);
    const horarioFound = await horarioRepository.findOne({  where: [ { id: id } ] });
    if (!horarioFound) {  return [null, "Horario no encontrado"]; }

    const existingHorario = await horarioRepository.findOne({
      where: [{ dia: body.dia, hora: body.hora }],
    });
    if (existingHorario && existingHorario.id !== horarioFound.id) {
      return [null, "Ya existe un horario con los mismos datos"]
    }

    const dataHorarioUpdate = {
      dia: body.dia,
      hora: body.hora,
      updatedAt: new Date(),
    };
    await horarioRepository.update({ id: horarioFound.id }, dataHorarioUpdate);
    const updatedHorario = await horarioRepository.findOne({
      where: { id: horarioFound.id },
    });
    if (!updatedHorario) {
      return [null, "Horario no encontrado despues de actualizar"];
    }
    return [updatedHorario, null];

  } catch (error) {
    console.error("Error al actualizar horario:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteHorarioService(query) {
  try {
    const { id } = query;
    const horarioRepository = AppDataSource.getRepository(Horario);
    const horarioFound = await horarioRepository.findOne({
      where: { id: id }
    });
    if (!horarioFound) {  return [null, "Horario no encontrado"]; }
    const horarioDeleted = await horarioRepository.delete({ id: horarioFound.id });
    return [horarioDeleted, null];
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    return [null, "Error interno del servidor"];
  }
}