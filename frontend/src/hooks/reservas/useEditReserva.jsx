import { useState } from "react";
import { updateReserva } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostUpdateReserva } from "../../helpers/formatData";

const useEditReserva = (fetchReservas, setReservas) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataReserva, setDataReserva] = useState([]);
    console.log("Pasando por useEditReserva");
    const handleClickUpdate = () => {
        if (dataReserva.length > 0) {
            setIsPopupOpen(true);
        }
    };
    console.log("dataReserva: ", dataReserva);
    const handleUpdate = async (updatedReservaData) => {
        if (updatedReservaData) {
            try {
                console.log("Reserva actualizada:", updatedReservaData);
                console.log("Id de reserva: ", dataReserva[0].idreserva);
                console.log("Fecha: ", updatedReservaData.fecha);
                const dateParts = updatedReservaData.fecha.split('-');
                const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                console.log(formattedDate);
                updatedReservaData.fecha = formattedDate;
                const updatedReserva = await updateReserva(updatedReservaData, dataReserva[0].idreserva);  
                if(updatedReserva.status === 'Reserva error') {
                    return showErrorAlert('Error', updatedReserva.details);
                }
                
                showSuccessAlert('¡Actualizado!', 'La reserva ha sido actualizada correctamente.');
                setIsPopupOpen(false);
                console.log("Reserva actualizada:", updatedReserva);
                
                const formattedReserva = formatPostUpdateReserva(updatedReserva);
                console.log("formattedReserva: ", formattedReserva);
                setReservas(prevReservas => prevReservas.map(reserva => {
                    console.log("Reserva actual:", reserva);
                    if (reserva.idreserva === formattedReserva.idreserva) {
                        console.log("Reemplazando con:", formattedReserva);
                    }
                    return reserva.idreserva === formattedReserva.idreserva ? formattedReserva : reserva;
                }));
                await fetchReservas();
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