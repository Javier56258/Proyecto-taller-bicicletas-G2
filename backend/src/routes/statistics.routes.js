"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

import {
    getProductsWithMostStockController,
    getProductsWithLeastStockController,
    getOutOfStockProductsController,
    getProveedoresWithMostProductsController,
    getProveedoresWithOutOfStockProductsController,
    getMostSoldProductsController,
    getEarnings,
    getProveedoresWithMostSoldProductsController,
} from "../controllers/statistics.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
    .get("/products/most-stock", getProductsWithMostStockController)
    .get("/products/least-stock", getProductsWithLeastStockController)
    .get("/products/out-of-stock", getOutOfStockProductsController)
    .get("/proveedores/most-products", getProveedoresWithMostProductsController)
    .get("/proveedores/out-of-stock-products", getProveedoresWithOutOfStockProductsController)
    .get("/proveedores/most-sold-products", getProveedoresWithMostSoldProductsController)
    .get("/products/most-sold", getMostSoldProductsController)
    .get("/earnings", getEarnings);
    
export default router;