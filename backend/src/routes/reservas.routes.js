"use strict";
import { Router } from "express";
import { createReserva,
         deleteReserva,
         getReservas,
         updateReserva
         
 } from "../controllers/reservas.controller.js";

const router = Router();


router.post("/", createReserva)
      .get("/", getReservas)
      .patch("/detail/", updateReserva)
      .delete("/", deleteReserva);

export default router;
