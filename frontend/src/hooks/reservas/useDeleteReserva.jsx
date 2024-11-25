import { deleteReserva } from "../../services/reserva.service";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert";

const useDeleteReserva = (fetchReservas, setDataReserva) => {
    const handleDelete = async (dataReserva) => {
        if (dataReserva.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteReserva(dataReserva[0].id);
                    if(response.status === 'Reserva error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','La reserva ha sido eliminada correctamente.');
                    await fetchReservas();
                    setDataReserva([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar la reserva:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar la reserva.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteReserva;