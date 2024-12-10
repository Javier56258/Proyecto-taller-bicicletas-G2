//import React from "react";
import { createReserva } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";

function ReservaHora({ data }) {
    const reservaData = data && data.length > 0 ? data[0] : {};

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
        <div className="reserva-body">
            <div className="reserva-card">
                <h1 className="reserva-title">Reserva tu hora</h1>
                <form onSubmit={handleSubmit}>
                    {/* Contenedor de las dos columnas */}
                    <div className="form-columns">
                        {/* Primera columna */}
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="nombre" className="label">Nombre</label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Ingresa tu nombre"
                                    required
                                    className="input"
                                    defaultValue={reservaData.nombre || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="label">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Ingresa tu email"
                                    required
                                    className="input"
                                    defaultValue={reservaData.email || ""}
                                />
                            </div>
                        </div>
                        {/* Segunda columna */}
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="motivo" className="label">Motivo</label>
                                <input
                                    type="text"
                                    id="motivo"
                                    name="motivo"
                                    placeholder="Motivo de la reserva"
                                    required
                                    className="input"
                                    defaultValue={reservaData.motivo || ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fecha" className="label">Fecha</label>
                                <input
                                    type="date"
                                    id="fecha"
                                    name="fecha"
                                    required
                                    className="input"
                                    defaultValue={reservaData.fecha || ""}
                                />
                            </div>
                        </div>
                        {/* Tercera columna */}
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="hora" className="label">Hora</label>
                                <input
                                    type="time"
                                    id="hora"
                                    name="hora"
                                    placeholder="Ingresa la hora"
                                    required
                                    className="input"
                                    defaultValue={reservaData.hora || ""}
                                />
                            </div>
                            
                        </div>
                        
                    </div>
                    {/* Botón para enviar */}
                    <button type="submit" className="button">Reservar</button>
                </form>
            </div>
        </div>
    );
}

export default ReservaHora;
