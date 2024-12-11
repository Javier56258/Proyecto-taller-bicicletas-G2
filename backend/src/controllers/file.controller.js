import multer from "multer";
import path from "path";

// Configuración de multer para almacenar los archivos en la carpeta 'uploads/'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombres de archivo únicos
  },
});

const upload = multer({ storage });

// Función para manejar la subida de archivos
export const uploadFile = upload.single("imagen"); // 'imagen' es el nombre del campo en el formulario
