import React, { useState } from 'react';
import { register } from '@services/auth.service.js';
import Form from "@components/Form";
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { useForm } from 'react-hook-form';

const RegisterPopup = ({ show, setShow }) => {
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorRut, setErrorRut] = useState(null);

    const { register: registerForm, handleSubmit, formState: { errors }, setValue } = useForm();

    const formatRut = (inputRut) => {
        // Eliminar caracteres no válidos
        let cleanRut = inputRut.replace(/[^0-9kK]/g, '');

        // Extraer el cuerpo y dígito verificador
        const dv = cleanRut.slice(-1).toUpperCase(); // Último carácter (digito verificador)
        let cuerpo = cleanRut.slice(0, -1); // Todo menos el último carácter

        // Agregar puntos cada 3 dígitos al cuerpo
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Retornar RUT formateado
        return cuerpo ? `${cuerpo}-${dv}` : '';
    };

    const handleInputChange = (field, value) => {
        if (field === 'rut') {
            // Formatear RUT y actualizar en react-hook-form
            value = formatRut(value);
            setValue('rut', value);  // Sincroniza con react-hook-form
        }

        // Limpiar errores al modificar el input
        if (field === 'email') setErrorEmail(null);
        if (field === 'rut') setErrorRut(null);
    };

    const registerSubmit = async (data) => {
        try {
            const response = await register(data);
            if (response.status === 'Success') {
                showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
                setShow(false); // Cerrar popup al completar registro
            } else if (response.status === 'Client error') {
                if (response.details?.email) setErrorEmail(response.details.email);
                if (response.details?.rut) setErrorRut(response.details.rut);
            }
        } catch (error) {
            console.error("Error al registrar un usuario: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    };

    if (!show) return null;

    return (
        <div className="bg">
            <div className="popup">
                <button className="close" onClick={() => setShow(false)}>
                    <img src={CloseIcon} alt="Cerrar" />
                </button>
                <Form
                    title="Registrar Usuario"
                    fields={[
                        {
                            label: "Nombre completo",
                            name: "nombreCompleto",
                            placeholder: "Nombre y apellido",
                            fieldType: 'input',
                            type: "text",
                            required: true,
                            minLength: 15,
                            maxLength: 50,
                            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            patternMessage: "Debe contener solo letras y espacios",
                            value: "",
                            onChange: (e) => handleInputChange('nombreCompleto', e.target.value)
                        },
                        {
                            label: "Correo electrónico",
                            name: "email",
                            placeholder: "example@gmail.com",
                            fieldType: 'input',
                            type: "email",
                            required: true,
                            minLength: 15,
                            maxLength: 35,
                            errorMessageData: errorEmail,
                            value: "",
                            onChange: (e) => handleInputChange('email', e.target.value)
                        },
                        {
                            label: "Rut",
                            fieldType: 'input',
                            type: "text",
                            name: "rut",
                            placeholder: "11.111.111-1",
                            value: "", // Este valor estará controlado por react-hook-form
                            onChange: (e) => handleInputChange('rut', e.target.value),
                            required: true,
                        },
                        {
                            label: "Contraseña",
                            name: "password",
                            placeholder: "**********",
                            fieldType: 'input',
                            type: "password",
                            required: true,
                            minLength: 8,
                            maxLength: 26,
                            pattern: /^[a-zA-Z0-9]+$/,
                            patternMessage: "Debe contener solo letras y números",
                            value: "",
                            onChange: (e) => handleInputChange('password', e.target.value)
                        },
                    ]}
                    buttonText="Registrar Usuario"
                    onSubmit={handleSubmit(registerSubmit)}
                />
            </div>
        </div>
    );
};

export default RegisterPopup;
