"use strict";
import express from "express";
import { sendCustomeEmail } from "../controllers/email.controller.js";

const router = express.Router();

router.post("/send", sendCustomeEmail);

export default router;