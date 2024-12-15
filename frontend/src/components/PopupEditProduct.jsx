
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";



export default function PopupEditProduct({ show, setShow, producto, action }) {
    
    const { name, description, stock, price } = producto || {};
 

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
                            title="Editar Producto"
                            fields={[
                                {
                                    label: "Nombre",
                                    name: "name",
                                    defaultValue: name || "",
                                    placeholder: "Bicicleta de montaña...",
                                    fieldType: "input",
                                    type: "text",
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "El nombre no puede contener caracteres especiales.",
                                },
                                {
                                    label: "Descripción",
                                    name: "description",
                                    defaultValue: description || "",
                                    placeholder: "Bicicleta de montaña con frenos de disco...",
                                    fieldType: "textarea",
                                    required: false,
                                    maxLength: 255,
                                    
                                },
                                {
                                    label: "Stock",
                                    name: "stock",
                                    defaultValue: stock || "",
                                    placeholder: "10",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Precio",
                                    name: "price",
                                    defaultValue: price || "",
                                    placeholder: "1000",
                                    fieldType: "input",
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                            ]}
                            buttonText="Guardar"
                            onSubmit={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </div>
    )

}