import Swal from "sweetalert2";

export async function deleteDataAlert(message) {
  return Swal.fire({
    title: "¿Estás seguro?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
  });
}

export const showSuccessAlert = (titleMessage, message) => {
  Swal.fire(titleMessage, message, "success");
};

export const showErrorAlert = (titleMessage, message) => {
  Swal.fire(titleMessage, message, "error");
};
