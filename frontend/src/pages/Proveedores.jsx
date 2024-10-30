import Table from '@components/Table';
import useProveedores from '@hooks/proveedores/useGetProveedores.jsx';
import PopupProveedores from '../components/PopupProveedores.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback } from 'react';
import '@styles/users.css';
import useEditProveedor from '@hooks/proveedores/useEditProveedor';
import useDeleteProveedor from '@hooks/proveedores/useDeleteProveedor';

const Proveedores = () => {
    const { proveedores, fetchProveedores, setProveedores } = useProveedores();

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProveedor,
        setDataProveedor
    } = useEditProveedor(setProveedores);


    const { handleDelete } = useDeleteProveedor(fetchProveedores, setDataProveedor);

    const handleSelectionChange = useCallback((selectedProveedores) => {
        setDataProveedor(selectedProveedores);
    }, [setDataProveedor]);

   
    const columns = [
        { title: "ID", field: "idProveedor", width: 50, responsive: 0 },
        { title: "Nombre", field: "nombreProveedor", width: 200, responsive: 0 },
        { title: "Productos Suministrados", field: "productos_suministrados", width: 200, responsive: 2 },
        { title: "Página Web", field: "PaginaWeb", width: 200, responsive: 2 },
        { title: "Teléfono", field: "telefono", width: 100, responsive: 2 },        
        { title: "Correo electrónico", field: "email", width: 200, responsive: 2 },
        { title: "Dirección", field: "direccion", width: 200, responsive: 2 }
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Proveedores</h1>
                    <div className='filter-actions'>
                        <button onClick={handleClickUpdate} disabled={dataProveedor.length === 0}>
                            {dataProveedor.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button className='delete-proveedor-button' disabled={dataProveedor.length === 0} onClick={() => handleDelete(dataProveedor)}>
                            {dataProveedor.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    data={proveedores}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            <PopupProveedores show={isPopupOpen} close={setIsPopupOpen} title={'Editar Proveedor'} />
        </div>
    );
};

export default Proveedores;