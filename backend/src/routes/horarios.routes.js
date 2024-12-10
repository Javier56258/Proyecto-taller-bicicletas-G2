"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";

import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { createHorario,
         deleteHorario,
         getAllHorarios,
         getHorarios,
         updateHorarios
         
 } from "../controllers/horarios.controller.js";

const router = Router();
router.get("/all", getAllHorarios)
router
  .use(authenticateJwt)
  .use(isAdmin);
router.post("/", createHorario)
      .get("/", getHorarios)
      .patch("/", updateHorarios)
      .delete("/", deleteHorario);

export default router;
