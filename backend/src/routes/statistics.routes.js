"use strict";
import { Router } from "express";
import {
    getProductsWithMostStockController,
    getProductsWithLeastStockController,
    getOutOfStockProductsController,
    getProveedoresWithMostProductsController,
    getProveedoresWithOutOfStockProductsController
} from "../controllers/statistics.controller.js";

const router = Router();

router.get("/products/most-stock", getProductsWithMostStockController);
router.get("/products/least-stock", getProductsWithLeastStockController);
router.get("/products/out-of-stock", getOutOfStockProductsController);
router.get("/proveedores/most-products", getProveedoresWithMostProductsController);
router.get("/proveedores/out-of-stock-products", getProveedoresWithOutOfStockProductsController);
export default router;