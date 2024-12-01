import { useEffect, useState } from "react";
import { updateProveedor } from "@services/proveedor.service"; // Asegúrate de importar tu servicio de actualización
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert"; // Importar las alertas
import { formatPostUpdateProveedor } from "@helpers/formatData"; // Si tienes alguna función para formatear los datos

const useEditProveedor = (setProveedores, fetchProveedores) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dataProveedor, setDataProveedor] = useState(null);

  // useEffect para sincronizar el proveedor seleccionado
  useEffect(() => {
    // Verificar si el proveedor seleccionado es válido
    if (dataProveedor) {
      console.log(
        "Proveedor seleccionado antes de abrir el popup:",
        dataProveedor
      );
    }
  }, [dataProveedor]);

  // Función para manejar la apertura del popup de edición
  const handleClickUpdate = () => {
    setIsPopupOpen(true); // Abrir popup de edición
  };

  // Función para manejar la actualización de los datos del proveedor
  const handleUpdate = async (updatedData) => {
    if (dataProveedor && dataProveedor.idProveedor) {
      try {
        // Llamar al servicio para actualizar el proveedor
        const response = await updateProveedor(
          updatedData,
          dataProveedor.idProveedor
        );

        // Si la actualización fue exitosa
        if (response.status === "Success") {
          // Mostrar la alerta de éxito
          showSuccessAlert(
            "¡Proveedor actualizado!",
            "El proveedor ha sido actualizado correctamente."
          );

          // Cerrar el popup después de la actualización
          setIsPopupOpen(false);
          // Actualizar la lista de proveedores con los nuevos datos
          setProveedores((prev) =>
            prev.map((proveedor) =>
              proveedor.idProveedor === dataProveedor.idProveedor
                ? { ...proveedor, ...updatedData }
                : proveedor
            )
          );

          // Volver a cargar los proveedores
          fetchProveedores();
        } else {
          // Si hubo algún error en la respuesta
          showErrorAlert("Error", "No se pudo actualizar el proveedor.");
        }
      } catch (error) {
        // Manejar errores y mostrar alerta de error
        console.error("Error al actualizar el proveedor:", error);
        showErrorAlert(
          "Cancelado",
          "Ocurrió un error al actualizar el proveedor."
        );
      }
    } else {
      // Si no hay un proveedor seleccionado
      showErrorAlert(
        "Proveedor no encontrado",
        "Por favor, seleccione un proveedor válido."
      );
    }
  };

  // Retornar las funciones y el estado para ser usados en el componente principal
  return {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataProveedor,
    setDataProveedor,
  };
};

export default useEditProveedor;
