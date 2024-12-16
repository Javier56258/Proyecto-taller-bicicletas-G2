"use strict";
import { Router } from "express";
import { createVenta, getVentas, getVentaByDate } from "../controllers/venta.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";


const router = Router();

router
  .use(authenticateJwt);

router
    .post("/",createVenta)
    .get("/all",getVentas)
    .get("/by-date",getVentaByDate);
export default router;