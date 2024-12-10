import Form from "./Form";
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";

function PopupProveedores({ show, setShow, data, action }) {
  // Verificamos que `data` contiene un proveedor válido
  const proveedorData = data || {};
  const handleSubmit = (formData) => {
    action(formData); // Llama la acción pasada como prop para actualizar los datos
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f]">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <h1 className="h1-form dark:text-[#fff]">Editar Proveedor</h1>
            <div className="proovedores-form-container">
              <Form
                title=""
                fields={[
                  {
                    label: "Nombre Proveedor",
                    name: "nombreProveedor",
                    defaultValue: proveedorData.nombreProveedor || "",
                    placeholder: "Ingresar Nombre",
                    fieldType: "input",
                    type: "text",
                    required: true,
                    minLength: 5,
                    maxLength: 50,
                    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                    patternMessage:
                      "El nombre no puede contener caracteres especiales.",
                  },
                  {
                    label: "Página Web",
                    name: "PaginaWeb",
                    defaultValue: proveedorData.PaginaWeb || "",
                    placeholder: "www.ejemplo.com",
                    fieldType: "input",
                    type: "text",
                    required: false,
                  },
                  {
                    label: "Correo electrónico",
                    name: "email",
                    defaultValue: proveedorData.email || "",
                    placeholder: "ejemplo@gmail.cl",
                    fieldType: "input",
                    type: "email",
                    minLength: 10,
                    maxLength: 30,
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.cl$/,
                    patternMessage: "El correo debe finalizar en @gmail.cl.",
                  },
                  {
                    label: "Número de teléfono",
                    name: "telefono",
                    defaultValue: proveedorData.telefono || "",
                    placeholder: "+56912345678",
                    fieldType: "input",
                    type: "text",
                    minLength: 8,
                    maxLength: 8,
                    required: true,
                    pattern: /^\d+$/,
                    patternMessage: "El teléfono debe contener solo números.",
                  },
                  {
                    label: "Dirección",
                    name: "direccion",
                    defaultValue: proveedorData.direccion || "",
                    placeholder: "Ingresar Dirección",
                    fieldType: "input",
                    type: "text",
                    minLength: 5,
                    maxLength: 50,
                    required: false,
                  },
                ]}
                onSubmit={handleSubmit}
                buttonText="Guardar Cambios"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupProveedores;
