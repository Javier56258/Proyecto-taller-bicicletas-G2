
import { useEffect } from 'react';
import { getProducts,createProduct,updateProduct,deleteProduct } from '@services/product.service.js';
import "@styles/proveedor.css";
import { useState } from 'react';
import ProductCard from '@components/ProductCard.jsx';
import ProductpopUp from '@components/ProductpopUp.jsx';
import PopupEditProduct from '../components/PopupEditProduct';
import { showSuccessAlert, showErrorAlert, deleteDataAlert } from '@helpers/sweetAlert.js';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [editingProducto, setEditingProducto] = useState(null);
    const [filter, setFilter] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
    const [isReversed, setIsReversed] = useState(false);


    useEffect(() => {
        async function fetchProductos() {
          try {
            const data = await getProducts();
            data.sort((a, b) => b.id - a.id);
            setProductos(data);
          } catch (error) {
            console.error("Error al obtener los servicios:", error);
          }
        }
        fetchProductos();
      }, []);

    const handleSave = async (productoData) => {

        try {
            if (editingProducto) {
                await updateProduct(productoData, editingProducto.id);
                showSuccessAlert('Producto actualizado correctamente');
                const updatedProducts = productos.map((product) =>
                    product.id === editingProducto.id ? productoData : product
                );
                setProductos(updatedProducts);
            } else {
                showSuccessAlert('Producto creado correctamente');
                const newProduct = await createProduct(productoData);
                setProductos([newProduct, ...productos]);
            }
            setEditingProducto(null);
        } catch (error) {
            console.log(error);
            showErrorAlert('Error al guardar el producto');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteDataAlert();
            if (response.isConfirmed) {
                await deleteProduct(id);
                showSuccessAlert('Producto eliminado correctamente');
                const data = await getProducts();
                data.sort((a, b) => b.id - a.id);
                setProductos(data);
            } else {
                showErrorAlert('Error al eliminar el producto');  
            }
        } catch (error) {
            console.log(error);
            showErrorAlert('Error al eliminar el producto');
        }
    };

    const handleEdit = (product) => {
        setEditingProducto(product);
        setIsEditPopupOpen(true);
    
    };

    const filteredProducts = productos.filter((product) =>
        product.name.toLowerCase().includes(filter.toLowerCase())

    );

    const displayedProductos = isReversed ? [...filteredProducts].reverse() : filteredProducts;

    return (
        <div className='main-content bg-none'>
            <h1 className='text-4xl font-extrabold text-center text-[#475B63] mb-10 dark:text-[#F3E8EE]'>
                Productos del Taller
            </h1>
            <div className='button-container'>
                <button
                    className='create-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f]'
                    onClick={() => {
                        setEditingProducto(null);
                        setIsPopupOpen(true);
                    }}
                >
                    Crear Producto
                </button>
                <div className='right-buttons'>
                    <input
                        type="text"
                        placeholder='Filtrar por nombre'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className='search-input-table placeholder:text-[#475b63] dark:placeholder:text-black dark:bg-[#e8e9e8] dark:border-[#45324f] dark:invert'
                    />
                    <button
                        className='order-button dark:hover:bg-[#2e2c2f] dark:hover:text-white dark:text-[#2e2c2f]'
                        onClick={() => setIsReversed(!isReversed)}
                    >
                        {isReversed ? 'Orden: Mas antiguo' : 'Orden: Mas reciente'} 
                    </button>
                </div>
            </div>

            <ProductpopUp 
                show = {isPopupOpen}
                setShow = {setIsPopupOpen}
                data = {editingProducto}
                action = {handleSave}
            />


            <PopupEditProduct
                show={isEditPopupOpen}
                setShow={setIsEditPopupOpen}
                action={handleSave}
                producto={editingProducto}
            />


            <div className='services-grid'>
                {displayedProductos.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;