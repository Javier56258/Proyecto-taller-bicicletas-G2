"use strict";
import express from "express";
import {
  addServicio,
  editServicio,
  getServicios,
  removeServicio,
} from "../controllers/servicios.controller.js";

const router = express.Router();

// Rutas para los servicios
router.get("/all", getServicios);
router.post("/create", addServicio);
router.patch("/detail", editServicio);
router.delete("/detail", removeServicio);

export default router;
