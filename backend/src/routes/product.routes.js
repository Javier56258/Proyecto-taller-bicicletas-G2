"use strict";
import { Router } from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
    
} from "../controllers/product.controller.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
const router = Router();

router
  .use(authenticateJwt);

router
    .post("/",createProduct)
    .get("/detail",getProduct)
    .get("/all",getProducts)
    .patch("/detail",updateProduct)
    .delete("/detail",deleteProduct)
export default router;

