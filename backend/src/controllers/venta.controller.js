"use strict";
import { createVentaService, getVentasService, getVentaByDateService} from "../services/venta.service.js";
import {
    handleErrorClient,
    handleErrorServer,
    handleSuccess,
    } from "../handlers/responseHandlers.js";

export async function createVenta(req, res) {
    try {
        const { body} = req;
        const [error] = await createVentaService(body);

        if (error){
            return res.status(400).json({
                message: error.message
            });
        }

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

export async function getVentaByDate(req, res) {
    try {
        const { date } = req.query;
        const [ventas, error] = await getVentaByDateService(date);

        if (error) return handleErrorClient(res, 400, error.message);

        res.status(200).json({
            message: "Ventas encontradas",
            data: ventas
        });
    } catch (error) {
        handleErrorServer(res, 500, error.message);
    }
}