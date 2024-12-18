import { useState, useEffect } from 'react';
import { getUsers } from '@services/user.service.js';

const useUsers = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            if (response.message === "No hay usuarios") {
                console.log("No hay usuarios");
                return;
            }
            const formattedData = response.map((user) => ({
                nombreCompleto: user.nombreCompleto,
                rut: user.rut,
                email: user.email,
                rol: user.rol,
                createdAt: user.createdAt
            }));
            dataLogged(formattedData);
            setUsers(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Remove the logged user from the list
    const dataLogged = (formattedData) => {
        try {
            const { rut } = JSON.parse(sessionStorage.getItem('usuario'));
            for(let i = 0; i < formattedData.length ; i++) {
                if(formattedData[i].rut === rut) {
                    formattedData.splice(i, 1);
                    break;
                }
            }
        } catch (error) {
            console.error("Error: ", error)
        }
    };

    return { users, fetchUsers, setUsers };
};

export default useUsers;