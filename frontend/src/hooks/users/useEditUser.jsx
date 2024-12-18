import { useState } from 'react';
import { updateUser } from '@services/user.service.js';
import { showErrorAlert, showSuccessAlert } from '@helpers/sweetAlert.js';
import { formatPostUpdateUser } from '../../helpers/formatData';

const useEditUser = (fetchUsers, setUsers) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataUser, setDataUser] = useState([]);

    const handleClickUpdate = () => {
        if (dataUser.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedUserData) => {
        if (updatedUserData) {
            try {
                const updatedUser = await updateUser(updatedUserData, dataUser[0].id);
                showSuccessAlert('¡Actualizado!', 'El usuario ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedUser = formatPostUpdateUser(updatedUser);

                setUsers(prevUsers => prevUsers.map(user => {
                    console.log("Usuario actual:", user);
                    if (user.id === formattedUser.id) {
                        console.log("Reemplazando con:", formattedUser);
                    }
                    return user.email === formattedUser.email ? formattedUser : user;
                }));

                await fetchUsers();
                setDataUser([]);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el usuario.');
            }
        }
    };

    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataUser,
        setDataUser
    };
};

export default useEditUser;