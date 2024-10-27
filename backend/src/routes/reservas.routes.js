"use strict";
import { Router } from "express";
import { createReserva,
         getReservas
 } from "../controllers/reservas.controller.js";

const router = Router();


router.post("/", createReserva)
      .get("/", getReservas);

export default router;
