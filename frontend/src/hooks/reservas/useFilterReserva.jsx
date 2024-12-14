import { useState } from "react";
import { getReservaXfechas } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatReservaData } from "../../helpers/formatData";

const useFilterReserva = (fetchReservas, setReservas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataReserva, setDataReserva] = useState([]);

    console.log("Pasando por useFilterReserva");

    const handleClickFilter = () => {
        if (dataReserva.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleFilter = async ({ fechaInicio, fechaFin }) => {
        if (fechaInicio && fechaFin) {
            try {
                console.log("Filtrando reservas entre:", fechaInicio, "y", fechaFin);

                const filterReserva = await getReservaXfechas({ fechaInicio, fechaFin });

                if (filterReserva.status === 'Reserva error') {
                    showErrorAlert('Error', filterReserva.details);
                    return;
                }

                showSuccessAlert('¡Filtrado!', 'Las reservas han sido filtradas correctamente.');
                setIsPopupOpen(false);

                // Formatear datos si es necesario
                const formattedReservas = filterReserva.map(formatReservaData);
                console.log("Reservas formateadas:", formattedReservas);

                // Actualizar el estado de reservas
                setReservas(formattedReservas);

                // Limpiar datos de la reserva en caso necesario
                setDataReserva([]);
            } catch (error) {
                console.error('Error al filtrar las reservas:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al filtrar las reservas.');
            }
        } else {
            showErrorAlert('Error', 'Debe ingresar ambas fechas para filtrar.');
        }
    };

    return {
        handleClickFilter,
        handleFilter,
        isPopupOpen,
        setIsPopupOpen,
        dataReserva,
        setDataReserva
    };
};

export default useFilterReserva;
