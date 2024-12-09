import Form from "./Form";
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";

function PopupProveedores({ show, setShow, data, action }) {
  const proveedorData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    action(formData);
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="prov-popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <h1 className="h1-form">Editar Proveedor</h1>
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
                    patternMessage: "",
                  },
                  {
                    label: "Pagina Web",
                    name: "PaginaWeb",
                    defaultValue: proveedorData.PaginaWeb || "",
                    placeholder: "www.ejemplo.com",
                    fieldType: "input",
                    type: "text",
                    pattern: "",
                    patternMessage: "",
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
                    patternMessage:
                      "El correo electrónico debe finalizar en @gmail.cl.",
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
                buttonText="Editar proveedor"
                backgroundColor={"#fff"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupProveedores;
