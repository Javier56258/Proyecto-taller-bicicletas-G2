import { useEffect, useState } from "react";
import {getHorarios} from "@services/horarios.service.js";

const useHorario = () => {
    const [horarios, setHorarios] = useState([]);

    const fetchHorarios = async () => {
        try {
            const response = await getHorarios();
            const formattedData = response.map(horario => ({
                id: horario.id,
                dia: horario.dia,
                hora: horario.hora
            }));
            setHorarios(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchHorarios();
    }, []);

    return { horarios, fetchHorarios, setHorarios };
};

export default useHorario;