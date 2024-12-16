
import { useEffect, useState } from 'react';
import { getVentas } from '@services/venta.service.js';
import { showErrorAlert } from '@helpers/sweetAlert.js';
import '@styles/proveedor.css';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [filterNombreProduct, setFilterNombreProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      const response = await getVentas();
      const data = response.data;
      if (Array.isArray(data)) {
        setVentas(data);
      } else {
        console.error('La respuesta de la API no es un array:', data);
        showErrorAlert('Error', 'La respuesta de la API no es válida.');
      }
    } catch (error) {
      showErrorAlert('Error', 'No se pudieron obtener las ventas.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleNombreFilterChange = (e) => {
    setFilterNombreProduct(e.target.value);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const filterVentas = (venta) => {
    const ventaDate = new Date(venta.fecha);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    return (
      venta.nombreProducto.toLowerCase().includes(filterNombreProduct.toLowerCase()) &&
      (!start || ventaDate >= start) &&
      (!end || ventaDate <= end)
    );
  };

  const clearFilters = () => {
    setFilterNombreProduct("");
    setStartDate("");
    setEndDate("");
  };


  return (
    <div className="slide-down">
      <div className="main-content bg-none">
        <h1 className="text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]">Historial de Ventas</h1>
        {/* Sección de Filtros */}
        <div className="flex flex-wrap justify-center mb-6 gap-4 bg-gray-100 dark:bg-[#2e2c2f] p-4 rounded-lg shadow-md">
          <div className="flex flex-col">
            <label className="font-semibold mb-1 dark:text-white">Filtrar porNombre del Producto</label>
            <input
              value={filterNombreProduct}
              onChange={handleNombreFilterChange}
              placeholder="Buscar producto..."
              className="search-input placeholder:text-gray-500 dark:bg-[#2e2c2f] p-2 rounded-lg border"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 dark:text-white">Fecha de Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="search-input p-2 rounded-lg border dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 dark:text-white">Fecha de Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="search-input p-2 rounded-lg border dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]"
            />
          </div>

          <div className="flex flex-col">
            <label className="invisible mb-1">Botón</label> {/* Espacio para alinear */}
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white p-2 rounded-lg h-full hover:bg-red-700 transition"
            >
                Limpiar Filtros
            </button>
          </div>
        </div>
        <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#2e2c2f] border-b-2 border-gray-200 dark:border-[#212121] dark:text-[#fff]">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">Nombre del Producto</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Cantidad</th>
                <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Total</th>
                <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Fecha/Hora</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 dark:bg-[#2e2c2f] dark:divide-[#1c1c1c] dark:text-[#fff]">
            {ventas
              .filter(filterVentas)
              .map((venta) => (
                  <tr key={venta.id} className="bg-white dark:bg-[#1f1f1f] border-b dark:border-[#2e2c2f]">
                  <td className="p-3">{venta.nombreProducto}</td>
                  <td className="p-3">{venta.cantidad}</td>
                  <td className="p-3">{venta.total}</td>
                  <td className="p-3">{formatDate(venta.fecha)}</td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ventas;