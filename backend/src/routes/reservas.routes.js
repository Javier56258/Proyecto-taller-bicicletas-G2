"use strict";
import { Router } from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { createReserva,
         deleteReserva,
         getReservas,
         updateReserva
         
 } from "../controllers/reservas.controller.js";

const router = Router();
router.post("/", createReserva)
router.use(authenticateJwt);
router.get("/", getReservas)
      .patch("/detail/", updateReserva)
      .delete("/", deleteReserva);

export default router;
