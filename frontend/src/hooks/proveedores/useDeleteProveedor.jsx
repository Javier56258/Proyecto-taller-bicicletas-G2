import { deleteProveedor } from "../../services/proveedor.service.js";
import {
  deleteDataAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../helpers/sweetAlert.js";

const useDeleteProveedor = (fetchProveedores) => {
  const handleDelete = async (idProveedores) => {
    if (idProveedores.length > 0) {
      try {
        // Muestra una alerta confirmando cuántos proveedores serán eliminados
        const result = await deleteDataAlert(
          `Estás a punto de eliminar un proveedor.`
        );
        if (result.isConfirmed) {
          // Elimina cada proveedor y maneja errores individuales
          const errors = [];
          for (const id of idProveedores) {
            try {
              const response = await deleteProveedor(id);
              if (response.status === "Client error") {
                errors.push(response.details);
              }
            } catch (error) {
              console.error(
                `Error al eliminar el proveedor con ID ${id}:`,
                error
              );
              errors.push(`Error al eliminar el proveedor con ID ${id}`);
            }
          }

          // Si hubo errores, los mostramos en una alerta
          if (errors.length > 0) {
            showErrorAlert(
              "Algunos proveedores no pudieron ser eliminados",
              errors.join("\n")
            );
          } else {
            showSuccessAlert(
              "¡Eliminado!",
              "Todos los proveedores seleccionados han sido eliminados correctamente."
            );
          }

          // Actualiza la lista de proveedores
          await fetchProveedores();
        } else {
          showErrorAlert("Cancelado", "La operación ha sido cancelada.");
        }
      } catch (error) {
        console.error("Error en el proceso de eliminación:", error);
        showErrorAlert(
          "Cancelado",
          "Ocurrió un error al eliminar los proveedores."
        );
      }
    }
  };

  return {
    handleDelete,
  };
};

export default useDeleteProveedor;
