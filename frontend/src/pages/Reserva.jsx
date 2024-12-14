import { useEffect, useState } from 'react';
import PopupReserva from '@components/PopupReserva';
import useDeleteReserva from '@hooks/reservas/useDeleteReserva';
import useEditReserva from '@hooks/reservas/useEditReserva';
import useGetReservas from '@hooks/reservas/useGetReserva';
//import Search from "../components/Search.jsx";
//import SearchIcon from '../assets/searchIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
//import PopupFiltrosRes from '@components/PopupFiltrosRes';
import '@styles/reserva.css';
import '@styles/popup_filtrosRes.css';
//import { set } from 'react-hook-form';

const Reservas = () => {
    const { reservas, fetchReservas, setReservas } = useGetReservas();
//    const [isFilterPopupOpen, setIsFiltersPopupOpen] = useState(false);
    const [filtro, setFiltroNombre] = useState("");
    {/* 
    const [filtros, setFiltros] = useState({
        nombre: "",
        fechaInicio: "",
        fechaFin: "",
        correo: "",
        servicio: "",
      });
    */}
    
    const handleNombreFilterChange = (e) => {
        setFiltroNombre(e.target.value);
    }

    const filteredNombres = reservas.filter(reserva =>
        reserva.nombreReservador.toLowerCase().includes(filtro.toLowerCase())
    );

{/*    const applyFilters = () => {
        const { nombre, fechaInicio, fechaFin, correo, servicio } = filtros;
        const filteredReservas = reservas.filter((reserva) => {
            const matchesNombre = nombre ? reserva.nombreReservador === nombre : true;
            const matchesFechaInicio = fechaInicio ? reserva.fecha >= fechaInicio : true;
            const matchesFechaFin = fechaFin ? reserva.fecha <= fechaFin : true;
            const matchesCorreo = correo ? reserva.email === correo : true;
            const matchesServicio = servicio ? reserva.motivo === servicio : true;
            return matchesNombre && matchesFechaInicio && matchesFechaFin && matchesCorreo && matchesServicio;
        });
        setReservas(filteredReservas);
    };
*/}
    const [selectedReserva, setSelectedReserva] = useState(null);    
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataReserva,
        setDataReserva
    }= useEditReserva(fetchReservas, setReservas);

    const { handleDelete: deleteFunction } = useDeleteReserva(fetchReservas, setDataReserva);

    useEffect(() => {
        console.log("Reserva seleccionado: ", selectedReserva);
    }, [selectedReserva]);

    useEffect(() => {
        if (
        selectedReserva &&
        !reservas.some((reserva) => reserva.idreserva === selectedReserva.idreserva)
        ) {
        setSelectedReserva(null);
        console.log("Reserva seleccionada eliminada.", selectedReserva);
        }
    }, [reservas]);

    const handleEditClick = () => {
        if (selectedReserva) {
            console.log("Reserva seleccionado para editar:", selectedReserva);
          const reservaSeleccionada = reservas.find(
            (reserva) => reserva.idreserva === selectedReserva.idreserva
          );
          console.log("Reserva encontrada:", reservaSeleccionada);
          if (reservaSeleccionada) {
            console.log("Reserva seleccionada encontrada:", reservaSeleccionada);
            setDataReserva([reservaSeleccionada]);
            console.log("Reserva seleccionada para editar:", setDataReserva([reservaSeleccionada]));
            handleClickUpdate();
            
          } else {
            alert("El reserva seleccionado no existe.");
          }
        } else {
          alert("Selecciona un reserva para editar.");
        }
      };

    const handleDelete = async () => {
        if (selectedReserva) {
          try {
            await deleteFunction([selectedReserva]);
            setSelectedReserva(null);

          } catch (error) {
            console.error("Error al eliminar la reserva:", error);
          }
        } else {
          alert("Selecciona una reserva para eliminar.");
        }
    };

    

    {/*
    const handleFilterChange = (newFilters) => {
        setFiltros(newFilters);
        applyFilters();
    };   
    */}

        
    
    const handleRowSelect = (reserva) => {
        setSelectedReserva(
          selectedReserva?.idreserva === reserva.idreserva ? null : reserva
        );
    };
 //   console.log("¿applyFilters es una función?", typeof applyFilters === "function");

    return (
        <div className="slide-down">
            <div className="main-container">
                <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
                    Reservas
                </h1>
    
                <div className="top-table">
                    <div className="filter-actions flex space-x-4">
                       {/* 
                        <button
                        onClick={() => setIsFiltersPopupOpen(true)}
                        className="p-3 rounded-md bg-[#bacdb0] hover:bg-[#8da685] text-white font-medium transition duration-300 
                                    dark:bg-[#475B63] dark:hover:bg-[#36474d]"
                        >
                        Filtrar
                        </button>
                        */}
                        <input
                            value={filtro}
                            onChange={handleNombreFilterChange}
                            placeholder={"Filtrar por nombre"}
                            className="search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert mt-5"
                        />

                        {/* Botón Editar */}
                        <button
                            onClick={handleEditClick}
                            disabled={!selectedReserva}
                            className={`group p-3 rounded-md mt-4 transition ${
                                !selectedReserva
                                ? "hover-off dark:bg-gray-800 dark:text-gray-500" // Deshabilitado
                                : "bg-white text-black border border-[#bacdb0] hover:bg-[#729b79] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-[#475b63]" // Habilitado
                            }`}
                        >
                            <img
                             src={selectedReserva ? UpdateIcon : UpdateIconDisable}
                                alt="edit"
                                className={`w-4 h-4 transition group-hover:brightness-0 group-hover:invert ${
                                    selectedReserva ? "group-hover:contrast-1000" : ""
                                  }`}
                            />
                        </button>

                        {/* Botón Eliminar */}
                        <button
                          onClick={handleDelete}
                          disabled={!selectedReserva}
                          className={`group p-3 rounded-md mt-4 transition ${
                            !selectedReserva
                            ? "hover-off dark:bg-gray-800 dark:text-gray-500" // Deshabilitado
                            : "bg-white text-black border border-[#bacdb0] hover:bg-[#729b79] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-[#475b63]" // Habilitado
                        }`}
                        >
                          <img
                            src={
                              dataReserva.length === 0 || !selectedReserva
                                ? DeleteIconDisable
                                : DeleteIcon
                            }
                            alt="delete"
                            className={`w-4 h-4 transition group-hover:brightness-0 group-hover:invert ${
                                selectedReserva ? "group-hover:contrast-1000" : ""
                              }`}
                          />
                        </button>
                    </div>
                </div>

                            
                            {/* Tabla de reservas */}
                <div className="overflow-auto rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-pink-100 border-b-2 border-gray-200">
                            <tr>
                                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Reservador
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Email
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Fecha
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Hora
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Servicio
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredNombres.map((reserva, index) => {
                                    const isSelected =
                                        selectedReserva?.idreserva === reserva.idreserva;
                                    return (
                                        <tr
                                            key={reserva.idreserva}
                                            className={`${
                                                index % 2 === 0 
                                                ? " bg-[#f3f7f5] dark:bg-[#2e2c2f]" 
                                                : "bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                                            } ${
                                                isSelected ? "bg-[#FCE5CD] dark:bg-[#4B5563]" : ""
                                            }`}
                                            onClick={() => handleRowSelect(reserva)}
                                        >
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff] accent-[#30683e] dark:accent-[#9BCCA3]">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(reserva)}
                                            />
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                                {reserva.nombreReservador}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                                {reserva.email}
                                                </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                                {reserva.fecha}
                                                </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                                {reserva.hora}
                                                </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                                {reserva.motivo}
                                                </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
    
                <PopupReserva
                    show={isPopupOpen}
                    setShow={setIsPopupOpen}
                    data={dataReserva}
                    action={handleUpdate}
                />
                {/*
                <PopupFiltrosRes
                    show={isFilterPopupOpen}
                    onClose={() => setIsFiltersPopupOpen(false)}
                    filtros={filtros}
                    setFiltros={handleFilterChange}
                    applyFilters={applyFilters}
                />
                */}
                
            </div>
        </div>
    );
    
};

export default Reservas;

