"use strict";
import { Router } from "express";
import {
    deleteProveedor,
    getProveedor,
    getProveedores,
    updateProveedor,
    createProveedor,
} from "../controllers/proveedor.controller.js";

const router = Router();

router
    .post("/", createProveedor)
    .get("/all", getProveedores)
    .get("/detail/", getProveedor)
    .patch("/detail/", updateProveedor)
    .delete("/detail/", deleteProveedor);

export default router;