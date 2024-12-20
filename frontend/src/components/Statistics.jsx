import { useEffect, useState } from "react";
import {
  getProductsWithMostStock,
  getProductsWithLeastStock,
  getOutOfStockProducts,
  getProveedoresWithMostProducts,
  getProveedoresWithOutOfStockProducts,
  getProveedoresWithMostSoldProducts,
  getMostSoldProducts,
  getEarningsByDateRange,
  getMostRequestedServices,
} from "../services/statistics.service.js";
import { formatDataArray } from "../helpers/formatData.js";
import StatisticCard from "@components/StatisticCard";
import PieChart from "@components/PieChart";

const Statistics = () => {
  const [mostStockProducts, setMostStockProducts] = useState([]);
  const [leastStockProducts, setLeastStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [mostProductsProveedores, setMostProductsProveedores] = useState([]);
  const [outOfStockProductsProveedores, setOutOfStockProductsProveedores] =
    useState([]);
  const [mostSoldProductsProveedores, setMostSoldProductsProveedores] =
    useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);
  const [earnings, setEarnings] = useState([]);
  //seteamos earnings a peso  chileno
  const formatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  const [mostRequestedServices, setMostRequestedServices] = useState([]);

  const [limitMostStockProducts, setLimitMostStockProducts] = useState(3);
  const [limitLeastStockProducts, setLimitLeastStockProducts] = useState(3);
  const [limitMostSoldProducts, setLimitMostSoldProducts] = useState(3);
  const [limitMostSoldProveedores, setLimitMostSoldProveedores] = useState(3);
  const [limitMostRequestedServices, setLimitMostRequestedServices] =
    useState(3);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 2))
      .toISOString()
      .split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    async function fetchStatistics() {
      const mostStock = await getProductsWithMostStock(limitMostStockProducts);
      const formattedDataMostStock = formatDataArray(mostStock);
      setMostStockProducts(formattedDataMostStock);
      const leastStock = await getProductsWithLeastStock(
        limitLeastStockProducts
      );
      const formattedDataLeastStock = formatDataArray(leastStock);
      setLeastStockProducts(formattedDataLeastStock);

      const outOfStock = await getOutOfStockProducts();
      const formattedDataOutOfStock = formatDataArray(outOfStock);
      setOutOfStockProducts(formattedDataOutOfStock);

      const mostProducts = await getProveedoresWithMostProducts();
      const formattedDataMostProducts = formatDataArray(mostProducts);
      setMostProductsProveedores(formattedDataMostProducts);

      const outOfStockProveedores =
        await getProveedoresWithOutOfStockProducts();
      const formattedDataOutOfStockProviders = formatDataArray(
        outOfStockProveedores
      );
      setOutOfStockProductsProveedores(formattedDataOutOfStockProviders);

      const mostSoldProveedores = await getProveedoresWithMostSoldProducts(
        limitMostSoldProveedores
      );
      const formattedDataMostSoldProveedores =
        formatDataArray(mostSoldProveedores);
      setMostSoldProductsProveedores(formattedDataMostSoldProveedores);

      const mostRequestedServices = await getMostRequestedServices(
        limitMostRequestedServices
      );
      const formattedDataMostRequestedServices = formatDataArray(
        mostRequestedServices
      );
      setMostRequestedServices(formattedDataMostRequestedServices);

      const mostSold = await getMostSoldProducts(limitMostSoldProducts);
      const formattedDataMostSold = formatDataArray(mostSold);
      setMostSoldProducts(formattedDataMostSold);

      const earnings = await getEarningsByDateRange(startDate, endDate);
      const totalGanancias = earnings?.totalganancias ?? "0";
      totalGanancias
        ? setEarnings(formatter.format(totalGanancias))
        : setEarnings(0);
    }
    fetchStatistics();
  }, [
    limitMostStockProducts,
    limitLeastStockProducts,
    limitMostSoldProveedores,
    limitMostSoldProducts,
    startDate,
    endDate,
    limitMostRequestedServices,
  ]);

  const handleLimitMostStockProductsChange = (event) => {
    setLimitMostStockProducts(Number(event.target.value));
  };

  const handleLimitLeastStockProductsChange = (event) => {
    setLimitLeastStockProducts(Number(event.target.value));
  };

  const handleLimitMostSoldProductsChange = (event) => {
    setLimitMostSoldProducts(Number(event.target.value));
  };

  const handleLimitMostSoldProveedoresChange = (event) => {
    setLimitMostSoldProveedores(Number(event.target.value));
  };

  const handleLimitMostRequestedServicesChange = (event) => {
    setLimitMostRequestedServices(Number(event.target.value));
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filteredProveedores = mostProductsProveedores.filter(
    (proveedor) => proveedor.cantidad_de_productos > 0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatisticCard
        title="Productos agotados"
        className="bg-red-100 dark:bg-[#4f2121]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-green-50 dark:bg-green-800">
            <thead className="bg-red-200 dark:bg-[#401717]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Nombre
                </th>
              </tr>
            </thead>
            <tbody className="bg-red-50 dark:bg-[#662222] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {outOfStockProducts.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    No hay productos agotados.
                  </td>
                </tr>
              ) : (
                outOfStockProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className={
                      index === outOfStockProducts.length - 1
                        ? "rounded-b-lg"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {product.name}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </StatisticCard>

      <StatisticCard
        title="Proveedores con productos agotados"
        className="bg-red-100 dark:bg-[#4f2121]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-red-50 dark:bg-[#662222]">
            <thead className="bg-red-200 dark:bg-[#401717]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Proveedor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Cantidad de productos agotados
                </th>
              </tr>
            </thead>
            <tbody className="bg-red-50 dark:bg-[#662222] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {outOfStockProductsProveedores.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    No hay proveedores con productos agotados.
                  </td>
                </tr>
              ) : (
                outOfStockProductsProveedores.map((proveedor, index) => (
                  <tr
                    key={proveedor.idProveedor}
                    className={
                      index === outOfStockProductsProveedores.length - 1
                        ? "rounded-b-lg"
                        : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {proveedor.nombreProveedor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {proveedor.cantidad_de_productos_agotados}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </StatisticCard>

      <StatisticCard
        title="Productos con menos stock"
        className="bg-red-100 dark:bg-[#4f2121]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-red-50 dark:bg-red-800">
            <thead className="bg-red-200 dark:bg-[#401717]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-red-50 dark:bg-[#662222] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {leastStockProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={
                    index === leastStockProducts.length - 1
                      ? "rounded-b-lg"
                      : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.stock === 0
                      ? "Agotado"
                      : `${product.stock} unidades`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label
            htmlFor="limitLeastStockProducts"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Límite de productos:
          </label>
          <input
            type="number"
            id="limitLeastStockProducts"
            value={limitLeastStockProducts}
            onChange={handleLimitLeastStockProductsChange}
            min="1"
            onKeyDown={(e) => e.preventDefault()}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </StatisticCard>

      <StatisticCard
        title="Productos con más stock"
        className="bg-green-100 dark:bg-[#0f391f]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-green-50 dark:bg-green-800">
            <thead className="bg-green-200 dark:bg-[#142d1d]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Stock
                </th>
              </tr>
            </thead>
            <tbody className="bg-green-50 dark:bg-[#184429] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {mostStockProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={
                    index === mostStockProducts.length - 1 ? "rounded-b-lg" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {product.stock === 0
                      ? "Agotado"
                      : `${product.stock} unidades`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label
            htmlFor="limitMostStockProducts"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Límite de productos:
          </label>
          <input
            type="number"
            id="limitMostStockProducts"
            value={limitMostStockProducts}
            onChange={handleLimitMostStockProductsChange}
            min="1"
            onKeyDown={(e) => e.preventDefault()}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </StatisticCard>
      <StatisticCard
        title="Productos más vendidos"
        className="bg-green-100 dark:bg-[#0f391f]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-green-50 dark:bg-green-800">
            <thead className="bg-green-200 dark:bg-[#142d1d]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Producto
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Total Ventas
                </th>
              </tr>
            </thead>
            <tbody className="bg-green-50 dark:bg-[#184429] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {mostSoldProducts.map((producto, index) => (
                <tr
                  key={producto.idProducto}
                  className={
                    index === mostSoldProducts.length - 1 ? "rounded-b-lg" : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {producto.nombre_producto}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {producto.totalventas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label
            htmlFor="limitMostSoldProducts"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Límite de productos:
          </label>
          <input
            type="number"
            id="limitMostSoldProducts"
            value={limitMostSoldProducts}
            onChange={handleLimitMostSoldProductsChange}
            min="1"
            onKeyDown={(e) => e.preventDefault()}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </StatisticCard>
      <StatisticCard
        title="Proveedores con más productos vendidos"
        className="bg-blue-100 dark:bg-[#1b2a53]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-blue-50 dark:bg-blue-800">
            <thead className="bg-blue-200 dark:bg-[#10182f]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Proveedor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Total Ventas
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-50 dark:bg-[#293b77] divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {mostSoldProductsProveedores.map((proveedor, index) => (
                <tr
                  key={proveedor.idProveedor}
                  className={
                    index === mostSoldProductsProveedores.length - 1
                      ? "rounded-b-lg"
                      : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {proveedor.nombreProveedor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {proveedor.totalventasproveedor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label
            htmlFor="limitMostSoldProducts"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Límite de proveedores:
          </label>
          <input
            type="number"
            id="limitMostSoldProveedores"
            value={limitMostSoldProveedores}
            onChange={handleLimitMostSoldProveedoresChange}
            min="1"
            onKeyDown={(e) => e.preventDefault()}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </StatisticCard>

      <StatisticCard
        title="Cantidad de Productos por Proveedor "
        className="bg-blue-100 dark:bg-[#1b2a53] options"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <PieChart
            data={filteredProveedores.map(
              (proveedor) => proveedor.cantidad_de_productos
            )}
            labels={filteredProveedores.map(
              (proveedor) => proveedor.nombreProveedor
            )}
          />
        </div>
      </StatisticCard>
      <StatisticCard
        title="Ganancias en intervalos de fechas"
        className="bg-yellow-100 dark:bg-[#754b25]"
      >
        <div className="mt-4">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Fecha de inicio:
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Fecha de fin:
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-100">
            Ganancias: {earnings || 0}
          </p>
        </div>
      </StatisticCard>

      <StatisticCard
        title="Servicios más solicitados"
        className="bg-yellow-100 dark:bg-[#754b25]"
      >
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-yellow-50 dark:bg-yellow-800">
            <thead className="bg-yellow-200 dark:bg-[#553620]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                >
                  Servicio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tr-lg"
                >
                  Total Solicitudes
                </th>
              </tr>
            </thead>
            <tbody className="bg-yellow-50 dark:bg-yellow-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
              {mostRequestedServices.map((service, index) => (
                <tr
                  key={service.id}
                  className={
                    index === mostRequestedServices.length - 1
                      ? "rounded-b-lg"
                      : ""
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {service.motivo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {service.totalsolicitudes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <label
            htmlFor="limitMostRequestedServices"
            className="block text-sm font-medium text-gray-700 dark:invert"
          >
            Límite de servicios:
          </label>
          <input
            type="number"
            id="limitMostRequestedServices"
            value={limitMostRequestedServices}
            onChange={handleLimitMostRequestedServicesChange}
            min="1"
            onKeyDown={(e) => e.preventDefault()}
            className="text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </StatisticCard>
    </div>
  );
};

export default Statistics;
