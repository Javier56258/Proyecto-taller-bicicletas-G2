import Table from '@components/Table';
import useDeleteReserva from '@hooks/reservas/useDeleteReserva';
import useEditReserva from '@hooks/reservas/useEditReserva';
import useGetReservas from '@hooks/reservas/useGetReserva';
import { useCallback } from 'react';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import PopupReserva from '@components/PopupReserva';
import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/users.css';

const Reservas = () => {
    const { reservas, fetchReservas, setReservas } = useGetReservas();
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataReserva,
        setDataReserva
    }= useEditReserva(setReservas);

    const { handleDelete } = useDeleteReserva(fetchReservas, setDataReserva);
    const handleSelectionChange = useCallback((selectedReservas) => {
        setDataReserva(selectedReservas);
    }, [setDataReserva]);

    const columns = [
        { title: "Usuario", field: "nombreReservador", width: 200, responsive: 2 },
        { title: "Email", field: "email", width: 350, responsive: 0 },
        { title: "Fecha", field: "fecha", width: 350, responsive: 0 },
        { title: "Hora", field: "hora", width: 300, responsive: 3 },
        { title: "Estado", field: "motivo", width: 150, responsive: 2 },
        {title: "Creado", field: "createdAt", width: 200, responsive: 2}
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Reservas</h1>
                    <div className='filter-actions'>
                    
                        <button onClick={handleClickUpdate} disabled={dataReserva.length ===0} >
                            {dataReserva.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className = 'delete-user-button'  disabled = {dataReserva.length ===0} onClick={()=> handleDelete(dataReserva)}>
                            {dataReserva.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={reservas}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupReserva show= {isPopupOpen} setShow={setIsPopupOpen} reserva={dataReserva} action={handleUpdate} />
        </div>
    );
};

export default Reservas;

