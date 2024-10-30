import { useState } from 'react';
import { updateProveedor } from '@services/proveedor.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdate } from '@helpers/formatData.js';

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
            showSuccessAlert('¡Actualizado!','El proveedor ha sido actualizado correctamente.');
            setIsPopupOpen(false);
            const formattedProveedor = formatPostUpdate(updatedProveedor);

            setProveedores(prevProveedores => prevProveedores.map(proveedor => {
                console.log("Proveedor actual:", proveedor);
                if (proveedor.id === formattedProveedor.id) {
                    console.log("Reemplazando con:", formattedProveedor);
                }
                return proveedor.email === formattedProveedor.email ? formattedProveedor : proveedor;
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