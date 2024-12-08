import React, { useState, useEffect } from 'react';
import Form from './Form';
import '@styles/popup.css';
import CloseIcon from "@assets/XIcon.svg";
import { assignProveedorProduct } from "@services/proveedor.service.js";
import { showErrorAlert, showSuccessAlert } from "@helpers/sweetAlert"; 
import { getProducts } from '@services/product.service.js';

function AssignProveedorProduct({ show, setShow, data, action }) {

    const proveedorData = data || {};

    const [productos, setProductos] = useState([]);
    const [setSelectedProduct] = useState(null);
  
    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const productosData = await getProducts();
          setProductos(productosData);
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      };
  
      fetchProductos();
    }, []);  
    
    const handleAssignProduct = async (formData) => {
        try {
          await assignProveedorProduct(proveedorData.idProveedor, formData.idProducto);
          action();
          setShow(false);
          showSuccessAlert("Producto asignado", "El producto ha sido asignado correctamente.");
        } catch (error) {
          showErrorAlert("Error", "No se pudo asignar el producto.");
        }
      };

      return (
        <div>
        {show && (
        <div className="bg">
          <div className="prov-popup dark:bg-[#2e2c2f]">
            <button className="close" onClick={() => setShow(false)}>
              <img src={CloseIcon} alt="Cerrar" />
            </button>
            <h1 className="h1-form dark:text-[#fff]">Asignar Producto</h1>
            <div className="form-container">
              <Form
                title=""
                fields={[
                  {
                    label: "Proveedor Seleccionado",
                    name: "nombreProveedor",
                    fieldType: "input",
                    defaultValue: proveedorData.nombreProveedor,
                    required: true,
                    disabled: true,
                  },
                  {
                    label: "Producto",
                    name: "name",
                    fieldType: "select",
                    options: productos.map((product) => ({
                      value: product.id,
                      text: product.name,
                    })),
                    required: true,
                    onChange: (e) => setSelectedProduct(e.target.value),
                  },
                ]}
                buttonText="Asignar"
                onSubmit={handleAssignProduct}
              />
            </div>
          </div>
        </div>
        )}
        </div>
      );
    }
export default AssignProveedorProduct;