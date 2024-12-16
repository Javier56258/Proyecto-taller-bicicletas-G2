//import Form from './Form';
import "@styles/popup.css";
import CloseIcon from '@assets/XIcon.svg';
import { useEffect, useState } from 'react';
import { getServicios } from "../services/servicios.service.js";
import { getHorarios } from "../services/horarios.service";
import { getReservas } from "../services/reserva.service";

export default function reservaPopup({show,setShow,data,action}) {
    const [horarios, setHorarios] = useState([]);
    const [filteredHorarios, setFilteredHorarios] = useState([]);
    const [selectedServicio, setSelectedServicio] = useState("");
    const [servicios, setServicios] = useState([]);
    const [selectedFecha, setSelectedFecha] = useState("");
    const [reservas, setReservas] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState("");
    const reservaData = data && data.length > 0 ? data[0] : {};
    const handleSelectedChangeServicio = (e) => {
        setSelectedServicio(e.target.value);
    };

    useEffect(() => {
        const fetchReservas = async () => {
                    try {
                        const response = await getReservas();
                        console.log("Pasando por fetchReservas");
                        console.log(response);
                        const formattedData = response.map((reserva) => ({
                            nombreReservador: reserva.nombreReservador,
                            email: reserva.email,
                            motivo: reserva.motivo,
                            fecha: reserva.fecha,
                            hora: reserva.hora,
                            idreserva: reserva.idreserva,
                            createdAt: reserva.createdAt
                        }));
                        setReservas(formattedData);
                    } catch (error) {
                        console.error("Error: ", error);
                    }
                };
        
                const fetchHorarios = async () => {
                    try {
                        const response = await getHorarios();
                        const formattedData = response.map(horario => ({
                            id: horario.id,
                            hora: horario.hora,
                            dia: horario.dia
                        }));
                        setHorarios(formattedData);
                        console.log("Horarios: ", formattedData);
                    } catch (error) {
                        console.error("Error al obtener horarios: ", error);
                    }
                };
        
                const fetchServicios = async () => {
                    try {
                        const response = await getServicios();
                        const formattedData = response.map(servicio => ({
                            idServicio: servicio.idServicio,
                            nombre: servicio.nombre,
                            descripcion: servicio.descripcion
                        }));
                        setServicios(formattedData);
                    } catch (error) {
                        console.error("Error al obtener servicios: ", error);
                    }
                };
        
                fetchReservas();
                fetchHorarios();
                fetchServicios();
            }, []);

            const filtrarXdia = (fecha) => {
                if (!fecha) return;
        
                const FECHA = new Date(fecha);
                let DIA = FECHA.getDay();
                if (DIA === 0) DIA = "Lunes";
                if (DIA === 1) DIA = "Martes";
                if (DIA === 2) DIA = "Miercoles";
                if (DIA === 3) DIA = "Jueves";
                if (DIA === 4) DIA = "Viernes";
                if (DIA === 5) DIA = "Sabado";
                if (DIA === 6) DIA = "Domingo";
        
                const dateParts = fecha.split('-');
                const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        
                console.log("Dia: ", DIA);
                console.log("Fecha: ", fecha);
                let horariosDisponibles = horarios.filter(horario => {
                    return horario.dia === DIA;
                });
        
                reservas.forEach(reserva => {
                    if (reserva.fecha === formattedDate) {
                        const horaReservada = reserva.hora;
                        // Eliminar las horas ya reservadas
                        horariosDisponibles = horariosDisponibles.filter(
                            horario => {return horario.hora !== horaReservada });
                    }
                });
        
                setFilteredHorarios(horariosDisponibles);
            };

            const handleFechaChange = (e) => {
                setSelectedFecha(e.target.value);
                filtrarXdia(e.target.value);
            };
            const handleSelectedChangeHorario = (e) => {
                setSelectedHorario(e.target.value);
            };

            const handleSubmit = (e) => {
                e.preventDefault(); // Detener la recarga de página.
                
                const formData = {
                    nombreReservador: e.target.nombreReservador.value,
                    email: e.target.email.value,
                    fecha: selectedFecha,
                    hora: selectedHorario,
                    motivo: selectedServicio,
                };
            
                if (formData.hora instanceof Date || formData.hora.includes(":")) {
                    formData.hora = formData.hora.toString(); 
                }
            
                action(formData); // Llamar a la acción proporcionada.
            };

    return(
        <div>
            { show && (
                <div className="bg"> 
                    <div 
                        className="prov-popup dark:bg-[#2e2c2f] slide-down"
                        style={{ width: "1000", padding: "2rem" }}
                    >
                        
                        <button className='close' onClick={() => setShow(false)}>
                            <img src={CloseIcon} />
                        </button>
                        <h1 className="text-3xl font-extrabold text-center text-[#475B63] dark:text-[#F3E8EE]"
                        style={{ 
                            marginTop: '30px', 
                            marginBottom: '20px'
                        }}
                        >Editar reserva</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="home-form-columns">
                                <div className="home-form-column">
                                    <div className="home-form-group">
                                        <label className="text-[#475B63] dark:text-[#F3E8EE]">Nombre completo</label>
                                        <input
                                            type="text"
                                            name="nombreReservador"
                                            className="home-input"
                                            id= "nombreReservador"
                                            required
                                            defaultValue={reservaData.nombreReservador ||""}
                                            placeholder="Nombre del reservador"
                                        />
                                    </div>
                                    <div className="home-form-group">
                                        <label className="text-[#475B63] dark:text-[#F3E8EE]">Correo electrónico</label>
                                        <input
                                            type="text"
                                            name="email"
                                            className="home-input"
                                            id= "email"
                                            required
                                            defaultValue={reservaData.email ||""}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="home-form-group">
                                        <label className="text-[#475B63] dark:text-[#F3E8EE]">Fecha de reserva</label>
                                        <input
                                            type="date"
                                            name="fecha"
                                            className="home-input"
                                            id= "fecha"
                                            required
                                            value={selectedFecha}
                                            onChange={handleFechaChange}
                                            placeholder=""
                                        />
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
                                            value={selectedHorario} onChange={handleSelectedChangeHorario}>                                           
                                            <option value="" disabled> Selecciona un horario </option>
                                            {filteredHorarios.map((horario) => (
                                                <option key={horario.id} value={horario.hora}>{horario.hora}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="home-form-group">
                                        <label className="text-[#475B63] dark:text-[#F3E8EE]">Servicio a pedir</label>
                                        <select id="motivo" name="motivo" className="home-input" required
                                                value={selectedHorario} onChange={handleSelectedChangeServicio}>
                                            <option value="" disabled> Selecciona un servicio </option>                              
                                            {servicios.map((servicio) => (
                                                <option key={servicio.idServicio} value={servicio.nombre}>{servicio.nombre}</option>
                                            ))}
                                        </select>
                                        {selectedServicio === ""} 
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
                                    }}>Editar reserva
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>)}
        </div>
    );
}
