import { useEffect } from "react";
import "@styles/popup.css";
import CloseIcon from '@assets/XIcon.svg';

export default function PopupHorario({show,setShow,data,action}) {
    const horarioData = data && data.length > 0 ? data[0] : {};

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const hora = formData.get("hora"); // Obtén el valor de "hora"
        const dia = formData.get("dia");   // Obtén el valor de "dia"

        console.log("Hora:", hora);
        console.log("Día:", dia);
        if (hora instanceof Date || hora.includes(":")) {
            const aux = hora.toString();
            formData.set('hora', aux);
        }
        action(formData);
    };
    const horasJornadaLaboral = ["07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
                                "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
                                "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", 
                                "19:00"
                                ];

    return(
        <div>
            { show && (
                <div className="bg"> 
                    <div className="prov-popup dark:bg-[#2e2c2f] slide-down">
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} alt="Cerrar"/>
                        </button>


                        <h1 className="text-3xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE]"
                        style={{ marginTop: '50px' }}
                        >Editar Horario</h1>
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
                                        <select
                                            type="time"
                                            name="hora"
                                            className="home-input"
                                            id="hora"
                                            required
                                            defaultValue={horarioData.hora || ""}
                                        >
                                        <option value="" disabled>Selecciona una hora</option>
                                            {horasJornadaLaboral.map((hora) => (
                                                <option key={hora} value={hora}>
                                                    {hora}
                                                </option>
                                            ))}
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
                                  marginTop: "5px",
                                  marginBottom: "20px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}>Editar horario</button>
                            </div>
                            
                        </form>
                       

                    </div>
                </div>)}
        </div>
    );
}