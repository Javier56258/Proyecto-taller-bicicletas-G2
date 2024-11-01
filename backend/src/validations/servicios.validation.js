import Joi from 'joi';

// Esquema de validación para crear un nuevo servicio
export const createServicioSchema = Joi.object({
  nombre: Joi.string().min(3).max(255).required(),
  descripcion: Joi.string().max(1000).optional(),
});

// Esquema de validación para actualizar un servicio existente
export const updateServicioSchema = Joi.object({
  idServicio: Joi.number().integer().required(),
  nombre: Joi.string().min(3).max(255).required(),
  descripcion: Joi.string().max(1000).optional(),
});

// Esquema de validación para eliminar un servicio
export const deleteServicioSchema = Joi.object({
  idServicio: Joi.number().integer().required(),
});
