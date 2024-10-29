import { useState,useEffect } from "react";
import { getProducts } from "@services/product.service.js";

const useProducts = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            const formattedData = response.map((product) => ({
                name: product.name,
                description: product.description,
                id: product.id,
                price: `$${product.price}`,
                stock: `${product.stock} unidades`,
                createdAt: product.createdAt
            }));
            setProducts(formattedData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return { products, fetchProducts, setProducts };
};

export default useProducts;