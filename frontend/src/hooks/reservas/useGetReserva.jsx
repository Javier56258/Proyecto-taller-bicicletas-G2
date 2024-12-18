import { useState, useEffect } from "react";
import { getReservas } from "@services/reserva.service.js";

const useReservas = () => {
    console.log("Pasando por useReservas");
    const [reservas, setReservas] = useState([]);
    console.log("Reservas: ");
    console.log(reservas);
    const fetchReservas = async () => {
        try {
            const response = await getReservas();
            console.log("Pasando por fetchReservas");
            console.log(response);
            if (response.message === "No hay reservas") {
                console.log("No hay reservas");
                return;
            }
            const formattedData = response.map((reserva) => ({
                nombreReservador: reserva.nombreReservador,
                email: reserva.email,
                motivo: reserva.motivo,
                fecha: reserva.fecha,
                hora: reserva.hora,
                idreserva: reserva.idreserva,
                createdAt: reserva.createdAt
            }));
            setReservas(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    return { reservas, fetchReservas, setReservas };
}

export default useReservas;