import Table from '@components/Table';
import useProducts from '@hooks/products/useGetProducts.jsx';
import UpdateIcon from '../assets/updateIcon.svg';
import useEditProduct from '@hooks/products/useEditProduct.jsx';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import Popup from '../components/Popup';
import { useCallback } from 'react';
import useDeleteProduct from '@hooks/products/useDeleteProduct.jsx';
import DeleteIcon from '../assets/deleteIcon.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import '@styles/users.css';

const Products = () => {
    const { products, fetchProducts, setProducts } = useProducts();
    const {
        handleClickUpdate,
        handleUpdate,
        isPopupOpen,
        setIsPopupOpen,
        dataProduct,
        setDataProduct
    }= useEditProduct(setProducts);

    const { handleDelete } = useDeleteProduct(fetchProducts, setDataProduct);
    const handleSelectionChange = useCallback((selectedProducts) => {
        setDataProduct(selectedProducts);
    }, [setDataProduct]);

    const columns = [
        { title: "Nombre", field: "name", width: 350, responsive: 0 },
        { title: "Descripción", field: "description", width: 300, responsive: 3 },
        { title: "Precio", field: "price", width: 150, responsive: 2 },
        { title: "Stock", field: "stock", width: 200, responsive: 2 },
        {title: "Creado", field: "createdAt", width: 200, responsive: 2}
    ];

    return (
        <div className='main-container'>
            <div className='table-container'>
                <div className='top-table'>
                    <h1 className='title-table'>Productos</h1>
                    <div className='filter-actions'>
                        <button onClick={handleClickUpdate} disabled={dataProduct.length ===0} >
                            {dataProduct.length === 0 ? (
                                <img src={UpdateIconDisable} alt="edit-disabled" />
                            ) : (
                                <img src={UpdateIcon} alt="edit" />
                            )}
                        </button>
                        <button onClick={ handleDelete } disabled = {dataProduct.length ===0}>
                            {dataProduct.length === 0 ? (
                                <img src={DeleteIconDisable} alt="delete-disabled" />
                            ) : (
                                <img src={DeleteIcon} alt="delete" />
                            )}
                        </button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    data={products}
                    onSelectionChange={handleSelectionChange}
                />
            </div>
            {isPopupOpen && (
                <Popup
                    data = {dataProduct}
                    onClose={() => setIsPopupOpen(false)}
                    onUpdate={handleUpdate}

                />
            )}
        </div>
    );  
};

export default Products;