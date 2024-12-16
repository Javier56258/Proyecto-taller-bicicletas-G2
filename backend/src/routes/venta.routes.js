"use strict";
import { Router } from "express";
import { createVenta, getVentas, getVentasByDate,delVentas } from "../controllers/venta.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";


const router = Router();

router
  .use(authenticateJwt);

router
    .post("/",createVenta)
    .get("/all",getVentas)
    .get("/by-date",getVentasByDate)
    .delete("/",delVentas);
export default router;