import { useEffect, useState } from 'react';
import PopupUser from '@components/Popup';
import useDeleteUser from '@hooks/users/useDeleteUser';
import useEditUser from '@hooks/users/useEditUser';
import useGetUsers from '@hooks/users/useGetUsers';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/users.css';

const Users = () => {
    const { users, fetchUsers, setUsers } = useGetUsers();
    const [filterRut, setFilterRut] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRutFilterChange = (e) => {
        setFilterRut(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.rut.toLowerCase().includes(filterRut.toLowerCase())
    );

    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataUser,
        setDataUser
    } = useEditUser(fetchUsers, setUsers);

    const { handleDelete: deleteFunction } = useDeleteUser(fetchUsers, setDataUser);

    useEffect(() => {
        if (
            selectedUser &&
            !users.some(user => user.rut === selectedUser.rut)
        ) {
            setSelectedUser(null);
            console.log("Usuario seleccionado eliminado.", selectedUser);
        }
    }, [users]);

    const handleEditClick = () => {
        if (selectedUser) {
            console.log("Usuario seleccionado para editar:", selectedUser);
            const userToEdit = users.find(user => user.rut === selectedUser.rut);
            if (userToEdit) {
                setDataUser([userToEdit]);
                handleClickUpdate();
            } else {
                alert("El usuario seleccionado no existe.");
            }
        } else {
            alert("Selecciona un usuario para editar.");
        }
    };

    const handleDelete = async () => {
        if (selectedUser) {
            try {
                await deleteFunction([selectedUser]);
                setSelectedUser(null);
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
            }
        } else {
            alert("Selecciona un usuario para eliminar.");
        }
    };

    const handleRowSelect = (user) => {
        setSelectedUser(
            selectedUser?.rut === user.rut ? null : user
        );
    };

    return (
        <div className="slide-down">
            <div className="main-content bg-none">
                <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">
                    Usuarios
                </h1>

                <div className="top-table">
                    <div className="filter-actions flex space-x-4">
                        <input
                            value={filterRut}
                            onChange={handleRutFilterChange}
                            placeholder={"Filtrar por RUT"}
                            className="search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert mt-5"
                        />

                        <button
                            onClick={handleEditClick}
                            disabled={!selectedUser}
                            className={`group p-3 rounded-md mt-4 transition ${
                                !selectedUser
                                ? "hover-off dark:bg-gray-800 dark:text-gray-500"
                                : "bg-white text-black border border-[#bacdb0] hover:bg-[#729b79] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-[#475b63]"
                            }`}
                        >
                            <img
                                src={selectedUser ? UpdateIcon : UpdateIconDisable}
                                alt="edit"
                                className={`w-4 h-4 transition group-hover:brightness-0 group-hover:invert ${
                                    selectedUser ? "group-hover:contrast-1000" : ""
                                }`}
                            />
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={!selectedUser}
                            className={`group p-3 rounded-md mt-4 transition ${
                                !selectedUser
                                ? "hover-off dark:bg-gray-800 dark:text-gray-500"
                                : "bg-white text-black border border-[#bacdb0] hover:bg-[#729b79] dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-[#475b63]"
                            }`}
                        >
                            <img
                                src={
                                    dataUser.length === 0 || !selectedUser
                                        ? DeleteIconDisable
                                        : DeleteIcon
                                }
                                alt="delete"
                                className={`w-4 h-4 transition group-hover:brightness-0 group-hover:invert ${
                                    selectedUser ? "group-hover:contrast-1000" : ""
                                }`}
                            />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-[#2e2c2f] border-b-2 border-gray-200 dark:border-[#212121] dark:text-[#fff]">
                            <tr>
                                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left"></th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Nombre Completo
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    RUT
                                </th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                                    Correo Electrónico
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100 dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]">
                            {filteredUsers.map((user, index) => {
                                const isSelected = selectedUser?.rut === user.rut;
                                return (
                                    <tr
                                        key={user.rut}
                                        className={`${
                                            index % 2 === 0
                                                ? " bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                                                : "bg-[#f3f7f5] dark:bg-[#2e2c2f]"
                                        } ${
                                            isSelected ? "bg-[#FCE5CD] dark:bg-[#4B5563]" : ""
                                        }`}
                                        onClick={() => handleRowSelect(user)}
                                    >
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff] accent-[#30683e] dark:accent-[#9BCCA3]">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={isSelected}
                                                onChange={() => handleRowSelect(user)}
                                            />
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                            {user.nombreCompleto}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                            {user.rut}
                                        </td>
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap dark:text-[#fff]">
                                            {user.email}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <PopupUser
                    show={isPopupOpen}
                    setShow={setIsPopupOpen}
                    data={dataUser}
                    action={handleUpdate}
                />
            </div>
        </div>
    );
};

export default Users;
