import { useState } from 'react';
import { updateHorario } from '@services/horarios.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateHorario } from '../../helpers/formatData';

const useEditHorario = (fetchHorarios, setHorarios) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataHorario, setDataHorario] = useState([]);

    const handleClickUpdate = (selectedHorario) => { 
        setDataHorario([selectedHorario]); 
        setIsPopupOpen(true);
      };

    const handleUpdate = async (updatedHorarioData) => {
        if (updatedHorarioData) {
            try {
                const updatedHorario = await updateHorario(dataHorario[0].id, updatedHorarioData);

                if(updatedHorario.status === 'Horario error') {
                    setIsPopupOpen(false);
                    return showErrorAlert('Error', updatedHorario.details);
                }

                setIsPopupOpen(false);

                showSuccessAlert('¡Actualizado!', 'El horario ha sido actualizado correctamente.');
                const formattedHorario = formatPostUpdateHorario(updatedHorario);

                setHorarios(prevHorarios => prevHorarios.map(horario => {
                    if (horario.id === formattedHorario.id) {
                        return formattedHorario;
                    }
                    return horario;
                }));

                setDataHorario([]);
                await fetchHorarios();
            } catch (error) {
                console.error('Error al actualizar el horario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el horario.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataHorario,
        setDataHorario
    };
}

export default useEditHorario;