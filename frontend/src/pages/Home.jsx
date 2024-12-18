import React, { useState, useEffect } from "react";
import "@styles/home.css";
import Navbar from "../components/Navbar";
import ReservaHora from "../components/ReservaHora";
import HorarioCardPublic from "../components/HorarioCardPublic.jsx";
import Carousel from "../components/Carousel"; // Asegúrate de que el componente se importe correctamente
import useHorario from "@hooks/horarios/useGetHorario.jsx";
import { getServicios } from "@services/servicios.service.js"; // No olvides importar getServicios

const Home = () => {
  const { horarios } = useHorario();
  const [filter] = useState("");
  const [servicios, setServicios] = useState([]);
  const [loadingServicios, setLoadingServicios] = useState(true);

  // Cargar servicios al montar el componente
  useEffect(() => {
    async function fetchServicios() {
      try {
        const data = await getServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
      } finally {
        setLoadingServicios(false);
      }
    }
    fetchServicios();
  }, []);

  // Filtrar horarios basados en el filtro
  const filteredHorarios = horarios.filter((horario) =>
    horario.dia.toLowerCase().includes(filter.toLowerCase())
  );

  // Agrupar horarios por día
  const groupedHorarios = filteredHorarios.reduce((acc, horario) => {
    if (!acc[horario.dia]) {
      acc[horario.dia] = [];
    }
    acc[horario.dia].push(horario);
    acc[horario.dia].sort((a, b) => {
      const [aHoras, aMinutos] = a.hora.split(":").map(Number);
      const [bHoras, bMinutos] = b.hora.split(":").map(Number);
      return aHoras * 60 + aMinutos - (bHoras * 60 + bMinutos);
    });
    return acc;
  }, {});

  // Orden de los días
  const diasOrdenados = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  return (
    <div className="home-container">
      <h1 className="text-5xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
        Taller de bicicleta
      </h1>

      {/* Carrusel de Servicios */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Nuestros Servicios
        </h2>
        <Carousel /> {/* Aquí insertas el componente del carrusel */}
      </section>

      {/* Reserva Tu Hora */}
      <section>
        <ReservaHora />
      </section>
    </div>
  );
};

export default Home;
