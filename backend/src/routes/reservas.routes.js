"use strict";
import { Router } from "express";
import { createReserva,
         //delateReserva,
         getReservas,
         updateReserva
         
 } from "../controllers/reservas.controller.js";

const router = Router();


router.post("/", createReserva)
      .get("/", getReservas)
      .patch("/detail/", updateReserva);
//      .delete("/", delateReserva);

export default router;
