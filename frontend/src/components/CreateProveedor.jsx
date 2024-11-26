import React from 'react';
import Form from './Form';
import '@styles/Popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createProveedor } from '@services/proveedor.service.js';

function CreateProveedor({ show, setShow, data, action }) {

    const handleSubmit = async (formData) => {
        try {
            await createProveedor(formData);
            action(formData);
        } catch (error) {
            console.error('Error al crear proveedor:', error);
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
                            title="Ingresar Proveedor"
                            fields={[
                                {
                                    label: "Nombre Proveedor",
                                    name: "nombreProveedor",
                                    placeholder: 'Ingresar Nombre',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                    pattern: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]+$/,
                                    patternMessage: "",
                                },
                                {
                                    label: "Productos Suministrados",
                                    name: "productos_suministrados",
                                    placeholder: 'Ingresar Productos',
                                    fieldType: 'input',
                                    type: "text",
                                    required: true,
                                },
                                {
                                    label: "Pagina Web",
                                    name: "PaginaWeb",
                                    placeholder: 'www.ejemplo.com',
                                    fieldType: 'input',
                                    type: "text",
                                    pattern: "",
                                    patternMessage: "",
                                    required: false,
                                },
                                {
                                    label: "Correo electrónico",
                                    name: "email",
                                    placeholder: 'ejemplo@gmail.cl',
                                    fieldType: 'input',
                                    type: "email",
                                    minLength: 10,
                                    maxLength: 30,
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.cl$/,
                                    patternMessage: "El correo electrónico debe finalizar en @gmail.cl.",
                                },
                                {
                                    label: "Número de teléfono",
                                    name: "telefono",
                                    placeholder: '12345678',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 8,
                                    maxLength: 8,
                                    required: true,
                                },

                                {
                                    label: "Dirección",
                                    name: "direccion",
                                    placeholder: 'Ingresar Dirección',
                                    fieldType: 'input',
                                    type: "text",
                                    minLength: 5,
                                    maxLength: 50,
                                    required: false,
                                },
                            ]}
                            onSubmit={handleSubmit}
                            buttonText="Ingresar proveedor"
                            backgroundColor={'#fff'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateProveedor;
