"use strict";
import { Router } from "express";
import { createReserva } from "../controllers/reservas.controller.js";

const router = Router();

router.post("/", createReserva);

export default router;
