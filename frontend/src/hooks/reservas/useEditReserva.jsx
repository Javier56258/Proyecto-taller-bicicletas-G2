import { useState } from "react";
import { updateReserva } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostUpdateReserva } from "../../helpers/formatData";

const useEditReserva = (setReservas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataReserva, setDataReserva] = useState([]);

    const handleClickUpdate = () => {
        if (dataReserva.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedReservaData) => {
        if (updatedReservaData) {
            try {

                const updatedReserva = await updateReserva(updateReserva, dataReserva[0].id);
                showSuccessAlert('¡Actualizado!', 'La reserva ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                const formattedReserva = formatPostUpdateReserva(updatedReserva);
                
                setReservas(prevReservas => prevReservas.map(reserva => {
                    console.log("Reserva actual:", reserva);
                    if (reserva.id === formattedReserva.id) {
                        console.log("Reemplazando con:", formattedReserva);
                    }
                    return reserva.id === formattedReserva.id ? formattedReserva : reserva;
                }));

                setDataReserva([]);
            } catch (error) {
                console.error('Error al actualizar la reserva:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar la reserva.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataReserva,
        setDataReserva
    };
};

export default useEditReserva;