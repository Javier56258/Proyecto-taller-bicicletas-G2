import { useState, useEffect } from "react";
import { getServicios } from "@services/servicios.service.js";

const useServicio = () => {
    const [servicios, setServicios] = useState([]);
    
    async function fetchServicios() {
        try {
          const data = await getServicios();
          data.sort((a, b) => b.idServicio - a.idServicio);
          setServicios(data);
        } catch (error) {
          console.error("Error al obtener los servicios:", error);
        }
      }

    useEffect(() => {
        fetchServicios();
    }, []);

    return { servicios, fetchServicios, setServicios };
}

export default useServicio;