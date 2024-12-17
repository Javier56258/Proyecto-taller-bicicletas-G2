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


//Rutas que solo requieren autenticación
router
  .use(authenticateJwt);

router
  .get("/all", getProveedores)
  .get("/detail/", getProveedor);

router.use(isAdmin);

router
  .post("/", createProveedor)
  .patch("/detail/", updateProveedor)
  .post("/assign-product", assignProductsToProveedor)
  .delete("/detail/", deleteProveedor);

export default router;