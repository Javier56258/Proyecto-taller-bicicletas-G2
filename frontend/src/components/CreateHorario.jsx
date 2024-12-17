import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createHorario } from '@services/horarios.service.js';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';
import useHorarios from "@hooks/horarios/useGetHorario.jsx";
import { useState } from 'react';


function CreateHorario({ show, setShow, data, action }) {
    const { horarios } = useHorarios();
    const [horasDisponibles, setHorasDisponibles] = useState([]); // Estado para las horas disponibles
    
    const horarioData = data && data.length > 0 ? data[0] : {};
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const hora = formData.get("hora"); // Obtén el valor de "hora"
        const dia = formData.get("dia");   // Obtén el valor de "dia"

        console.log("Hora:", hora);
        console.log("Día:", dia);

        if (!hora || !dia) {
            return showErrorAlert("Error", "Por favor, completa todos los campos.");
        }
        try {
            const horarioData = { dia, hora };
            const validatorError = await createHorario(horarioData);
            if (validatorError.status === 'Horario error'){
                setShow(false);
                return showErrorAlert("Error", validatorError.details);
            }
            showSuccessAlert("¡Creado!", "El horario ha sido creado correctamente.");
            setShow(false);
            action(formData);
        } catch (error) {
            showErrorAlert("Error", "Ocurrió un error al crear el horario.");
            console.error('Error al crear horario:', error);
        };
    };
    const horasJornadaLaboral = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
        "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", 
        "19:00"
        ];

    const filtrarXdia = (dia) => {
        return horarios.filter((horario) => horario.dia === dia);
    }
    const handleDiaChange = (e) => {
        const diaSeleccionado = e.target.value;
        const horariosDelDia = filtrarXdia(diaSeleccionado);

        // Filtra las horas disponibles eliminando las reservadas
        const horasReservadas = horariosDelDia.map((horario) => horario.hora);
        const horasFiltradas = horasJornadaLaboral.filter(
            (hora) => !horasReservadas.includes(hora)
        );

        setHorasDisponibles(horasFiltradas); // Actualiza el estado de horas disponibles
    };

    return (
        <div>
            {show && (
                <div className="bg">
                    <div className="prov-popup dark:bg-[#2e2c2f] slide-down">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>

                        <h1 className="text-3xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE]"
                        style={{ marginTop: '50px' }}
                        >Ingresar Horario</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="home-form-columns">
                                <div className="home-form-column">
                                    <div className="home-form-group">
                                    <label className="text-[#475B63] dark:text-[#F3E8EE]">Dia</label>
                                        <select
                                            name="dia"
                                            className="home-input"
                                            id= "dia"
                                            required
                                            defaultValue={horarioData.dia || ""}
                                            onChange={handleDiaChange} // Detecta cambios en el día
                                            >
                                            <option value="" disabled> Selecciona un dia </option>
                                            <option value="Lunes">Lunes</option>
                                            <option value="Martes">Martes</option>
                                            <option value="Miercoles">Miercoles</option>
                                            <option value="Jueves">Jueves</option>
                                            <option value="Viernes">Viernes</option>
                                            <option value="Sabado">Sabado</option>
                                            <option value="Domingo">Domingo</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="home-form-column">
                                    <div className="home-form-group">
                                        <label className="text-[#475B63] dark:text-[#F3E8EE]">Hora de reserva</label>
                                        <select
                                            name="hora"
                                            className="home-input"
                                            id="hora"
                                            required
                                            defaultValue={horarioData.hora || ""}
                                        >
                                            <option value="" disabled>
                                                Selecciona una hora
                                            </option>
                                            {(horasDisponibles.length > 0 ? horasDisponibles : horasJornadaLaboral).map(
                                                (hora) => (
                                                    <option key={hora} value={hora}>
                                                        {hora}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <button type="submit"
                                    className="submit-button" // Clase del botón
                                    style={{
                                        backgroundColor: "#475b63",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>Crear horario
                                </button>
                            </div>
                        </form>
                        
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateHorario;