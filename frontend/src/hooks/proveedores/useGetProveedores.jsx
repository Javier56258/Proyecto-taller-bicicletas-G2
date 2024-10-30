import { useState, useEffect } from 'react';
import { getProveedores } from '@services/proveedor.service.js';

const useProveedores = () => {
    const [proveedores, setProveedores] = useState([]);

    const fetchProveedores = async () => {
        try {
            const response = await getProveedores();
            const formattedData = response.map(proveedor => ({
                "idProveedor": proveedor.idProveedor,
                "nombreProveedor": proveedor.nombreProveedor,
                "productos_suministrados": proveedor.productos_suministrados,
                "PaginaWeb": proveedor.PaginaWeb,
                "telefono": proveedor.telefono,
                "email": proveedor.email,
                "direccion": proveedor.direccion,
                "createdAt": proveedor.createdAt         
            }));
            setProveedores(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchProveedores();
    }, []);

    return { proveedores, fetchProveedores, setProveedores };
};

export default useProveedores;

