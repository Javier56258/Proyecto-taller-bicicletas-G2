"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProveedor,
    deleteProveedor,
    getProveedor,
    getProveedores,
    updateProveedor,
    assignProductsToProveedor,
} from "../controllers/proveedor.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
    .post("/", createProveedor)
    .get("/all", getProveedores)
    .get("/detail/", getProveedor)
    .patch("/detail/", updateProveedor)
    .post("/assign-product", assignProductsToProveedor)
    .delete("/detail/", deleteProveedor);

export default router;