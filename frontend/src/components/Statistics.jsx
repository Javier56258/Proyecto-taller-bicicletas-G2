import { useEffect, useState } from "react";
import {
    getProductsWithMostStock,
    getProductsWithLeastStock,
    getOutOfStockProducts,
    getProveedoresWithMostProducts,
    getProveedoresWithOutOfStockProducts
} from "../services/statistics.service.js";
import { formatDataArray } from "../helpers/formatData.js"; 
import StatisticCard from "@components/StatisticCard";
import { Link } from 'react-router-dom';
import PieChart from "@components/PieChart";



const Statistics = () => {
    const [mostStockProducts, setMostStockProducts] = useState([]);
    const [leastStockProducts, setLeastStockProducts] = useState([]);
    const [outOfStockProducts, setOutOfStockProducts] = useState([]);
    const [mostProductsProveedores, setMostProductsProveedores] = useState([]);
    const [outOfStockProductsProveedores, setOutOfStockProductsProveedores] = useState([]);
  

    const [limitMostStockProducts, setLimitMostStockProducts] = useState(3);
    const [limitLeastStockProducts, setLimitLeastStockProducts] = useState(3);
   


    useEffect(() => {
        async function fetchStatistics() {
            const mostStock = await getProductsWithMostStock(limitMostStockProducts);
            const formattedDataMostStock = formatDataArray(mostStock)
            setMostStockProducts(formattedDataMostStock);
            
            const leastStock = await getProductsWithLeastStock(limitLeastStockProducts);
            const formattedDataLeastStock = formatDataArray(leastStock);
            setLeastStockProducts(formattedDataLeastStock);

            const outOfStock = await getOutOfStockProducts();
            const formattedDataOutOfStock = formatDataArray(outOfStock);
            setOutOfStockProducts(formattedDataOutOfStock);

            const mostProducts = await getProveedoresWithMostProducts();
            const formattedDataMostProducts = formatDataArray(mostProducts);
            setMostProductsProveedores(formattedDataMostProducts);

            const outOfStockProveedores = await getProveedoresWithOutOfStockProducts();
            const formattedDataOutOfStockProviders = formatDataArray(outOfStockProveedores);
            setOutOfStockProductsProveedores(formattedDataOutOfStockProviders);
            
        }
        fetchStatistics();
    }, [limitMostStockProducts, limitLeastStockProducts ]);


    const handleLimitMostStockProductsChange = (event) => {
        setLimitMostStockProducts(Number(event.target.value));
      };
    
      const handleLimitLeastStockProductsChange = (event) => {
        setLimitLeastStockProducts(Number(event.target.value));
      };
    
        
    const filteredProveedores = mostProductsProveedores.filter(proveedor => proveedor.cantidad_de_productos > 0);


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <StatisticCard title="Productos agotados" className="bg-red-100 dark:bg-red-900">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-green-50 dark:bg-green-800">
                    <thead className="bg-red-200 dark:bg-red-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400 rounded-tl-lg"
                        >
                          Nombre
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-red-50 dark:bg-red-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
                      {outOfStockProducts.map((product, index) => (
                        <tr key={product.id} className={index === outOfStockProducts.length - 1 ? "rounded-b-lg" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product.name}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </StatisticCard>
            
            <StatisticCard title="Proveedores con productos agotados" className="bg-red-100 dark:bg-red-900">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-red-50 dark:bg-red-800">
                    <thead className="bg-red-200 dark:bg-red-700">
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
                    <tbody className="bg-red-50 dark:bg-red-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
                      {outOfStockProductsProveedores.map((proveedor, index) => (
                        <tr key={proveedor.idProveedor} className={index === outOfStockProductsProveedores.length - 1 ? "rounded-b-lg" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          <Link to={`/proveedores`} className="text-blue-500 hover:underline">
                              {proveedor.nombreProveedor}
                          </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {proveedor.cantidad_de_productos_agotados} producto(s) agotado(s)                                 
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>        
            </StatisticCard>
            
            
            <StatisticCard title="Productos con menos stock" className="bg-red-100 dark:bg-red-900">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-red-50 dark:bg-red-800">
                    <thead className="bg-red-200 dark:bg-red-700">
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
                    <tbody className="bg-red-50 dark:bg-red-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
                      {leastStockProducts.map((product, index) => (
                        <tr key={product.id} className={index === leastStockProducts.length - 1 ? "rounded-b-lg" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product.name}
                       </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.stock === 0 ? "Agotado" : `${product.stock} unidades`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <label htmlFor="limitLeastStockProducts" className="block text-sm font-medium text-gray-700 dark:invert">
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

              
            <StatisticCard title="Productos con más stock" className="bg-green-100 dark:bg-green-900">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-green-50 dark:bg-green-800">
                    <thead className="bg-green-200 dark:bg-green-700">
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
                    <tbody className="bg-green-50 dark:bg-green-800 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg">
                      {mostStockProducts.map((product, index) => (
                        <tr key={product.id} className={index === mostStockProducts.length - 1 ? "rounded-b-lg" : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.stock === 0 ? "Agotado" : `${product.stock} unidades`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <label htmlFor="limitMostStockProducts" className="block text-sm font-medium text-gray-700 dark:invert">
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

              
              <StatisticCard title="Cantidad de Productos por Proveedor " className="bg-green-100 dark:bg-green-900">
                <div className="overflow-x-auto rounded-lg shadow-lg">
                  <PieChart
                    data={filteredProveedores.map(proveedor => proveedor.cantidad_de_productos)}
                    labels={filteredProveedores.map(proveedor => proveedor.nombreProveedor)}
                  />
                </div>
              </StatisticCard>
              
            </div>
          );
};

export default Statistics;