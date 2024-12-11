"use strict";
import express from "express";
import multer from "multer";
import path from "path";
import {
  addServicio,
  editServicio,
  getServicios,
  removeServicio,
} from "../controllers/servicios.controller.js";

const router = express.Router();

// Configuración de multer para la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("src", "public", "uploads");
    console.log("Ruta de destino para guardar la imagen:", uploadPath); // Log para verificar ruta
    cb(null, uploadPath); // Cambiado a la ruta absoluta de src/public/uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${file.originalname}`;
    console.log("Nombre del archivo que se va a guardar:", uniqueName); // Log para verificar el nombre del archivo
    cb(null, uniqueName); // Nombre único para la imagen
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Limitar tamaño máximo a 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    console.log("Tipo de archivo recibido:", file.mimetype); // Log para verificar el tipo de archivo
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Si el tipo es válido, aceptamos el archivo
    } else {
      cb(new Error("Tipo de archivo no permitido"), false); // Si el tipo no es permitido, rechazamos el archivo
    }
  },
});

// Rutas para los servicios
router.get("/all", getServicios);

// Ruta para crear servicio con imagen
router.post(
  "/create",
  upload.single("imagen"),
  (req, res, next) => {
    // Log para verificar si la imagen está presente en el request
    console.log("Archivo recibido Routes:", req.file); // Verifica que el archivo esté presente en el request
    console.log("Datos del formulario Routes:", req.body); // Verifica que los otros datos (nombre, descripcion) también estén presentes

    // Llamamos al controlador si todo es correcto
    next();
  },
  addServicio,
);

// Ruta para editar servicio con imagen (opcional)
router.patch(
  "/detail",
  upload.single("imagen"),
  (req, res, next) => {
    // Verificamos los datos recibidos antes de editar
    console.log("Archivo recibido (editar):", req.file); // Log para verificar el archivo
    console.log("Datos del formulario (editar):", req.body); // Log para verificar los datos del servicio

    // Llamamos al controlador si todo es correcto
    next();
  },
  editServicio,
);

// Ruta para eliminar servicio
router.delete("/detail", removeServicio);

export default router;
