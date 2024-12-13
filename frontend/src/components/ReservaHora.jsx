import { createReserva } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { getHorarios } from "@services/horarios.service.js";
import { useEffect, useState } from "react";

function ReservaHora({ data }) {
    const reservaData = data && data.length > 0 ? data[0] : {};

    const [selectedHora, setSelectedHora] = useState(null);

    const handleHoraChange = (event) => {
        setSelectedHora(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const reserva = {
            nombre: formData.get("nombre"),
            email: formData.get("email"),
            motivo: formData.get("motivo"),
            fecha: formData.get("fecha"),
            hora: formData.get("hora"),
        };

        try {
            const response = await createReserva(reserva);

            if (response.status === "Reserva error") {
                return showErrorAlert("Error", response.details);
            }

            showSuccessAlert("¡Reserva creada!", "La reserva se ha creado correctamente.");
        } catch (error) {
            showErrorAlert("Error", "Ocurrió un error al crear la reserva.");
            console.error("Error al crear reserva:", error);
        }
    };


    return (
        <div className="home-reserva-body">
            <div className="home-reserva-card">
                <h1 className="home-reserva-title">Reserva tu hora</h1>
                <form onSubmit={handleSubmit}>
                    <div className="home-form-columns">
                        {/* Primera columna */}
                        <div className="home-form-column">
                            <div className="home-form-group">
                                <label htmlFor="nombre" className="home-label">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingresa tu nombre"
                                    required
                                    className="home-input"
                                    defaultValue={reservaData.nombre || ""}
                                />
                            </div>
                            <div className="home-form-group">
                                <label htmlFor="email" className="home-label">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Ingresa tu email"
                                    required
                                    className="home-input"
                                    defaultValue={reservaData.email || ""}
                                />
                            </div>
                        </div>
                        {/* Segunda columna */}
                        <div className="home-form-column">
                            <div className="home-form-group">
                                <label htmlFor="motivo" className="home-label">Motivo</label>
                                <input
                                    type="text"
                                    id="motivo"
                                    name="motivo"
                                    placeholder="Motivo de la reserva"
                                    required
                                    className="home-input"
                                    defaultValue={reservaData.motivo || ""}
                                />
                            </div>
                            <div className="home-form-group">
                                <label htmlFor="fecha" className="home-label">Fecha</label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    required
                                    className="home-input"
                                    defaultValue={reservaData.fecha || ""}
                                />
                            </div>
                        </div>
                        {/* Tercera columna */}
                        <div className="home-form-column">
                            <div className="home-form-group">
                                <label htmlFor="hora" className="home-label">Hora</label>
                                <select
                                id="hora"
                                name="hora"
                                required
                                className="home-input"
                                value={selectedHora}
                                onChange={handleHoraChange}
                            >
                                <option value="">Seleccione una hora</option>
                                
                               
                            </select>
                            </div>
                        </div>
                    </div>
                    {/* Botón para enviar */}
                    <button type="submit" className="home-button">Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default ReservaHora;

