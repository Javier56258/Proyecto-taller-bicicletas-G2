import { deleteProveedor } from "../../services/proveedor.service.js";
import { deleteDataAlert, showErrorAlert, showSuccessAlert } from "../../helpers/sweetAlert.js";

const useDeleteProveedor = (fetchProveedores, setDataProveedor) => {
    const handleDelete = async (dataProveedor) => {
        if (dataProveedor.length > 0) {
            try {
                const result = await deleteDataAlert();
                if (result.isConfirmed) {
                    const response = await deleteProveedor(dataProveedor[0].idProveedor);
                    if (response.status === 'Client error') {
                        return showErrorAlert('Error', response.details);
                    }
                    showSuccessAlert('¡Eliminado!', 'El proveedor ha sido eliminado correctamente.');
                    await fetchProveedores();
                    setDataProveedor([]);
                } else {
                    showErrorAlert('Cancelado', 'La operación ha sido cancelada.');
                }
            } catch (error) {
                console.error('Error al eliminar el proveedor:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al eliminar el proveedor.');
            }
        }
    };

    return {
        handleDelete
    };
};

export default useDeleteProveedor;