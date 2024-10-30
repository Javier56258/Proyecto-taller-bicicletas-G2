import Form from './Form';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import QuestionIcon from '@assets/QuestionCircleIcon.svg';

export default function PopupProveedores({ show, setShow, data, action }) {
    const proveedorData = data && data.length > 0 ? data[0] : {};

    const handleSubmit = (formData) => {
        action(formData);
    }

    return (
        <div>
            { show && (
                <div className="bg">
                <div className="popup">
                    <button className='close' onClick={() => setShow(false)}>
                        <img src={CloseIcon} />
                    </button>
                    <Form
                        title="Editar Proveedor"
                        fields={[
                            {
                                label: "Nombre Proveedor",
                                name: "nombreCompleto",
                                defaultValue: proveedorData.nombreProveedor || "",
                                placeholder: 'Ingresar Nombre',
                                fieldType: 'input',
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
                                placeholder: 'www.ejemplo.com',
                                fieldType: 'input',
                                type: "text",
                                minLength: 9,
                                maxLength: 12,
                                pattern: "",
                                patternMessage: "",
                                required: false,
                            },
                            {
                                label: "Correo electrónico",
                                name: "email",
                                defaultValue: proveedorData.email || "",
                                placeholder: 'ejemplo@gmail.cl',
                                fieldType: 'input',
                                type: "email",
                                minLength: 15,
                                maxLength: 30,
                                required: false,
                            },
                            {
                                label: "Número de teléfono",
                                name: "telefono",
                                defaultValue: proveedorData.telefono || "",
                                placeholder: '+56912345678',
                                fieldType: 'input',
                                type: "text",
                                minLength: 9,
                                maxLength: 12,
                                required: false,
                            },
                            
                            {
                                label: "Dirección",
                                name: "direccion",
                                defaultValue: proveedorData.direccion || "",
                                placeholder: 'Ingresar Dirección',
                                fieldType: 'input',
                                type: "text",
                                minLength: 10,
                                maxLength: 50,
                                required: true,
                            },
                        ]}
                        onSubmit={handleSubmit}
                        buttonText="Editar proveedor"
                        backgroundColor={'#fff'}
                    />
                </div>
            </div>
            )}
        </div>
    );
} 
