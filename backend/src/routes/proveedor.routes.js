"use strict";
import { Router } from "express";
import {
    createProveedor,
    deleteProveedor,
    getProveedor,
    getProveedores,
    updateProveedor,
} from "../controllers/proveedor.controller.js";

const router = Router();

router
    .post("/", createProveedor)
    .get("/all", getProveedores)
    .get("/detail/", getProveedor)
    .patch("/detail/", updateProveedor)
    .delete("/detail/", deleteProveedor);

export default router;