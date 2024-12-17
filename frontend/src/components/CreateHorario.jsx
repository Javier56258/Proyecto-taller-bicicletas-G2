import '@styles/popup.css';
import CloseIcon from '@assets/XIcon.svg';
import { createHorario } from '@services/horarios.service.js';
import { showSuccessAlert, showErrorAlert } from '@helpers/sweetAlert.js';
import { useEffect } from 'react';


function CreateHorario({ show, setShow, data, action }) {

    useEffect(() => {
            if (show) {
                // Bloquear scroll en el fondo
                document.body.classList.add("overflow-hidden");
            } else {
                // Restaurar el scroll
                document.body.classList.remove("overflow-hidden");
            }
    
            // Limpieza al desmontar el componente
            return () => document.body.classList.remove("overflow-hidden");
        }, [show]);

    console.log("Pasando por CreateHorario de CreateHorario.jsx");
    const horarioData = data && data.length > 0 ? data[0] : {};
   // const [isReversed, setIsReversed] = useState(false);
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

        if (hora instanceof Date || hora.includes(":")) {
            const aux = hora.toString();
            formData.set('hora', aux);
        }
        const horarioData = {
            dia,
            hora,
        };
        try {
            
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
                                            defaultValue={horarioData.dia ||""}
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
                                        <input
                                            type="time"
                                            name="hora"
                                            className="home-input"
                                            id="hora"
                                            required
                                            defaultValue={horarioData.hora || ""}
                                        />
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
                                  marginTop: "5px",
                                  marginBottom: "20px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}>Crear horario</button>
                            </div>
                        </form>
                        
                        
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateHorario;