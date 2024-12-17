import { useEffect, useState } from "react";
import { createReserva } from "@services/reserva.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert";
import { getServicios } from "../services/servicios.service.js";
import { getHorarios } from "../services/horarios.service";
import { getReservas } from "../services/reserva.service";
import "@styles/home.css";

function CreateReserva() {
  const [horarios, setHorarios] = useState([]);
  const [filteredHorarios, setFilteredHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState("");
  const [servicios, setServicios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState("");
  const [selectedFecha, setSelectedFecha] = useState("");
  const [reservas, setReservas] = useState([]);

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
          createdAt: reserva.createdAt,
        }));
        setReservas(formattedData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    const fetchHorarios = async () => {
      try {
        const response = await getHorarios();
        const formattedData = response.map((horario) => ({
          id: horario.id,
          hora: horario.hora,
          dia: horario.dia,
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
        const formattedData = response.map((servicio) => ({
          idServicio: servicio.idServicio,
          nombre: servicio.nombre,
          descripcion: servicio.descripcion,
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

    const dateParts = fecha.split("-");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    console.log("Dia: ", DIA);
    console.log("Fecha: ", fecha);
    let horariosDisponibles = horarios.filter((horario) => {
      return horario.dia === DIA;
    });

    reservas.forEach((reserva) => {
      if (reserva.fecha === formattedDate) {
        const horaReservada = reserva.hora;
        // Eliminar las horas ya reservadas
        horariosDisponibles = horariosDisponibles.filter((horario) => {
          return horario.hora !== horaReservada;
        });
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

  const handleSelectedChangeServicio = (e) => {
    setSelectedServicio(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("Form data: ", formData);
    const fechaSF = formData.get("fecha");
    const dateParts = fechaSF.split("-");
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    console.log(formattedDate);
    formData.set("fecha", formattedDate);
    const reservaData = {
      nombreReservador: formData.get("nombreReservador"),
      email: formData.get("email"),
      motivo: selectedServicio,
      fecha: formData.get("fecha"),
      hora: selectedHorario,
    };
    console.log(reservaData);
    console.log("Fecha: ", reservaData.fecha);
    console.log("Hora: ", reservaData.hora);

    try {
      const validatorError = await createReserva(reservaData);
      console.log("Validator error: ", validatorError);
      if (validatorError.status === "Reserva error") {
        console.log("Error al crear reserva ");
        return showErrorAlert("Error", validatorError.details);
      }
      console.log("Reserva creada correctamente");
      showSuccessAlert(
        "¡Reservado!",
        "La reserva ha sido creada correctamente."
      );
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
            <div className="home-form-column">
              <div className="home-form-group">
                <label className="home-label" htmlFor="nombreReservador">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombreReservador"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  className="home-input"
                  required
                />
              </div>
              <div className="home-form-group">
                <label className="home-label" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Ingresa tu email"
                  className="home-input"
                  required
                />
              </div>
            </div>

            <div className="home-form-column">
              <div className="home-form-group">
                <label className="home-label" htmlFor="motivo">
                  Servicio
                </label>
                <select
                  id="motivo"
                  name="motivo"
                  className="home-input-select"
                  required
                  value={selectedServicio}
                  onChange={handleSelectedChangeServicio}
                >
                  <option value="" disabled>
                    {" "}
                    Selecciona un servicio{" "}
                  </option>
                  {servicios.map((servicio) => (
                    <option key={servicio.idServicio} value={servicio.nombre}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
                {selectedServicio === ""}
              </div>
              <div className="home-form-group">
                <label className="home-label" htmlFor="fecha">
                  Fecha
                </label>
                <input
                  id="fecha"
                  name="fecha"
                  type="date"
                  className="home-input"
                  required
                  value={selectedFecha}
                  onChange={handleFechaChange}
                />
              </div>
            </div>
            <div className="home-form-column">
              <div className="home-form-group">
                <label className="home-label" htmlFor="hora">
                  Hora
                </label>
                <select
                  id="hora"
                  name="hora"
                  className="home-input-select"
                  required
                  value={selectedHorario}
                  onChange={handleSelectedChangeHorario}
                >
                  <option value="" disabled>
                    {" "}
                    Selecciona un horario{" "}
                  </option>
                  {filteredHorarios.map((horario) => (
                    <option key={horario.id} value={horario.hora}>
                      {horario.hora}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="home-button">
            Reservar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateReserva;
