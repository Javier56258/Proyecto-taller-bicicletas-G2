import { useState } from 'react';
import { updateProveedor } from '@services/proveedor.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateProveedor } from '../../helpers/formatData.js';

const useEditProveedor = (setProveedores) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataProveedor, setDataProveedor] = useState([]);

    const handleClickUpdate = () => {
        if (dataProveedor.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedProveedorData) => {
        if (updatedProveedorData) {
            try {
            const updatedProveedor = await updateProveedor(updatedProveedorData, dataProveedor[0].idProveedor);
            setIsPopupOpen(false);
            const formattedProveedor = formatPostUpdateProveedor(updatedProveedor);
            console.log("Proveedor formateado:", formattedProveedor);
            showSuccessAlert('¡Actualizado!','El proveedor ha sido actualizado correctamente.');
            console.log("Proveedor actualizado:", updatedProveedor);

            setProveedores(prevProveedores => prevProveedores.map(proveedor => {
                console.log("Proveedor actual:", proveedor);
                if (proveedor.idProveedor === formattedProveedor.idProveedor) {
                    console.log("Reemplazando con:", formattedProveedor);
                }
                return proveedor.nombreProveedor === formattedProveedor.nombreProveedor ? formattedProveedor : proveedor;
            }));
            
            setDataProveedor([]);
            } catch (error) {
                console.error('Error al actualizar el proveedor:', error);
                showErrorAlert('Cancelado','Ocurrió un error al actualizar el proveedor.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProveedor,
        setDataProveedor
    };
};

export default useEditProveedor;
