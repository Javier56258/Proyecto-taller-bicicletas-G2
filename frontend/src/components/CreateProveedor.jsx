import Form from "./Form";
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";
import { createProveedor  } from "@services/proveedor.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert"; 

function CreateProveedor({ show, setShow, data, action }) {
  const handleSubmit = async (formData) => {
    try {
      await createProveedor(formData);
      action(formData);
      setShow(false);
      showSuccessAlert("Proveedor creado", "El proveedor ha sido creado correctamente.");
    } catch (error) {
      showErrorAlert("Error", "No se pudo crear el proveedor.");
    }
  };
  


  return (
    <div>
      {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f]">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <h1 className="h1-form dark:text-[#fff]">Ingresar Proveedor</h1>
            <div className="proovedores-form-container">
              <Form
                title=""
                fields={[
                  {
                    label: "Nombre Proveedor",
                    name: "nombreProveedor",
                    placeholder: "Ingresar Nombre",
                    fieldType: "input",
                    type: "text",
                    required: true,
                    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                    patternMessage: "",
                  },
                  {
                    label: "Pagina Web",
                    name: "PaginaWeb",
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
                    placeholder: "12345678",
                    fieldType: "input",
                    type: "text",
                    minLength: 8,
                    maxLength: 8,
                    required: true,
                  },
                  {
                    label: "Dirección",
                    name: "direccion",
                    placeholder: "Ingresar Dirección",
                    fieldType: "input",
                    type: "text",
                    minLength: 5,
                    maxLength: 50,
                    required: false,
                  },
                ]}
                onSubmit={handleSubmit}
                buttonText="Ingresar proveedor"
                backgroundColor={"#fff"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateProveedor;
