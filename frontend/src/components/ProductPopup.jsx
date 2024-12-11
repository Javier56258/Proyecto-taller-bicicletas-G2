import Form from "./Form";
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";

function productPopup({ show, setShow, data, action }) {
  const productData = data && data.length > 0 ? data[0] : {};

  const handleSubmit = (formData) => {
    try {
      action(formData);
      setShow(false);

    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  return (
    <div>
      {show && (
        <div className="bg">
          <div className="popup">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} />
            </button>
            <Form
              className="form"
              title="Producto"
              fields={[
                {
                  label: "Nombre",
                  name: "name",
                  defaultValue: productData.name || "",
                  placeholder: "Bicicleta de montaña...",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                  pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/,
                  patternMessage:
                    "Debe contener solo letras, números y espacios",
                },
                {
                  label: "Descripción",
                  name: "description",
                  defaultValue: productData.description || "",
                  placeholder: "Descripción del producto",
                  fieldType: "input",
                  type: "text",
                  required: true,
                  minLength: 0,
                  maxLength: 255,
                },
                {
                  label: "Precio",
                  name: "price",
                  defaultValue: productData.price || 0,

                  placeholder: "Precio del producto",
                  fieldType: "input",
                  type: "number",
                  required: true,
                  min: 0,
                  pattern: /^[0-9]+$/,
                  patternMessage: "Precio invalido",
                },
                {
                  label: "Stock",
                  name: "stock",
                  defaultValue: productData.stock || "",
                  placeholder: "Stock del producto",
                  pattern: /^[0-9]+$/,
                  fieldType: "input",
                  type: "number",
                  required: true,
                  min: 0,
                  max: 1000,
                  patternMessage: "stock invalido",
                },
                {
                  label: "Proveedor",
                  name: "provider",
                }
              ]}
              onSubmit={handleSubmit}
              buttonText="Crear producto"
              backgroundColor={"#fff"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default productPopup;
