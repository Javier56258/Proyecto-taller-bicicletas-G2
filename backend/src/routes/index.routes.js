"use strict";
import { Router } from "express";
import reservasRouter from "./reservas.routes.js";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import proveedorRoutes from "./proveedor.routes.js";

import serviciosRoutes from "./servicios.routes.js";
import productRoutes from "./product.routes.js";
import horariosRouter from "./horarios.routes.js";
const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)

    .use("/reservas", reservasRouter)
    .use("/horarios", horariosRouter)
    .use("/servicios", serviciosRoutes)
    .use("/proveedor", proveedorRoutes)
    .use("/product",productRoutes);



export default router;
