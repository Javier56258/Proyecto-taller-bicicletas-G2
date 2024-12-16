"use strict";
import { createVentaService, getVentasService, getVentasByDateService} from "../services/venta.service.js";
import { ventaBodyValidation, ventaQueryValidation } from "../validations/venta.validation.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
    } from "../handlers/responseHandlers.js";

export async function createVenta(req, res) {
    try {
        const { body} = req;
        const {error} = await ventaBodyValidation.validate(body);

        if (error){
            return res.status(400).json({
                message: error.message
            });
        }

        const [ventaSaved, errorVenta] = await createVentaService(body);
        
        if (errorVenta) {
            return res.status(400).json({
                message: errorVenta
            });
        }

        res.status(201).json({
            message: "Venta creada exitosamente",
            data: ventaSaved
        });

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getVentas(req, res) {
    try {
        const [ventas, error] = await getVentasService();

        if (error) {
            return res.status(400).json({
                message: error.message
            });
        }

        handleSuccess(res, 200, "Venta(s) encontradas", ventas);

    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}

export async function getVentasByDate(req, res) {
    try {
        const { startDate, endDate } = req.query;
        const { error } = ventaQueryValidation.validate({ startDate, endDate });


        if (error) return handleErrorClient(res, 400, error.message);

        const [ventas, errorVentas] = await getVentasByDateService(startDate, endDate);

        if (errorVentas) return handleErrorServer(res, 400, errorVentas.message);

        res.status(200).json({
            message: "Ventas encontradas",
            data: ventas
        });
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}