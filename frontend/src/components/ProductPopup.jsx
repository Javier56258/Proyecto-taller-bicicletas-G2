
import Form from './Form';
import "@styles/Popup.css";
import CloseIcon from '@assets/XIcon.svg';



function productPopup({show,setShow,data,action}) {
    const productData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    };

    return(
        <div>
            { show && (
                <div className="bg">
                    <div className="popup">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <Form
                            title="Editar producto"
                            fields={[
                                {
                                    label: "Nombre",
                                    name: "name",
                                    defaultValue: productData.name || "",
                                    placeholder: 'Nombre del producto',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 3,
                                    maxLength: 50,
                                    pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "Debe contener solo letras y espacios",
                                },
                                {
                                    label: "Descripción",
                                    name: "description",
                                    defaultValue: productData.description || "",
                                    placeholder: 'Descripción del producto',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    minLength: 0,
                                    maxLength: 255,
                                },
                                {
                                    label: "Precio",
                                    name: "price",
                                    defaultValue: productData.price || "",
                                    placeholder: 'Precio del producto',
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                },
                                {
                                    label: "Stock",
                                    name: "stock",
                                    defaultValue: productData.stock || "",
                                    placeholder: 'Stock del producto',
                                    fieldType: 'input',
                                    type: "number",
                                    required: true,
                                    min: 0,
                                }
                            
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Editar producto"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default productPopup;