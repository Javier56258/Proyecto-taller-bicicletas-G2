import Form from './Form';
import '@styles/Popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createProduct } from '@services/product.service.js';


function CreateProduct({ show, setShow, data, action }) {
    const handleSubmit = async (formData) => {
        try {
            await createProduct(formData);
            action(formData);
            setShow(false);
        } catch (error) {
            console.error('Error al crear producto:', error);
        };
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="popup">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Ingresar Producto"
                            fields={[
                                {
                                    label: "Nombre Producto",
                                    name: "name",
                                    placeholder: 'Ingresar Nombre',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "",
                                },
                                {
                                    label: "Precio",
                                    name: "price",
                                    placeholder: 'Ingresar Precio',
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                    pattern: /^[0-9]+$/,
                                    patternMessage: "El precio debe ser valido",
                                },
                                {
                                    label: "Stock",
                                    name: "stock",
                                    placeholder: 'Ingresar Stock',
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                    pattern: /^[0-9]+$/,
                                    patternMessage: "El stock debe ser valido",
                                },
                                {
                                    label: "Descripción",
                                    name: "description",
                                    placeholder: 'Ingresar Descripción',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText={"Ingresar Producto"}
                            backgroundColor={"#fff"}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateProduct;