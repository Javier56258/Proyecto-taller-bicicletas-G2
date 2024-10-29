"use strict";
import { Router } from "express";
import reservasRouter from "./reservas.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import productRoutes from "./product.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/product",productRoutes);
    .use("/reservas", reservasRouter);


export default router;