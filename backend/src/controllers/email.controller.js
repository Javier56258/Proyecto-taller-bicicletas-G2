import { sendEmail } from '../services/email.service.js';
import {
    handleErrorServer,
    handleSuccess,
} from "../handlers/responseHandlers.js";

export const sendCustomeEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    try {
        const info = await sendEmail(
            email, 
            subject,
            message, 
            `<p>${message}</p>`
        );

        handleSuccess(res, 200, "Correo enviado exitosamente: ", info);
    } catch (error) {
        handleErrorServer(res, 500, "Error al enviar el correo: " , error);
    }
};

