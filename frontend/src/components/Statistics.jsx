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



const Statistics = () => {
    const [limit, setLimit] = useState(1);
    const [mostStockProducts, setMostStockProducts] = useState([]);

    


    useEffect(() => {
        async function fetchStatistics() {
            try {
                const mostStock = await getProductsWithMostStock(limit);
                const formattedData = formatDataArray(mostStock)
                setMostStockProducts(formattedData);
    
            
            } catch (error) {
                console.error("Error en fetch statistics: ", error);
            }
        }
        fetchStatistics();
    }, [limit]);

    const handleLimitChange = (event) => {
        setLimit(Number(event.target.value));
    };
    


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <StatisticCard title="Productos con más stock">
                <ul>
                  {mostStockProducts.map((product) => (
                <li key={product.id}>{product.name} - {product.stock} unidades</li>
                ))}
                </ul>
            <div className="mt-4">
                <label htmlFor="limit" className="block text-sm font-medium text-gray-700">
                    Límite de productos:
                </label>
                <input
                    type="number"
                    id="limit"
                    value={limit}
                    onChange={handleLimitChange}
                    min="1"
                    
                    onKeyDown={(e) => e.preventDefault()} 
                    className="w-16 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            </StatisticCard>
        </div>  
    );

}

export default Statistics;