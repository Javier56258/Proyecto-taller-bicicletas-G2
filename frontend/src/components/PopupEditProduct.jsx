import { useEffect } from "react";
import "@styles/Popup.css";
import CloseIcon from "@assets/XIcon.svg";
import Form from "./Form";
import { useState } from "react";


export default function PopupEditProduct({ show, setShow, producto, action }) {
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
 

    const handleSubmit = (formData) => {
        try {
            action(formData);
            setShow(false);
        } catch (error) {
            console.error("Error al editar producto:", error);
        }
    };


    useEffect(() => {
        if (show && producto) {
            setName(producto.name);
            setDescription(producto.description);
            setStock(producto.stock);
            setPrice(producto.price);
        } else if (show) {
            setName("");
            setDescription("");
            setStock("");
            setPrice("");
        }

        

        if (show) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [show, producto]);


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
                                },
                                {
                                    label: "Descripción",
                                    name: "description",
                                    defaultValue: description || "",
                                    placeholder: "Bicicleta de montaña con frenos de disco...",
                                    fieldType: "textarea",
                                    required: true,
                                    minLength: 10,
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