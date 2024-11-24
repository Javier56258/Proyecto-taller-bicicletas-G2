import { useState,useEffect } from "react";
import { getReservas } from "@services/reserva.service.js";

const useReservas = () => {
    const [reservas, setReservas] = useState([]);

    const fetchReservas = async () => {
        try {
            const response = await getReservas();
            const formattedData = response.map((reserva) => ({
                nombreReservador: reserva.nombreReservador,
                email: reserva.email,
                motivo: reserva.motivo,
                fecha: reserva.fecha,
                hora: reserva.hora,
                id: reserva.id,
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