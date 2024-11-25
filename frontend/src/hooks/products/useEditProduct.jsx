import { useState } from "react";
import { updateProduct } from "@services/product.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert.js";
import { formatPostUpdateProduct } from "../../helpers/formatData";


const useEditProduct = (setProducts) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState([]);

    const handleClickUpdate = () => {
        if (dataProduct.length > 0) {
            setIsPopupOpen(true);
        }
    };

    const handleUpdate = async (updatedProductData) => {
        if (updatedProductData) {
            try {

                const updatedProduct = await updateProduct(updatedProductData, dataProduct[0].id);
                showSuccessAlert('¡Actualizado!', 'El producto ha sido actualizado correctamente.');
                setIsPopupOpen(false);
                const formattedProduct = formatPostUpdateProduct(updatedProduct);

                setProducts(prevProducts => prevProducts.map(product => {
                    console.log("Producto actual:", product);
                    if (product.id === formattedProduct.id) {
                        console.log("Reemplazando con:", formattedProduct);
                    }
                    return product.name === formattedProduct.name ? formattedProduct : product;
                }));

                setDataProduct([]);
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
                showErrorAlert('Cancelado', 'Ocurrió un error al actualizar el producto.');
            }
        }
    };
    return {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProduct,
        setDataProduct
    };
};

export default useEditProduct;