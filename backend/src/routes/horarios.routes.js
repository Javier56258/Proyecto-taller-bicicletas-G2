"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";

import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { createHorario,
         deleteHorario,
         getHorarios,
         getAllHorarios,
         updateHorarios
         
 } from "../controllers/horarios.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);
router.post("/", createHorario)
      .get("/", getHorarios)
      .patch("/", updateHorarios)
      .delete("/", deleteHorario)
      .get("/all", getAllHorarios);

export default router;
