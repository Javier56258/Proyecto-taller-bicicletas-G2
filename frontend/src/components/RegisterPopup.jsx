import React, { useState } from 'react';
import { register } from '@services/auth.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';

const RegisterPopup = ({ show, setShow, action }) => {
    const [formData, setFormData] = useState({
        nombreCompleto: '',
        email: '',
        rut: '',
        password: '',
        rol: ''
    });
    const [errors, setErrors] = useState({});

    // Función para formatear el RUT
    const formatRut = (inputRut) => {
        let cleanRut = inputRut.replace(/[^0-9kK]/g, ''); // Solo números y 'K'
        
        if (cleanRut.length <= 1) return cleanRut; // Evitar formatear si hay menos de 2 caracteres

        const dv = cleanRut.slice(-1).toUpperCase(); // Último carácter (dígito verificador en mayúsculas)
        let cuerpo = cleanRut.slice(0, -1); // Todo menos el último carácter

        // Agregar puntos cada 3 dígitos al cuerpo
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return cuerpo ? `${cuerpo}-${dv}` : '';
    };

    // Manejador de cambio de entrada
    const handleInputChange = (field, value) => {
        let formattedValue = value;

        if (field === 'rut') {
            formattedValue = formatRut(value).toUpperCase(); // Formatear el RUT en tiempo real
        }

        setFormData((prevData) => ({
            ...prevData,
            [field]: formattedValue
        }));

        // Limpiar errores al modificar el input
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: null
        }));
    };



    // Función de validación
    const validate = () => {
        const newErrors = {};

        if (!formData.nombreCompleto.trim()) {
            newErrors.nombreCompleto = "El nombre completo es obligatorio.";
        } else if (formData.nombreCompleto.length < 15 || formData.nombreCompleto.length > 50) {
            newErrors.nombreCompleto = "El nombre completo debe tener entre 15 y 50 caracteres.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El correo electrónico es obligatorio.";
        } else if (formData.email.length < 15 || formData.email.length > 35) {
            newErrors.email = "El correo electrónico debe tener entre 15 y 35 caracteres.";
        }

        if (!formData.rut.trim()) {
            newErrors.rut = "El RUT es obligatorio.";
        } else if (formData.rut.length < 10) {
            newErrors.rut = "El RUT debe tener al menos 10 caracteres.";
        }

        if (!formData.password.trim()) {
            newErrors.password = "La contraseña es obligatoria.";
        } else if (formData.password.length < 8 || formData.password.length > 26) {
            newErrors.password = "La contraseña debe tener entre 8 y 26 caracteres.";
        }

        if (!formData.rol.trim()) {
            newErrors.rol = "Debe seleccionar un rol.";
        }

        return newErrors;
    };

    // Función para manejar el envío del formulario
    const registerSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await register(formData);
            if (response.status === 'Success') {
                showSuccessAlert('¡Registrado!', 'Usuario registrado exitosamente.');
                action();
                setShow(false); 
            } else if (response.status === 'Client error') {
                if (response.details?.email) setErrors({ email: response.details.email });
                if (response.details?.rut) setErrors({ rut: response.details.rut });
            }
        } catch (error) {
            console.error("Error al registrar un usuario: ", error);
            showErrorAlert('Cancelado', 'Ocurrió un error al registrarse.');
        }
    };

    if (!show) return null;

    return (
        <div className="bg">
            <div className="prov-popup dark:bg-[#2e2c2f] mt-20 h-570 ">
                <button className="close" onClick={() => setShow(false)}>
                    <img src={CloseIcon} alt="Cerrar" />
                </button>
                <div className="form">
                    <h1>Registrar Usuario</h1>

                    <div className="container_inputs">
                        <label htmlFor="nombreCompleto">Nombre completo</label>
                        <input
                            type="text"
                            name="nombreCompleto"
                            placeholder="Nombre y apellido"
                            value={formData.nombreCompleto}
                            onChange={(e) => handleInputChange('nombreCompleto', e.target.value)}
                        />
                        {errors.nombreCompleto && (
                            <div className="error-message">{errors.nombreCompleto}</div>
                        )}
                    </div>

                    <div className="container_inputs">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@gmail.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                        {errors.email && (
                            <div className="error-message">{errors.email}</div>
                        )}
                    </div>

                    <div className="container_inputs">
                        <label htmlFor="rut">Rut</label>
                        <input
                            type="text"
                            name="rut"
                            placeholder="11.111.111-1"
                            value={formData.rut}
                            onChange={(e) => handleInputChange('rut', e.target.value)}
                            maxLength="12"
                        />
                        {errors.rut && (
                            <div className="error-message">{errors.rut}</div>
                        )}
                    </div>

                    <div className="container_inputs">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="**********"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        {errors.password && (
                            <div className="error-message">{errors.password}</div>
                        )}
                    </div>

                    <div className="container_inputs">
                        <label htmlFor="rol">Rol</label>
                        <select
                            name="rol"
                            value={formData.rol}
                            onChange={(e) => handleInputChange('rol', e.target.value)}
                        >
                            <option value="">Seleccionar rol</option>
                            <option value="admin">administrador</option>
                            <option value="user">usuario</option>
                        </select>
                        {errors.rol && (
                            <div className="error-message">{errors.rol}</div>
                        )}
                    </div>

                    <button
                        type="button"
                        className="submit-button"
                        onClick={registerSubmit}
                    >
                        Registrar Usuario
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterPopup;
