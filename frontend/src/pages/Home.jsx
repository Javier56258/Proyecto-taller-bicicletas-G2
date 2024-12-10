//import React from "react";
import "@styles/home.css";
import Navbar from "../components/Navbar";
import ReservaHora from "../components/ReservaHora";
//import "../styles/home.css";
import HorarioCardPublic from "../components/HorarioCardPublic.jsx";
import useHorarios from "@hooks/horarios/useGetHorario.jsx"
import {  useState } from "react";

const Home = () => {
    const { horarios } = useHorarios(); 
    const [ filter ] = useState("");

    const filteredHorarios = horarios.filter(horario => 
      horario.dia.toLowerCase().includes(filter.toLowerCase())
  );


    const groupedHorarios = filteredHorarios.reduce((acc, horario) => {
        if (!acc[horario.dia]) {
            acc[horario.dia] = [];
        }
        acc[horario.dia].push(horario);
        acc[horario.dia].sort((a, b) => {
            const [aHoras, aMinutos] = a.hora.split(':').map(Number);
            const [bHoras, bMinutos] = b.hora.split(':').map(Number);
            return aHoras * 60 + aMinutos - (bHoras * 60 + bMinutos); 
        });
        return acc;
    }, {});

    const diasOrdenados = ["Lunes", "Martes", "Miercoles", 
                            "Jueves", "Viernes", "Sabado", 
                            "Domingo"];
    return (
        <div className="home-container">
            <Navbar />
            <h1>Bienvenido a la Página de Inicio</h1>
            <div id="home-content">
                <h2>Reservas</h2>
                <li className="vector">
                    <a href="#Reservas" className="vector">
                        <div className="vector">
                            <span className="vector">1.1</span>
                            <span className="vector">Reservas</span>
                        </div>
                    </a>
                </li>
                <h1 className="text-5xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]"> 
                  Horarios
                </h1>

                <div className="schedule">
                  {diasOrdenados.map((dia) => (
                  groupedHorarios[dia] && (
                    <div key={dia} className="day-group">
                    <h2 className="day-title">{dia}</h2>
                      <div className="services-grid">
                        {groupedHorarios[dia].map((horario) => (
                            <HorarioCardPublic
                              key={horario.id}
                              horario={horario}
                            />
                        ))}
                      </div>
                    </div>
                  )
                  ))}

                </div>

                <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
                  Servicios
                </h1>
                {/* Renderizar el componente ReservaTuHora */}
                <ReservaHora />

            </div>
        </div>
    );
};

export default Home;
