import useHorarios from "@hooks/horarios/useGetHorario.jsx"
import useEditHorario from "@hooks/horarios/useEditHorario.jsx"
import useDeleteHorario from "@hooks/horarios/useDeleteHorario.jsx"
import Search from "../components/Search.jsx";
import PopUpHorario from "../components/PopupHorario.jsx";
import CreateHorario from "../components/CreateHorario.jsx";
import HorarioCard from "../components/HorarioCard.jsx";
import {  useState } from "react";
import "@styles/horarios.css";
import "@styles/horarios_form.css";

const Horarios = () => {
    const { horarios, fetchHorarios, setHorarios } = useHorarios();
    const [filter, setFilterDia] = useState("");
    const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
    
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataHorario,
        setDataHorario
    } = useEditHorario(fetchHorarios, setHorarios);

    const { handleDelete } = useDeleteHorario(fetchHorarios, setDataHorario);

const handleDiaFilterChange = (e) => {
        setFilterDia(e.target.value);
    }
 
    

    const handleCreateClick = () => {
        setIsCreatePopupOpen(true);
    };

    // Filtrar horarios por día
    const filteredHorarios = horarios.filter(horario => 
        horario.dia.toLowerCase().includes(filter.toLowerCase()));

    // Agrupar horarios por día
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

 return(
<div>
    <div className="main-content-formHorario">
        <div className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
            <h1>Horarios de atención</h1>
        </div>  
        <div className="controls-formHorario">
            <button 


            className="create-horario-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f]"

            onClick={handleCreateClick}
            >Crear Horario
            </button>
            <Search 
            value={filter} 
            onChange={handleDiaFilterChange} 
            placeholder="Filtrar por día" 
            />
        </div>

        <div className="schedule-horarios">
            {diasOrdenados.map((dia) => (
                groupedHorarios[dia] && (
                <div key={dia} className="day-group-horarios">
                    <h2 className="day-title-horarios">{dia}</h2>
                    <div className="horarios-grid">
                        {groupedHorarios[dia].map((horario) => (
                            <HorarioCard
                            key={horario.id}
                            horario={horario}
                            onEdit={() => handleClickUpdate(horario)}
                            onDelete={() => handleDelete(horario.id)}
                            />
                        ))}
                    </div>
                </div>
                )
            ))}
        </div>
    </div>
    <PopUpHorario
     show = {isPopupOpen}
     setShow={setIsPopupOpen}
     data={dataHorario}
     action={handleUpdate}
    />
    <CreateHorario
    show={isCreatePopupOpen}
    setShow={setIsCreatePopupOpen}
    action={fetchHorarios}
    />
</div>
);
};

export default Horarios;