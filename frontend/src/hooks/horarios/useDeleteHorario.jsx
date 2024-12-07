import { deleteHorario } from "@services/horarios.service.js";   
import {
    deleteDataAlert,
    showErrorAlert,
    showSuccessAlert,
  } from "@helpers/sweetAlert.js";

  const useDeleteHorario = (fetchHorarios, setDataHorario) => {
    const handleDelete = async (horarioId) => {
        if (horarioId) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteHorario(horarioId);
                    if(response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!','El horario ha sido eliminado correctamente.');
                    await fetchHorarios();
                    setDataHorario([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el horario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el horario.');
            }
        }
    };

    return {
        handleDelete
    };  
}

export default useDeleteHorario;